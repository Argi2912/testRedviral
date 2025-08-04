import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import UsersServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useUsersStore = defineStore({
  id: "users-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      users: {
        list: [],
        client_details: {},
        loading_list: true,
        selected_item: {},
        selected_item_index: -1,
        paginator: {
          items_per_page: 5,
          current_page: 1,
          search: "",
          total_pages: 0,
          total_items: 0,
          key: 0,
        },
      },
    },
    forms: {
      create_update_users: "",
      transactions: "",
    },
  }),

  actions: {
    setItems(items_name, items) {
      this.items[items_name].list = items;
    },
    setModal(m) {
      this.modal = m;
    },
    setModalTitle(mt) {
      this.modal_title = mt;
    },
    setSelectedItem(items_name, item) {
      this.items[items_name].selected_item = item;
    },
    getSelectedItem(item_name) {
      return this.items[item_name].selected_item;
    },
    setSelectedItemIndex(items_name, index) {
      this.items[items_name].selected_item_index = index;
    },
    setActivePage(id) {
      this.active_page = id;
    },
    setModuleName(mn) {
      this.module_name = mn;
    },
    setPagination(settings) {
      this.items[settings.paginator].paginator.current_page =
        settings.current_page ??
        this.items[settings.paginator].paginator.current_page;
      this.items[settings.paginator].paginator.items_per_page =
        settings.items_per_page ??
        this.items[settings.paginator].paginator.items_per_page;
      this.items[settings.paginator].paginator.search =
        settings.search ?? this.items[settings.paginator].paginator.search;
      this.items[settings.paginator].paginator.total_pages =
        settings.total_pages ??
        this.items[settings.paginator].paginator.total_pages;
      this.items[settings.paginator].paginator.total_items =
        settings.total_items ??
        this.items[settings.paginator].paginator.total_items;
      this.items[settings.paginator].paginator.key =
        settings.key ?? this.items[settings.paginator].paginator.key;
    },
    setFormMode(form, mode) {
      this.forms[form] = mode;
    },
    //begin::modal options
    configModal(config) {
      console.log(config);
    },
    //end::modal options
    async fetchUsers(items_per_page, current_page, role) {
      let response = await UsersServices.paginate(
        items_per_page,
        current_page,
        role
      );
      return response.data.data;
    },
    async findUsersById(users_id) {
      let response = await UsersServices.find(users_id);
      return response.data.data;
    },

    async loadUserById(users_id) {
      let _user = await this.findUsersById(users_id);
      this.setSelectedItem("users", _user);
    },

    async createUsers(form) {
      let data = {
        name: form.name,
        lastname: form.last_name,
        email: form.email,
        phone: form.phone,
        gender: form.gender,
        country: form.country,
        city: form.city,
        password: form.password,
        is_client: form.is_client ? "si" : "no",
        role: form.role,
      };
      if (form.photo != null) {
        data.photo = form.photo;
      }
      loadingNotif();

      let response = await UsersServices.create(data);

      this.setUsersList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_users", "");
      await swal.fire({
        title: "",
        text: "Usuario creado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updateUsers(form, id) {
      loadingNotif();
      let data = {
        name: form.name,
        lastname: form.last_name,
        email: form.email,
        phone: form.phone,
        gender: form.gender,
        country: form.country,
        city: form.city,
        is_client: form.is_client ? "si" : "no",
        role: form.role,
      };
      if (form.photo != null) {
        data.photo = form.photo;
      }
      if (form.password != "") {
        data.password = form.password;
      }
      let response = await UsersServices.update(data, id);

      this.setUsersList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_users", "");
      swal.fire({
        title: "",
        text: "Usuario actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteUsers(id) {
      loadingNotif();
      let response = await UsersServices.delete(id);
      this.setPagination({
        paginator: "users",
        current_page: 1,
      });
      this.setUsersList();
      swal.fire({
        title: "",
        text: "Usuario eliminado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async setUsersList(role_id) {
      let users = await this.fetchUsers(
        this.items.users.paginator.items_per_page,
        this.items.users.paginator.current_page,
        role_id
      );
      this.setItems("users", users.items);
      this.setPagination({
        paginator: "users",
        current_page: users.pagination.current_page,
        total_pages: Math.ceil(
          users.pagination.total / parseInt(users.pagination.per_page)
        ),
        total_items: users.pagination.total,
        key: ++this.items.users.paginator.key,
      });
      this.items.users.loading_list = false;
    },
    async addSearchFilter(params) {
      let global_store = useGlobalStore();
      await global_store.addSearchFilter(
        SERVICES_ROUTE,
        params.field,
        params.value,
        params.type_search
      );
    },
    async cleanSearchFilter() {
      let global_store = useGlobalStore();
      await global_store.cleanSearchFilter(SERVICES_ROUTE);
    },
    async listUsersByRol(role) {
      this.items.users.loading_list = true;
      await this.setUsersList(role.id);
      this.items.users.loading_list = false;
    },
    async addBalance(form) {
      let current_user = this.getSelectedItem("users");
      let data = {
        amount: form.amount,
        user: current_user.id,
        operation: "Pago",
        payment_method: 'admin'
      };
      await UsersServices.addBalance(data);
      await swal.fire({
        title: "",
        text: "Saldo agregado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("transasctions", "");
      this.setSelectedItem("users", {});
      this.setSelectedItemIndex("users", -1);
      this.setUsersList();
    },
    async devolution(form) {
      let current_user = this.getSelectedItem("users");
      let data = {
        amount: form.amount,
        user: current_user.id,
        operation: "Devolución",
      };
      await UsersServices.devolution(data);
      await swal.fire({
        title: "",
        text: "Retiro realizado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("transasctions", "");
      this.setSelectedItem("users", {});
      this.setSelectedItemIndex("users", -1);
      this.setUsersList();
    },
    setClientDetails(client_details) {
      this.items.users.client_details = client_details;
    },
    getClientDetails(detail) {
      return this.items.users.client_details[detail];
    },
    async loadClientDetails() {
      let response = await UsersServices.getClientDetails(
        this.items.users.selected_item.id
      );
      console.log(response);

      this.setClientDetails({
        active_services: response.data.data.a_service,
        canceled_services: response.data.data.c_service,
        active_accounts: response.data.data.a_account,
        total_accounts: response.data.data.t_account,
      });
    },
    async init(route) {
      await this.cleanSearchFilter();
      if (route.meta.active_form) {
        let users = await this.findUsersById(route.params.id);
        console.log(users);
        this.setSelectedItem("users", users);
        this.setModalTitle("Ver datos de users");
        this.setFormMode(
          route.meta.active_form.name,
          route.meta.active_form.mode
        );
        this.setModal("update_users");
      }
      this.setPagination({
        paginator: "users",
        current_page: 1,
      });
      this.setUsersList();
      this.setModuleName("Usuarios");
      this.setActivePage("#list");
    },
  },
});
