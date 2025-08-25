<template>
  <AuthLayout>
    <form
      class="form w-100"
      novalidate="novalidate"
      id="kt_password_reset_form"
      action="#"
      @submit.prevent="recoverPassword"
    >
      <div class="text-center mb-10">
        <h1 class="text-dark fw-bolder mb-3">¿Olvidaste tu contraseña?</h1>
        <div class="text-gray-500 fw-semibold fs-6">
          Ingresa el email de tu cuenta.
        </div>
      </div>
      <div class="fv-row mb-8">
        <input
          type="email"
          placeholder="Email"
          v-model="form.email"
          autocomplete="off"
          class="form-control bg-transparent"
          :class="{ 'is-invalid': !isEmailValid && form.email }"
        />
        <div v-if="!isEmailValid && form.email" class="invalid-feedback">
          Por favor, ingresa una dirección de correo válida.
        </div>
      </div>
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          class="btn btn-primary me-4"
          :disabled="isLoading || !isFormValid"
        >
          <span v-if="!isLoading" class="indicator-label">Enviar</span>
          <span v-else class="indicator-progress">
            Por favor, espera...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
        <a
          href="#"
          @click="router.push({ name: 'sign-in' })"
          class="btn btn-light"
          >Regresar</a
        >
      </div>
    </form>
  </AuthLayout>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/store.js";
import AuthLayout from "../../../layouts/auth-layout/AuthLayout.vue";
import useNotyf from "@/composables/useNotyf.js";

const store = useAuthStore();
const router = useRouter();
const { success, error } = useNotyf();

const form = reactive({
  email: "",
});

const isLoading = ref(false);

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(form.email);
});

const isFormValid = computed(() => {
  return isEmailValid.value;
});

const recoverPassword = async () => {
  if (!isFormValid.value) {
    error("Por favor, ingresa un correo electrónico válido.");
    return;
  }

  isLoading.value = true;

  // Llama directamente a la función del store que ya maneja los mensajes
  const successResult = await store.requestPasswordRecovery(form.email);

  // La lógica de redirección solo si la solicitud fue exitosa
  if (successResult) {
    const emailForRedirect = form.email;
    form.email = '';
    router.push({ name: 'reset-password', query: { email: emailForRedirect } });
  }

  isLoading.value = false;
};
</script>
