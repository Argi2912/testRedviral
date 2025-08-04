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
          {{ users_store.module_name }}
        </h1>
        <!--end::Title-->
        <!--begin::Breadcrumb-->
        <ul
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
        >
          <!--begin::Item-->
          <li class="breadcrumb-item text-muted">
            <a class="text-muted text-hover-primary">{{
              users_store.module_name
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
            :permission-tag="'list_users'"
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
            <span v-show="selected_items.length == 0">
              <Forbidden
                style="float: left"
                :permission-tag="'list_users'"
                :user-permissions="auth_store.getProperty('role').permissions"
              >
                <span class="dropdown mx-2">
                  <button
                    class="btn btn-sm btn-light btn-active-light-primary"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Seleccionar rol
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
                      <a href="#" class="menu-link px-3" @click="listAllUsers"
                        >Todos</a
                      >
                    </li>
                    <li
                      class="menu-item"
                      v-for="(role, i) in roles_store.getSimpeList()"
                      :key="'role_' + i"
                    >
                      <a
                        href="#"
                        class="menu-link px-3"
                        @click="filterListByRol(role)"
                        >{{ role.name }}</a
                      >
                    </li>
                  </ul>
                </span>
              </Forbidden>

              <Forbidden
                style="float: left"
                :permission-tag="'create_users'"
                :user-permissions="auth_store.getProperty('role').permissions"
              >
                <button
                  @click="createUsers()"
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#main-modal"
                >
                  Agregar
                </button>
              </Forbidden>
            </span>
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
        <!--begin::Table container-->
        <Forbidden
          show-image
          text="No tiene permisos para ver la lista de usuarios"
          :permission-tag="'list_users'"
          :user-permissions="auth_store.getProperty('role').permissions"
        >
          <div v-if="!users_store.items.users.loading_list">
            <div v-if="users_store.items.users.list.length > 0">
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
                      <th class="min-w-125px">Nombre</th>
                      <th class="min-w-125px">Email</th>
                      <th class="min-w-125px">Teléfono</th>
                      <th class="min-w-125px">Rol</th>
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
                      v-for="(item, i) in users_store.items.users.list"
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
                        <a class="text-gray-800 text-hover-primary mb-1">{{
                          cutText(item.name + " " + item.lastname, 12)
                        }}</a>
                      </td>
                      <!--end::Name=-->
                      <!--begin::Email=-->
                      <td>
                        <a class="text-gray-600 text-hover-primary mb-1">{{
                          cutText(item.email, 12)
                        }}</a>
                      </td>
                      <!--end::Email=-->
                      <!--begin::Company=-->
                      <td>{{ cutText(item.phone, 12) }}</td>
                      <td>{{ item.role.name }}</td>
                      <!--end::Company=-->
                      <!--begin::Payment method=-->
                      <td>
                        <Badge
                          :text="
                            item.status == 'active' ? 'activo' : 'inactivo'
                          "
                          :background="
                            item.status == 'active' ? 'green' : 'red'
                          "
                        />
                      </td>
                      <!--end::Payment method=-->
                      <!--begin::Date=-->
                      <td>{{ cutText(parseDate(item.created_at), 12) }}</td>
                      <!--end::Date=-->
                      <!--begin::Action=-->

                      <td class="text-end">
                        <Forbidden
                          text-align="right"
                          text="No tiene permiso para realizar acciones"
                          :permission-tags="[
                            'show_users',
                            'update_users',
                            'delete_users',
                            'create_transactions',
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
                                :permission-tag="'show_users'"
                                :user-permissions="
                                  auth_store.getProperty('role').permissions
                                "
                              >
                                <li class="menu-item">
                                  <a
                                    href="#"
                                    @click="seeUsers(item, i)"
                                    class="menu-link px-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#main-modal"
                                    >Ver</a
                                  >
                                </li>
                              </Forbidden>
                              <Forbidden
                                :permission-tag="'update_users'"
                                :user-permissions="
                                  auth_store.getProperty('role').permissions
                                "
                              >
                                <li class="menu-item">
                                  <a
                                    href="#"
                                    @click="updateUsers(item, i)"
                                    class="menu-link px-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#main-modal"
                                    >Actualizar</a
                                  >
                                </li>
                              </Forbidden>
                              <Forbidden
                                :permission-tag="'delete_users'"
                                :user-permissions="
                                  auth_store.getProperty('role').permissions
                                "
                              >
                                <li class="menu-item">
                                  <a
                                    href="#"
                                    class="menu-link px-3"
                                    @click="deleteUsers(item, item.id)"
                                    >Eliminar</a
                                  >
                                </li>
                              </Forbidden>
                              <Forbidden
                                :permission-tag="'show_users'"
                                :user-permissions="
                                  auth_store.getProperty('role').permissions
                                "
                              >
                                <li class="menu-item" v-if="item.role.id == 2">
                                  <a
                                    href="#"
                                    class="menu-link px-3"
                                    @click="userDetails(item, item.id)"
                                    >Detalles</a
                                  >
                                </li>
                              </Forbidden>
                              <Forbidden
                                :permission-tag="'create_transactions'"
                                :user-permissions="
                                  auth_store.getProperty('role').permissions
                                "
                              >
                                <!-- <li class="menu-item" v-if="item.role.id == 2">
                                  <a
                                    href="#"
                                    class="menu-link px-3"
                                    @click="devolution(item, item.id)"
                                    >Devolucion</a
                                  >
                                </li> -->
                                <li class="menu-item" v-if="item.role.id == 2">
                                  <a
                                    href="#"
                                    class="menu-link px-3"
                                    @click="addBalance(item, item.id)"
                                    >Agregar saldo</a
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
                      Math.ceil(users_store.items.users.paginator.total_pages) >
                      1
                    "
                    :key="users_store.items.users.paginator.key"
                    @onChangePage="onChangePage"
                    :items-per-page="
                      users_store.items.users.paginator.items_per_page
                    "
                    :max-buttons="5"
                    :total-items="users_store.items.users.paginator.total_items"
                    :total-pages="
                      Math.ceil(users_store.items.users.paginator.total_pages)
                    "
                    :current-page="
                      users_store.items.users.paginator.current_page
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
    <HeaderModal
      @onClose="closeUsersModal()"
      :show="users_store.modal != ''"
      :title="users_store.modal_title"
      :is-static="true"
      :scrollable="true"
    >
      <template #body>
        <UsersForm v-if="users_store.forms.create_update_users != ''" />
        <TransactionsForm v-if="users_store.forms.transactions != ''" />
      </template>
    </HeaderModal>
    <!--end::Modals-->
  </div>
</template>
<script setup>
import { useUsersStore } from "../stores/index.js";
import UsersForm from "./UsersForm.vue";
import TransactionsForm from "./TransactionsForm.vue";
import Paginator from "@/components/paginator/Paginator.vue";
import { parseDate, cutText } from "@/utils/Functions.js";
import { inject, onMounted, reactive, ref } from "vue-demi";
import { confirm } from "@/utils/Swals.js";
import { useRolesStore } from "../../roles/stores/index.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";

const auth_store = useAuthStore();
const emit = defineEmits(["onDisplayPage"]);

const roles_store = useRolesStore();
const swal = inject("$swal");
const users_store = useUsersStore();

let selected_items = ref([]);

const devolution = (item, index) => {
  users_store.setSelectedItem("users", item);
  users_store.setSelectedItemIndex("users", index);
  users_store.setModal("transaction");
  users_store.setModalTitle("Retirar");
  users_store.setFormMode("transactions", "devolution");
};
const addBalance = (item, index) => {
  users_store.setSelectedItem("users", item);
  users_store.setSelectedItemIndex("users", index);
  users_store.setModal("transaction");
  users_store.setModalTitle("Agregar saldo");
  users_store.setFormMode("transactions", "add_balance");
};
const deleteMany = () => {
  confirm(
    swal,
    "¿Está seguro que desea eliminar los elementos seleccionados?",
    () => {
      console.log("eliminar items", selected_items.value);
    }
  );
};

const deleteUsers = (item, id) => {
  users_store.setSelectedItem("users", item);
  confirm(swal, "¿Está seguro que desea eliminar este elemento?", () => {
    users_store.deleteUsers(id);
  });
};

const checkUncheckAll = (v) => {
  if (v.target.checked) {
    selected_items.value = [];
    users_store.items.users.list.map((item) => {
      selected_items.value.push(item.id);
    });
  } else {
    selected_items.value = [];
  }
};
const onChangePage = (a) => {
  users_store.setPagination({
    paginator: "users",
    current_page: a,
  });
  users_store.setUsersList();
};
let items_per_page = ref(users_store.items.users.paginator.items_per_page);

const changeItemsPerPage = () => {
  users_store.setPagination({
    paginator: "users",
    items_per_page: items_per_page.value,
    current_page: 1,
  });
  users_store.setUsersList();
};

let search = ref("");
let selected_role = reactive({});
const paginateBySearch = async () => {
  users_store.items.users.loading_list = true;
  search.value == ""
    ? await users_store.cleanSearchFilter()
    : await users_store.addSearchFilter({
        field: "name",
        value: search.value,
      });

  users_store.setPagination({
    paginator: "users",
    search: search.value,
  });
  users_store.listUsersByRol(selected_role);
};
const createUsers = () => {
  users_store.setModal("create_users");
  users_store.setModalTitle("Agregar users");
  users_store.setFormMode("create_update_users", "create");
};
const seeUsers = (item, index) => {
  users_store.setModal("see_users");
  users_store.setModalTitle("Ver datos de users");
  users_store.setFormMode("create_update_users", "see");
  users_store.setSelectedItem("users", item);
  users_store.setSelectedItemIndex("users", index);
};

const updateUsers = (item, index) => {
  users_store.setModal("update_users");
  users_store.setModalTitle("Editar users");
  users_store.setFormMode("create_update_users", "update");
  users_store.setSelectedItem("users", item);
  users_store.setSelectedItemIndex("users", index);
};

const userDetails = (item, index) => {
  users_store.setSelectedItem("users", item);
  users_store.setSelectedItemIndex("users", index);
  roles_store.setSelectedItemIndex("roles", index);
  emit("onDisplayPage", {
    page_to_show: "#client-details",
  });
};

const closeUsersModal = () => {
  users_store.setModal("");
  users_store.setModalTitle("");
  users_store.setFormMode("create_update_users", "");
  users_store.setFormMode("transactions", "");
  users_store.setSelectedItem("users", {});
  users_store.setSelectedItemIndex("users", -1);
};

const init = async () => {
  await roles_store.getAllRoles();
  console.log(roles_store.getSimpeList());
};

const filterListByRol = async (role) => {
  users_store.items.users.loading_list = true;
  users_store.setPagination({
    paginator: "users",
    current_page: 1,
  });
  selected_role = role;
  users_store.listUsersByRol(role);
};
const listAllUsers = () => {
  selected_role = {};
  paginateBySearch();
};
onMounted(() => {
  console.log(users_store.items.users.selected_item);

  init();
});
</script>

<script>
export default {
  name: "ListComponent",
};
</script>
