import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import LoginService from "../services/services.js";
import useNotyf from "@/composables/useNotyf.js";
import jwt_decode from "jwt-decode";
import { useRouter } from "vue-router";
import { parseToFormData } from "../../../utils/Functions.js";

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => ({
    user: useStorage("auth", {
      id: "",
      token: "",
      is_logged: false,
      expiration: "",
      role: "",
      email: "",
      photo: "",
      name: "",
    }),
    user_data: {},
    role: {},
  }),

  actions: {
    setUserProperty(property, value) {
      let _user = this.getProperty("user");
      _user[property] = value;
      this.setProperty("user", _user);
    },
    getUserProperty(property) {
      let _user = this.getProperty("user");
      return _user[property];
    },
    setProperty(property, value) {
      this[property] = value;
    },
    getProperty(property) {
      return this[property];
    },
    async fetchMyRol() {
      let response = await LoginService.getMyRole(
        this.getProperty("user").role
      );
      return response.data.data;
    },

    async loadMyRole() {
      let role = await this.fetchMyRol();
      this.setProperty("role", role);
    },
    async attemptLogin(form) {
      const response = await LoginService.attemptLoggin(
        form.email,
        form.password
      );
      let notyf = useNotyf();
      if (response.status != 200) {
        notyf.error(response.data.message);
        return;
      }

      if (response.data.data == "Unauthorized") {
        notyf.error(response.data.message);
        return;
      } else {
        notyf.success("Bienvenido");
        this.setLogin({
          id: response.data.data.userid,
          token: response.data.data.access_token,
          is_logged: true,
          expiration: jwt_decode(response.data.data.access_token).exp,
          role: response.data.data.usrole,
          email: response.data.data.usobject.email,
          name: response.data.data.usobject.name,
          photo: response.data.data.usobject.photo,
        });
        window.location.assign("/");
        return;
      }
    },
    async getProfileInfo() {
      let response = await LoginService.getProfileInfo();
      return response.data.data;
    },
    async loadProfileInfo() {
      let info = await this.getProfileInfo();
      this.setProperty("user_data", info);
    },
    async refreshProfileInfo() {
      let info = await this.getProfileInfo();
      console.log(info);
      this.setLogin({
        id: info.id,
        is_logged: true,
        role: info.role,
        email: info.email,
        name: info.name,
        photo: info.photo,
      });
      this.loadMyRole();
    },
    getUser() {
      return this.user;
    },
    async attemptRegister(form) {
      try {
        const result  = await LoginService.attemptRegister(form);
        return result;
      } catch (error) {
        return null;
      }
    },
    setLogin(user_data) {
      for (let i in user_data) {
        this.setUserProperty(i, user_data[i]);
      }
    },
    async logOut() {
      LoginService.logOut();
      this.setLogin({
        id: "",
        token: "",
        is_logged: "",
        expiration: "",
        role: "",
        email: "",
        name: "",
      });
      window.location.assign("/");
    },
    async updateProfile(info) {

      let data = {}

      for (let i in info) {
        if (info[i] == null || i == 'photo') continue;
        data[i] = info[i];
      }

      if (info.photo.name != undefined) data.photo = info.photo;

      let parse = parseToFormData(data);

      let response = await LoginService.updateProfile(parse);
      let notyf = useNotyf();
      switch (response.status) {
        case 422: {
          notyf.error(response.data.message);
          return false;
          break;
        }
        case 200: {
          if (info.photo.name != undefined)
            this.user.photo = URL.createObjectURL(info.photo);
          notyf.success(response.data.message);
          return true;
          break;
        }
      }
    },
    async updateEmail(form) {
      let notyf = useNotyf();
      let response = await LoginService.updateEmail(form);
      switch (response.status) {
        case 422: {
          notyf.error(response.data.message);
          return false;
          break;
        }
        case 200: {
          this.user.email = form.email;
          notyf.success(response.data.message);
          return true;
          break;
        }
      }
    },
    async updatePassword(form) {
      let notyf = useNotyf();
      let data = {
        password: form.password,
        oldpassword: form.current,
      };

      let response = await LoginService.updatePassword(data);
      switch (response.status) {
        case 422: {
          notyf.error(response.data.message);
          return false;
          break;
        }
        case 200: {
          notyf.success(response.data.message);
          return true;
          break;
        }
      }
    },
    async changeAuthorizationTwoFactor(bool) {
      let response = await LoginService.changeAuthorizationTwoFactor({
        twofa: bool,
      });
      let notyf = useNotyf();
      switch (response.status) {
        case 422: {
          notyf.error(response.data.message);
          return false;
          break;
        }
        case 200: {
          notyf.success(response.data.message);
          return true;
          break;
        }
      }
    },
  },
});
