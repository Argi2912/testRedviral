<template>
  <HeaderModal
    @onClose="closeRolesModal()"
    :show="roles_store.modal != ''"
    :title="roles_store.modal_title"
    :is-static="true"
    :scrollable="true"
    size="lg"
  >
    <template #body>
      <RolesForm v-if="roles_store.forms.create_update_roles != ''" />
    </template>
  </HeaderModal>
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
          {{ roles_store.module_name }}
        </h1>
        <!--end::Title-->
        <!--begin::Breadcrumb-->
        <ul
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
        >
          <!--begin::Item-->
          <li class="breadcrumb-item text-muted">
            <a class="text-muted text-hover-primary">{{
              roles_store.module_name
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

  <div id="kt_app_content" class="app-content flex-column-fluid pt-8">
    <div class="row">
      <div class="col">
        <input
          type="text"
          data-kt-customer-table-filter="search"
          class="form-control w-250px ps-15"
          placeholder="Buscar"
          v-model="search"
          @keyup="paginateBySearch"
        />
      </div>
    </div>
    <Forbidden
      show-image
      text="No tiene permiso para listar los roles."
      :permission-tag="'list_roles'"
      :user-permissions="auth_store.getProperty('role').permissions"
    >
      <div v-if="!roles_store.items.roles.loading_list">
        <div v-if="roles_store.items.roles.list.length > 0">
          <div class="row row-cols-2 row-cols-lg-4 mt-4">
            <div
              class="col mt-4"
              v-for="(role, i) in roles_store.items.roles.list"
              :key="'role_' + role.id"
            >
              <RoleCard
                :key="Math.floor(Math.random() * 100)"
                :role="role"
                @onSeeUsers="seeUsers(role, i)"
                @onEditRoles="editRoles(role, i)"
              />
            </div>
            <Forbidden
              :permission-tag="'create_roles'"
              :user-permissions="auth_store.getProperty('role').permissions"
            >
              <div class="col mt-4">
                <div class="card h-md-100">
                  <!--begin::Card body-->
                  <div class="card-body d-flex flex-center">
                    <!--begin::Button-->
                    <button
                      type="button"
                      class="btn btn-clear d-flex flex-column flex-center"
                      @click="createRoles"
                    >
                      <!--begin::Illustration-->
                      <img
                        src="/assets/media/illustrations/sketchy-1/4.png"
                        alt=""
                        class="mw-100 mh-150px mb-7"
                      />
                      <!--end::Illustration-->
                      <!--begin::Label-->
                      <div
                        class="fw-bold fs-3 text-gray-600 text-hover-primary"
                      >
                        Agregar nuevo rol
                      </div>
                      <!--end::Label-->
                    </button>
                    <!--begin::Button-->
                  </div>
                  <!--begin::Card body-->
                </div>
              </div>
            </Forbidden>
          </div>
          <div class="mt-6 pb-6">
            <div style="float: left">
              <select
                name="kt_customers_table_length"
                aria-controls="kt_customers_table"
                class="form-select form-select-sm"
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
                  Math.ceil(roles_store.items.roles.paginator.total_pages) > 1
                "
                :key="roles_store.items.roles.paginator.key"
                @onChangePage="onChangePage"
                :items-per-page="
                  roles_store.items.roles.paginator.items_per_page
                "
                :max-buttons="5"
                :total-items="roles_store.items.roles.paginator.total_items"
                :total-pages="
                  Math.ceil(roles_store.items.roles.paginator.total_pages)
                "
                :current-page="roles_store.items.roles.paginator.current_page"
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
  </div>
</template>
<script setup>
import { useRolesStore } from "../stores/index.js";

import RolesForm from "../pages/RolesForm.vue";
import Paginator from "@/components/paginator/Paginator.vue";
import { inject, onMounted, ref } from "vue-demi";
import { parseDate, cutText, validatePermission } from "@/utils/Functions.js";
import { confirm } from "@/utils/Swals.js";
import RoleCard from "../components/RoleCard.vue";
import { useAuthStore } from "@/modules/auth/stores/store.js";

const auth_store = useAuthStore();
const swal = inject("$swal");
const roles_store = useRolesStore();

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

const deleteRoles = (item, id) => {
  roles_store.setSelectedItem("roles", item);
  confirm(swal, "¿Está seguro que desea eliminar este elemento?", () => {
    roles_store.deleteRoles(id);
  });
};

const checkUncheckAll = (v) => {
  if (v.target.checked) {
    selected_items.value = [];
    roles_store.items.roles.list.map((item) => {
      selected_items.value.push(item.id);
    });
  } else {
    selected_items.value = [];
  }
};
const onChangePage = (a) => {
  roles_store.items.roles.loading_list = true;
  roles_store.setPagination({
    paginator: "roles",
    current_page: a,
  });
  roles_store.setRolesList();
};
let items_per_page = ref(roles_store.items.roles.paginator.items_per_page);

const changeItemsPerPage = () => {
  roles_store.items.roles.loading_list = true;
  roles_store.setPagination({
    paginator: "roles",
    items_per_page: items_per_page.value,
    current_page: 1,
  });
  roles_store.setRolesList();
};

let search = ref("");
const paginateBySearch = async () => {
  roles_store.items.roles.loading_list = true;
  search.value == ""
    ? await roles_store.cleanSearchFilter()
    : await roles_store.addSearchFilter({
        field: "name",
        value: search.value,
      });
  roles_store.setPagination({
    paginator: "roles",
    current_page: 1,
    search: search.value,
  });
  await roles_store.setRolesList();
  roles_store.cleanSearchFilter();
};
const createRoles = () => {
  roles_store.setFormMode("create_update_roles", "create");
  roles_store.setModal("create_update_roles");
  roles_store.setModalTitle("Crear nuevo rol");
};
const editRoles = (item, index) => {
  roles_store.setFormMode("create_update_roles", "update");
  roles_store.setSelectedItem("roles", item);
  roles_store.setSelectedItemIndex("roles", index);
  roles_store.setModal("create_update_roles");
  roles_store.setModalTitle("Editar rol");
};
const seeUsers = (item, index) => {
  roles_store.setSelectedItem("roles", item);
  roles_store.setSelectedItemIndex("roles", index);
  emit("onDisplayPage", {
    page_to_show: "#users",
  });
};

const closeRolesModal = () => {
  roles_store.setModal("");
  roles_store.setModalTitle("");
  roles_store.setFormMode("create_update_roles", "");
  roles_store.setSelectedItem("roles", {});
  roles_store.setSelectedItemIndex("roles", -1);
};
onMounted(() => {});
</script>

<script>
export default {
  name: "ListComponent",
};
</script>
