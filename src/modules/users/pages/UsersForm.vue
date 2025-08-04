<template>
  <div>
    <div class="fv-row mb-7">
      <Rerender :props="image_url">
        <ImagePicker
          :image-url="image_url"
          @onAddImage="addImage"
          @onRemoveImage="removeImage"
        />
      </Rerender>
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Nombre</label>

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.name"
        placeholder="Nombre"
        :readonly="users_store.forms.create_update_users == 'see'"
      />
      <ValidationFormMessages
        v-if="errors['name']"
        :validation="errors['name']"
        lang="es"
        field="name"
      />
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Apellido</label>
      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.last_name"
        placeholder="Apellido"
        :readonly="users_store.forms.create_update_users == 'see'"
      />
      <ValidationFormMessages
        v-if="errors['last_name']"
        :validation="errors['last_name']"
        lang="es"
        field="last_name"
      />
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Email</label>
      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.email"
        placeholder="Email"
        :readonly="users_store.forms.create_update_users == 'see'"
      />
      <ValidationFormMessages
        v-if="errors['email']"
        :validation="errors['email']"
        lang="es"
        field="email"
      />
    </div>

    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Teléfono</label>

      <input
        type="number"
        class="form-control form-control-solid"
        v-model="form_state.phone"
        placeholder="Teléfono"
        :readonly="users_store.forms.create_update_users == 'see'"
      />
      <ValidationFormMessages
        v-if="errors['phone']"
        :validation="errors['phone']"
        lang="es"
        field="phone"
      />
    </div>
    <div class="fv-row mb-7">
      <label class="form-check form-switch form-check-custom form-check-solid">
        <input
          class="form-check-input"
          v-model="form_state.is_client"
          type="checkbox"
          :checked="form_state.is_client"
          :disabled="users_store.forms.create_update_users == 'see'"
        />
        <span
          class="form-check-label fw-semibold text-muted"
          for="core_modal_billing"
          >{{ form_state.is_client ? "Es cliente" : "No es cliente" }}</span
        >
      </label>
    </div>
    <span v-if="form_state.is_client">
      <div class="fv-row mb-7">
        <div class="d-flex flex-column mb-7 fv-row">
          <label class="fs-6 fw-semibold mb-2">
            <span class="required">Sexo</span>
          </label>

          <select
            v-model="form_state.gender"
            class="form-select form-select-solid fw-bold"
            :disabled="users_store.forms.create_update_users == 'see'"
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <ValidationFormMessages
          v-if="errors['gender']"
          :validation="errors['gender']"
          lang="es"
          field="gender"
        />
      </div>
      <div class="fv-row mb-7">
        <div class="row">
          <div class="col">
            <div class="d-flex flex-column mb-7 fv-row">
              <label class="fs-6 fw-semibold mb-2">
                <span class="required">País</span>
              </label>

              <select
                v-model="form_state.country"
                class="form-select form-select-solid fw-bold"
                :disabled="users_store.forms.create_update_users == 'see'"
              >
                <option
                  v-for="(country, k) in countries"
                  :key="'country_' + k"
                  :value="k"
                >
                  {{ k }}
                </option>
              </select>
              <ValidationFormMessages
                v-if="errors['country']"
                :validation="errors['country']"
                lang="es"
                field="country"
              />
            </div>
          </div>
          <div class="col">
            <div class="d-flex flex-column mb-7 fv-row">
              <label class="fs-6 fw-semibold mb-2">
                <span class="required">Ciudad</span>
              </label>

              <select
                v-model="form_state.city"
                class="form-select form-select-solid fw-bold"
                :disabled="users_store.forms.create_update_users == 'see'"
              >
                <option
                  v-for="(city, l) in cities"
                  :key="'city_' + l"
                  :value="city"
                >
                  {{ city }}
                </option>
              </select>
              <ValidationFormMessages
                v-if="errors['city']"
                :validation="errors['city']"
                lang="es"
                field="city"
              />
            </div>
          </div>
        </div>
      </div>
    </span>
    <div class="fv-row mb-7">
      <div class="row">
        <div class="col">
          <label class="required fs-6 fw-semibold mb-2">Contraseña</label>

          <input
            type="password"
            class="form-control form-control-solid"
            v-model="form_state.password"
            placeholder="Contraseña"
            :readonly="users_store.forms.create_update_users == 'see'"
          />
          <ValidationFormMessages
            v-if="errors['password']"
            :validation="errors['password']"
            lang="es"
            field="password"
          />
        </div>
        <div class="col">
          <label class="required fs-6 fw-semibold mb-2"
            >Confirmar contraseña</label
          >

          <input
            type="password"
            class="form-control form-control-solid"
            v-model="form_state.confirm_password"
            placeholder="Confirmar contraseña"
            :readonly="users_store.forms.create_update_users == 'see'"
          />
          <ValidationFormMessages
            v-if="errors['confirm_password']"
            :validation="errors['confirm_password']"
            lang="es"
            field="confirm_password"
          />
        </div>
      </div>
    </div>

    <div class="fv-row mb-7" v-if="!form_state.is_client">
      <div class="d-flex flex-column mb-7 fv-row">
        <label class="fs-6 fw-semibold mb-2">
          <span class="required">Rol</span>
        </label>
        <div v-if="roles_store.items.roles.simple_list.length == 0">
          ... cargando roles ...
        </div>
        <div v-else>
          <select
            v-model="form_state.role"
            class="form-select form-select-solid fw-bold"
            :disabled="users_store.forms.create_update_users == 'see'"
          >
            <option
              v-for="(role, i) in roles_store.items.roles.simple_list"
              :key="'role_' + i"
              :value="role.id"
            >
              {{ role.name }}
            </option>
          </select>
        </div>
        <ValidationFormMessages
          v-if="errors['role']"
          :validation="errors['role']"
          lang="es"
          field="role"
        />
      </div>
    </div>

    <div align="right">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="closeModal()"
      >
        Cerrar
      </button>
      <button
        v-if="users_store.forms.create_update_users != 'see'"
        @click="handleSubmit()"
        type="button"
        class="btn btn-primary mx-4"
      >
        Guardar
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed, inject, onMounted, reactive, ref, watch } from "vue-demi";
import { useUsersStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useRolesStore } from "../../roles/stores/index.js";
import { countries } from "../config/countries.js";
const swal = inject("$swal");
const users_store = useUsersStore();
const roles_store = useRolesStore();
let errors = reactive({});

