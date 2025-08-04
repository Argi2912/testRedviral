<template>
  <div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Nombre</label>

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.name"
        placeholder="Nombre"
        :readonly="accounts_store.forms.create_update_accounts == 'see'"
      />
      <ValidationFormMessages
        v-if="errors['name']"
        :validation="errors['name']"
        lang="es"
        field="name"
      />
    </div>
    <div class="fv-row fv-plugins-icon-container">
      <label class="required form-label">Red social</label>
      <select
        class="form-control form-control-solid"
        v-model="form_state.social_network_id"
      >
        <option disabled selected value="">...Seleccionar red social...</option>
        <option
          v-for="(social_network, i) in social_networks_store.getProperty(
            'social_networks',
            'simple_list'
          )"
          :key="'social_network_' + i"
          :value="social_network.id"
        >
          {{ social_network.name }}
        </option>
      </select>
      <ValidationFormMessages
        v-if="errors['social_network_id']"
        :validation="errors['social_network_id']"
        lang="es"
        field="social_network_id"
      />
      <div class="fv-plugins-message-container invalid-feedback"></div>
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">URL</label>

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.url"
        placeholder="URL"
        :readonly="accounts_store.forms.create_update_accounts == 'see'"
      />
      <ValidationFormMessages
        v-if="errors['url']"
        :validation="errors['url']"
        lang="es"
        field="url"
      />
    </div>

    <div align="right">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Cerrar
      </button>
      <button
        v-if="accounts_store.forms.create_update_accounts != 'see'"
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
import { useAccountsStore } from "../stores/index.js";
import { useSocialNetworksStore } from "@/modules/social-networks/stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const swal = inject("$swal");
const accounts_store = useAccountsStore();
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
  url: "",
  social_network_id: "",
  is_active: true,
});

const rules = {
  name: { required },
  url: { required },
  social_network_id: { required },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }

  accounts_store.forms.create_update_accounts == "create"
    ? accounts_store.createAccounts(form_state)
    : accounts_store.updateAccounts(
        form_state,
        accounts_store.items.accounts.selected_item.id
      );
};

const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  form_state.name = accounts_store.items.accounts.selected_item.name;
  form_state.url = accounts_store.items.accounts.selected_item.url;
  form_state.social_network_id =
    accounts_store.items.accounts.selected_item.network.id;
};

onMounted(() => {
  if (accounts_store.forms.create_update_accounts != "create") setForm();
  social_networks_store.loadSocialNetworksSimpleList();
});
</script>

<script>
export default {
  name: "AccountsFormComponent",
};
</script>
