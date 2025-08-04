<template>
  <div
    id="kt_app_toolbar"
    class="app-toolbar align-items-center justify-content-between py-2 py-lg-6 mb-6"
  >
    <!--begin::Toolbar wrapper-->
    <div
      class="d-flex flex-grow-1 flex-stack flex-wrap gap-2 mb-n10"
      id="kt_toolbar"
    >
      <!--begin::Page title-->
      <div class="page-title d-flex flex-column justify-content-center me-3">
        <!--begin::Title-->
        <h1
          class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center me-3 my-0"
        >
          {{ dashboard_store.module_name }}
        </h1>
        <!--end::Title-->
        <!--begin::Breadcrumb-->
        <ul
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
        >
          <!--begin::Item-->
          <li class="breadcrumb-item text-muted">
            <a class="text-muted text-hover-primary"
              >{{ dashboard_store.module_name }} (Cliente)</a
            >
          </li>
          <!--end::Item-->

          <!--begin::Item-->
          <li class="breadcrumb-item">
            <span class="bullet bg-gray-400 w-5px h-2px"></span>
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <li class="breadcrumb-item text-dark">Lista</li>
          <!--end::Item-->
        </ul>
        <!--end::Breadcrumb-->
      </div>
      <!--end::Page title-->
      <!--begin::Actions-->

      <!--end::Actions-->
    </div>
    <!--end::Toolbar wrapper-->
  </div>

  <div id="kt_app_content" class="app-content flex-column-fluid">
    <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
      <div class="col-xxl-6">
        <!--begin::Card widget 15-->
        <div class="card card-flush h-xl-100">
          <!--begin::Body-->
          <div class="card-body py-9">
            <!--begin::Row-->
            <div class="row gx-9 h-100">
              <!--begin::Col-->
              <div class="col-sm-6 mb-10 mb-sm-0">
                <!--begin::Overlay-->
                <a class="d-block h-100">
                  <!--begin::Image-->
                  <div
                    class="overlay-wrapper bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-200px h-100"
                    style="background-image: url('https://picsum.photos/200')"
                  ></div>
                  <!--end::Image-->
                </a>
                <!--end::Overlay-->
              </div>
              <!--end::Col-->

              <!--begin::Col-->
              <div class="col-sm-6">
                <!--begin::Wrapper-->
                <div class="d-flex flex-column h-100">
                  <!--begin::Header-->
                  <div class="mb-7">
                    <!--begin::Title-->
                    <div class="mb-6">
                      <a
                        href="/keen/demo1/../demo1/apps/projects/users.html"
                        class="text-gray-800 text-hover-primary fs-1 fw-bold"
                        >Administración</a
                      >
                    </div>
                    <!--end::Title-->

                    <!--begin::Items-->
                    <div
                      class="d-flex align-items-center flex-wrap d-grid gap-2"
                    >
                      <!--begin::Item-->
                      <div class="d-flex align-items-center me-5 me-xl-13">
                        <!--begin::Symbol-->
                        <div class="symbol symbol-30px symbol-circle me-3">
                          <img
                            src="https://picsum.photos/200"
                            class=""
                            alt=""
                          />
                        </div>
                        <!--end::Symbol-->

                        <!--begin::Info-->
                        <div class="m-0">
                          <span class="fw-semibold text-gray-400 d-block fs-8"
                            >¡Hola!</span
                          >
                          <a
                            href="/keen/demo1/../demo1/apps/projects/users.html"
                            class="fw-bold text-gray-800 text-hover-primary fs-7"
                            >{{ auth_store.getProperty("user_data").name }}
                            {{
                              auth_store.getProperty("user_data").lastname
                            }}</a
                          >
                        </div>
                        <!--end::Info-->
                      </div>
                      <!--end::Item-->
                    </div>
                    <!--end::Items-->
                  </div>
                  <!--end::Header-->

                  <!--begin::Body-->
                  <div
                    class="d-flex flex-column border border-1 border-gray-300 text-center pt-5 pb-7 mb-8 card-rounded"
                  >
                    <span class="fw-semibold text-gray-600 fs-7 pb-1"
                      >Ganancias</span
                    >
                    <span class="fw-bold text-gray-800 fs-2hx lh-1 pb-1"
                      >{{
                        auth_store.getProperty("user_data").balance == undefined
                          ? "•••"
                          : numberToCurrency("COP", auth_store.getProperty("user_data").balance * token_price)
                      }}
                      USD</span
                    >
                    <span class="fw-bold text-gray-600 fs-4 pb-5">
                      {{
                        numberToCurrency(
                          "COP",
                          auth_store.getProperty("user_data").balance
                        )
                      }}</span
                    >
                    <span class="fw-semibold text-gray-600 fs-7 pb-1"
                      >Tareas contratadas</span
                    >
                    <span class="fw-bold text-gray-800 fs-3">{{
                      dashboard_store.getItem("dashboard", "client_info")
                        .num_task_in_action
                    }}</span>
                  </div>
                  <!--end::Body-->

                  <!--begin::Footer-->
                  <div class="d-flex flex-stack mt-auto bd-highlight">
                    <!--begin::Actions-->
                    <a
                      @click="recharge"
                      class="btn btn-primary btn-sm flex-shrink-0 me-3"
                      >Recargar</a
                    >
                    <!-- <a
                      href="#"
                      class="btn btn-light btn-sm flex-shrink-0"
                      data-bs-toggle="modal"
                      data-bs-target="#kt_modal_users_search"
                      >Pagos</a
                    > -->
                    <!--end::Actions-->
                  </div>
                  <!--end::Footer-->
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
          </div>
          <!--end::Body-->
        </div>
        <!--end::Card widget 15-->
      </div>

      <!--begin::Col-->
      <div class="col-xxl-6">
        <TasksManagement
          :first-data="
            dashboard_store.getItem('dashboard', 'client_info').num_task_pending
          "
          :second-data="
            dashboard_store.getItem('dashboard', 'client_info')
              .num_task_complete
          "
        />
      </div>
      <!--end::Col-->
    </div>
    <div class="row g-5 g-xl-10">
      <!--begin::Col-->
      <div class="col-xl-4 mb-xl-10">
        <!--begin::List widget 20-->
        <div class="card h-xl-100">
          <!--begin::Header-->
          <div class="card-header border-0 pt-5">
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bold text-dark"
                >Estadísticas de alcance</span
              >

              <span class="text-muted mt-1 fw-semibold fs-7"
                >({{
                  dashboard_store.getItem("dashboard", "client_info")
                    .num_worker
                }}) trabajadores</span
              >
            </h3>

            <!--begin::Toolbar-->
            <div class="card-toolbar">
              <a href="#" class="btn btn-sm btn-light">Ver todas</a>
            </div>
            <!--end::Toolbar-->
          </div>
          <!--end::Header-->

          <!--begin::Body-->
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
                  <!--begin::Symbol-->
                  <div class="symbol symbol-40px me-4">
                    <div
                      class="symbol-label fs-2 fw-semibold bg-danger text-inverse-danger"
                    >
                      {{ i[0] }}
                    </div>
                  </div>
                  <!--end::Symbol-->

                  <!--begin::Section-->
                  <div
                    class="d-flex align-items-center flex-row-fluid flex-wrap"
                  >
                    <!--begin:Author-->
                    <div class="flex-grow-1 me-2">
                      <a class="text-gray-800 text-hover-primary fs-6 fw-bold"
                        >{{ i }} ({{ country.length }}
                        {{
                          country.length == 1 ? "trabajador" : "trabajadores"
                        }})</a
                      >
                    </div>
                    <!--end:Author-->
                  </div>
                  <!--end::Section-->
                </div>
                <div class="separator separator-dashed my-4"></div>
              </span>
            </ShowResults>
          </div>
          <!--end::Body-->
        </div>
        <!--end::List widget 20-->
      </div>
      <!--end::Col-->

      <!--begin::Col-->
      <div class="col-xl-8 mb-5 mb-xl-10">
        <!--begin::Timeline Widget 1-->
        <div class="card card-flush h-xl-100">
          <!--begin::Card header-->
          <div class="card-header pt-5">
            <!--begin::Card title-->
            <h3 class="card-title align-items-start flex-column">
              <span class="card-label fw-bold text-dark">Últimos pagos</span>
            </h3>
            <!--end::Card title-->

            <!--begin::Card toolbar-->
            <div class="card-toolbar">
              <!--begin::Tabs-->
              <!-- <ul class="nav" role="tablist">
                <li class="nav-item" role="presentation">
                  <a
                    class="
                      nav-link
                      btn btn-sm btn-color-muted btn-active btn-active-light
                      fw-bold
                      px-4
                      me-1
                      active
                    "
                    data-kt-timeline-widget-1="tab"
                    data-bs-toggle="tab"
                    href="#kt_timeline_widget_1_tab_day"
                    aria-selected="true"
                    role="tab"
                    >Day</a
                  >
                </li>

                <li class="nav-item" role="presentation">
                  <a
                    class="
                      nav-link
                      btn btn-sm btn-color-muted btn-active btn-active-light
                      fw-bold
                      px-4
                      me-1
                    "
                    data-kt-timeline-widget-1="tab"
                    data-bs-toggle="tab"
                    href="#kt_timeline_widget_1_tab_week"
                    aria-selected="false"
                    tabindex="-1"
                    role="tab"
                    >Week</a
                  >
                </li>

                <li class="nav-item" role="presentation">
                  <a
                    class="
                      nav-link
                      btn btn-sm btn-color-muted btn-active btn-active-light
                      fw-bold
                      px-4
                      me-1
                    "
                    data-kt-timeline-widget-1="tab"
                    data-bs-toggle="tab"
                    href="#kt_timeline_widget_1_tab_month"
                    aria-selected="false"
                    tabindex="-1"
                    role="tab"
                    >Month</a
                  >
                </li>
              </ul> -->
              <!--end::Tabs-->
            </div>
            <!--end::Card toolbar-->
          </div>
          <!--end::Card header-->

          <!--begin::Card body-->
          <div class="card-body pb-0">
            <Hoping :loading="dashboar_loading">
              <ShowResults
                :results="last_requests.length > 0"
                show-image
                width="400"
              >
                <div class="table-responsive table-height">
                  <!--begin::Table-->
                  <table
                    class="table table-row-dashed align-middle gs-0 gy-3 my-0"
                  >
                    <!--begin::Table head-->
                    <thead>
                      <!--begin::Table row-->
                      <tr
                        class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"
                      >
                        <th class="w-10px pe-2">
                          <div
                            class="form-check form-check-sm form-check-custom form-check-solid me-3"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              @change="checkUncheckAll"
                            />
                          </div>
                        </th>
                        <th class="min-w-125px">ID del pedido</th>
                        <th class="min-w-125px">Hora</th>
                        <th class="min-w-125px">Cantidad</th>
                        <th class="text-end">Status</th>
                      </tr>
                      <!--end::Table row-->
                    </thead>
                    <!--end::Table head-->
                    <!--begin::Table body-->
                    <tbody class="fw-semibold text-gray-600">
                      <tr v-for="(item, i) in last_requests" :key="'item_' + i">
                        <!--begin::Checkbox-->
                        <td>
                          <div
                            class="form-check form-check-sm form-check-custom form-check-solid"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              v-model="selected_items"
                              :value="item.id"
                            />
                          </div>
                        </td>
                        <td>{{ item.uuid }}</td>
                        <!--end::Checkbox-->
                        <!--begin::Name=-->
                        <td>
                          <a class="text-gray-800 text-hover-primary mb-1">{{
                            parseDate(item.created_at)
                          }}</a>
                        </td>
                        <!--end::Name=-->
                        <!--begin::Email=-->
                        <td>
                          <Badge
                            :text="numberToCurrency('COP', item.amount)"
                            background="green"
                          />
                        </td>
                        <!--end::Email=-->
                        <!--begin::Company=-->
                        <!--end::Company=-->
                        <!--begin::Payment method=-->
                        <td class="text-end">
                          <Badge
                            :text="item.state"
                            :background="state_color_hash_map[item.state]"
                          />
                        </td>
                        <!--end::Payment method=-->
                      </tr>
                    </tbody>
                    <!--end::Table body-->
                  </table>
                </div>
              </ShowResults>
            </Hoping>
          </div>
          <!--end::Card body-->
        </div>
        <!--end::Timeline Widget 1-->
      </div>
      <!--end::Col-->
    </div>
    <HeaderModal
      @onClose="closeDashboardModal()"
      :show="dashboard_store.modal != ''"
      :title="dashboard_store.modal_title"
      :is-static="true"
      :scrollable="true"
    >
      <template #body>
        <RechargeForm v-if="dashboard_store.forms.recharge != ''" />
      </template>
    </HeaderModal>
  </div>
