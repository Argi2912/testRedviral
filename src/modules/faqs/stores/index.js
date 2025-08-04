import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import FaqsServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useFaqsStore = defineStore({
  id: "faqs-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      faqs: {
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
      create_update_faqs: "",
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
    async fetchFaqs(items_per_page, current_page, search) {
      let response = await FaqsServices.paginate(
        items_per_page,
        current_page,
        search
      );
      return response.data.data;
    },
    //end::modal options
    async fetchSimpleFaqsList() {
      let response = await FaqsServices.getAll();
      return response.data.data;
    },
    setSimpleFaqsList(simple_faqs_list) {
      this.items.faqs.simple_list = simple_faqs_list;
    },
    getSimpleFaqsList() {
      return this.items.faqs.simple_list;
    },
    async loadSimpleFaqsList() {
      let simple_faqs_list = await this.fetchSimpleFaqsList();
      this.setSimpleFaqsList(simple_faqs_list);
      this.items.faqs.loading_simple_list = false;
    },
    async findFaqsById(faqs_id) {
      let response = await FaqsServices.find(faqs_id);
      return response.data.data;
    },
    async createFaqs(form) {
      let data = {
        name: form.question,
        category: form.category_id,
        description: form.answer,
      };
      loadingNotif();

      let response = await FaqsServices.create(data);

      this.setFaqsList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_updatefaqs", "");
      await swal.fire({
        title: "",
        text: "Pregunta creada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },
    async updateFaqs(form, id) {
      let data = {
        name: form.question,
        category: form.category_id,
        description: form.answer,
      };
      loadingNotif();
      let response = await FaqsServices.update(data, id);

      this.setFaqsList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_updatefaqs", "");
      swal.fire({
        title: "",
        text: "Pregunta actualizada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteFaqs(id) {
      loadingNotif();
      let response = await FaqsServices.delete(id);
      this.setPagination({
        paginator: "faqs",
        current_page: 1,
      });
      this.setFaqsList();
      swal.fire({
        title: "",
        text: "Pregunta eliminada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async setFaqsList() {
      let faqs = await this.fetchFaqs(
        this.items.faqs.paginator.items_per_page,
        this.items.faqs.paginator.current_page,
        this.items.faqs.paginator.search
      );
      this.setItems("faqs", faqs.items);
      this.setPagination({
        paginator: "faqs",
        current_page: faqs.pagination.current_page,
        total_pages: Math.ceil(
          faqs.pagination.total / parseInt(faqs.pagination.per_page)
        ),
        total_items: faqs.pagination.total,
        key: ++this.items.faqs.paginator.key,
      });
      this.items.faqs.loading_list = false;
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
    async cleanSearchFilter(name) {
      let global_store = useGlobalStore();
      await global_store.cleanSearchFilter(SERVICES_ROUTE, name);
    },

    async init(route) {
      await this.cleanSearchFilter();
      if (route.meta.active_form) {
        this.setFormMode(
          route.meta.active_form.name,
          route.meta.active_form.mode
        );
        let faqs = await this.findFaqsById(route.params.id);
        this.setSelectedItem("faqs", faqs);
        this.setModalTitle("Ver datos de faqs");
        this.setModal("update_Faqs(snake_case)");
      }
      this.setFaqsList();
      this.setModuleName("Faqs");
      this.setActivePage("#list");
    },
  },
});
