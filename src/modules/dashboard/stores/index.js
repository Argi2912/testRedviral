import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import DashboardServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useDashboardStore = defineStore({
  id: "dashboard-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    reload_dashboard_info: 1,
    items: {
      dashboard: {
        client_info: {},
        worker_info: {},
        admin_info: {},
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
      withdraw: "",
      recharge: "",
    },
  }),

  actions: {
    setItems(items_name, items) {
      this.items[items_name].list = items;
    },
    setItem(items_name, property, value) {
      this.items[items_name][property] = value;
    },
    getItem(items_name, property) {
      return this.items[items_name][property];
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
    setProperty(property, value) {
      this[property] = value;
    },
    getProperty(property) {
      return this[property];
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
    async fetchDashboard(items_per_page, current_page, search) {
      let response = await DashboardServices.paginate(
        items_per_page,
        current_page,
        search
      );
      return response.data.data;
    },
    async findDashboardById(dashboard_id) {
      let response = await DashboardServices.find(dashboard_id);
      return response.data.data;
    },
    async createDashboard(form) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // }
      loadingNotif();

      let response = await DashboardServices.create(form);

      this.setDashboardList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_dashboard", "");
      await swal.fire({
        title: "",
        text: "========= creadx correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updateDashboard(form, id) {
      loadingNotif();
      let response = await DashboardServices.update(form, id);

      this.setDashboardList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_dashboard", "");
      swal.fire({
        title: "",
        text: "========= actualizadx correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteDashboard(id) {
      loadingNotif();
      let response = await DashboardServices.delete(id);
      this.setPagination({
        paginator: "dashboard",
        current_page: 1,
      });
      this.setDashboardList();
      swal.fire({
        title: "",
        text: "========= eliminadx correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async setDashboardList() {
      let dashboard = await this.fetchDashboard(
        this.items.dashboard.paginator.items_per_page,
        this.items.dashboard.paginator.current_page,
        this.items.dashboard.paginator.search
      );
      this.setItems("dashboard", dashboard.items);
      this.setPagination({
        paginator: "dashboard",
        current_page: dashboard.pagination.current_page,
        total_pages: Math.ceil(
          dashboard.pagination.total / parseInt(dashboard.pagination.per_page)
        ),
        total_items: dashboard.pagination.total,
        key: ++this.items.dashboard.paginator.key,
      });
      this.items.dashboard.loading_list = false;
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
    async makeTransaction(form) {
      const auth = useAuthStore();
      let data = {
        user: auth.getUser().id,
        payment_method: form.payment_method,
        operation: form.is_devolution ? "Devolución" : "Pago",
        amount: form.amount,
      };

      await DashboardServices.makeTransaction(data);
      this.setModal("");
      this.setModalTitle("");

      let form_mode = form.is_devolution ? "withdraw" : "recharge";
      this.setFormMode(form_mode, "");
      await swal.fire({
        title: "Solicitud enviada",
        text: "Un administrador revisará la transacción",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
    },

    async fetchDashboardInfo(type) {
      let response = await DashboardServices.fetchDashboardInfo(
        type,
        this.items.dashboard.paginator.items_per_page,
        this.items.dashboard.paginator.current_page
      );
      return response.data.data;
    },
    async loadDashboardInfo() {
      const auth = useAuthStore();
      let type;
      if (auth.getProperty("user").role == 1) type = 2;
      else if (auth.getProperty("user").role == 2) type = 3;
      else type = 1;
      let info = await this.fetchDashboardInfo(type);
      if (type === 1) this.setItem("dashboard", "worker_info", info);
      else if (type === 2) this.setItem("dashboard", "admin_info", info);
      else this.setItem("dashboard", "client_info", info);
    },
    async fetchMaxWorkers() {
      let response = await DashboardServices.getMaxWorkers();
      return response.data.data;
    },
    async getMaxWorkers() {
      return this.fetchMaxWorkers();
    },
    async init(route) {
      await this.cleanSearchFilter();
      if (route.meta.active_form) {
        this.setFormMode(
          route.meta.active_form.name,
          route.meta.active_form.mode
        );
        let dashboard = await this.findDashboardById(route.params.id);
        this.setSelectedItem("dashboard", dashboard);
        this.setModalTitle("Ver datos de dashboard");
        this.setModal("update_dashboard");
      }
      this.loadDashboardInfo();
      this.setModuleName("Dashboard");
      this.setActivePage("#dashboard");
    },
  },
});
