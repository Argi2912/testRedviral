<template>
  <!--begin::Engage widget 8-->
  <div
    class="card border-0 h-md-100"
    data-theme="light"
    style="background: linear-gradient(112.14deg, #00d2ff 0%, #3a7bd5 100%)"
  >
    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Row-->
      <div class="row align-items-center h-100">
        <!--begin::Col-->
        <div class="col-7 ps-xl-13">
          <!--begin::Title-->
          <div class="text-white mb-6 pt-6">
            <span class="fs-4 fw-semibold me-2 d-block lh-1 pb-2 opacity-75"
              >Tareas y beneficios</span
            >

            <span class="fs-2qx fw-bold">Gestión de tareas</span>
          </div>
          <!--end::Title-->

          <!--begin::Text-->
          <span class="fw-semibold text-white fs-6 mb-8 d-block opacity-75">
            Gestiona las tareas pendientes para que ganes mas dinero 
          </span>
          <!--end::Text-->

          <!--begin::Items-->
          <div
            class="d-flex align-items-center flex-wrap d-grid gap-2 mb-10 mb-xl-20"
          >
            <!--begin::Item-->
            <div class="d-flex align-items-center me-5 me-xl-13">
              <!--begin::Symbol-->
              <div class="symbol symbol-30px symbol-circle me-3">
                <span class="symbol-label" style="background: #35c7ff">
                  <!--begin::Svg Icon | path: icons/duotune/abstract/abs042.svg-->
                  <span class="svg-icon svg-icon-5 svg-icon-white"
                    ><svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 21.6C16.6 20.4 9.1 20.3 6.3 21.2C5.7 21.4 5.1 21.2 4.7 20.8L2 18C4.2 15.8 10.8 15.1 15.8 15.8C16.2 18.3 17 20.5 18 21.6ZM18.8 2.8C18.4 2.4 17.8 2.20001 17.2 2.40001C14.4 3.30001 6.9 3.2 5.5 2C6.8 3.3 7.4 5.5 7.7 7.7C9 7.9 10.3 8 11.7 8C15.8 8 19.8 7.2 21.5 5.5L18.8 2.8Z"
                        fill="currentColor"
                      ></path>
                      <path
                        opacity="0.3"
                        d="M21.2 17.3C21.4 17.9 21.2 18.5 20.8 18.9L18 21.6C15.8 19.4 15.1 12.8 15.8 7.8C18.3 7.4 20.4 6.70001 21.5 5.60001C20.4 7.00001 20.2 14.5 21.2 17.3ZM8 11.7C8 9 7.7 4.2 5.5 2L2.8 4.8C2.4 5.2 2.2 5.80001 2.4 6.40001C2.7 7.40001 3.00001 9.2 3.10001 11.7C3.10001 15.5 2.40001 17.6 2.10001 18C3.20001 16.9 5.3 16.2 7.8 15.8C8 14.2 8 12.7 8 11.7Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <!--end::Svg Icon-->
                </span>
              </div>
              <!--end::Symbol-->

              <!--begin::Info-->
              <div class="text-white">
                <span class="fw-semibold d-block fs-8 opacity-75"
                  >Globales</span
                >
                <span class="fw-bold fs-7">{{ firstData }}</span>
              </div>
              <!--end::Info-->
            </div>
            <!--end::Item-->

            <!--begin::Item-->
            <div class="d-flex align-items-center">
              <!--begin::Symbol-->
              <div class="symbol symbol-30px symbol-circle me-3">
                <span class="symbol-label" style="background: #35c7ff">
                  <!--begin::Svg Icon | path: icons/duotune/abstract/abs027.svg-->
                  <span class="svg-icon svg-icon-5 svg-icon-white"
                    ><svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.3"
                        d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <!--end::Svg Icon-->
                </span>
              </div>
              <!--end::Symbol-->

              <!--begin::Info-->
              <div class="text-white">
                <span class="fw-semibold opacity-75 d-block fs-8">{{
                  isWorker
                    ? auth_store.getProperty("user_data").country
                    : "Terminadas"
                }}</span>
                <span class="fw-bold fs-7">{{ secondData }}</span>
              </div>
              <!--end::Info-->
            </div>
            <!--end::Item-->
          </div>
          <!--end::Items-->

          <!--begin::Action-->
          <div class="d-flex flex-column flex-sm-row d-grid gap-2">
            <a
              @click="router.push({ name: 'admin-tasks' })"
              v-if="route.name !== 'clients-dashboard'"
              class="btn btn-success flex-shrink-0 me-lg-2"
              >Ver tareas</a
            >
          </div>
          <!--end::Action-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-5 pt-10">
          <!--begin::Illustration-->
          <div
            class="bgi-no-repeat bgi-size-contain bgi-position-x-end h-225px"
            style="
              background-image: url(/assets/media/svg/illustrations/easy/5.svg);
            "
          ></div>
          <!--end::Illustration-->
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Engage widget 8-->
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { computed } from "@vue/reactivity";
import { useAuthStore } from "../../auth/stores/store";
const router = useRouter();
const route = useRoute();

const props = defineProps({
  firstData: {
    type: Number,
    default: 0,
  },
  secondData: {
    type: Number,
    default: 99,
  },
});

const auth_store = useAuthStore();
const isWorker = computed(() => {
  return auth_store.getProperty("user").role == 3;
});
onMounted(() => {
  auth_store.loadProfileInfo();
});
</script>
