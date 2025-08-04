<template>
  <div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Asunto</label>

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.title"
        placeholder="Nombre"
        :readonly="
          support_ticket_store.forms.create_update_support_ticket == 'see'
        "
      />
      <ValidationFormMessages
        v-if="errors['title']"
        :validation="errors['title']"
        lang="es"
        field="title"
      />
    </div>

    <div class="fv-row mb-7">
      <div class="d-flex flex-column mb-7 fv-row">
        <label class="fs-6 fw-semibold mb-2">
          <span>Prioridad</span>
        </label>

        <select
          v-model="form_state.priority"
          class="form-select form-select-solid fw-bold"
          :disabled="
            support_ticket_store.forms.create_update_support_ticket == 'see'
          "
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <ValidationFormMessages
          v-if="errors['priority']"
          :validation="errors['priority']"
          lang="es"
          field="priority"
        />
      </div>
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Descripción</label>

      <textarea
        :readonly="
          support_ticket_store.forms.create_update_support_ticket == 'see'
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

    <label for="file" class="btn btn-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-file-earmark-arrow-up"
        viewBox="0 0 16 16"
      >
        <path
          d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"
        ></path>
        <path
          d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"
        ></path>
      </svg>
      Subir archivo
    </label>
    <span v-if="file_selected">
      <span class="text-muted mx-4">Un archivo seleccionado</span>
      <span class="text-primary clickable" @click="removeFile">Eliminar</span>
    </span>
    <input id="file" type="file" hidden @change="catchFile" />
    <div align="right">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
        Cerrar
      </button>
      <button
        v-if="support_ticket_store.forms.create_update_support_ticket != 'see'"
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
import { inject, onMounted, reactive, ref } from "vue-demi";
import { useSupportTicketStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { extractFile } from "@/utils/Functions";
const swal = inject("$swal");
const support_ticket_store = useSupportTicketStore();
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

const removeFile = () => {
  form_state.file = {};
  file_selected.value = false;
};

let file_selected = ref(false);
const catchFile = () => {
  form_state.file = extractFile("file");
  file_selected.value = true;
};

let form_state = reactive({
  title: "",
  priority: "Baja",
  description: "",
  file: {},
  is_active: true,
});

const rules = {
  title: { required },
  priority: { required },
  description: { required },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }

  support_ticket_store.createSupportTicket(form_state);
};

const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  form_state.name =
    support_ticket_store.items.support_ticket.selected_item.name;
  form_state.description =
    "Descripcion del SupportTicket " +
    support_ticket_store.items.support_ticket.selected_item.id;
};

onMounted(() => {
  if (support_ticket_store.forms.create_update_support_ticket != "create")
    setForm();
});
</script>

<script>
export default {
  name: "SupportTicketFormComponent",
};
</script>
