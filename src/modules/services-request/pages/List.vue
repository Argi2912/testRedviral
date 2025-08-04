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
          {{ services_request_store.module_name }}
        </h1>
        <!--end::Title-->
        <!--begin::Breadcrumb-->
        <ul
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
        >
          <!--begin::Item-->
          <li class="breadcrumb-item text-muted">
            <a class="text-muted text-hover-primary">{{
              services_request_store.module_name
            }}</a>
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
    <!--begin::Card-->
    <div class="card">
      <div class="row mt-6 mx-6">
        <div class="col">
          <Forbidden
            :permission-tag="'list_requests'"
            :user-permissions="auth_store.getProperty('role').permissions"
          >
            <div class="d-flex align-items-center position-relative my-1">
              <select
                class="form-select form-select-solid w-150px me-3"
                v-model="search_field"
                @change="paginateBySearch"
              >
                <option value="uuid">ID del pedido</option>
                <option value="user.name">Cliente</option>
                <option value="state">Estado</option>
              </select>
              <span class="svg-icon svg-icon-1 position-absolute ms-6">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    opacity="0.5"
                    x="17.0365"
                    y="15.1223"
                    width="8.15546"
                    height="2"
                    rx="1"
                    transform="rotate(45 17.0365 15.1223)"
                    fill="currentColor"
                  />
                  <path
                    d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <!--end::Svg Icon-->
              <input
                type="text"
                data-kt-customer-table-filter="search"
                class="form-control form-control-solid w-250px ps-15"
                placeholder="Buscar"
                v-model="search"
                @keyup="paginateBySearch"
              />
            </div>
          </Forbidden>
        </div>
        <div class="col">
          <div
            class="d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          >
            <!--begin::Filter-->
            <button
              type="button"
              class="btn btn-light-primary me-3 core-hidden"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
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
                    d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                    fill="currentColor"
                  />
                </svg> </span
              >Filtro
            </button>
            <div
              class="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
              data-kt-menu="true"
              id="kt-toolbar-filter"
            >
              <div class="px-7 py-5">
                <div class="fs-4 text-dark fw-bold">Filter Options</div>
              </div>

              <div class="separator border-gray-200"></div>

              <div class="px-7 py-5">
                <div class="mb-10">
                  <label class="form-label fs-5 fw-semibold mb-3">Month:</label>

                  <select
                    class="form-select form-select-solid fw-bold"
                    data-kt-select2="true"
                    data-placeholder="Select option"
                    data-allow-clear="true"
                    data-kt-customer-table-filter="month"
                    data-dropdown-parent="#kt-toolbar-filter"
                  >
                    <option value="aug">August</option>
                    <option value="sep">September</option>
                    <option value="oct">October</option>
                    <option value="nov">November</option>
                    <option value="dec">December</option>
                  </select>
                </div>

                <div class="mb-10">
                  <label class="form-label fs-5 fw-semibold mb-3"
                    >Payment Type:</label
                  >

                  <div
                    class="d-flex flex-column flex-wrap fw-semibold"
                    data-kt-customer-table-filter="payment_type"
                  >
                    <label
                      class="form-check form-check-sm form-check-custom form-check-solid mb-3 me-5"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="payment_type"
                        value="all"
                        checked="checked"
                      />
                      <span class="form-check-label text-gray-600">All</span>
                    </label>

                    <label
                      class="form-check form-check-sm form-check-custom form-check-solid mb-3 me-5"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="payment_type"
                        value="visa"
                      />
                      <span class="form-check-label text-gray-600">Visa</span>
                    </label>

                    <label
                      class="form-check form-check-sm form-check-custom form-check-solid mb-3"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="payment_type"
                        value="mastercard"
                      />
                      <span class="form-check-label text-gray-600"
                        >Mastercard</span
                      >
                    </label>

                    <label
                      class="form-check form-check-sm form-check-custom form-check-solid"
                    >
                      <input
                        class="form-check-input"
                        type="radio"
                        name="payment_type"
                        value="american_express"
                      />
                      <span class="form-check-label text-gray-600"
                        >American Express</span
                      >
                    </label>
                  </div>
                </div>

                <div class="d-flex justify-content-end">
                  <button
                    type="reset"
                    class="btn btn-light btn-active-light-primary me-2"
                    data-kt-menu-dismiss="true"
                    data-kt-customer-table-filter="reset"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    data-kt-menu-dismiss="true"
                    data-kt-customer-table-filter="filter"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <!--end::Filter-->

            <button
              type="button"
              class="btn btn-light-primary me-3 core-hidden"
              data-bs-toggle="modal"
              data-bs-target="#kt_customers_export_modal"
            >
              <span class="svg-icon svg-icon-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    opacity="0.3"
                    x="12.75"
                    y="4.25"
                    width="12"
                    height="2"
                    rx="1"
                    transform="rotate(90 12.75 4.25)"
                    fill="currentColor"
                  />
                  <path
                    d="M12.0573 6.11875L13.5203 7.87435C13.9121 8.34457 14.6232 8.37683 15.056 7.94401C15.4457 7.5543 15.4641 6.92836 15.0979 6.51643L12.4974 3.59084C12.0996 3.14332 11.4004 3.14332 11.0026 3.59084L8.40206 6.51643C8.0359 6.92836 8.0543 7.5543 8.44401 7.94401C8.87683 8.37683 9.58785 8.34458 9.9797 7.87435L11.4427 6.11875C11.6026 5.92684 11.8974 5.92684 12.0573 6.11875Z"
                    fill="currentColor"
                  />
                  <path
                    opacity="0.3"
                    d="M18.75 8.25H17.75C17.1977 8.25 16.75 8.69772 16.75 9.25C16.75 9.80228 17.1977 10.25 17.75 10.25C18.3023 10.25 18.75 10.6977 18.75 11.25V18.25C18.75 18.8023 18.3023 19.25 17.75 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V11.25C4.75 10.6977 5.19771 10.25 5.75 10.25C6.30229 10.25 6.75 9.80228 6.75 9.25C6.75 8.69772 6.30229 8.25 5.75 8.25H4.75C3.64543 8.25 2.75 9.14543 2.75 10.25V19.25C2.75 20.3546 3.64543 21.25 4.75 21.25H18.75C19.8546 21.25 20.75 20.3546 20.75 19.25V10.25C20.75 9.14543 19.8546 8.25 18.75 8.25Z"
                    fill="currentColor"
                  />
                </svg> </span
              >Exportar
            </button>
            <!--begin::Add customer-->
            <Forbidden
              :permission-tag="'create_requests'"
              :user-permissions="auth_store.getProperty('role').permissions"
            >
              <button
                v-show="selected_items.length == 0"
                @click="createServicesRequest()"
                type="button"
                class="btn btn-primary"
              >
                Agregar
              </button>
            </Forbidden>
            <div v-show="selected_items.length != 0">
              <div class="d-flex justify-content-end align-items-center">
                <div class="fw-bold me-5">
                  <span class="me-2">{{ selected_items.length }}</span
                  >Selecionados
                </div>
                <div class="dropdown">
                  <button
                    class="btn btn-sm btn-light btn-active-light-primary"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Opciones
                  </button>
                  <ul
                    class="dropdown-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                  >
                    <li class="menu-item">
                      <a href="#" @click="deleteMany()" class="menu-link px-3"
                        >Eliminar</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--end::Add customer-->
          </div>
        </div>
      </div>
      <div class="card-body">
        <Forbidden
          show-image
          text="No tiene permisos para ver esta lista"
          :permission-tag="'list_requests'"
          :user-permissions="auth_store.getProperty('role').permissions"
        >
          <div
            v-if="!services_request_store.items.services_request.loading_list"
          >
            <div
              v-if="
                services_request_store.items.services_request.list.length > 0
              "
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
                      <th class="min-w-125px">Id del pedido</th>
                      <th class="min-w-125px">Servicio</th>
                      <th class="min-w-125px">URL</th>
                      <th
                        v-if="auth_store.getProperty('user').role != 2"
                        class="min-w-125px"
                      >
                        Cliente
                      </th>
                      <th class="min-w-125px">Monto</th>
                      <th class="min-w-125px">Segmentación</th>
                      <th
                        v-if="auth_store.getProperty('user').role == 2"
                        class="min-w-125px"
                      >
                        Cuenta
                      </th>
                      <th class="min-w-125px">Status</th>
                      <th class="min-w-125px">Fecha</th>
                      <th class="text-end min-w-70px">Opciones</th>
                    </tr>
                    <!--end::Table row-->
                  </thead>
                  <!--end::Table head-->
                  <!--begin::Table body-->
                  <tbody class="fw-semibold text-gray-600">
                    <tr
                      v-for="(item, i) in services_request_store.items
                        .services_request.list"
                      :key="'item_' + i"
                    >
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
                      <!--end::Checkbox-->
                      <!--begin::Name=-->
                      <td>
                        {{ item.uuid }}
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="d-flex justify-content-start flex-column">
                            <span class="text-gray-800 text-hover-primary d-block fs-7" >{{ cutText(item.items[0].service.name, 20) }}</span >
                          </div>
                        </div>
                      </td>
                      <td>
                        {{ cutText(item.items[0].service.photo, 30) }}
                      </td>
                      <td v-if="auth_store.getProperty('user').role != 2">
                        <div class="d-flex align-items-center">
                          <!-- <div class="symbol symbol-50px me-3">
                            <Avatar :picture="item.user.photo" />
                          </div> -->
                          <div class="d-flex justify-content-start flex-column">
                            <span
                              class="text-gray-400 fw-semibold d-block fs-7"
                              >{{
                                cutText(
                                  item.user.name + " " + item.user.lastname,
                                  12
                                )
                              }}</span
                            >
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge
                          :text="numberToCurrency('COP', item.amount)"
                          background="green"
                        />
                      </td>
                      <!-- <td>
                            <a
                              href="../../demo7/dist/apps/customers/view.html"
                              class="text-gray-800 text-hover-primary mb-1"
                              ></a
                            >
                          </td> -->
                      <!--end::Name=-->
                      <!--begin::Company=-->
                      <td>
                        {{
                          services_request_store.parseSegmentation(
                            item.segmentation
                          )
                        }}
                      </td>
                      <!--end::Company=-->
                      <!--begin::Payment method=-->
                      <td v-if="auth_store.getProperty('user').role == 2">
                        {{ item.account.name }}
                      </td>
                      <td data-filter="mastercard">
                        <Badge
                          :text="item.state"
                          :background="state_color_hash_map[item.state]"
                        />
                      </td>
                      <!--end::Payment method=-->
                      <!--begin::Date=-->
                      <td>{{ parseDate(item.created_at) }}</td>
                      <!--end::Date=-->
                      <!--begin::Action=-->

                      <td class="text-end">
                        <Forbidden
                          text-align="right"
                          text="No tiene permisos para realizar acciones"
                          :permission-tags="['show_requests']"
                          :user-permissions="
                            auth_store.getProperty('role').permissions
                          "
                        >
                          <div class="dropdown">
                            <button
                              class="btn btn-sm btn-light btn-active-light-primary"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Opciones
                            </button>
                            <ul
                              class="dropdown-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                            >
                              <li class="menu-item">
                                <a
                                  href="#"
                                  @click="seeServicesRequest(item, i)"
                                  class="menu-link px-3"
                                  >Detalles</a
                                >
                              </li>
                            </ul>
                          </div>
                        </Forbidden>
                      </td>
                      <!--end::Action=-->
                    </tr>
                  </tbody>
                  <!--end::Table body-->
                </table>
              </div>
              <div class="mt-6">
                <div style="float: left">
                  <select
                    name="kt_customers_table_length"
                    aria-controls="kt_customers_table"
                    class="form-select form-select-sm form-select-solid"
                    v-model="items_per_page"
                    @change="changeItemsPerPage"
                  >
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="25">25</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                  </select>
                </div>
                <div style="float: right">
                  <Paginator
                    v-if="
                      Math.ceil(
                        services_request_store.items.services_request.paginator
                          .total_pages
                      ) > 1
                    "
                    :key="
                      services_request_store.items.services_request.paginator
                        .key
                    "
                    @onChangePage="onChangePage"
                    :items-per-page="
                      services_request_store.items.services_request.paginator
                        .items_per_page
                    "
                    :max-buttons="5"
                    :total-items="
                      services_request_store.items.services_request.paginator
                        .total_items
                    "
                    :total-pages="
                      Math.ceil(
                        services_request_store.items.services_request.paginator
                          .total_pages
                      )
                    "
                    :current-page="
                      services_request_store.items.services_request.paginator
                        .current_page
                    "
                  />
                </div>
              </div>
            </div>
            <div align="center" v-else>
              <p>No se han encontrado resultados</p>
            </div>
          </div>
          <div v-else align="center">
            <RippleLoader />
          </div>
        </Forbidden>
        <!--end::Table-->
      </div>
      <!--end: Card Body-->
    </div>
  </div>
