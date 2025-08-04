<template>
  <div id="kt_app_content" class="app-content flex-column-fluid">
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
            {{ services_store.module_name }}
          </h1>
          <!--end::Title-->
          <!--begin::Breadcrumb-->
          <ul
            class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
          >
            <!--begin::Item-->
            <li class="breadcrumb-item text-muted">
              <a class="text-muted text-hover-primary">{{
                services_store.module_name
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

    <div class="card">
      <div class="row mt-6 mx-6">
        <div class="col">
          <div class="d-flex align-items-center position-relative my-1">
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
              :permission-tag="'create_services'"
              :user-permissions="auth_store.getProperty('role').permissions"
            >
              <button
                v-show="selected_items.length == 0"
                @click="createServices()"
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
                    <span class="svg-icon svg-icon-5 m-0">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
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
          text="No tiene permisos para ver la lista de servicios"
          :permission-tag="'list_accounts'"
          :user-permissions="auth_store.getProperty('role').permissions"
        >
          <div v-if="!services_store.items.services.loading_list">
            <div v-if="services_store.items.services.list.length > 0">
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
                      <th class="min-w-125px">Servicio</th>
                      <th class="min-w-125px">Categoría</th>
                      <th class="min-w-125px">Código</th>
                      <th class="min-w-125px">Precio</th>
                      <th class="min-w-125px">Status</th>
                      <th class="min-w-125px">Cantidad</th>
                      <th class="text-end min-w-70px">Actions</th>
                    </tr>
                    <!--end::Table row-->
                  </thead>
                  <!--end::Table head-->
                  <!--begin::Table body-->
                  <tbody class="fw-semibold text-gray-600">
                    <tr
                      v-for="(item, i) in services_store.items.services.list"
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
                        <div class="d-flex align-items-center">
                          <div class="symbol symbol-50px me-3">
                            <Avatar :picture="item.photo" />
                          </div>
                          <div class="d-flex justify-content-start flex-column">
                            <span
                              class="text-gray-400 fw-semibold d-block fs-7"
                              >{{ cutText(item.name, 12) }}</span
                            >
                          </div>
                        </div>
                      </td>
                      <!-- <td>
                            <a
                              href="../../demo7/dist/apps/customers/view.html"
                              class="text-gray-800 text-hover-primary mb-1"
                              ></a
                            >
                          </td> -->
                      <!--end::Name=-->
                      <!--begin::Email=-->
                      <td>
                        <a
                          href="#"
                          class="text-gray-600 text-hover-primary mb-1"
                          >{{ cutText(item.category.name) }}</a
                        >
                      </td>
                      <!--end::Email=-->
                      <!--begin::Company=-->
                      <td>{{ item.code }}</td>
                      <!--end::Company=-->
                      <!--begin::Payment method=-->
                      <td>
                        {{ prasePrice(item.price) }}
                      </td>
                      <!--end::Payment method=-->
                      <!--begin::Date=-->
                      <td>
                        <Badge
                          :text="item.state == 'activo' ? 'Activo' : 'inactivo'"
                          :background="item.state == 'activo' ? 'green' : 'red'"
                        />
                      </td>
                      <td>{{ item.amount }}</td>
                      <!--end::Date=-->
                      <!--begin::Action=-->

                      <td class="text-end">
                        <Forbidden
                          text="No tienes permiso para realizar acciones"
                          :permission-tags="[
                            'show_services',
                            'delete_services',
                          ]"
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
                              <Forbidden
                                :permission-tag="'show_services'"
                                :user-permissions="
                                  auth_store.getProperty('role').permissions
                                "
                              >
                                <li class="menu-item">
                                  <a
                                    href="#"
                                    @click="seeServices(item, i)"
                                    class="menu-link px-3"
                                    >Detalles</a
                                  >
                                </li>
                              </Forbidden>
                              <Forbidden
                                :permission-tag="'delete_services'"
                                :user-permissions="
                                  auth_store.getProperty('role').permissions
                                "
                              >
                                <li class="menu-item">
                                  <a
                                    href="#"
                                    class="menu-link px-3"
                                    @click="deleteServices(item, item.id)"
                                    >Eliminar</a
                                  >
                                </li>
                              </Forbidden>
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
                        services_store.items.services.paginator.total_pages
                      ) > 1
                    "
                    :key="services_store.items.services.paginator.key"
                    @onChangePage="onChangePage"
                    :items-per-page="
                      services_store.items.services.paginator.items_per_page
                    "
                    :max-buttons="5"
                    :total-items="
                      services_store.items.services.paginator.total_items
                    "
                    :total-pages="
                      Math.ceil(
                        services_store.items.services.paginator.total_pages
                      )
                    "
                    :current-page="
                      services_store.items.services.paginator.current_page
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
import { useServicesStore } from "../stores/index.js";
import ServicesForm from "../pages/ServicesForm.vue";
import Paginator from "@/components/paginator/Paginator.vue";
import { inject, onMounted, ref } from "vue-demi";
import { parseDate, cutText } from "@/utils/Functions.js";
import { confirm } from "@/utils/Swals.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";

const auth_store = useAuthStore();
const swal = inject("$swal");
const services_store = useServicesStore();

let selected_items = ref([]);

const prasePrice = (price) => {
  let parsed_price = "";
  const NF = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  });
  parsed_price = NF.format(price);
  return parsed_price;
};

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

const deleteServices = (item, id) => {
  services_store.setSelectedItem("services", item);
  confirm(swal, "¿Está seguro que desea eliminar este elemento?", () => {
    services_store.deleteServices(id);
  });
};

const checkUncheckAll = (v) => {
  if (v.target.checked) {
    selected_items.value = [];
    services_store.items.services.list.map((item) => {
      selected_items.value.push(item.id);
    });
  } else {
    selected_items.value = [];
  }
};
const onChangePage = (a) => {
  services_store.setPagination({
    paginator: "services",
    current_page: a,
  });
  services_store.setServicesList();
};
let items_per_page = ref(
  services_store.items.services.paginator.items_per_page
);

const changeItemsPerPage = () => {
  services_store.setPagination({
    paginator: "services",
    items_per_page: items_per_page.value,
    current_page: 1,
  });
  services_store.setServicesList();
};

let search = ref("");
const paginateBySearch = async () => {
  services_store.items.services.loading_list = true;
  search.value == ""
    ? await services_store.cleanSearchFilter()
    : await services_store.addSearchFilter({
        field: "name",
        value: search.value,
      });
  services_store.setPagination({
    paginator: "services",
    search: search.value,
  });
  services_store.setServicesList();
};
const createServices = () => {
  services_store.setFormMode("create_update_services", "create");
  emit("onDisplayPage", {
    page_to_show: "#create-update-services",
  });
};
const seeServices = (item, index) => {
  services_store.setFormMode("create_update_services", "update");
  services_store.setSelectedItem("services", item);
  services_store.setSelectedItemIndex("services", index);
  emit("onDisplayPage", {
    page_to_show: "#create-update-services",
  });
};

const closeServicesModal = () => {
  services_store.setModal("");
  services_store.setModalTitle("");
  services_store.setFormMode("create_update_services", "");
  services_store.setSelectedItem("services", {});
  services_store.setSelectedItemIndex("services", -1);
};
onMounted(() => {});
</script>

<script>
export default {
  name: "ListComponent",
};
</script>
