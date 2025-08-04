import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import SupportTicketServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useSupportTicketStore = defineStore({
  id: "support-ticket-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      support_ticket: {
        list: [],
        loading_list: true,
        found_item: {},
        loading_found_item: true,
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
      create_update_support_ticket: "",
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
    async fetchSupportTicket(items_per_page, current_page, search) {
      let response;
      const auth_store = useAuthStore();
      let type = auth_store.getProperty("user").role == 1 ? "all" : "only";
      response = await SupportTicketServices.paginate(
        items_per_page,
        current_page,
        type
      );

      return response.data.data;
    },
    async fetchSupportTicketById(support_ticket_id) {
      let response = await SupportTicketServices.find(support_ticket_id);
      return response.data.data;
    },
    async loadSupportTicketById(support_ticket_id) {
      this.items.support_ticket.found_item = await this.fetchSupportTicketById(
        support_ticket_id
      );
      this.items.support_ticket.loading_found_item = false;
    },
    async replySupportTicket(form_state, _support_ticket_id) {
      let response = await SupportTicketServices.replySupportTicket(
        form_state,
        _support_ticket_id
      );
      this.setSupportTicketList();
      return response.data.data;
    },

    async createSupportTicket(form) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // }
      loadingNotif();

      let response = await SupportTicketServices.create(form);

      this.setSupportTicketList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_support_ticket", "");
      await swal.fire({
        title: "",
        text: "Ticket creado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updateSupportTicket(form, id) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // 	status: form.status ? 'active' : 'deleted'
      // }
      loadingNotif();
      let response = await SupportTicketServices.update(form, id);

      this.setSupportTicketList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_support_ticket", "");
      swal.fire({
        title: "",
        text: "Ticket actualizado correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteSupportTicket() {
      loadingNotif();
      console.log(this.items.support_ticket.selected_item);
      let response = await SupportTicketServices.delete(
        this.items.support_ticket.selected_item.id
      );
      this.setPagination({
        paginator: "support_ticket",
        current_page: 1,
      });
      this.setSupportTicketList();
      swal.fire({
        title: "Ticket de soporte cerrado correctamente.",
        text: "Esperamos haberlo ayudado",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
    },

    async setSupportTicketList() {
      let support_ticket = await this.fetchSupportTicket(
        this.items.support_ticket.paginator.items_per_page,
        this.items.support_ticket.paginator.current_page,
        this.items.support_ticket.paginator.search
      );
      this.setItems("support_ticket", support_ticket.items);
      this.setPagination({
        paginator: "support_ticket",
        current_page: support_ticket.pagination.current_page,
        total_pages: Math.ceil(
          support_ticket.pagination.total /
            parseInt(support_ticket.pagination.per_page)
        ),
        total_items: support_ticket.pagination.total,
        key: ++this.items.support_ticket.paginator.key,
      });
      this.items.support_ticket.loading_list = false;
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
        let support_ticket = await this.fetchSupportTicketById(route.params.id);
        this.setSelectedItem("support_ticket", support_ticket);
        this.setActivePage("#create-update-support-ticket");
      } else {
        this.setActivePage("#list");
      }
      this.setSupportTicketList();
      this.setModuleName("SupportTicket");
    },
  },
});