</template>

<script setup>
import { useServicesRequestStore } from "../stores/index.js";

import ServicesRequestForm from "../pages/ServicesRequestForm.vue";
import Paginator from "@/components/paginator/Paginator.vue";
import { inject, onMounted, ref } from "vue-demi";
import { parseDate, cutText } from "@/utils/Functions.js";
import { confirm } from "@/utils/Swals.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import { numberToCurrency } from "../../../utils/Functions";
import { state_color_hash_map } from "../config/config";

const auth_store = useAuthStore();
const swal = inject("$swal");
const services_request_store = useServicesRequestStore();

const getStateColor = () => {
  item.state == "Cancelado" ? "red" : "blue";
};

let selected_items = ref([]);

const emit = defineEmits(["onDisplayPage"]);

const deleteMany = () => {
  confirm(
    swal,
    "¿Está seguro que desea eliminar los elementos seleccionados?",
    () => {
      console.log("eliminar items", selected_items.value);
    }
  );
};

const deleteServicesRequest = (item, id) => {
  services_request_store.setSelectedItem("services_request", item);
  confirm(swal, "¿Está seguro que desea eliminar este elemento?", () => {
    services_request_store.deleteServicesRequest(id);
  });
};

const checkUncheckAll = (v) => {
  if (v.target.checked) {
    selected_items.value = [];
    services_request_store.items.services_request.list.map((item) => {
      selected_items.value.push(item.id);
    });
  } else {
    selected_items.value = [];
  }
};
const onChangePage = (a) => {
  services_request_store.setPagination({
    paginator: "services_request",
    current_page: a,
  });
  services_request_store.setServicesRequestList();
};
let items_per_page = ref(
  services_request_store.items.services_request.paginator.items_per_page
);

