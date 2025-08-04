<template>
  <div>
    <div class="fv-row mb-7">
      <select class="form-select" v-model="form_state.payment_method">
        <option value="Tarjeta de crédito">Tarjeta de crédito</option>
        <option value="Daviplata">Daviplata</option>
        <option value="Nequi">Nequi</option>
        <option value="Mercado Pago">Mercado Pago</option>
      </select>
      <ValidationFormMessages
        v-if="errors['payment_method']"
        :validation="errors['payment_method']"
        lang="es"
        field="payment_method"
      />
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Monto</label>

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.amount"
        placeholder="Monto"
        :readonly="dashboard_store.forms.create_update_dashboard == 'see'"
      />
      <ValidationFormMessages
        v-if="errors['amount']"
        :validation="errors['amount']"
        lang="es"
        field="amount"
      />
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Instrucciones</label>

      <textarea
        class="form-control"
        v-model="form_state.instructions"
        cols="30"
        rows="10"
      ></textarea>
      <ValidationFormMessages
        v-if="errors['instructions']"
        :validation="errors['instructions']"
        lang="es"
        field="instructions"
      />
    </div>

    <div align="right">
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="dashboard_store.closeModal()"
      >
        Cerrar
      </button>
      <button
        v-if="dashboard_store.forms.create_update_dashboard != 'see'"
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
import { useDashboardStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const swal = inject("$swal");
const dashboard_store = useDashboardStore();
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
  amount: "",
  payment_method: "",
  instructions: "",
  is_devolution: false,
  is_active: true,
});

const rules = {
  amount: { required },
  payment_method: { required },
  instructions: { required },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }
  dashboard_store.makeTransaction(form_state);
};

const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  form_state.name = dashboard_store.items.dashboard.selected_item.name;
  form_state.description =
    "Descripcion " + dashboard_store.items.dashboard.selected_item.id;
};

onMounted(() => {
  if (dashboard_store.forms.create_update_dashboard != "create") setForm();
});
</script>

<script>
export default {
  name: "DashboardFormComponent",
};
</script>
