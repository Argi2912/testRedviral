<template>
  <div>
    <!-- <div class="fv-row mb-7">
      <label class="form-check form-switch form-check-custom form-check-solid">
        <input
          class="form-check-input"
          v-model="form_state.is_active"
          type="checkbox"
          :checked="form_state.is_active"
          :disabled="payment_requests_store.forms.create_update_payment_requests == 'see'"
        />
        <span
          class="form-check-label fw-semibold text-muted"
          for="core_modal_billing"
          >{{ form_state.is_active ? "Activo" : "Inactivo" }}</span
        >
      </label>
    </div> -->
    <div class="fv-row mb-7">
      <label class="fs-6 fw-semibold mb-2">Trabajador</label>

      <input
        type="text"
        disabled
        class="form-control form-control-solid"
        v-model="form_state.worker"
        placeholder="Trabajador"
        :readonly="
          payment_requests_store.forms.create_update_payment_requests == 'see'
        "
      />
    </div>

    <div class="fv-row mb-7">
      <label class="fs-6 fw-semibold mb-2">Monto</label>

      <input
        type="text"
        disabled
        class="form-control form-control-solid"
        v-model="form_state.amount"
        placeholder="Monto"
        :readonly="
          payment_requests_store.forms.create_update_payment_requests == 'see'
        "
      />
    </div>
    <div class="row">
      <div class="col">
        <div class="fv-row mb-7">
          <label class="fs-6 fw-semibold mb-2">Tipo de cuenta</label>

          <input
            disabled
            type="text"
            class="form-control form-control-solid"
            v-model="form_state.account_type"
            placeholder="Tipo de cuenta"
            :readonly="
              payment_requests_store.forms.create_update_payment_requests ==
              'see'
            "
          />
        </div>
      </div>
      <div class="col">
        <div class="fv-row mb-7">
          <label class="fs-6 fw-semibold mb-2">Número de cuenta</label>

          <input
            type="number"
            disabled
            class="form-control form-control-solid"
            v-model="form_state.account_number"
            placeholder="Número de cuenta"
            :readonly="
              payment_requests_store.forms.create_update_payment_requests ==
              'see'
            "
          />
        </div>
      </div>
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Descripción</label>

      <textarea
        :readonly="
          payment_requests_store.forms.create_update_payment_requests == 'see'
        "
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
        @click="payment_requests_store.closeModal()"
      >
        Cerrar
      </button>
      <button
        v-if="
          payment_requests_store.forms.create_update_payment_requests != 'see'
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
import { inject, reactive } from "vue-demi";
import { usePaymentRequestsStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const swal = inject("$swal");
const payment_requests_store = usePaymentRequestsStore();
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
  worker: "Pedro perez",
  amount: "$ 596.877",
  account_type: "Ahorro",
  account_number: "19826483",
  description: "",
  is_active: true,
});

const rules = {
  description: { required },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }
  throw "stop";
  payment_requests_store.forms.create_update_payment_requests == "create"
    ? payment_requests_store.createPaymentRequests(form_state)
    : payment_requests_store.updatePaymentRequests(
        form_state,
        payment_requests_store.items.payment_requests.selected_item.id
      );
};

const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  form_state.name =
    payment_requests_store.items.payment_requests.selected_item.name;
  form_state.description =
    "Descripcion del PaymentRequests " +
    payment_requests_store.items.payment_requests.selected_item.id;
};
</script>

<script>
export default {
  name: "PaymentRequestsFormComponent",
};
</script>