const changeItemsPerPage = () => {
  services_request_store.setPagination({
    paginator: "services_request",
    items_per_page: items_per_page.value,
    current_page: 1,
  });
  services_request_store.setServicesRequestList();
};

let search = ref("");
const paginateBySearch = async () => {
  services_request_store.items.services_request.loading_list = true;
  search.value == ""
    ? await services_request_store.cleanSearchFilter()
    : await services_request_store.addSearchFilter({
        field: "uuid",
        value: search.value,
      });
  services_request_store.setPagination({
    paginator: "services_request",
    search: search.value,
  });
  services_request_store.setServicesRequestList();
};
const createServicesRequest = () => {
  services_request_store.setFormMode(
    "create_update_services_request",
    "create"
  );
  emit("onDisplayPage", {
    page_to_show: "#create-update-services-request",
  });
};
const seeServicesRequest = (item, index) => {
  services_request_store.setFormMode(
    "create_update_services_request",
    "update"
  );
  services_request_store.setSelectedItem("services_request", item);
  services_request_store.setSelectedItemIndex("services_request", index);
  emit("onDisplayPage", {
    page_to_show: "#services-request-details",
  });
};

const closeServicesRequestModal = () => {
  services_request_store.setModal("");
  services_request_store.setModalTitle("");
  services_request_store.setFormMode("create_update_services_request", "");
  services_request_store.setSelectedItem("services_request", {});
  services_request_store.setSelectedItemIndex("services_request", -1);
};
onMounted(() => {});
</script>

<script>
export default {
  name: "ListComponent",
};
</script>
