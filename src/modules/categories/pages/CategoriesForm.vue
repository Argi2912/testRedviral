<template>
  <div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Nombre</label>

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.name"
        placeholder="Nombre"
        :readonly="categories_store.forms.create_update_categories == 'see'"
      />
      <ValidationFormMessages
        v-if="errors['name']"
        :validation="errors['name']"
        lang="es"
        field="name"
      />
    </div>

    <div class="fv-row mb-7">
      <div class="d-flex flex-column mb-7 fv-row">
        <label class="fs-6 fw-semibold mb-2">
          <span class="required">Tipo</span>
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
          ></i>
        </label>

        <select
          v-model="form_state.category_type"
          class="form-select form-select-solid fw-bold"
          :disabled="categories_store.forms.create_update_categories == 'see'"
        >
          <option value="service">Servicio</option>
          <option value="faqs">FAQS</option>
        </select>
        <ValidationFormMessages
          v-if="errors['category_type']"
          :validation="errors['category_type']"
          lang="es"
          field="category_type"
        />
      </div>
    </div>

    <div class="fv-row mb-7" v-if="form_state.category_type == 'service'">
      <Tab
        @onChangeTab="onChangeTab"
        :tabs="[
          { label: 'Selecionar', id: 'select' },
          { label: 'Subir', id: 'upload' },
        ]"
        :selected-tab="selected_tab"
        :readonly="categories_store.forms.create_update_categories == 'see'"
        :key="selected_tab"
      >
        <template #select>
          <IconPickerSquares
            :selectedIcon="form_state.string_icon"
            @onSelectIcon="setStringIcon"
            :readonly="categories_store.forms.create_update_categories == 'see'"
          />
        </template>
        <template #upload>
          <div align="center">
            <ImagePicker
              :readonly="
                categories_store.forms.create_update_categories == 'see'
              "
              :image-url="url_image"
              :key="url_image"
              @onAddImage="onAddImage"
              @onRemoveImage="onRemoveImage"
            />
          </div>
        </template>
      </Tab>
      <ValidationFormMessages
        v-if="errors['string_icon']"
        :validation="errors['string_icon']"
        lang="es"
        field="string_icon"
        custom-error="No hay un icono seleccionado"
      />
      <ValidationFormMessages
        v-if="errors['file_icon']"
        :validation="errors['file_icon']"
        lang="es"
        field="file_icon"
        custom-error="No hay un archivo de ícono seleccionado"
      />
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Descripción</label>

      <textarea
        :readonly="categories_store.forms.create_update_categories == 'see'"
        class="form-control form-control-solid"
        v-model="form_state.description"
        cols="30"
        rows="10"
      ></textarea>
      <ValidationFormMessages
        v-if="errors['description']"
        :validation="errors['description']"
        lang="es"
        field="description"
      />
    </div>

    <div align="right">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="categories_store.closeModal()"
      >
        Cerrar
      </button>
      <button
        v-if="categories_store.forms.create_update_categories != 'see'"
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
import { computed, inject, onMounted, reactive, ref } from "vue-demi";
import { useCategoriesStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const onChangeTab = (emited_data) => {
  if (emited_data.tab == "select") {
    onRemoveImage();
  } else {
    setStringIcon("");
  }
};

const setStringIcon = (icon) => {
  form_state.string_icon = icon;
};

const onAddImage = (file) => {
  form_state.file_icon = file;
};

const onRemoveImage = () => {
  form_state.file_icon = {};
};
const swal = inject("$swal");
const categories_store = useCategoriesStore();
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

let form_state = reactive({
  name: "",
  category_type: "service",
  string_icon: "",
  file_icon: {},
  description: "",
  is_active: true,
});
const stringIconIsRequired = computed(() => {
  return (
    form_state.file_icon.name == undefined &&
    form_state.category_type == "service"
  );
});
const fileIconIsRequired = computed(() => {
  return form_state.string_icon == "" && form_state.category_type == "service";
});
const rules = {
  name: { required },
  category_type: { required },
  string_icon: { required: requiredIf(stringIconIsRequired) },
  file_icon: { required: requiredIf(fileIconIsRequired) },
  description: { required },
};
const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }

  categories_store.forms.create_update_categories == "create"
    ? categories_store.createCategories(form_state)
    : categories_store.updateCategories(
        form_state,
        categories_store.items.categories.selected_item.id
      );
};

let selected_tab = ref("select");
let url_image = ref(null);
const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  // if (categories_store.items.categories.selected_item.photo == "null") {
  //   categories_store.items.categories.selected_item.photo = null;
  // }

  form_state.name = categories_store.items.categories.selected_item.name;

  form_state.category_type =
    categories_store.items.categories.selected_item.type_category == "Servicio"
      ? "service"
      : "faqs";

  form_state.string_icon = categories_store.items.categories.selected_item.icon;
  if (
    categories_store.items.categories.selected_item.photo == "null" ||
    categories_store.items.categories.selected_item.photo == null
  ) {
    form_state.file_icon = {};
    selected_tab.value = "select";
  } else {
    form_state.file_icon =
      categories_store.items.categories.selected_item.photo;

    url_image.value = categories_store.items.categories.selected_item.photo;

    selected_tab.value = "upload";
  }

  form_state.description =
    categories_store.items.categories.selected_item.description;
};

onMounted(() => {
  if (categories_store.forms.create_update_categories != "create") setForm();
});
</script>

<script>
export default {
  name: "CategoriesFormComponent",
};
</script>
