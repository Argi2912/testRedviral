<template>
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <div id="kt_app_content_container" class="app-container container-xxl">
      <div
        id="kt_app_toolbar"
        class="app-toolbar align-items-center justify-content-between py-2 py-lg-6 mb-6"
      >
        <div
          class="d-flex flex-grow-1 flex-stack flex-wrap gap-2 mb-n10"
          id="kt_toolbar"
        >
          <div
            class="page-title d-flex flex-column justify-content-center me-3"
          >
            <h1
              class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center me-3 my-0"
            >
              {{ tasks_store.module_name }}
            </h1>

            <ul
              class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
            >
              <li class="breadcrumb-item text-muted">
                <a class="text-muted text-hover-primary">{{
                  tasks_store.module_name
                }}</a>
              </li>

              <li class="breadcrumb-item">
                <span class="bullet bg-gray-400 w-5px h-2px"></span>
              </li>

              <li class="breadcrumb-item text-dark">Lista</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="card mb-6 mb-xl-9">
        <div class="card-body pt-9 pb-0">
          <div class="d-flex flex-wrap flex-sm-nowrap mb-6">
            <div
              class="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4"
            >
              <img
                class="mw-50px mw-lg-75px"
                src="/assets/media/logos/icono.svg"
                alt="image"
              />
            </div>

            <div class="flex-grow-1">
              <div
                class="d-flex justify-content-between align-items-start flex-wrap mb-2"
              >
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center mb-1">
                    <a
                      href="#"
                      class="text-gray-800 text-hover-primary fs-2 fw-bold me-3"
                      >Gestión de tareas</a
                    >
                  </div>

                  <div
                    class="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400"
                  >
                    Bienvenid@ al panel de control de las tareas a realizar
                  </div>
                </div>
              </div>

              <div class="d-flex flex-wrap justify-content-start">
                <div class="d-flex flex-wrap">
                  <div
                    class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                    v-if="auth_store.getProperty('user').role == 2"
                  >
                    <div class="d-flex align-items-center">
                      <div class="fs-4 fw-bold">
                        {{
                          numberToCurrency(
                            "COP",
                            auth_store.getProperty("user_data").balance
                          )
                        }}
                      </div>
                    </div>

                    <div class="fw-semibold fs-6 text-gray-400">Balance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="separator"></div>

          <ul
            class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold"
          >
            <li class="nav-item">
              <a
                @click="changeTab('new')"
                class="nav-link text-active-primary clickable py-5 me-6"
                :class="[tab == 'new' && 'active']"
                >Todas las tareas</a
              >
            </li>

            <li class="nav-item">
              <a
                @click="changeTab('done')"
                class="nav-link text-active-primary clickable py-5 me-6"
                :class="[tab == 'done' && 'active']"
                >Tareas completadas</a
              >
            </li>
            <!-- li class="nav-item">
              <a
                @click="changeTab('history')"
                class="nav-link text-active-primary clickable py-5 me-6"
                :class="[tab == 'history' && 'active']"
                >Historial de tareas</a
              >
            </li> -->
          </ul>
        </div>
      </div>

      <div class="d-flex flex-wrap flex-stack pb-7">
        <div class="d-flex flex-wrap align-items-center my-1">
          <h3 class="fw-bold me-5 my-1">
            Tareas ({{tasks_store.items.tasks.paginator.total_items}})
          </h3>

          <div class="d-flex align-items-center position-relative my-1"></div>
        </div>

        <div class="d-flex flex-wrap my-1">
          <ul class="nav nav-pills me-6 mb-2 mb-sm-0" role="tablist">
            <li
              class="nav-item m-0"
              role="presentation"
              @click="listType('blocks')"
            >
              <a
                class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary me-3 active"
                data-bs-toggle="tab"
                href="#kt_project_users_card_pane"
                aria-selected="true"
                role="tab"
              >
                <span class="svg-icon svg-icon-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                    >
                      <rect
                        x="5"
                        y="5"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <rect
                        x="14"
                        y="5"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      ></rect>
                      <rect
                        x="5"
                        y="14"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      ></rect>
                      <rect
                        x="14"
                        y="14"
                        width="5"
                        height="5"
                        rx="1"
                        fill="currentColor"
                        opacity="0.3"
                      ></rect>
                    </g>
                  </svg>
                </span>
              </a>
            </li>
            <li class="nav-item m-0" role="presentation">
              <a
                @click="listType('inline')"
                class="btn btn-sm btn-icon btn-light btn-color-muted btn-active-primary"
                data-bs-toggle="tab"
                href="#kt_project_users_table_pane"
                aria-selected="false"
                tabindex="-1"
                role="tab"
              >
                <span class="svg-icon svg-icon-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </a>
            </li>
          </ul>

          <div
            class="d-flex my-0"
            v-if="auth_store.getUserProperty('role') == 3"
          >
            <select
              class="form-select form-select-sm border-body bg-body w-150px me-5"
              v-model="segmentation"
            >
              <option value="All">Global</option>
              <option value="Local">Local</option>
            </select>
          </div>
        </div>
      </div>
      <Forbidden
        show-image
        v-if="tab != 'history'"
        text="No tiene permiso para listar las tareas."
        :permission-tag="'list_tasks'"
        :user-permissions="auth_store.getProperty('role').permissions"
      >
        <Hoping :loading="tasks_store.items.tasks.loading_list">
          <ShowResults
            show-image
            width="400"
            :results="tasks_store.items.tasks.list.length > 0"
            :width="300"
          >
            <div
              class="row row-cols-1 row-cols-md-4"
              v-if="list_type == 'blocks'"
            >
              <div
                class="col-md-6 col-xl-4 mb-5"
                v-for="(tasks, i) in tasks_store.items.tasks.list"
                :key="'task_' + i"
              >
                <ClientTaskCard
                  v-if="auth_store.getProperty('user').role == 2"
                  :task="tasks"
                />
                <AdminTaskCard v-else :task="tasks" />
              </div>
            </div>

            <div class="card card-flush" v-else>
              <div class="card-body pt-3">
                <div
                  id="kt_profile_overview_table_wrapper"
                  class="dataTables_wrapper dt-bootstrap4 no-footer"
                >
                  <div class="table-responsive">
                    <table
                      id="kt_profile_overview_table"
                      class="table table-row-bordered table-row-dashed gy-4 align-middle fw-bold dataTable no-footer"
                    >
                      <thead class="fs-7 text-gray-400 text-uppercase">
                        <tr>
                          <th
                            class="min-w-90px sorting"
                            tabindex="0"
                            aria-controls="kt_profile_overview_table"
                            rowspan="1"
                            colspan="1"
                            aria-label="Target: activate to sort column ascending"
                            style="width: 0px"
                          >
                            Cliente
                          </th>
                          <th
                            class="min-w-90px sorting"
                            tabindex="0"
                            aria-controls="kt_profile_overview_table"
                            rowspan="1"
                            colspan="1"
                            aria-label="Section: activate to sort column ascending"
                            style="width: 0px"
                          >
                            Tarea
                          </th>
                          <th
                            class="min-w-90px sorting"
                            tabindex="0"
                            aria-controls="kt_profile_overview_table"
                            rowspan="1"
                            colspan="1"
                            aria-label="Due Date: activate to sort column ascending"
                            style="width: 0px"
                          >
                            Segmentación
                          </th>
                          <th
                            class="min-w-90px sorting"
                            tabindex="0"
                            aria-controls="kt_profile_overview_table"
                            rowspan="1"
                            colspan="1"
                            aria-label="Members: activate to sort column ascending"
                            style="width: 0px"
                          >
                            Valor
                          </th>
                          <th
                            class="min-w-90px sorting"
                            tabindex="0"
                            aria-controls="kt_profile_overview_table"
                            rowspan="1"
                            colspan="1"
                            aria-label="Members: activate to sort column ascending"
                            style="width: 0px"
                          >
                            Completado
                          </th>
                          <th
                            class="min-w-90px sorting"
                            tabindex="0"
                            aria-controls="kt_profile_overview_table"
                            rowspan="1"
                            colspan="1"
                            aria-label="Status: activate to sort column ascending"
                            style="width: 0px"
                          >
                            Status
                          </th>
                          <th
                            class="min-w-90px sorting"
                            tabindex="0"
                            aria-controls="kt_profile_overview_table"
                            rowspan="1"
                            colspan="1"
                            aria-label="Status: activate to sort column ascending"
                            style="width: 0px"
                          >
                            Fecha
                          </th>
                          <!-- <th
                          class="text-end"
                          tabindex="0"
                          aria-controls="kt_profile_overview_table"
                          rowspan="1"
                          colspan="1"
                          aria-label="Status: activate to sort column ascending"
                          style="width: 0px"
                        >
                          Opciones
                        </th> -->
                        </tr>
                      </thead>

                      <tbody class="fs-6">
                        <tr
                          class="odd"
                          v-for="(task, i) in tasks_store.items.tasks.list"
                          :key="'list_task_' + i"
                        >
                          <td class="fw-bold">
                            <a
                              href="#"
                              class="text-gray-900 text-hover-primary"
                            >
                              <div
                                class="symbol symbol-25px symbol-circle"
                                data-bs-toggle="tooltip"
                                aria-label="Melody Macy"
                                data-bs-original-title="Melody Macy"
                                data-kt-initialized="1"
                              >
                                <img alt="Pic" :src="task.user.photo" />
                              </div>
                              {{ task.user.name }} {{ task.user.lastname }}
                            </a>
                          </td>
                          <td data-order="Invalid date">
                            {{ task.service.name }}
                          </td>
                          <td>
                            {{
                              services_requests_store.parseSegmentation(
                                task.segmentation
                              )
                            }}
                          </td>
                          <td>
                            {{ numberToCurrency("COP", task.service.price) }}
                          </td>
                          <td>
                            {{
                              deliveredPercent(task.delivered_goal, task.goal)
                            }}
                          </td>
                          <td>
                            <Badge :text="task.state" :background="'blue'" />
                          </td>
                          <td>{{ parseDate(task.created_at) }}</td>
                          <!-- <td class="text-end">
                          <a
                            href="#"
                            class="btn btn-bg-light btn-active-color-primary btn-sm"
                            >Seguir</a
                          >
                        </td> -->
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="row">
                    <div
                      class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"
                    ></div>
                    <div
                      class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div style="float: right" class="my-4">
              <Paginator
                v-if="
                  Math.ceil(tasks_store.items.tasks.paginator.total_pages) > 1
                "
                :key="tasks_store.items.tasks.paginator.key"
                @onChangePage="onChangePage"
                :items-per-page="
                  tasks_store.items.tasks.paginator.items_per_page
                "
                :max-buttons="5"
                :total-items="tasks_store.items.tasks.paginator.total_items"
                :total-pages="
                  Math.ceil(tasks_store.items.tasks.paginator.total_pages)
                "
                :current-page="tasks_store.items.tasks.paginator.current_page"
              />
            </div>
          </ShowResults>
        </Hoping>
      </Forbidden>
      <div v-else>asdf</div>
    </div>
  </div>
