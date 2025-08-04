<template>
  <div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Pregunta</label>

      <input
        type="text"
        class="form-control form-control-solid"
        v-model="form_state.question"
        placeholder="Pregunta"
        :readonly="faqs_store.forms.create_update_faqs == 'see'"
      />
      <ValidationFormMessages
        v-if="errors['question']"
        :validation="errors['question']"
        lang="es"
        field="question"
      />
    </div>

    <div class="fv-row mb-7">
      <div class="d-flex flex-column mb-7 fv-row">
        <label class="fs-6 fw-semibold mb-2">
          <span class="required">Categoria</span>
          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
          ></i>
        </label>

        <select
          v-model="form_state.category_id"
          class="form-select form-select-solid fw-bold"
          :disabled="faqs_store.forms.create_update_faqs == 'see'"
        >
          <option disabled selected value="">Seleccione una categoría</option>
          <option
            v-for="(category, i) in categories_store
              .getAllCategories()
              .filter((category) => category.type_category == 'FAQS')"
            :key="'category_' + i"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <ValidationFormMessages
          v-if="errors['category_id']"
          :validation="errors['category_id']"
          lang="es"
          field="category_id"
        />
      </div>
    </div>
    <div class="fv-row mb-7">
      <label class="required fs-6 fw-semibold mb-2">Respuesta</label>

      <textarea
        :readonly="faqs_store.forms.create_update_faqs == 'see'"
        class="form-control form-control-solid"
        v-model="form_state.answer"
        cols="30"
        rows="10"
      ></textarea>
      <ValidationFormMessages
        v-if="errors['answer']"
        :validation="errors['answer']"
        lang="es"
        field="description"
      />
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
        v-if="faqs_store.forms.create_update_faqs != 'see'"
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
import { useCategoriesStore } from "@/modules/categories/stores/index.js";
import { useFaqsStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const swal = inject("$swal");
const faqs_store = useFaqsStore();
const categories_store = useCategoriesStore();

const emit = defineEmits(["onClose"]);
const closeModal = () => {
  emit("onClose");
};
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
  question: "",
  category_id: "",
  answer: "",
  is_active: true,
});

const rules = {
  question: { required },
  category_id: { required },
  answer: { required },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    return;
  }
  faqs_store.forms.create_update_faqs == "create"
    ? faqs_store.createFaqs(form_state)
    : faqs_store.updateFaqs(form_state, faqs_store.items.faqs.selected_item.id);
};

const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  form_state.question = faqs_store.items.faqs.selected_item.name;
  form_state.category_id = faqs_store.items.faqs.selected_item.category.id;
  form_state.answer = faqs_store.items.faqs.selected_item.description;
};

onMounted(() => {
  if (faqs_store.forms.create_update_faqs != "create") setForm();
  categories_store.setSimpleCategoryList();
});
</script>

<script>
export default {
  name: "FaqsFormComponent",
};
</script>
