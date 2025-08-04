<template>
  <div>
    <div
      @click="is_open = !is_open"
      class="d-flex align-items-center collapsible py-3 toggle mb-0"
      :class="[!is_open && 'collapsed', is_open && 'active']"
      data-bs-toggle="collapse"
    >
      <!--begin::Icon-->
      <div class="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
        <!--begin::Svg Icon | path: icons/duotune/general/gen036.svg-->
        <span class="svg-icon toggle-on svg-icon-primary svg-icon-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="2"
              y="2"
              width="20"
              height="20"
              rx="5"
              fill="currentColor"
            ></rect>
            <rect
              x="6.0104"
              y="10.9247"
              width="12"
              height="2"
              rx="1"
              fill="currentColor"
            ></rect>
          </svg>
        </span>
        <!--end::Svg Icon-->
        <!--begin::Svg Icon | path: icons/duotune/general/gen035.svg-->
        <span class="svg-icon toggle-off svg-icon-1">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="2"
              y="2"
              width="20"
              height="20"
              rx="5"
              fill="currentColor"
            ></rect>
            <rect
              x="10.8891"
              y="17.8033"
              width="12"
              height="2"
              rx="1"
              transform="rotate(-90 10.8891 17.8033)"
              fill="currentColor"
            ></rect>
            <rect
              x="6.01041"
              y="10.9247"
              width="12"
              height="2"
              rx="1"
              fill="currentColor"
            ></rect>
          </svg>
        </span>
        <!--end::Svg Icon-->
      </div>
      <!--end::Icon-->
      <!--begin::Title-->
      <h4 class="text-gray-700 fw-bold cursor-pointer mb-0">
        {{ question.name }}
      </h4>
      <!--end::Title-->
    </div>
    <div
      id="kt_job_1_2"
      class="collapse fs-6 ms-1"
      :class="[is_open && 'show']"
    >
      <!--begin::Text-->
      <div class="mb-4 text-gray-600 fw-semibold fs-6 ps-10">
        {{ question.description }}
      </div>
      <!--end::Text-->
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue-demi";

let is_open = ref(false);
const props = defineProps({
  question: {
    type: Object,
    default: {},
  },
});
</script>

<style>
</style>