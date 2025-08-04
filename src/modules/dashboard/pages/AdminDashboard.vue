<template>
  <div
    id="kt_app_toolbar"
    class="app-toolbar align-items-center justify-content-between py-2 py-lg-6 mb-6"
  >
    <div
      class="d-flex flex-grow-1 flex-stack flex-wrap gap-2 mb-n10"
      id="kt_toolbar"
    >
      <div class="page-title d-flex flex-column justify-content-center me-3">
        <h1
          class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center me-3 my-0"
        >
          {{ dashboard_store.module_name }}
        </h1>

        <ul
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
        >
          <li class="breadcrumb-item text-muted">
            <a class="text-muted text-hover-primary"
              >{{ dashboard_store.module_name }} (Admin)</a
            >
          </li>

          <li class="breadcrumb-item">
            <span class="bullet bg-gray-400 w-5px h-2px"></span>
          </li>

          <li class="breadcrumb-item text-dark">Lista</li>
        </ul>
      </div>
    </div>
  </div>

  <div id="kt_app_content" class="app-content flex-column-fluid">
    <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
      <div class="col-xxl-6">
        <div class="card card-flush h-xl-100">
          <div class="card-body py-9">
            <div class="row gx-9 h-100">
              <div class="col-sm-6 mb-10 mb-sm-0">
                <a class="d-block h-100">
                  <div
                    class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px h-100"
                    style="background-image: url(https://picsum.photos/200)"
                  ></div>
                </a>
              </div>

              <div class="col-sm-6">
                <div class="d-flex flex-column h-100">
                  <div class="mb-7">
                    <div class="mb-6">
                      <a
                        href="/keen/demo1/../demo1/apps/projects/users.html"
                        class="text-gray-800 text-hover-primary fs-1 fw-bold"
                        >Administración</a
                      >
                    </div>

                    <div
                      class="d-flex align-items-center flex-wrap d-grid gap-2"
                    >
                      <div class="d-flex align-items-center me-5 me-xl-13">
                        <div class="symbol symbol-30px symbol-circle me-3">
                          <img
                            src="https://picsum.photos/200"
                            class=""
                            alt=""
                          />
                        </div>

                        <div class="m-0">
                          <span class="fw-semibold text-gray-400 d-block fs-8"
                            >¡Hola!</span
                          >
                          <a
                            href="/keen/demo1/../demo1/apps/projects/users.html"
                            class="fw-bold text-gray-800 text-hover-primary fs-7"
                            >{{ auth_store.getProperty("user").name }}</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="d-flex flex-column border border-1 border-gray-300 text-center pt-5 pb-7 mb-8 card-rounded"
                  >
                    <span class="fw-semibold text-gray-600 fs-7 pb-1"
                      >Ganancias del mes</span
                    >
                    <span class="fw-bold text-gray-800 fs-2hx lh-1 pb-1">{{
                      numberToCurrency(
                        "USD",
                        dashboard_store.getItem("dashboard", "admin_info")
                          .goal_total_month
                      )
                    }}</span>
                    <span class="fw-semibold text-gray-600 fs-7 pb-1 mt-4"
                      >Gastos del mes</span
                    >
                    <span class="fw-bold text-gray-600 fs-4 mb-2">{{
                      numberToCurrency(
                        "USD",
                        dashboard_store.getItem("dashboard", "admin_info")
                          .expenses_total_month
                      )
                    }}</span>
                    <span class="fw-semibold text-gray-600 fs-7 pb-1"
                      >Tareas contratadas</span
                    >
                    <span class="fw-bold text-gray-800 fs-3">{{
                      dashboard_store.getItem("dashboard", "admin_info")
                        .num_task_complete
                    }}</span>
                  </div>

                  <div class="d-flex flex-stack mt-auto bd-highlight">
                    <a
                      class="btn btn-primary btn-sm flex-shrink-0 me-3"
                      @click="router.push({ name: 'admin-services-request' })"
                      >Pagos</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xxl-6">
        <TasksManagement
          :first-data="
            dashboard_store.getItem('dashboard', 'admin_info')
              .num_task_in_action
          "
          :second-data="
            dashboard_store.getItem('dashboard', 'admin_info').num_task_complete
          "
        />
      </div>
    </div>
    <div class="row g-5 g-xl-10">
      <div class="col-xl-4 mb-xl-10">
        <div class="card h-xl-100">
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bold text-dark"
                >Estadísticas de alcance</span
              >

              <span class="text-muted mt-1 fw-semibold fs-7"
                >({{
                  dashboard_store.getItem("dashboard", "admin_info").num_worker
                }}) trabajadores</span
              >
            </h3>
          </div>

          <div class="card-body pt-6">
            <ShowResults
              :results="Object.keys(workers_by_country).length !== 0"
              show-image
              width="200"
              text="No se encontraron resultados"
            >
              <span
                v-for="(country, i) in workers_by_country"
                :key="'country_' + i"
              >
                <div class="d-flex flex-stack">
                  <div class="symbol symbol-40px me-4">
                    <div
                      class="symbol-label fs-2 fw-semibold bg-danger text-inverse-danger"
                    >
                      {{ i[0] }}
                    </div>
                  </div>

                  <div
                    class="d-flex align-items-center flex-row-fluid flex-wrap"
                  >
                    <div class="flex-grow-1 me-2">
                      <a class="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >{{ i }} ({{ country.length }}
                        {{
                          country.length == 1 ? "trabajador" : "trabajadores"
                        }})</a
                      >
                    </div>
                  </div>
                </div>
                <div class="separator separator-dashed my-4"></div>
              </span>
              <div style="float: right">
                <Paginator
                  v-if="
                    Math.ceil(
                      dashboard_store.items.dashboard.paginator.total_pages
                    ) > 1
                  "
                  :key="dashboard_store.items.dashboard.paginator.key"
                  @onChangePage="onChangePage"
                  :items-per-page="
                    dashboard_store.items.dashboard.paginator.items_per_page
                  "
                  :max-buttons="5"
                  :total-items="
                    dashboard_store.items.dashboard.paginator.total_items
                  "
                  :total-pages="
                    Math.ceil(
                      dashboard_store.items.dashboard.paginator.total_pages
                    )
                  "
                  :current-page="
                    dashboard_store.items.dashboard.paginator.current_page
                  "
                />
              </div>
            </ShowResults>
          </div>
        </div>
      </div>

      <div class="col-xl-8 mb-5 mb-xl-10">
        <div class="card card-flush h-xl-100">
          <div class="card-header pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bold text-dark">Últimos pagos</span>
            </h3>

            <div class="card-toolbar"></div>
          </div>

          <div class="card-body pb-0">
            <div class="table-responsive table-height">
              <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                <thead>
                  <tr
                    class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"
                  >
                    <th class="min-w-125px">Codigo</th>
                    <th class="min-w-125px">Hora</th>
                    <th class="min-w-125px">Cantidad</th>
                    <th class="text-end min-w-70px">Status</th>
                  </tr>
                </thead>

                <tbody class="fw-semibold text-gray-600">
                  <tr v-for="(item, i) in last_payments" :key="'item_' + i">
                    <td>{{ item.uuid }}</td>

                    <td>
                      <a class="text-gray-800 text-hover-primary mb-1">{{
                        parseDate(item.created_at)
                      }}</a>
                    </td>

                    <td>
                      <a class="text-gray-600 text-hover-primary mb-1">{{
                        numberToCurrency("COP", item.amount)
                      }}</a>
                    </td>

                    <td class="text-end">
                      <Badge
                        :text="
                          item.state == 'activo' ? 'Pendiente' : item.state
                        "
                        :background="
                          item.state == 'activo' ? 'yellow' : 'green'
                        "
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HeaderModal
      @onClose="closeDashboardModal()"
      :show="dashboard_store.modal != ''"
      :title="dashboard_store.modal_title"
      :is-static="true"
      :scrollable="true"
    >
      <template #body>
        <WithdrawForm v-if="dashboard_store.forms.recharge != ''" />
      </template>
    </HeaderModal>
  </div>