</template>
<script setup>
import { useTasksStore } from "../stores/index.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import TasksForm from "./TasksForm.vue";
import AdminTaskCard from "../components/AdminTasksCard.vue";
import ClientTaskCard from "../components/ClientTasksCard.vue";
import Paginator from "@/components/paginator/Paginator.vue";
import { parseDate, cutText, numberToCurrency } from "@/utils/Functions.js";
import { inject, onMounted, ref, watchEffect, computed } from "vue-demi";
import { confirm } from "@/utils/Swals.js";
import { useServicesRequestStore } from "@/modules/services-request/stores/index.js";

const auth_store = useAuthStore();
const emit = defineEmits(["onDisplayPage"]);
let tab = ref("new");
const setTab = (new_tab) => {
  tab.value = new_tab;
};
const filterByTab = async (tab) => {
  tasks_store.items.tasks.loading_list = true;
  if (tab == "done") {
    await tasks_store.addSearchFilter({
      field: "state",
      value: "completado",
    });
    await tasks_store.setTasksList(segmentation.value.toLocaleLowerCase(), true);
  } else {
    await tasks_store.cleanSearchFilter("state");
    await tasks_store.setTasksList(segmentation.value.toLocaleLowerCase(), false);
  }
  tasks_store.items.tasks.loading_list = false;
};
const changeTab = (tab) => {
  setTab(tab);
  filterByTab(tab);
};
let list_type = ref("blocks");
const listType = (display_mode) => {
  list_type.value = display_mode;
};
const deliveredPercent = (delivered_goal, goal) => {
  return (parseInt(delivered_goal) * 100) / parseInt(goal);
};

