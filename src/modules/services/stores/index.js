import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import ServicesServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useServicesStore = defineStore({
  id: "services-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      services: {
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
      create_update_services: "",
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
    setProperty(items_name, property, value) {
      this.items[items_name][property] = value;
    },
    getProperty(items_name, property) {
      return this.items[items_name][property];
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

    async fetchServices(items_per_page, current_page, search) {
      let response = await ServicesServices.paginate(
        items_per_page,
        current_page,
        search
      );
      return response.data.data;
    },
    async findServicesById(services_id) {
      let response = await ServicesServices.find(services_id);
      return response.data.data;
    },
    async createServices(form) {
      let data = {
        name: form.name,
        code: form.code,
        social_network: form.social_network,
        network: form.social_network_id,
        amount: form.max_interactions,
        price: form.base_price,
        ganancia: form.gain,
        percent: form.distributed_percent,
        value_percent: form.distributed_value,
        tokens: form.tokens,
        category: form.category_id,
        description: form.description,
        photo: form.photo,
      };
      loadingNotif();

      let response = await ServicesServices.create(data);

      this.setServicesList();
      this.setSelectedItem("services", response.data.data);
      this.setFormMode("create_update_services", "update");
      await swal.fire({
        title: "",
        text: "Servicio creado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updateServices(form, id) {
      let data = {
        name: form.name,
        code: form.code,
        social_network: form.social_network,
        network: form.social_network_id,
        amount: form.max_interactions,
        price: form.base_price,
        percent: form.distributed_percent,
        value_percent: form.distributed_value,
        tokens: form.tokens,
        category: form.category_id,
        description: form.description,
        photo: form.photo,
        state: form.is_active ? "activo" : "eliminado",
      };
      loadingNotif();
      let response = await ServicesServices.update(data, id);

      this.setServicesList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_services", "");
      swal.fire({
        title: "",
        text: "Servicio actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteServices(id) {
      loadingNotif();
      let response = await ServicesServices.delete(id);
      this.setPagination({
        paginator: "services",
        current_page: 1,
      });
      this.setServicesList();
      swal.fire({
        title: "",
        text: "Servicio eliminado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async setServicesList() {
      this.items.services.loading_list = true;
      let services = await this.fetchServices(
        this.items.services.paginator.items_per_page,
        this.items.services.paginator.current_page,
        this.items.services.paginator.search
      );
      this.setItems("services", services.items);
      this.setPagination({
        paginator: "services",
        current_page: services.pagination.current_page,
        total_pages: Math.ceil(
          services.pagination.total / parseInt(services.pagination.per_page)
        ),
        total_items: services.pagination.total,
        key: ++this.items.services.paginator.key,
      });
      this.items.services.loading_list = false;
    },
    getList(items_name) {
      return this.items[items_name].list;
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
    async cleanSearchFilter(field) {
      let global_store = useGlobalStore();
      await global_store.cleanSearchFilter(SERVICES_ROUTE, field);
    },
    async init(route) {
      await this.cleanSearchFilter();
      if (route.meta.active_form) {
        this.setFormMode(
          route.meta.active_form.name,
          route.meta.active_form.mode
        );
        let services = await this.findServicesById(route.params.id);
        this.setSelectedItem("services", services);
        this.setActivePage("#create-update-services");
      } else {
        this.setActivePage("#list");
      }
      this.setServicesList();
      this.setModuleName("Servicios");
    },
  },
});
