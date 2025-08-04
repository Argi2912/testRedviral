  <template>
  <AuthLayout>
    <form
      class="form w-100"
      novalidate="novalidate"
      id="kt_password_reset_form"
      data-kt-redirect-url="../../demo7/dist/authentication/layouts/corporate/new-password.html"
      action="#"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark fw-bolder mb-3">¿Olvidaste tu contraseña?</h1>
        <!--end::Title-->
        <!--begin::Link-->
        <div class="text-gray-500 fw-semibold fs-6">
          Ingresa el email de tu cuenta.
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->
      <!--begin::Input group=-->
      <div class="fv-row mb-8">
        <!--begin::Email-->
        <input
          type="text"
          placeholder="Email"
          v-model="form_state.email"
          autocomplete="off"
          class="form-control bg-transparent"
        />
        <!--end::Email-->
      </div>
      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="button"
          class="btn btn-primary me-4"
          @click="recoverPassword()"
        >
          <!--begin::Indicator label-->
          <span class="indicator-label">Enviar</span>
          <!--end::Indicator label-->
          <!--begin::Indicator progress-->
          <span class="indicator-progress"
            >Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span
          ></span>
          <!--end::Indicator progress-->
        </button>
        <a
          href="#"
          @click="router.push({ name: 'sign-in' })"
          class="btn btn-light"
          >Regresar</a
        >
      </div>
      <!--end::Actions-->
    </form>
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
});

const recoverPassword = () => {
  store.recover_password(form_state);
};
</script>