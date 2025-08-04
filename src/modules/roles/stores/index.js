import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import RolesServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useRolesStore = defineStore({
  id: "roles-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      roles: {
        list: [],
        simple_list: [],
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
      create_update_roles: "",
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
    setSimpeList(list) {
      this.items.roles.simple_list = list;
    },
    getSimpeList() {
      return this.items.roles.simple_list;
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
    async fetchRoles(items_per_page, current_page, search) {
      let response = await RolesServices.paginate(
        items_per_page,
        current_page,
        search
      );
      return response.data.data;
    },
    async findRolesById(roles_id) {
      let response = await RolesServices.find(roles_id);
      return response.data.data;
    },
    async createRoles(form) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // }
      loadingNotif();

      let response = await RolesServices.create(form);
      console.log(response);
      this.setSelectedItem("roles", response.data.data);
      this.setRolesList();

      this.setFormMode("create_update_roles", "update");

      await swal.fire({
        title: "",
        text: "Rol creado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updateRoles(form, id) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // 	status: form.status ? 'active' : 'deleted'
      // }
      loadingNotif();
      let response = await RolesServices.update(form, id);

      this.setRolesList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_roles", "");
      swal.fire({
        title: "",
        text: "Rol actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteRoles(id) {
      loadingNotif();
      let response = await RolesServices.delete(id);
      this.setPagination({
        paginator: "roles",
        current_page: 1,
      });
      this.setRolesList();
      swal.fire({
        title: "",
        text: "Rol eliminado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async fetchAllRoles() {
      let response = await RolesServices.getAll();
      return response.data.data;
    },
    async getAllRoles() {
      let all_roles = await this.fetchAllRoles();
      this.setSimpeList(all_roles);
    },

    async setRolesList() {
      let roles = await this.fetchRoles(
        this.items.roles.paginator.items_per_page,
        this.items.roles.paginator.current_page,
        this.items.roles.paginator.search
      );
      this.setItems("roles", roles.items);
      this.setPagination({
        paginator: "roles",
        current_page: roles.pagination.current_page,
        total_pages: Math.ceil(
          roles.pagination.total / parseInt(roles.pagination.per_page)
        ),
        total_items: roles.pagination.total,
        key: ++this.items.roles.paginator.key,
      });
      this.items.roles.loading_list = false;
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
    async fetchPermissions() {
      let response = await RolesServices.getPermissions();
      return response.data.data;
    },
    async getPermissions() {
      let permission = await this.fetchPermissions();
      let array = {};
      permission.map((permission) => {
        if (array[permission.group] == undefined) array[permission.group] = [];
        array[permission.group].push(permission);
      });
      return array;
    },
    async setPermissionToCurrentRol(data) {
      this.items.roles.loading_list = true;
      let _role = this.getSelectedItem("roles");
      let permission = await RolesServices.setPermission(_role.id, {
        permission: data.permission_id,
        state: data.state,
      });
      await this.setRolesList();
      this.items.roles.loading_list = false;
      // let array = {};
      // permission.map((permission) => {
      //   if (array[permission.group] == undefined) array[permission.group] = [];
      //   array[permission.group].push(permission);
      // });
      // return array;
    },
    async init(route) {
      await this.cleanSearchFilter();
      if (route.meta.active_form) {
        this.setFormMode(
          route.meta.active_form.name,
          route.meta.active_form.mode
        );
        let roles = await this.findRolesById(route.params.id);
        this.setSelectedItem("roles", roles);
        this.setActivePage("#create-update-roles");
      } else {
        this.setActivePage("#list");
      }
      this.setRolesList();
      this.setModuleName("Roles");
    },
  },
});
