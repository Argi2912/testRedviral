<template>
  <div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Método de pago</label>
      <select
        class="form-select form-select-solid"
        v-model="form_state.payment_method"
      >
        <option value="AirTM">AirTM</option>
        <option value="Binance">Binance</option>
      </select>
      <span class="fs-8 text-danger mb-2">
        {{ warnPaymentMethod() }}
      </span>
      <ValidationFormMessages
        v-if="errors['payment_method']"
        :validation="errors['payment_method']"
        lang="es"
        field="payment_method"
      />
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Monto</label><br />
      <label class="fs-8 text-muted mb-2"
        >El monto máximo a retirar es de
        {{ numberToCurrency("COP", props.maxAmount) }}</label
      >

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.amount"
        placeholder="Monto"
        :readonly="dashboard_store.forms.create_update_dashboard == 'see'"
      />
      <label class="fs-8 text-muted mb-2">
        El monto mínimo de retiro es de {{ numberToCurrency("COP", props.minAmount) }}
      </label>

      <ValidationFormMessages
        v-if="errors['amount']"
        :validation="errors['amount']"
        lang="es"
        field="amount"
      />
    </div>

    <div align="right">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Cerrar
      </button>
      <button
        v-if="dashboard_store.forms.create_update_dashboard != 'see'"
        @click="handleSubmit()"
        type="button"
        class="btn btn-primary mx-4"
        :disabled="isPaymentMethodInvalid()"
      >
        Guardar
      </button>
    </div>
  </div>
</template>
<script setup>
import { inject, reactive } from "vue-demi";
import { useDashboardStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required, maxValue, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { numberToCurrency } from "@/utils/Functions.js";
import { useAuthStore } from "../../auth/stores/store.js";

const props = defineProps({
  maxAmount: {
    type: Number,
    default: -1,
  },
  minAmount: {
    type: Number,
    default: -1,
  }
});

const swal = inject("$swal");
const emit = defineEmits(["onSave"]);
const dashboard_store = useDashboardStore();
const auth_store = useAuthStore();
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
  payment_method: "AirTM",
  is_devolution: true,
  is_active: true,
});

const rules = {
  amount: { required, maxValue: maxValue(props.maxAmount), minValue: minValue(props.minAmount) },
  payment_method: { required },
};

const warnPaymentMethod = () => {
  const { payment_method } = form_state
  const warn = 'Aun no has configurado este metodo de pago en tu perfil'

  if (payment_method == 'AirTM' && auth_store.user_data.airtm == null) {
    return warn
  }

  if (payment_method == 'Binance' && auth_store.user_data.binance == null) {
    return warn
  }

  return '' 
}

const isPaymentMethodInvalid = () => {
  const { payment_method } = form_state;
  const { user_data } = auth_store;

  return (
    (payment_method === "AirTM" && !user_data.airtm) ||
    (payment_method === "Binance" && !user_data.binance)
  );
}

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }

  await dashboard_store.makeTransaction(form_state);
  dashboard_store.reload_dashboard_info++;
  // dashboard_store.forms.create_update_dashboard == "create"
  //   ? dashboard_store.createDashboard(form_state)
  //   : dashboard_store.updateDashboard(
  //       form_state,
  //       dashboard_store.items.dashboard.selected_item.id
  //     );
};
</script>

<script>
export default {
  name: "DashboardFormComponent",
};
</script>
