import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import ServicesRequestServices from "../services/index.js";
import { useTasksStore } from "../../../modules/tasks/stores/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useServicesRequestStore = defineStore({
  id: "services-request-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      services_request: {
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
      products: {
        simple_list: [],
        loading_simple_list: false,
      },
    },
    forms: {
      create_update_services_request: "",
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
    setSimpleList(item, list) {
      this.items[item].simple_list = list;
    },
    getSimpleList(item) {
      return this.items[item].simple_list;
    },

    getSelectedItem(item) {
      return this.items[item].selected_item;
    },
    //begin::modal options
    configModal(config) {
      console.log(config);
    },
    //end::modal options
    async fetchServicesRequest(items_per_page, current_page, search) {
      const auth_store = useAuthStore();
      let response;

      if (auth_store.getUserProperty("role") == 1) {
        response = await ServicesRequestServices.paginateForAdmin(
          items_per_page,
          current_page,
          search
        );
      } else {
        response = await ServicesRequestServices.paginate(
          items_per_page,
          current_page,
          search
        );
      }
      return response.data.data;
    },
    async findServicesRequestById(services_request_id) {
      let response = await ServicesRequestServices.find(services_request_id);
      return response.data.data;
    },

    parseSegmentation(segmentation) {
      let array = segmentation.split(",");
      return array.length > 1 ? "Global" : array[0];
    },
    async createServicesRequest(form, services) {
      const auth = useAuthStore();
      let data = {
        user: auth.user.id,
        items: form.items,
        payment_method: "Saldo",
        segmentation: form.is_global ? "Global" : form.segmentation,
        account: form.account_id,
      };
      loadingNotif();
      let service_request = await ServicesRequestServices.create(data);
      const tasks_store = useTasksStore();
      for (let i = 0; i < services.length; i++) {
        tasks_store.createTasks({
          is_global: data.segmentation == "Global" ? "si" : "no",
          service: services[i].id,
          request: service_request.data.data.id,
          name: services[i].name,
          segmentation: data.segmentation,
          account: data.account,
          value: services[i].value_percent,
          percent: services[i].percent,
          goal: form.items[i].quantity,
          delivered_goal: 0,
          date_init: "2023-01-01T23:00",
          date_end: "2023-12-01T23:00",
          state: "pendiente",
        });
      }
      this.setServicesRequestList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_services_request", "");
      await swal.fire({
        title: "",
        text: "Solicitud de servicio creada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
    },

    async updateServicesRequest(form, id) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // 	status: form.status ? 'active' : 'deleted'
      // }
      loadingNotif();
      let response = await ServicesRequestServices.update(form, id);

      this.setServicesRequestList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_services_request", "");
      swal.fire({
        title: "",
        text: "Solicitud de servicio actualizada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteServicesRequest(id) {
      loadingNotif();
      let response = await ServicesRequestServices.delete(id);
      this.setPagination({
        paginator: "services_request",
        current_page: 1,
      });
      this.setServicesRequestList();
      swal.fire({
        title: "",
        text: "Solicitud de servicio eliminada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async setServicesRequestList() {
      let services_request = await this.fetchServicesRequest(
        this.items.services_request.paginator.items_per_page,
        this.items.services_request.paginator.current_page,
        this.items.services_request.paginator.search
      );
      this.setItems("services_request", services_request.items);
      this.setPagination({
        paginator: "services_request",
        current_page: services_request.pagination.current_page,
        total_pages: Math.ceil(
          services_request.pagination.total /
            parseInt(services_request.pagination.per_page)
        ),
        total_items: services_request.pagination.total,
        key: ++this.items.services_request.paginator.key,
      });
      this.items.services_request.loading_list = false;
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
    async fetchProducts() {
      let response = await ServicesRequestServices.getAllProducts(
        this.getSelectedItem("services_request").id
      );
      return response.data.data;
    },
    async changeStateRequest() {
      const currentState = this.getSelectedItem("services_request").state;
      let state =
        currentState == "Solicitado" || currentState == "en ejecución"
          ? "Cancelado"
          : "Solicitado";

      let response = await ServicesRequestServices.changeStateRequest(
        this.getSelectedItem("services_request").id,
        { state }
      );
      this.setServicesRequestList();
      if (state == "Cancelado") {
        await swal.fire({
          title: "",
          text: "Solicitud de servicio cancelada",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Continuar",
        });
      }
      return response.data.data;
    },
    async loadProducts() {
      let products = await this.fetchProducts();
      this.setSimpleList("products", products);
    },
    async init(route) {
      await this.cleanSearchFilter();
      if (route.meta.active_form) {
        this.setFormMode(
          route.meta.active_form.name,
          route.meta.active_form.mode
        );
        let services_request = await this.findServicesRequestById(
          route.params.id
        );
        this.setSelectedItem("services_request", services_request);
        this.setActivePage("#create-update-services-request");
      } else {
        this.setActivePage("#list");
      }
      this.setServicesRequestList();
      this.setModuleName("Solicitud de servicios");
    },
  },
});
