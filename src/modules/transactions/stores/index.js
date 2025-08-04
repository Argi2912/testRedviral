import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import TransactionsServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useTransactionsStore = defineStore({
  id: "transactions-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      transactions: {
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
      create_update_transactions: "",
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
      console.log(settings);
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
    async fetchTransactions(items_per_page, current_page, search) {
      let response = await TransactionsServices.paginate(
        items_per_page,
        current_page,
        search
      );
      return response.data.data;
    },
    async findTransactionsById(transactions_id) {
      let response = await TransactionsServices.find(transactions_id);
      return response.data.data;
    },
    async createTransactions(form) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // }
      loadingNotif();

      let response = await TransactionsServices.create(form);

      this.setTransactionsList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_transactions", "");
      await swal.fire({
        title: "",
        text: "Transaccion creada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updateTransactions(form, id) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // 	status: form.status ? 'active' : 'deleted'
      // }
      loadingNotif();
      let response = await TransactionsServices.update(form, id);

      this.setTransactionsList();

      swal.fire({
        title: "",
        text: "Transaccion actualizada",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async rayzarPayment(form, id) {
      loadingNotif();
      let response = await TransactionsServices.rayzarPayment(form, id);
      this.setTransactionsList();
      swal.fire({
        title: "",
        text: "Transaccion actualizada",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async markAsPaid(id) {
      loadingNotif();
      let response = await TransactionsServices.markAsPaid(id);
      this.setPagination({
        paginator: "transactions",
        current_page: 1,
      });
      this.setTransactionsList();
      swal.fire({
        title: "",
        text: "Transaccion eliminada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async loadUserTransactionsList(user_id) {
      let transactions = await TransactionsServices.getUserTransactions(
        this.items.transactions.paginator.items_per_page,
        this.items.transactions.paginator.current_page,
        user_id
      );
      this.setItems("transactions", transactions.data.data.items);
      this.setPagination({
        paginator: "transactions",
        current_page: transactions.data.data.pagination.current_page,
        total_pages: Math.ceil(
          transactions.data.data.pagination.total /
            parseInt(transactions.data.data.pagination.per_page)
        ),
        total_items: transactions.data.data.pagination.total,
        key: ++this.items.transactions.paginator.key,
      });
      this.items.transactions.loading_list = false;
    },
    async setTransactionsList() {
      const auth = useAuthStore();
      let transactions;
      if (auth.user.role == 1) {
        transactions = await TransactionsServices.getAdminTransactions(
          this.items.transactions.paginator.items_per_page,
          this.items.transactions.paginator.current_page,
          this.items.transactions.paginator.search
        );
      } else {
        transactions = await TransactionsServices.getClientTransactions(
          this.items.transactions.paginator.items_per_page,
          this.items.transactions.paginator.current_page,
          this.items.transactions.paginator.search
        );
      }
      this.setItems("transactions", transactions.data.data.items);
      this.setPagination({
        paginator: "transactions",
        current_page: transactions.data.data.pagination.current_page,
        total_pages: Math.ceil(
          transactions.data.data.pagination.total /
            parseInt(transactions.data.data.pagination.per_page)
        ),
        total_items: transactions.data.data.pagination.total,
        key: ++this.items.transactions.paginator.key,
      });
      this.items.transactions.loading_list = false;

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
        let transactions = await this.findTransactionsById(route.params.id);
        this.setSelectedItem("transactions", transactions);
        this.setActivePage("#create-update-transactions");
      } else {
        this.setActivePage("#list");
      }
      this.setTransactionsList();
      this.setModuleName("Transacciones");
    },
  },
});
