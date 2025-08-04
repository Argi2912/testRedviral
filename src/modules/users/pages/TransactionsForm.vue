<template>
  <div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Monto</label>

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.amount"
        placeholder="Monto"
      />
      <ValidationFormMessages
        v-if="errors['amount']"
        :validation="errors['amount']"
        lang="es"
        field="amount"
      />
    </div>

    <div align="right">
      <button
        data-bs-dismiss="modal"
        type="button"
        class="btn btn-secondary"
        @click="closeModal()"
      >
        Cerrar
      </button>
      <button
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
import { useUsersStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const swal = inject("$swal");
const users_store = useUsersStore();
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
const emit = defineEmits(["onClose"]);

const closeModal = () => {
  emit("onClose");
};
let form_state = reactive({
  amount: "",
  is_active: true,
});

const rules = {
  amount: { required },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }
  let success =
    users_store.forms.transactions == "add_balance"
      ? await users_store.addBalance(form_state)
      : await users_store.devolution(
          form_state,
          users_store.items.users.selected_item.id
        );
  if (success) {
    closeModal();
  }
};
</script>

<script>
export default {
  name: "UsersFormComponent",
};
</script>
