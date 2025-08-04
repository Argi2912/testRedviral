import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import {
  social_networks_methods,
  social_networks_properties,
} from "./social_networks.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useSocialNetworksStore = defineStore({
  id: "social-networks-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      ...social_networks_properties,
    },
    forms: {
      create_update_social_networks: "",
    },
  }),

  actions: {
    setList(items_name, items) {
      this.items[items_name].list = items;
    },

    getList(items_name) {
      return this.items[items_name].list;
    },
    setSimpleList(items_name, items) {
      this.items[items_name].simple_list = items;
    },

    getSimpleList(items_name) {
      return this.items[items_name].simple_list;
    },
    setProperty(items_name, property, value) {
      this.items[items_name][property] = value;
    },
    getProperty(items_name, property) {
      return this.items[items_name][property];
    },
    setModal(m) {
      this.modal = m;
    },
    getModal() {
      return this.modal;
    },
    setModalTitle(mt) {
      this.modal_title = mt;
    },
    getModalTitle() {
      return this.modal_title;
    },
    setSelectedItem(items_name, item) {
      this.items[items_name].selected_item = item;
    },
    getSelectedItem(items_name) {
      return this.items[items_name].selected_item;
    },
    setSelectedItemIndex(items_name, index) {
      this.items[items_name].selected_item_index = index;
    },
    getSelectedItemIndex(items_name) {
      return this.items[items_name].selected_item_index;
    },
    setActivePage(id) {
      this.active_page = id;
    },
    getActivePage(id) {
      return this.active_page;
    },
    setModuleName(mn) {
      this.module_name = mn;
    },
    getModuleName() {
      return this.module_name;
    },
    setPagination(paginator, settings) {
      this.items[paginator].paginator.current_page =
        settings.current_page ?? this.items[paginator].paginator.current_page;
      this.items[paginator].paginator.items_per_page =
        settings.items_per_page ??
        this.items[paginator].paginator.items_per_page;
      this.items[paginator].paginator.search =
        settings.search ?? this.items[paginator].paginator.search;
      this.items[paginator].paginator.total_pages =
        settings.total_pages ?? this.items[paginator].paginator.total_pages;
      this.items[paginator].paginator.total_items =
        settings.total_items ?? this.items[paginator].paginator.total_items;
      this.items[paginator].paginator.key =
        settings.key ?? this.items[paginator].paginator.key;
    },
    getPagination(paginator) {
      return {
        current_page: this.items[paginator].paginator.current_page,
        items_per_page: this.items[paginator].paginator.items_per_page,
        search: this.items[paginator].paginator.search,
        total_pages: this.items[paginator].paginator.total_pages,
        total_items: this.items[paginator].paginator.total_items,
        key: this.items[paginator].paginator.key,
      };
    },
    setFormMode(form, mode) {
      this.forms[form] = mode;
    },
    getFormMode(form) {
      return this.forms[form];
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
    ...social_networks_methods,
    async init(route) {
      await this.cleanSearchFilter();
      if (route.meta.active_form) {
        this.setFormMode(
          route.meta.active_form.name,
          route.meta.active_form.mode
        );
        let social_networks = await this.findSocialNetworksById(
          route.params.id
        );
        this.setSelectedItem("social_networks", social_networks);
        this.setModalTitle("Ver datos de social_networks");
        this.setModal("update_social_network");
      }
      this.loadSocialNetworksList();
      this.setModuleName("Redes sociales");
      this.setActivePage("#list");
    },
  },
});