</template>
<script setup>
import { useDashboardStore } from "../stores/index.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import RechargeForm from "./RechargeForm.vue";
import TasksManagement from "../components/TasksManagement.vue";
import Paginator from "@/components/paginator/Paginator.vue";
import { parseDate, cutText } from "@/utils/Functions.js";
import { inject, onMounted, ref } from "vue-demi";
import { confirm } from "@/utils/Swals.js";
import { numberToCurrency } from "@/utils/Functions.js";
import { state_color_hash_map } from "@/modules/services-request/config/config.js";
import { useSettingsStore } from "@/modules/settings/stores/index.js";

const emit = defineEmits(["onDisplayPage"]);

const settings_store = useSettingsStore();
let token_price = ref(1);
const loadTokenPrice = async () => {
  await settings_store.loadToken();
  token_price.value = settings_store.token;
};

const swal = inject("$swal");
const dashboard_store = useDashboardStore();
const auth_store = useAuthStore();

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
const recharge = () => {
  dashboard_store.setModal("recharge");
  dashboard_store.setModalTitle("Recargar");
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
let last_requests = ref([]);
let dashboar_loading = ref(true);
const init = async () => {
  loadTokenPrice();
  await dashboard_store.loadDashboardInfo();
  workers_by_country.value = dashboard_store.getItem(
    "dashboard",
    "client_info"
  ).worker_by_country.items;
  last_requests.value = dashboard_store.getItem(
    "dashboard",
    "client_info"
  ).last_requests;
  dashboar_loading.value = false;
};
const statusBackground = (state) => {
  if (state == "Solicitado") return "blue";
  if (state == "Cancelado") return "red";
  return "green";
};
onMounted(() => {
  auth_store.loadProfileInfo();
  init();
});
</script>

<script>
export default {
  name: "ListComponent",
};
</script>
