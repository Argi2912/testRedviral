import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import CategoriesServices from "../services/index.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useCategoriesStore = defineStore({
  id: "categories-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      categories: {
        list: [],
        simple_list: [],
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
      create_update_categories: "",
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
    async setList(list, current_page, items_per_page) {
      this.items[list];
    },
    async setSimpleList(list) {
      this.items[list];
    },
    setFormMode(form, mode) {
      this.forms[form] = mode;
    },
    //begin::modal options
    configModal(config) {
      console.log(config);
    },
    //end::modal options
    async fetchCategories(items_per_page, current_page, search) {
      let response = await CategoriesServices.paginate(
        items_per_page,
        current_page,
        search
      );
      return response.data.data;
    },
    async findCategoriesById(categories_id) {
      let response = await CategoriesServices.find(categories_id);
      return response.data.data;
    },
    async createCategories(form) {
      loadingNotif();
      let data = {
        name: form.name,
        type_category: form.category_type == "service" ? "Servicio" : "FAQS",
        description: form.description,
        status: "active",
        icon: form.string_icon,
        photo:
          form.string_icon == null || form.string_icon == ""
            ? form.file_icon.name == undefined
              ? null
              : form.file_icon
            : null,
      };

      let response = await CategoriesServices.create(data);

      this.setCategoriesList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_categories", "");
      await swal.fire({
        title: "",
        text: "Categoría creada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });

      return response.data.data;
    },

    async updateCategories(form, id) {
      loadingNotif();
      console.log(form);

      let data = {
        name: form.name,
        type_category: form.category_type == "service" ? "Servicio" : "FAQS",
        description: form.description,
        status: "active",
        icon: form.string_icon,
        photo:
          form.string_icon == null || form.string_icon == ""
            ? form.file_icon
            : null,
      };
      let response = await CategoriesServices.update(data, id);

      this.setCategoriesList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_categories", "");
      swal.fire({
        title: "",
        text: "Cetegoría actualizada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async deleteCategories(id) {
      loadingNotif();
      let response = await CategoriesServices.delete(id);
      this.setPagination({
        paginator: "categories",
        current_page: 1,
      });
      this.setCategoriesList();
      swal.fire({
        title: "",
        text: "Categoría eliminada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },
    async setSimpleCategoryList() {
      let categories = await CategoriesServices.getAll();
      this.items.categories.simple_list = categories.data.data;
    },
    getAllCategories() {
      return this.items.categories.simple_list;
    },
    async setCategoriesList() {
      let categories = await this.fetchCategories(
        this.items.categories.paginator.items_per_page,
        this.items.categories.paginator.current_page
      );
      this.setItems("categories", categories.items);
      this.setPagination({
        paginator: "categories",
        current_page: categories.pagination.current_page,
        total_pages: Math.ceil(
          categories.pagination.total / parseInt(categories.pagination.per_page)
        ),
        total_items: categories.pagination.total,
        key: ++this.items.categories.paginator.key,
      });
      this.items.categories.loading_list = false;
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
        let categories = await this.findCategoriesById(route.params.id);
        this.setSelectedItem("categories", categories);
        this.setModalTitle("Ver datos de categories");
        this.setModal("update_Categories(snake_case)");
      }
      this.setCategoriesList();
      this.setModuleName("Categorías");
      this.setActivePage("#list");
    },
  },
});
