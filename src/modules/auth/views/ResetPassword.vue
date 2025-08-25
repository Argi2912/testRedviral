<template>
  <AuthLayout>
    <form
      class="form w-100"
      novalidate="novalidate"
      id="kt_password_reset_form"
      action="#"
      @submit.prevent="resetPassword"
    >
      <div class="text-center mb-10">
        <h1 class="text-dark fw-bolder mb-3">Restablecer Contraseña</h1>
        <div class="text-gray-500 fw-semibold fs-6">
          Ingresa el código que recibiste y tu nueva contraseña.
        </div>
      </div>

      <!-- Campo para el Email (puede ser útil para referencia o si se requiere enviarlo de nuevo) -->
      <div class="fv-row mb-8">
        <input
          type="email"
          placeholder="Email de tu cuenta"
          v-model="form.email"
          autocomplete="off"
          class="form-control bg-transparent"
          :class="{ 'is-invalid': !isEmailValid && form.email }"
          disabled
        />
        <div v-if="!isEmailValid && form.email" class="invalid-feedback">
          Por favor, ingresa una dirección de correo válida.
        </div>
      </div>

      <!-- Campo para el Código de Verificación -->
      <div class="fv-row mb-8">
        <input
          type="text"
          placeholder="Código de verificación"
          v-model="form.code"
          autocomplete="off"
          class="form-control bg-transparent"
          :class="{ 'is-invalid': !isCodeValid && form.code }"
        />
        <div v-if="!isCodeValid && form.code" class="invalid-feedback">
          Por favor, ingresa un código válido (4 dígitos numéricos).
        </div>
      </div>

      <!-- Campo para la Nueva Contraseña -->
      <div class="fv-row mb-8">
        <input
          type="password"
          placeholder="Nueva Contraseña"
          v-model="form.newPassword"
          autocomplete="new-password"
          class="form-control bg-transparent"
          :class="{ 'is-invalid': !isNewPasswordValid && form.newPassword }"
        />
        <div v-if="!isNewPasswordValid && form.newPassword" class="invalid-feedback">
          La contraseña debe tener al menos 8 caracteres.
        </div>
      </div>

      <!-- Campo para Confirmar Nueva Contraseña -->
      <div class="fv-row mb-8">
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          v-model="form.confirmPassword"
          autocomplete="new-password"
          class="form-control bg-transparent"
          :class="{ 'is-invalid': !doPasswordsMatch && form.confirmPassword }"
        />
        <div v-if="!doPasswordsMatch && form.confirmPassword" class="invalid-feedback">
          Las contraseñas no coinciden.
        </div>
      </div>

      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          class="btn btn-primary me-4"
          :disabled="isLoading || !isFormValid"
        >
          <span v-if="!isLoading" class="indicator-label">Restablecer Contraseña</span>
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
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/store.js";
import AuthLayout from "../../../layouts/auth-layout/AuthLayout.vue";
import useNotyf from "@/composables/useNotyf.js";

const store = useAuthStore();
const router = useRouter();
const route = useRoute();
const { success, error } = useNotyf();

const form = reactive({
  email: "",
  code: "",
  newPassword: "",
  confirmPassword: "",
});

const isLoading = ref(false);


const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(form.email);
});

const isCodeValid = computed(() => {
  const codeRegex = /^\d{4}$/; 
  return codeRegex.test(form.code);
});

const isNewPasswordValid = computed(() => {
  return form.newPassword.length >= 8; 
});

const doPasswordsMatch = computed(() => {
  return form.newPassword === form.confirmPassword && form.confirmPassword !== "";
});

const isFormValid = computed(() => {
  return (
    isEmailValid.value &&
    isCodeValid.value &&
    isNewPasswordValid.value &&
    doPasswordsMatch.value
  );
});


onMounted(() => {
  if (route.query.email) {
    form.email = route.query.email;
  }
});

const resetPassword = async () => {
  if (!isFormValid.value) {
    error("Por favor, completa todos los campos correctamente.");
    return;
  }

  isLoading.value = true;

  try {
    const successResult = await store.resetPasswordWithCode(
      form.code,
      form.newPassword
    );

    if (successResult) {
      router.push({ name: 'sign-in' });
      
      form.email = '';
      form.code = '';
      form.newPassword = '';
      form.confirmPassword = '';
    } else {
      console.log("El error ha sido manejado por el store.");
    }
  } catch (err) {
    console.error("Error inesperado al intentar restablecer la contraseña:", err);
    error("Ocurrió un error inesperado. Por favor, intenta de nuevo.");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Puedes añadir estilos específicos aquí si es necesario */
</style>
