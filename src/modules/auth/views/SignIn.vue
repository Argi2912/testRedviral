<template>
  <AuthLayout>
    <div class="text-center mb-11">
      <h1 class="text-dark fw-bolder mb-3">Iniciar sesión</h1>
    </div>

    <div class="fv-row mb-8">
      <input
        type="text"
        placeholder="Email"
        v-model="form_state.email"
        autocomplete="off"
        class="form-control bg-transparent"
      />
    </div>
    <div class="fv-row mb-3">
      <input
        type="password"
        placeholder="Password"
        v-model="form_state.password"
        autocomplete="off"
        class="form-control bg-transparent"
        @keyup.enter="attempLogin"
      />
    </div>

    <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
      <div style="float: left">
        <a
          href="#"
          class="link-primary"
          @click="router.push({ name: 'sign-up' })"
          >Registrarme</a
        >
      </div>
      <div style="float: right">
        <a
          href="#"
          class="link-primary"
          @click="router.push({ name: 'forgot-password' })"
          >¿Olvidaste tu contraseña?</a
        >
      </div>
    </div>

    <div class="d-grid mb-10">
      <button type="submit" class="btn btn-primary" @click="attempLogin">
        <span class="indicator-label">Ingresar</span>
      </button>
    </div>
  </AuthLayout>
</template>

<script setup>
import { reactive } from "vue-demi";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/store.js";
import AuthLayout from "../../../layouts/auth-layout/AuthLayout.vue";
const store = useAuthStore();
const router = useRouter();
let form_state = reactive({
  email: "",
  password: "",
});

const attempLogin = async () => {
  store.attemptLogin(form_state);
};
</script>
