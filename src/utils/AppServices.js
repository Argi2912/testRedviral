import axios from "axios";
import { objectToQuery, validateRequestStatus, getApiUrl } from "./Functions";
import { useAuthStore } from "../modules/auth/stores/store.js";
import useNotyf from "@/composables/useNotyf.js";

const URL = getApiUrl();

export const catchServerError = (response) => {
  switch (response.status) {
    case 401: {
      let auth = useAuthStore();
      auth.logOut();
      break;
    }
    case 403: {
      throw "Error: 403. " + response.status;
      break;
    }
    default: {
      let notyf = useNotyf();
      notyf.error("Ha ocurrido un error inesperado. Contacte con soporte");
      throw "Internl server error. Error: " + response.status;
    }
  }
};
export const AppServices = {
  addSearchFilter: async (data) => {
    let auth = useAuthStore();

    let response = await Http.post({
      route: "/search",
      data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
    return response;
  },
  getSearchFilter: async (data) => {
    let auth = useAuthStore();

    let response = await Http.post({
      route: "/search/getlist",
      data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
    return response;
  },
  cleanSearchFilter: async (data) => {
    let auth = useAuthStore();
    let response = await Http.post({
      route: "/search/clear",
      data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
    return response;
  },
};

export const Http = {
  post: async (params) => {
    console.log(params.data);
    try {
      let response = await axios.post(URL + params.route, params.data ?? {}, {
        headers: params.headers,
      });
      return validateRequestStatus(response);
    } catch (e) {
      console.log(e);
      catchServerError(e.response);
    }
  },
  get: async (params) => {
    let _query = "";
    if (params.query) _query = objectToQuery(params.query);

    try {
      let response = await axios.get(URL + params.route + _query, {
        headers: params.headers,
      });
      console.log(response);
      return validateRequestStatus(response);
    } catch (e) {
      console.log(e);
      catchServerError(e.response);
      return e.response;
    }
  },
  put: async (params) => {
    try {
      let response = await axios.put(URL + params.route, params.data, {
        headers: params.headers,
      });
      return validateRequestStatus(response);
    } catch (e) {
      console.log(e);
      catchServerError(e.response);
      return e.response;
    }
  },
  patch: async (params) => {
    try {
      let response = await axios.patch(URL + params.route, params.data, {
        headers: params.headers,
      });
      return validateRequestStatus(response);
    } catch (e) {
      console.log(e);
      catchServerError(e.response);
      return e.response;
    }
  },
  delete: async (params) => {
    try {
      let response = await axios.delete(URL + params.route, {
        headers: params.headers,
      });
      return validateRequestStatus(response);
    } catch (e) {
      console.log(e);
      catchServerError(e.response);
      return e.response;
    }
  },
};
