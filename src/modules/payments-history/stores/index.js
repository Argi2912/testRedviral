import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import PaymentsHistoryServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const usePaymentsHistoryStore = defineStore({
  id: "payments-history-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      payments_history: {
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
      create_update_payments_history: "",
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
    async fetchPaymentsHistory(items_per_page, current_page, search) {
      let response = await PaymentsHistoryServices.paginate(
        items_per_page,
        current_page,
        search
      );
      return response.data.data;
    },
    async findPaymentsHistoryById(payments_history_id) {
      let response = await PaymentsHistoryServices.find(payments_history_id);
      return response.data.data;
    },
    async createPaymentsHistory(form) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // }
      loadingNotif();

      let response = await PaymentsHistoryServices.create(form);

      this.setPaymentsHistoryList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_payments_history", "");
      await swal.fire({
        title: "",
        text: "========= creadx correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updatePaymentsHistory(form, id) {
      loadingNotif();
      let response = await PaymentsHistoryServices.update(form, id);

      this.setPaymentsHistoryList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_payments_history", "");
      swal.fire({
        title: "",
        text: "========= actualizadx correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deletePaymentsHistory(id) {
      loadingNotif();
      let response = await PaymentsHistoryServices.delete(id);
      this.setPagination({
        paginator: "payments_history",
        current_page: 1,
      });
      this.setPaymentsHistoryList();
      swal.fire({
        title: "",
        text: "========= eliminadx correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async setPaymentsHistoryList() {
      let payments_history = await this.fetchPaymentsHistory(
        this.items.payments_history.paginator.items_per_page,
        this.items.payments_history.paginator.current_page,
        this.items.payments_history.paginator.search
      );
      this.setItems("payments_history", payments_history.items);
      this.setPagination({
        paginator: "payments_history",
        current_page: payments_history.pagination.current_page,
        total_pages: Math.ceil(
          payments_history.pagination.total /
            parseInt(payments_history.pagination.per_page)
        ),
        total_items: payments_history.pagination.total,
        key: ++this.items.payments_history.paginator.key,
      });
      this.items.payments_history.loading_list = false;
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
        let payments_history = await this.findPaymentsHistoryById(
          route.params.id
        );
        this.setSelectedItem("payments_history", payments_history);
        this.setModalTitle("Ver datos de payments_history");
        this.setModal("update_PaymentsHistory(snake_case)");
      }
      this.setPaymentsHistoryList();
      this.setModuleName("PaymentsHistory");
      this.setActivePage("#list");
    },
  },
});
