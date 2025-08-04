import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import ComissionsServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useComissionsStore = defineStore({
  id: "comissions-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      comissions: {
        list: [],
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
      create_update_comissions: "",
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
    async fetchComissions(items_per_page, current_page, search) {
      let response = await ComissionsServices.paginate(
        items_per_page,
        current_page,
        search
      );
      return response.data.data;
    },
    async findComissionsById(comissions_id) {
      let response = await ComissionsServices.find(comissions_id);
      return response.data.data;
    },
    async createComissions(form) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // }
      loadingNotif();

      let response = await ComissionsServices.create(form);

      this.setComissionsList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_comissions", "");
      await swal.fire({
        title: "",
        text: "Comision creada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updateComissions(form, id) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // 	status: form.status ? 'active' : 'deleted'
      // }
      loadingNotif();
      let response = await ComissionsServices.update(form, id);

      this.setComissionsList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_comissions", "");
      swal.fire({
        title: "",
        text: "Comision actualizada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteComissions(id) {
      loadingNotif();
      let response = await ComissionsServices.delete(id);
      this.setPagination({
        paginator: "comissions",
        current_page: 1,
      });
      this.setComissionsList();
      swal.fire({
        title: "",
        text: "Comision eliminada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async setComissionsList() {
      let comissions = await this.fetchComissions(
        this.items.comissions.paginator.items_per_page,
        this.items.comissions.paginator.current_page,
        this.items.comissions.paginator.search
      );
      this.setItems("comissions", comissions.items);
      this.setPagination({
        paginator: "comissions",
        current_page: comissions.pagination.current_page,
        total_pages: Math.ceil(
          comissions.pagination.total / parseInt(comissions.pagination.per_page)
        ),
        total_items: comissions.pagination.total,
        key: ++this.items.comissions.paginator.key,
      });
      this.items.comissions.loading_list = false;
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
    async init(route) {
      await this.cleanSearchFilter();
      if (route.meta.active_form) {
        this.setFormMode(
          route.meta.active_form.name,
          route.meta.active_form.mode
        );
        let comissions = await this.findComissionsById(route.params.id);
        this.setSelectedItem("comissions", comissions);
        this.setActivePage("#create-update-comissions");
      } else {
        this.setActivePage("#list");
      }
      this.setComissionsList();
      this.setModuleName("Comissions");
    },
  },
});