</template>
<script setup>
import { useDashboardStore } from "../stores/index.js";
import WithdrawForm from "./WithdrawForm.vue";
import TasksManagement from "../components/TasksManagement.vue";
import Paginator from "@/components/paginator/Paginator.vue";
import { parseDate, cutText } from "@/utils/Functions.js";
import { inject, onMounted, ref } from "vue-demi";
import { confirm } from "@/utils/Swals.js";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/modules/auth/stores/store.js";
import { numberToCurrency } from "../../../utils/Functions";
const auth_store = useAuthStore();

const router = useRouter();
const emit = defineEmits(["onDisplayPage"]);

const swal = inject("$swal");
const dashboard_store = useDashboardStore();

let selected_items = ref([]);

const deleteMany = () => {
  confirm(
    swal,
    "¿Está seguro que desea eliminar los elementos seleccionados?",
    () => {
      console.log("eliminar items", selected_items.value);
    }
  );
};

const deleteDashboard = (item, id) => {
  dashboard_store.setSelectedItem("dashboard", item);
  confirm(swal, "¿Está seguro que desea eliminar este elemento?", () => {
    dashboard_store.deleteDashboard(id);
  });
};

const checkUncheckAll = (v) => {
  if (v.target.checked) {
    selected_items.value = [];
    dashboard_store.items.dashboard.list.map((item) => {
      selected_items.value.push(item.id);
    });
  } else {
    selected_items.value = [];
  }
};
const onChangePage = (a) => {
  dashboard_store.setPagination({
    paginator: "dashboard",
    current_page: a,
  });
  dashboard_store.setDashboardList();
};
let items_per_page = ref(
  dashboard_store.items.dashboard.paginator.items_per_page
);

