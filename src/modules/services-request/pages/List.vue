<template>
  <div>
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
            {{ services_request_store.module_name }}
          </h1>
          <ul
            class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
          >
            <li class="breadcrumb-item text-muted">
              <a class="text-muted text-hover-primary">{{
                services_request_store.module_name
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

    <div id="kt_app_content" class="app-content flex-column-fluid">
      <div class="card">
        <div class="card-header border-0 pt-6">
          <div class="card-title">
            <Forbidden
              :permission-tag="'list_requests'"
              :user-permissions="auth_store.getProperty('role').permissions"
            >
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
                <input
                  type="text"
                  class="form-control form-control-solid w-250px ps-15"
                  placeholder="Buscar"
                  v-model="search"
                  @keyup="paginateBySearch"
                />
              </div>
            </Forbidden>
          </div>
          <div
            class="card-toolbar d-flex justify-content-end"
            data-kt-customer-table-toolbar="base"
          >
            <div v-show="selected_items.length === 0">
              <Forbidden
                :permission-tag="'create_requests'"
                :user-permissions="auth_store.getProperty('role').permissions"
              >
                <button
                  @click="createServicesRequest()"
                  type="button"
                  class="btn btn-primary"
                >
                  Agregar
                </button>
              </Forbidden>
            </div>
            <div v-show="selected_items.length > 0">
              <div class="d-flex justify-content-end align-items-center">
                <div class="fw-bold me-5">
                  <span class="me-2">{{ selected_items.length }}</span
                  >Seleccionados
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
          </div>
        </div>

        <div class="card-body pt-0">
          <Forbidden
            show-image
            text="No tiene permisos para ver esta lista"
            :permission-tag="'list_requests'"
            :user-permissions="auth_store.getProperty('role').permissions"
          >
            <div v-if="!services_request_store.items.services_request.loading_list">
              <div v-if="services_request_store.items.services_request.list.length > 0">
                <div class="table-responsive">
                  <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                    <thead>
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
                          v-if="auth_store.getProperty('user').role !== 2"
                          class="min-w-125px"
                        >
                          Cliente
                        </th>
                        <th class="min-w-125px">Monto</th>
                        <th class="min-w-125px">Segmentación</th>
                        <th
                          v-if="auth_store.getProperty('user').role === 2"
                          class="min-w-125px"
                        >
                          Cuenta
                        </th>
                        <th class="min-w-125px">Status</th>
                        <th class="min-w-125px">Fecha</th>
                        <th class="text-end min-w-70px">Opciones</th>
                      </tr>
                    </thead>
                    <tbody class="fw-semibold text-gray-600">
                      <tr
                        v-for="(item, i) in services_request_store.items
                          .services_request.list"
                        :key="'item_' + i"
                      >
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
                        <td>
                          <div class="d-flex align-items-center">
                            <div class="d-flex justify-content-start flex-column">
                              <span
                                class="text-gray-800 text-hover-primary d-block fs-7"
                                >{{ cutText(item.items[0].service.name, 20) }}</span
                              >
                            </div>
                          </div>
                        </td>
                        <td>{{ cutText(item.items[0].service.photo, 30) }}</td>
                        <td v-if="auth_store.getProperty('user').role !== 2">
                          <div class="d-flex align-items-center">
                            <div class="d-flex justify-content-start flex-column">
                              <span class="text-gray-400 fw-semibold d-block fs-7"
                                >{{
                                  cutText(
                                    `${item.user.name} ${item.user.lastname}`,
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
                        <td>
                          {{ services_request_store.parseSegmentation(item.segmentation) }}
                        </td>
                        <td v-if="auth_store.getProperty('user').role === 2">
                          {{ item.account.name }}
                        </td>
                        <td>
                          <Badge
                            :text="item.state"
                            :background="state_color_hash_map[item.state]"
                          />
                        </td>
                        <td>{{ parseDate(item.created_at) }}</td>
                        <td class="text-end">
                          <Forbidden
                            text-align="right"
                            text="No tiene permisos para realizar acciones"
                            :permission-tags="['show_requests']"
                            :user-permissions="auth_store.getProperty('role').permissions"
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
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-6">
                  <div>
                    <select
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
                  <div>
                    <Paginator
                      v-if="
                        Math.ceil(
                          services_request_store.items.services_request.paginator.total_pages
                        ) > 1
                      "
                      :key="services_request_store.items.services_request.paginator.key"
                      @onChangePage="onChangePage"
                      :items-per-page="
                        services_request_store.items.services_request.paginator.items_per_page
                      "
                      :max-buttons="5"
                      :total-items="
                        services_request_store.items.services_request.paginator.total_items
                      "
                      :total-pages="
                        Math.ceil(
                          services_request_store.items.services_request.paginator.total_pages
                        )
                      "
                      :current-page="
                        services_request_store.items.services_request.paginator.current_page
                      "
                    />
                  </div>
                </div>
              </div>
              <div v-else class="text-center">
                <p>No se han encontrado resultados</p>
              </div>
            </div>
            <div v-else class="text-center">
              <RippleLoader />
            </div>
          </Forbidden>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useServicesRequestStore } from "../stores/index.js";
  import ServicesRequestForm from "../pages/ServicesRequestForm.vue";
  import Paginator from "@/components/paginator/Paginator.vue";
  import { inject, onMounted, ref } from "vue"; // Se importa de 'vue' en lugar de 'vue-demi'
  import { parseDate, cutText } from "@/utils/Functions.js";
  import { confirm } from "@/utils/Swals.js";
  import { useAuthStore } from "@/modules/auth/stores/store.js";
  import { numberToCurrency } from "../../../utils/Functions";
  import { state_color_hash_map } from "../config/config";
  import { watch } from "vue";

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
        console.log("Eliminando items:", selected_items.value);
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
      selected_items.value = services_request_store.items.services_request.list.map(
        (item) => item.id
      );
    } else {
      selected_items.value = [];
    }
  };

  const onChangePage = (page) => {
    services_request_store.setPagination({
      paginator: "services_request",
      current_page: page,
    });
    services_request_store.setServicesRequestList();
  };

  const items_per_page = ref(
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

  const search = ref("");

  const handleSearch = async () => {
    services_request_store.items.services_request.loading_list = true;

    await services_request_store.cleanSearchFilter();

    if (search.value !== "") {

      
      await services_request_store.addSearchFilter({
        field: "uuid",
        value: search.value,
        type_search: "like",
      });

     
      await services_request_store.addSearchFilter({
        field: "service.name", 
        value: search.value,
        type_search: "like",
      });

      await services_request_store.addSearchFilter({
        field: "service.photo", 
        value: search.value,
        type_search: "like",
      });
    }

    services_request_store.setPagination({
      paginator: "services_request",
      current_page: 1,
    });

    services_request_store.setServicesRequestList();
  };

  let searchTimeout = null;
  watch(search, (newValue) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(() => {
      handleSearch();
    }, 500); // 500ms de retraso para evitar llamadas excesivas a la API
  });

  const createServicesRequest = () => {
    services_request_store.setFormMode("create_update_services_request", "create");
    emit("onDisplayPage", {
      page_to_show: "#create-update-services-request",
    });
  };

  const seeServicesRequest = (item, index) => {
    services_request_store.setFormMode("create_update_services_request", "update");
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