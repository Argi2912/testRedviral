<template>
  <div
    class="d-flex flex-wrap gap-2 flex-stack cursor-pointer"
    @click="showHideContent"
    data-kt-inbox-message="header"
  >
    <!--begin::Author-->
    <div class="d-flex align-items-center">
      <!--begin::Avatar-->
      <Avatar :picture="message.user.photo" />
      <!--end::Avatar-->
      <div class="pe-5">
        <!--begin::Author details-->
        <div class="d-flex align-items-center flex-wrap gap-1">
          <span class="fw-bold text-dark">{{
            message.user.name + " " + message.user.lastname
          }}</span>
        </div>
        <!--end::Author details-->
        <!--begin::Message details-->
        <div
          data-kt-inbox-message="details"
          v-if="auth_store.getProperty('user').id != message.user.id"
        >
          <span class="text-muted fw-semibold">Para mi</span>
          <!--begin::Menu toggle-->
          <a class="me-1" data-kt-menu-placement="bottom-start">
            <!--begin::Svg Icon | path: icons/duotune/arrows/arr072.svg-->
            <span class="svg-icon svg-icon-5 m-0">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
            <!--end::Svg Icon-->
          </a>
          <!--end::Menu toggle-->
        </div>
        <!--end::Message details-->
        <!--begin::Preview message-->
        <div
          class="text-muted fw-semibold mw-450px"
          :class="[show_content && 'd-none']"
          data-kt-inbox-message="preview"
        >
          {{ cutText(message.description, 15) }}
        </div>
        <!--end::Preview message-->
      </div>
    </div>
    <!--end::Author-->
    <!--begin::Actions-->
    <div class="d-flex align-items-center flex-wrap gap-2">
      <!--begin::Date-->
      <span class="fw-semibold text-muted text-end me-3">{{
        message.date_init
      }}</span>
    </div>
    <!--end::Actions-->
  </div>
  <div
    class="collapse fade"
    :class="[show_content && 'show']"
    data-kt-inbox-message="message"
  >
    <div class="py-5">
      <div>
        {{ message.description }}
      </div>
      <div>
        <a v-if="message.file" target="_blank" :href="message.file"
          >Descargar archivo</a
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { cutText, parseDate } from "../../../utils/Functions";
import { useAuthStore } from "@/modules/auth/stores/store";
const auth_store = useAuthStore();
let show_content = ref(false);

const props = defineProps({
  message: {
    type: Object,
    default: {},
  },
});

const showHideContent = () => {
  show_content.value = !show_content.value;
};
</script>
<style></style>
