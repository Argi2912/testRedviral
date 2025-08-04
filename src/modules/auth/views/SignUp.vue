<template>
  <AuthLayout class="">
    <div class="overlay overlay-block">
      <div class="text-center mb-11">
        <h1 class="text-dark fw-bolder mb-3">Nueva cuenta</h1>
      </div>

      <!-- <div class="fv-row mb-8">
        <div class="row">
          <div class="col-sm-6">
            <div
              class="form-check form-check-custom form-check-solid form-check-sm"
            >
              <input
                v-model="form_state.role"
                class="form-check-input"
                type="radio"
                value="2"
                name="flexRadioLg"
                id="flexRadioLg"
              />
              <label class="form-check-label" for="flexRadioLg">
                Cliente
              </label>
            </div>
          </div>
          <div class="col-sm-6">
            <div
              class="form-check form-check-custom form-check-solid form-check-sm"
            >
              <input
                v-model="form_state.role"
                class="form-check-input"
                type="radio"
                value="3"
                name="flexRadioLg"
                id="flexRadioLg2"
              />
              <label class="form-check-label" for="flexRadioLg2">
                Trabajador
              </label>
            </div>
          </div>
        </div>
      </div> -->

      <div class="fv-row mb-8">
        <input
          type="text"
          placeholder="Nombre"
          v-model="form_state.name"
          autocomplete="off"
          class="form-control bg-transparent"
          @keyup.enter="attempLogin"
        />
        <ValidationFormMessages
          v-if="errors['name']"
          :validation="errors['name']"
          lang="es"
          field="name"
        />
      </div>

      <div class="fv-row mb-8">
        <input
          type="text"
          placeholder="Apellido"
          v-model="form_state.lastName"
          autocomplete="off"
          class="form-control bg-transparent"
          @keyup.enter="attempLogin"
        />
        <ValidationFormMessages
          v-if="errors['lastName']"
          :validation="errors['lastName']"
          lang="es"
          field="lastName"
        />
      </div>

      <div class="fv-row mb-8">
        <input
          type="text"
          placeholder="Email"
          v-model="form_state.email"
          autocomplete="off"
          class="form-control bg-transparent"
          @keyup.enter="attempLogin"
        />
        <ValidationFormMessages
          v-if="errors['email']"
          :validation="errors['email']"
          lang="es"
          field="email"
        />
      </div>
      <div class="fv-row mb-3">
        <input
          type="password"
          placeholder="Contraseña"
          v-model="form_state.password"
          autocomplete="off"
          class="form-control bg-transparent"
          @keyup.enter="attempLogin"
        />
        <ValidationFormMessages
          v-if="errors['password']"
          :validation="errors['password']"
          lang="es"
          field="password"
        />
      </div>
      <div class="fv-row mb-3">
        <label for="pais">Seleccione un país</label>
        <select name="pais" class="form-select bg-transparent" v-model="form_state.country">
          <option value="" disabled>Seleccione un país...</option> 
          <option v-for="country in countries" :value="country.name" :key="country.name">
            {{ country.name }}
          </option>
        </select>
        <ValidationFormMessages
          v-if="errors['country']"
          :validation="errors['country']"
          lang="es"
          field="país"
        />
      </div>

      <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
        <a
          href="#"
          class="link-primary"
          @click="router.push({ name: 'sign-in' })"
          >Ya tengo una cuenta</a
        >
      </div>

      <div class="d-grid mb-10">
        <button type="submit" class="btn btn-primary" @click="attempLogin">
          <span class="indicator-label">Crear cuenta</span>
        </button>
      </div>
      <div
        v-if="is_loading"
        class="overlay-layer card-rounded bg-dark bg-opacity-5"
      >
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { reactive } from "vue-demi";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/store.js";
import AuthLayout from "../../../layouts/auth-layout/AuthLayout.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { countries } from "@/assets/js/countries";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
const store = useAuthStore();
const router = useRouter();


const is_loading = ref(false);
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
  lastName: "",
  email: "",
  password: "",
  country: "",
});
const rules = {
  name: { required },
  lastName: { required },
  email: { required },
  password: { required },
  country: { required },
};

const attempLogin = async () => {
  is_loading.value = true;
  
  try {
    let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
    const isValid = await v$.value.$validate();

    if (!isValid) {
      setErrors(v$.value.$errors);
      return;
    }

    const res = await store.attemptRegister(form_state);
    console.log("Success register", res);
     router.push({ name: "sign-in" });
  } catch (error) {
    console.log("Error register", error);
  } finally {
    is_loading.value = false;
  }
};

</script>