const changeItemsPerPage = () => {
  dashboard_store.setPagination({
    paginator: "dashboard",
    items_per_page: items_per_page.value,
    current_page: 1,
  });
  dashboard_store.setDashboardList();
};

let search = ref("");
const paginateBySearch = async () => {
  dashboard_store.items.dashboard.loading_list = true;
  search.value == ""
    ? await dashboard_store.cleanSearchFilter()
    : await dashboard_store.addSearchFilter({
        field: "name",
        value: search.value,
      });
  dashboard_store.setPagination({
    paginator: "dashboard",
    search: search.value,
  });
  dashboard_store.setDashboardList();
};
const createDashboard = () => {
  dashboard_store.setModal("create_dashboard");
  dashboard_store.setModalTitle("Agregar dashboard");
  dashboard_store.setFormMode("recharge", "create");
};
const seeDashboard = (item, index) => {
  dashboard_store.setModal("see_dashboard");
  dashboard_store.setModalTitle("Ver datos de dashboard");
  dashboard_store.setFormMode("recharge", "see");
  dashboard_store.setSelectedItem("dashboard", item);
  dashboard_store.setSelectedItemIndex("dashboard", index);
};

const updateDashboard = (item, index) => {
  dashboard_store.setModal("update_dashboard");
  dashboard_store.setModalTitle("Editar dashboard");
  dashboard_store.setFormMode("recharge", "update");
  dashboard_store.setSelectedItem("dashboard", item);
  dashboard_store.setSelectedItemIndex("dashboard", index);
};

const closeDashboardModal = () => {
  dashboard_store.setModal("");
  dashboard_store.setModalTitle("");
  dashboard_store.setFormMode("recharge", "");
  dashboard_store.setSelectedItem("dashboard", {});
  dashboard_store.setSelectedItemIndex("dashboard", -1);
};
let workers_by_country = ref([]);
let last_payments = ref([]);
const init = async () => {
  await dashboard_store.loadDashboardInfo();
  workers_by_country.value = dashboard_store.getItem(
    "dashboard",
    "admin_info"
  ).worker_by_country.items;

  last_payments.value = dashboard_store.getItem(
    "dashboard",
    "admin_info"
  ).last_pays;

  console.log(workers_by_country.value);
};
onMounted(() => {
  init();
});
</script>

<script>
export default {
  name: "ListComponent",
};
</script>
