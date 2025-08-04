import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import AccountsServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useAccountsStore = defineStore({
  id: "accounts-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      accounts: {
        list: [],
        simple_list: [],
        loading_list: true,
        loading_simple_list: true,
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
      create_update_accounts: "",
    },
  }),

  actions: {
    setItems(items_name, items) {
      this.items[items_name].list = items;
    },
    setModal(m) {
      this.modal = m;
    },
    setProperty(items_name, property, value) {
      this.items[items_name][property] = value;
    },
    getProperty(items_name, property) {
      return this.items[items_name][property];
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
    async fetchAccounts(items_per_page, current_page, search) {
      let response = await AccountsServices.paginate(
        items_per_page,
        current_page,
        search
      );
      return response.data.data;
    },
    async findAccountsById(accounts_id) {
      let response = await AccountsServices.find(accounts_id);
      return response.data.data;
    },
    async createAccounts(form) {
      let data = {
        name: form.name,
        url: form.url,
        network: form.social_network_id,
        is_active: form.is_active,
      };
      loadingNotif();

      let response = await AccountsServices.create(data);

      this.setAccountsList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_accounts", "");
      await swal.fire({
        title: "",
        text: "Cuenta creada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updateAccounts(form, id) {
      loadingNotif();
      let data = {
        name: form.name,
        url: form.url,
        network: form.social_network_id,
        is_active: form.is_active,
      };
      let response = await AccountsServices.update(data, id);

      this.setAccountsList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_accounts", "");
      swal.fire({
        title: "",
        text: "Cuenta actualizada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteAccounts(id) {
      loadingNotif();
      let response = await AccountsServices.delete(id);
      this.setPagination({
        paginator: "accounts",
        current_page: 1,
      });
      this.setAccountsList();
      swal.fire({
        title: "",
        text: "Cuenta eliminada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async setAccountsList() {
      let accounts = await this.fetchAccounts(
        this.items.accounts.paginator.items_per_page,
        this.items.accounts.paginator.current_page,
        this.items.accounts.paginator.search
      );
      this.setItems("accounts", accounts.items);
      this.setPagination({
        paginator: "accounts",
        current_page: accounts.pagination.current_page,
        total_pages: Math.ceil(
          accounts.pagination.total / parseInt(accounts.pagination.per_page)
        ),
        total_items: accounts.pagination.total,
        key: ++this.items.accounts.paginator.key,
      });
      this.items.accounts.loading_list = false;
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
    async fetchAccountsSimpleList() {
      let response = await AccountsServices.simpleList();
      return response.data.data;
    },
    async loadAccountsSimpleList() {
      let accounts = await this.fetchAccountsSimpleList();
      this.setProperty("accounts", "simple_list", accounts);
      this.setProperty("accounts", "loading_simple_list", false);
      //this.setProperty("accounts", "loading_list", false);
    },
    async init(route) {
      await this.cleanSearchFilter();
      if (route.meta.active_form) {
        this.setFormMode(
          route.meta.active_form.name,
          route.meta.active_form.mode
        );
        let accounts = await this.findAccountsById(route.params.id);
        this.setSelectedItem("accounts", accounts);
        this.setModalTitle("Ver datos de accounts");
        this.setModal("update_Accounts(snake_case)");
      }
      this.setAccountsList();
      this.setModuleName("Cuentas");
      this.setActivePage("#list");
    },
  },
});