const swal = inject("$swal");
const tasks_store = useTasksStore();
const services_requests_store = useServicesRequestStore();

let selected_items = ref([]);
let segmentation = ref("All");

watchEffect(async () => {
  tasks_store.items.tasks.loading_list = true;
  await tasks_store.setTasksList(segmentation.value.toLocaleLowerCase(), tab.value === 'done');
});

const deleteMany = () => {
  confirm(
    swal,
    "¿Está seguro que desea eliminar los elementos seleccionados?",
    () => {
      console.log("eliminar items", selected_items.value);
    }
  );
};

const deleteTasks = (item, id) => {
  tasks_store.setSelectedItem("tasks", item);
  confirm(swal, "¿Está seguro que desea eliminar este elemento?", () => {
    tasks_store.deleteTasks(id);
  });
};

const checkUncheckAll = (v) => {
  if (v.target.checked) {
    selected_items.value = [];
    tasks_store.items.tasks.list.map((item) => {
      selected_items.value.push(item.id);
    });
  } else {
    selected_items.value = [];
  }
};
const onChangePage = async (a) => {
  tasks_store.items.tasks.loading_list = true;
  tasks_store.setPagination({
    paginator: "tasks",
    current_page: a,
  });
  await tasks_store.setTasksList(segmentation.value.toLocaleLowerCase(), tab.value === 'done');
  tasks_store.items.tasks.loading_list = false;
};
let items_per_page = ref(tasks_store.items.tasks.paginator.items_per_page);

