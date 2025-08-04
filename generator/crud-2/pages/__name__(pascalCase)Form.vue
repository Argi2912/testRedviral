<template>
  <div class="mx-20">
    <div
      id="kt_app_toolbar"
      class="
        app-toolbar
        align-items-center
        justify-content-between
        py-2 py-lg-6
        mb-6
      "
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
            class="
              page-heading
              d-flex
              text-dark
              fw-bold
              fs-3
              flex-column
              justify-content-center
              me-3
              my-0
            "
          >
            {{ __name__(snakeCase)_store.module_name }}
          </h1>
          <!--end::Title-->
          <!--begin::Breadcrumb-->
          <ul
            class="
              breadcrumb breadcrumb-separatorless
              fw-semibold
              fs-7
              my-0
              pt-1
            "
          >
            <!--begin::Item-->
            <li class="breadcrumb-item text-muted">
              <a
                class="text-muted text-hover-primary"
                @click="goToList"
                >{{ __name__(snakeCase)_store.module_name }}</a
              >
            </li>
            <!--end::Item-->

            <!--begin::Item-->
            <li class="breadcrumb-item">
              <span class="bullet bg-gray-400 w-5px h-2px"></span>
            </li>
            <!--end::Item-->
            <!--begin::Item-->
            <li class="breadcrumb-item text-dark">Agregar</li>
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
        <div class="fv-row mb-7">
          <div class="col">
            <pre>{{__name__(snakeCase)_store.items.__name__(snakeCase).selected_item}}</pre>
          </div>
        </div>
        <div class="row mt-6 mb-2 mx-6">
            <div align="right">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                @click="goToList"
              >
                Atras
              </button>
              <button
                v-if="__name__(snakeCase)_store.forms.create_update___name__(snakeCase) != 'see'"
                @click="handleSubmit()"
                type="button"
                class="btn btn-primary mx-4"
              >
                Guardar
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, onMounted, reactive } from "vue-demi";
import {use__name__(pascalCase)Store} from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const swal = inject("$swal");
const __name__(snakeCase)_store = use__name__(pascalCase)Store();
let errors = reactive({});
const setErrors = (err) => {
  for(let i in errors){
    errors[i] = undefined
  }
  err.map((x) => {
    errors[x.$property] = x.$validator;
  });
  console.log(errors);
};

let form_state = reactive({
  name: "",
  phone: "",
  country: "",
  description: "",
  is_active: true,
});

const rules = {
  name: { required },
  phone: { required },
  country: { required },
  description: { required },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    swal.fire({
      title: "",
      text: "El formulario no está llenado correctamente. Por favor corríjalo.",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    });

    return;
  }
  __name__(snakeCase)_store.forms.create_update___name__(snakeCase) == "create"
    ? __name__(snakeCase)_store.create__name__(pascalCase)(form_state)
    : __name__(snakeCase)_store.update__name__(pascalCase)(form_state, __name__(snakeCase)_store.items.__name__(snakeCase).selected_item.id);
};

const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  form_state.description = 'Descripcion del __name__ '+__name__(snakeCase)_store.items.__name__(snakeCase).selected_item.id;
  
};

const emit = defineEmits(["onDisplayPage"]);

const goToList = () => {
  __name__(snakeCase)_store.setFormMode('create_update___name__(snakeCase)','')
  emit("onDisplayPage", {
    page_to_show: '#list',
  });
}

onMounted(() => {
  if (__name__(snakeCase)_store.forms.create_update___name__(snakeCase) != "create") setForm();
});
</script>

<script>
export default {
  name: "__name__PascalCase__FormComponent",
};
</script>
