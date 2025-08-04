<template>
  <div class="d-flex flex-column scroll-y me-n7 pe-7" style="max-height: 675px">
    <!--begin::Input group-->
    <Forbidden
      text="No tiene permiso para cambiar nombres de roles."
      :permission-tag="'update_roles'"
      :user-permissions="auth_store.getProperty('role').permissions"
    >
      <div class="fv-row mb-10 fv-plugins-icon-container">
        <!--begin::Label-->
        <label class="fs-5 fw-bold form-label mb-2">
          <span class="required">Nombre</span>
        </label>
        <!--end::Label-->
        <!--begin::Input-->
        <input
          class="form-control form-control-solid"
          v-model="form_state.name"
        />
        <ValidationFormMessages
          v-if="errors['name']"
          :validation="errors['name']"
          lang="es"
          field="name"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container invalid-feedback"></div>
        <button
          @click="handleSubmit"
          class="btn btn-sm mt-2"
          :class="[
            roles_store.forms.create_update_roles == 'create' && 'btn-success',
            roles_store.forms.create_update_roles == 'update' && 'btn-primary',
          ]"
          style="float: right"
        >
          {{
            roles_store.forms.create_update_roles == "create"
              ? "Guardar"
              : "Actualizar"
          }}
        </button>
      </div>
    </Forbidden>
    <!--end::Input group-->
    <!--begin::Permissions-->
    <div
      class="fv-row"
      v-if="roles_store.forms.create_update_roles == 'update'"
    >
      <Forbidden
        text="No tiene permiso para asignar o remover permisos a los roles."
        :permission-tag="'rolepms_roles'"
        :user-permissions="auth_store.getProperty('role').permissions"
      >
        <!--begin::Label-->
        <label class="fs-5 fw-bold form-label mb-2">Permisos del rol</label>
        <!--end::Label-->
        <!--begin::Table wrapper-->
        <Hoping :loading="permissions.length == 0">
          <div class="table-responsive">
            <!--begin::Table-->
            <table class="table align-middle table-row-dashed fs-6 gy-5">
              <!--begin::Table body-->
              <tbody class="text-gray-600 fw-semibold">
                <!--begin::Table row-->
                <tr
                  v-for="(permission, j) in permissions"
                  :key="'permission_' + j"
                >
                  <!--begin::Label-->
                  <td class="text-gray-800">{{ j }}</td>
                  <!--end::Label-->
                  <!--begin::Input group-->
                  <td>
                    <!--begin::Wrapper-->
                    <div class="d-flex">
                      <!--begin::Checkbox-->
                      <div class="row row-cols-3">
                        <div
                          class="col mt-3"
                          v-for="(action, i) in permission"
                          :key="i"
                        >
                          <label
                            class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              :value="action.id"
                              :checked="roleHasThisPermission(action)"
                              @change="addRemovePermission"
                            />
                            <span class="form-check-label">{{
                              action.name
                            }}</span>
                          </label>
                        </div>
                      </div>
                      <!--end::Checkbox-->
                    </div>
                    <!--end::Wrapper-->
                  </td>
                  <!--end::Input group-->
                </tr>
                <!--end::Table row-->
              </tbody>
              <!--end::Table body-->
            </table>
            <!--end::Table-->
          </div>
        </Hoping>
      </Forbidden>
      <!--end::Table wrapper-->
    </div>
    <!--end::Permissions-->
  </div>
</template>
<script setup>
import { inject, onMounted, reactive, ref } from "vue-demi";
import { useRolesStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useAuthStore } from "@/modules/auth/stores/store.js";

const auth_store = useAuthStore();
const roleHasThisPermission = (selected_permission) => {
  for (let i = 0; i < current_role_permissions.value.length; i++) {
    let role_has_this_permission_and_is_active =
      selected_permission.id == current_role_permissions.value[i].id &&
      current_role_permissions.value[i].status == "active";
    if (role_has_this_permission_and_is_active) {
      return true;
    }
  }
  return false;
};

const swal = inject("$swal");
const roles_store = useRolesStore();
let errors = reactive({});
const setErrors = (err) => {
  for (let i in errors) {
    errors[i] = undefined;
  }
  err.map((x) => {
    errors[x.$property] = x.$validator;
  });
  console.log(errors);
};

const addRemovePermission = (input) => {
  roles_store.setPermissionToCurrentRol({
    permission_id: input.target.value,
    state: input.target.checked + "",
  });
};

let form_state = reactive({
  name: "",
  is_active: true,
});

const rules = {
  name: { required },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }
  if (roles_store.forms.create_update_roles == "create") {
    await roles_store.createRoles(form_state);
    current_role_permissions.value = roles_store.getSelectedItem("roles");
    console.log(current_role_permissions.value);
  } else {
    await roles_store.updateRoles(
      form_state,
      roles_store.items.roles.selected_item.id
    );
  }
};

const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  let _selected_role = roles_store.getSelectedItem("roles");
  form_state.name = _selected_role.name;
  current_role_permissions.value = _selected_role.permissions;
};

const emit = defineEmits(["onDisplayPage"]);

const goToList = () => {
  roles_store.setFormMode("create_update_roles", "");
  emit("onDisplayPage", {
    page_to_show: "#list",
  });
};
let permissions = ref([]);
let current_role_permissions = ref([]);
const init = async () => {
  permissions.value = await roles_store.getPermissions();
};
onMounted(() => {
  if (roles_store.forms.create_update_roles != "create") setForm();
  init();
});
</script>

<script>
export default {
  name: "RolesFormComponent",
};
</script>
