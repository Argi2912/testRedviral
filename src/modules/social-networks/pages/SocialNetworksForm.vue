<template>
  <div>
    <!-- <div class="fv-row mb-7">
      <label class="form-check form-switch form-check-custom form-check-solid">
        <input
          class="form-check-input"
          v-model="form_state.is_active"
          type="checkbox"
          :checked="form_state.is_active"
          :disabled="social_networks_store.forms.create_update_social_networks == 'see'"
        />
        <span
          class="form-check-label fw-semibold text-muted"
          for="core_modal_billing"
          >{{ form_state.is_active ? "Activo" : "Inactivo" }}</span
        >
      </label>
    </div> -->
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Nombre</label>

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.name"
        placeholder="Nombre"
        :readonly="
          social_networks_store.forms.create_update_social_networks == 'see'
        "
      />
      <ValidationFormMessages
        v-if="errors['name']"
        :validation="errors['name']"
        lang="es"
        field="name"
      />
    </div>

    <div align="right">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="social_networks_store.closeModal()"
      >
        Cerrar
      </button>
      <button
        v-if="
          social_networks_store.forms.create_update_social_networks != 'see'
        "
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
import { inject, onMounted, reactive } from "vue-demi";
import { useSocialNetworksStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const swal = inject("$swal");
const social_networks_store = useSocialNetworksStore();
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
  social_networks_store.forms.create_update_social_networks == "create"
    ? social_networks_store.createSocialNetworks(form_state)
    : social_networks_store.updateSocialNetworks(
        form_state,
        social_networks_store.items.social_networks.selected_item.id
      );
};

const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  form_state.name =
    social_networks_store.items.social_networks.selected_item.name;
  form_state.description =
    "Descripcion del SocialNetworks " +
    social_networks_store.items.social_networks.selected_item.id;
};

onMounted(() => {
  if (social_networks_store.forms.create_update_social_networks != "create")
    setForm();
});
</script>

<script>
export default {
  name: "SocialNetworksFormComponent",
};
</script>