const addImage = (file, file_url) => {
  form_state.photo = file;
  image_url.value = file_url;
};

const removeImage = () => {
  form_state.photo = null;
  image_url.value = "";
};

const emit = defineEmits(["onClose"]);

const closeModal = () => {
  emit("onClose");
};
const setErrors = (err) => {
  for (let i in errors) {
    errors[i] = undefined;
  }
  err.map((x) => {
    errors[x.$property] = x.$validator;
  });
  console.log(errors);
};

let isNotClient = computed(() => {
  return !form_state.is_client;
});
let isClient = computed(() => {
  return form_state.is_client;
});
let formModeIsCreate = computed(() => {
  return users_store.forms.create_update_users == "create";
});

let form_state = reactive({
  name: "",
  last_name: "",
  email: "",
  phone: "",
  gender: "",
  city: "",
  country: "",
  is_client: false,
  password: "",
  photo: null,
  confirm_password: "",
  role: "1",
  is_active: true,
});

watch(() => {
  //si el rol es 'cliente'
  if (form_state.role == 2) {
    form_state.is_client = true;
  }
});
watch(() => {
  //si el rol es 'cliente'
  if (!form_state.is_client) {
    form_state.role = 1;
  } else {
    form_state.role = 2;
  }
});
let cities = ref([]);
watch(form_state, (f_s) => {
  cities.value = countries[f_s.country];
});

const rules = {
  name: { required },
  last_name: { required },
  email: { required },
  phone: { required },
  gender: { required: requiredIf(isClient) },
  country: { required: requiredIf(isClient) },
  city: { required: requiredIf(isClient) },
  password: { required: requiredIf(formModeIsCreate) },
  confirm_password: { required: requiredIf(formModeIsCreate) },
  role: { required: requiredIf(isNotClient) },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }

  users_store.forms.create_update_users == "create"
    ? users_store.createUsers(form_state)
    : users_store.updateUsers(
        form_state,
        users_store.items.users.selected_item.id
      );
};
let image_url = ref("");
const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES

  if (users_store.items.users.selected_item.photo != "null") {
    form_state.photo = users_store.items.users.selected_item.photo;
    image_url.value = users_store.items.users.selected_item.photo;
  }
  form_state.name = users_store.items.users.selected_item.name;
  form_state.last_name = users_store.items.users.selected_item.lastname;
  form_state.email = users_store.items.users.selected_item.email;
  form_state.phone = users_store.items.users.selected_item.phone;
  form_state.gender = users_store.items.users.selected_item.gender;
  form_state.is_client =
    users_store.items.users.selected_item.is_client == "true";
  form_state.country = users_store.items.users.selected_item.country;
  form_state.role = users_store.items.users.selected_item.role.id;
  form_state.city = users_store.items.users.selected_item.city;
};

onMounted(() => {
  if (users_store.forms.create_update_users != "create") setForm();
});
</script>

<script>
export default {
  name: "UsersFormComponent",
};
</script>
