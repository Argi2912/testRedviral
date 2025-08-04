<template>
  <div>
    <a class="card border-hover-primary">
      <!--begin::Card header-->
      <div class="card-header border-0 pt-9">
        <!--begin::Card Title-->
        <div class="card-title m-0">
          <!--begin::Avatar-->
          <div class="symbol symbol-50px w-50px bg-light">
            <img :src="task.service.photo" alt="image" class="p-3" />
          </div>
          <!--end::Avatar-->
        </div>
        <!--end::Car Title-->
        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <span class="badge badge-light-primary fw-bold me-auto px-4 py-3">{{
            services_requests_store.parseSegmentation(task.segmentation)
          }}</span>
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end:: Card header-->
      <!--begin:: Card body-->
      <div class="card-body p-9">
        <!--begin::Name-->
        <div class="fs-6 fw-bold text-dark">Tarea #{{ task.id }}</div>
        <!--end::Name-->
        <!--begin::Name-->
        <div class="fs-3 fw-bold text-dark">
          {{ task.service.name }}
        </div>
        <!--end::Name-->
        <!--begin::Description-->
        <div class="text-gray-400 fw-semibold fs-5 mt-1 mb-7">
          {{ task.service.description }}
        </div>
        <!--end::Description-->
        <!--begin::Info-->
        <div class="d-flex flex-wrap mb-5">
          <!--begin::Due-->
          <div
            class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3"
          >
            <div class="fs-6 text-gray-800 fw-bold">
              {{ task.goal }}
            </div>
            <div class="fw-semibold text-gray-400">Meta</div>
          </div>
          <!--end::Due-->
          <!--begin::Budget-->
          <div
            class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3"
          >
            <div class="fs-6 text-gray-800 fw-bold">
              {{ task.delivered_goal }}
            </div>
            <div class="fw-semibold text-gray-400">Alcanzados</div>
          </div>
          <!--end::Budget-->
        </div>
        <div class="text-gray-600 fw-semibold fs-5 mt-1 mb-7">
          <b>Cuenta:</b> {{ task.account.url }}
        </div>
        <div class="text-gray-600 fw-semibold fs-5 mt-1 mb-7">
          <b>Completado:</b> {{ deliveredPercent }}%
        </div>
        <!--begin::Progress-->
        <div
          class="h-4px w-100 bg-light mb-5"
          data-bs-toggle="tooltip"
          aria-label="This project 50% completed"
          data-bs-original-title="This project 50% completed"
          data-kt-initialized="1"
        >
          <div
            class="bg-primary rounded h-4px"
            :class="deliveredPercent < 100 ? 'bg-primary' : 'bg-success'"
            role="progressbar"
            :style="`width: ${deliveredPercent}%`"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <!--end::Progress-->
        <!--begin::Users-->

        <!--begin::User-->
        <!-- <div style="float: right">
                    <button class="btn btn-sm btn-secondary">Seguir</button>
                  </div> -->

        <!--end::Users-->
      </div>
      <!--end:: Card body-->
    </a>
  </div>
</template>
<script setup>
import { numberToCurrency } from "@/utils/Functions.js";
import { useServicesRequestStore } from "@/modules/services-request/stores/index.js";
import { computed } from "@vue/reactivity";
const services_requests_store = useServicesRequestStore();

const props = defineProps({
  task: {
    type: Object,
    default: {},
  },
});

const deliveredPercent = computed(() => {
  return (
    (parseInt(props.task.delivered_goal) * 100) / parseInt(props.task.goal)
  );
});
</script>
<style></style>
