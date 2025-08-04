import { defineStore } from "pinia";
import { useGlobalStore } from "@/stores/GlobalStore.js";
import { SERVICES_ROUTE } from "../config/config.js";
import useNotyf from "@/composables/useNotyf.js";
import TasksServices from "../services/index.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";

const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const useTasksStore = defineStore({
  id: "tasks-store",
  state: () => ({
    module_name: "",
    active_page: "",
    modal: "",
    modal_title: "",
    items: {
      tasks: {
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
      completedTasks: {
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
      create_update_tasks: "",
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

    simularCompletado(task) {
      const auth_store = useAuthStore();
      let data = {
        user: auth_store.getUserProperty("id"),
        task: task.id,
        name: "Completado",
        state: "completado",
      };
      TasksServices.simularCompletado(data);
    },

    configModal(config) {
      console.log(config);
    },

    async fetchTasks(items_per_page, current_page, global) {
      const auth_store = useAuthStore();
      let _admin = auth_store.user.role == 1 ? "yes" : "no";
      let _user = auth_store.user.role == 2 ? "personal" : "all";
      let response = await TasksServices.paginate(
        items_per_page,
        current_page,
        _admin,
        _user,
        global
      );

      return response.data.data;
    },

    async findTasksById(tasks_id) {
      let response = await TasksServices.find(tasks_id);
      return response.data.data;
    },

    async createTasks(form) {
      // let data = {
      // 	name: form.name,
      // 	type_category: form.type,
      // 	description: form.description,
      // }
      //loadingNotif();

      let response = await TasksServices.create(form);

      //   this.setTasksList();
      //   this.setModal("");
      //   this.setModalTitle("");
      //   this.setFormMode("create_update_tasks", "");
      // await swal
      // .fire({
      // 	title: "",
      // 	text: 'Tarea creada correctamente',
      // 	icon: "success",
      // 	confirmButtonColor: "#3085d6",
      // 	confirmButtonText: "Continuar",
      // })

      return response.data.data;
    },

    async updateTasks(form, id) {
      loadingNotif();
      let response = await TasksServices.update(form, id);

      await this.setTasksList();
      this.setModal("");
      this.setModalTitle("");
      this.setFormMode("create_update_tasks", "");
      swal.fire({
        title: "",
        text: "Tarea actualizada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async deleteTasks(id) {
      loadingNotif();
      let response = await TasksServices.delete(id);
      this.setPagination({
        paginator: "tasks",
        current_page: 1,
      });
      await this.setTasksList();
      swal.fire({
        title: "",
        text: "Tarea eliminada correctamente",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continuar",
      });
      return response.data.data;
    },

    async setTasksList(segmentation, completed = false) {
      try {
        let { tasks, tasks_completed, tasks_pending } = await this.fetchTasks(
          this.items.tasks.paginator.items_per_page,
          this.items.tasks.paginator.current_page,
          segmentation
        );


        if (!completed) {
          this.setItems("tasks", tasks.items);
          this.setPagination({
            paginator: "tasks",
            current_page: tasks.pagination.current_page,
            total_pages: Math.ceil(
              tasks.pagination.total / parseInt(tasks.pagination.per_page)
            ),
            total_items: tasks.pagination.total,
            key: ++this.items.tasks.paginator.key,
          });

        } else {
          this.setItems("tasks", tasks_completed.items);
          this.setPagination({
            paginator: "tasks",
            current_page: tasks_completed.pagination.current_page,
            total_pages: Math.ceil(
              tasks_completed.pagination.total / parseInt(tasks_completed.pagination.per_page)
            ),
            total_items: tasks_completed.pagination.total,
            key: ++this.items.tasks.paginator.key,
          });
        }

      
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        this.items.tasks.loading_list = false;
      }
    },
    async loadCompletedTasks() {
      const auth_store = useAuthStore();
      let user = auth_store.getUserProperty("role") == 3 ? "log" : "all";
      TasksServices.completedTasks(
        this.items.completedTasks.paginator.items_per_page,
        this.items.completedTasks.paginator.current_page,
        user
      );
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
        let tasks = await this.findTasksById(route.params.id);
        this.setSelectedItem("tasks", tasks);
        this.setModalTitle("Ver datos de tasks");
        this.setModal("update_tasks");
      }
      this.setTasksList("all");
      this.setModuleName("Tasks");
      this.setActivePage("#list");
    },
  },
});
