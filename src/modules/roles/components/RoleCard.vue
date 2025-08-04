<template>
  <div class="card card-flush">
    <!--begin::Card header-->
    <div class="card-header">
      <!--begin::Card title-->
      <div class="card-title">
        <h2>{{ role.name }}</h2>
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->
    <!--begin::Card body-->
    <div class="card-body pt-1">
      <!--begin::Users-->
      <ShowResults
        :results="total_modules > 0"
        show-image
        width="200"
        text="Este rol no tiene permisos agregados"
      >
        <div class="fw-bold text-gray-600 mb-5">
          Total de módulos: {{ total_modules }}
        </div>
        <!--end::Users-->
        <!--begin::Permissions-->
        <div class="d-flex flex-column text-gray-600">
          <div
            class="d-flex align-items-center py-2"
            v-for="(permission, j) in permissions"
            :key="'permission_' + j"
          >
            <span class="bullet bg-primary me-3"></span>{{ permission }}
          </div>
        </div>
        <!--end::Permissions-->
      </ShowResults>
    </div>
    <!--end::Card body-->
    <!--begin::Card footer-->

    <div class="card-footer flex-wrap pt-0" v-if="displayButtons">
      <Forbidden
        :permission-tags="['update_roles', 'rolepms_roles']"
        :user-permissions="auth_store.getProperty('role').permissions"
      >
        <a
          class="btn btn-light btn-active-primary my-1 me-2"
          @click="onEditRoles"
          >Ver permisos</a
        >
      </Forbidden>
      <Forbidden
        :permission-tag="'list_users'"
        :user-permissions="auth_store.getProperty('role').permissions"
      >
        <button
          class="btn btn-light btn-active-primary my-1 me-2"
          type="button"
          @click="onSeeUsers"
        >
          Usuarios
        </button>
      </Forbidden>
    </div>

    <!--end::Card footer-->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue-demi";
import { useAuthStore } from "@/modules/auth/stores/store.js";
const auth_store = useAuthStore();

const props = defineProps({
  role: {
    type: Object,
    default: {},
  },
  displayButtons: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["onEditRoles", "onSeeUsers"]);
const onEditRoles = () => {
  emit("onEditRoles");
};
const onSeeUsers = () => {
  emit("onSeeUsers");
};
let total_modules = ref(0);
let permissions = ref([]);

const init = () => {
  let _groups = [];
  let active_permission_detected = false;

  props.role.permissions.map((permission) => {
    if (
      _groups.indexOf(permission.group) == -1 &&
      !active_permission_detected
    ) {
      if (permission.status == "active") {
        _groups.push(permission.group);
        active_permission_detected = true;
      }
    }
    if (_groups.indexOf(permission.group) == -1 && active_permission_detected)
      active_permission_detected = false;
  });
  total_modules.value = _groups.length;

  let aux_array = _groups.slice(0, 5);
  if (_groups.length > 5) {
    aux_array.push("y " + (_groups.length - 5) + " más...");
  }
  permissions.value = aux_array;
};

onMounted(() => {
  init();
});
</script>

<style></style>