const changeItemsPerPage = async () => {
  tasks_store.setPagination({
    paginator: "tasks",
    items_per_page: items_per_page.value,
    current_page: 1,
  });
  await tasks_store.setTasksList(segmentation.value.toLocaleLowerCase(), tab.value === 'done');
  tasks_store.items.tasks.loading_list = false;
};

let search = ref("");
const paginateBySearch = async () => {
  tasks_store.items.tasks.loading_list = true;
  search.value == ""
    ? await tasks_store.cleanSearchFilter()
    : await tasks_store.addSearchFilter({
        field: "name",
        value: search.value,
      });
  tasks_store.setPagination({
    paginator: "tasks",
    search: search.value,
  });
  await tasks_store.setTasksList(segmentation.value.toLocaleLowerCase(), tab.value === 'done');
  tasks_store.items.tasks.loading_list = false;
};
const createTasks = () => {
  tasks_store.setModal("create_tasks");
  tasks_store.setModalTitle("Agregar tasks");
  tasks_store.setFormMode("create_update_tasks", "create");
};
const seeTasks = (item, index) => {
  tasks_store.setModal("see_tasks");
  tasks_store.setModalTitle("Ver datos de tasks");
  tasks_store.setFormMode("create_update_tasks", "see");
  tasks_store.setSelectedItem("tasks", item);
  tasks_store.setSelectedItemIndex("tasks", index);
};

const updateTasks = (item, index) => {
  tasks_store.setModal("update_tasks");
  tasks_store.setModalTitle("Editar tasks");
  tasks_store.setFormMode("create_update_tasks", "update");
  tasks_store.setSelectedItem("tasks", item);
  tasks_store.setSelectedItemIndex("tasks", index);
};

const closeTasksModal = () => {
  tasks_store.setModal("");
  tasks_store.setModalTitle("");
  tasks_store.setFormMode("create_update_tasks", "");
  tasks_store.setSelectedItem("tasks", {});
  tasks_store.setSelectedItemIndex("tasks", -1);
};
onMounted(() => {
  auth_store.loadProfileInfo();
});
</script>

<script>
export default {
  name: "ListComponent",
};
</script>
