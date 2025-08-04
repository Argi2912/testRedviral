<template>
  <div>
    <div id="kt_app_content" class="app-content flex-column-fluid">
      <!--begin::Content container-->
      <div id="kt_app_content_container" class="app-container container-xxl">
        <!--begin::Faq main-->
        <div class="row">
          <div class="col col-md-9">
            <div class="d-flex flex-column flex-xl-row mt-8">
              <!--begin::Content-->
              <div class="card bg-body mb-9 mb-xl-0 me-lg-9">
                <div class="card-body">
                  <!--begin::Faq content-->
                  <div class="m-0">
                    <!--begin::Intro-->
                    <div class="mb-9">
                      <!--begin::Title-->
                      <h4 class="fs-2qx text-gray-800 w-bolder mb-6">
                        Preguntas frecuentes
                      </h4>
                      <!--end::Title-->
                      <!--begin::Text-->
                      <p class="fs-5 fw-semibold text-gray-400">
                        Estas son las pregungas que las personas nos hacen más
                        frecuentamente. Si tienes alguna inquietud, intenta
                        revisar si ya alguien ha preguntado algo similar a lo
                        que necesitas.
                      </p>
                      <!--end::Text-->
                    </div>
                    <!--end::Intro-->
                    <!--begin::Items-->
                    <div class="m-0">
                      <!--begin::Item-->
                      <div class="mb-12">
                        <!--begin::Title-->
                        <h3 class="text-gray-800 fw-bold mb-2">
                          Preguntas frecuentes
                        </h3>

                        <!--end::Title-->

                        <!--begin::Questions-->
                        <Hoping
                          :loading="faqs_store.items.faqs.loading_simple_list"
                        >
                          <div
                            class="m-0"
                            v-for="(
                              question, i
                            ) in faqs_store.getSimpleFaqsList()"
                            :key="'question_' + i"
                          >
                            <Question :question="question" />
                            <div class="separator separator-dashed"></div>
                          </div>
                        </Hoping>
                        <!--end::Questions-->
                      </div>
                      <!--end::Item-->
                    </div>
                    <!--end::Items-->
                  </div>
                  <!--end::Faq content-->
                </div>
              </div>
            </div>
          </div>
          <div class="col col-md-3 mt-8" align="center">
            <div class="card">
              <div class="card-body">
                <img
                  src="/assets/media/illustrations/sketchy-1/17.png"
                  class="mw-100 h-200px mb-4"
                  alt=""
                />
                <p><b>Crea y gestiona tickets de soporte</b></p>
                <button
                  class="btn btn-primary"
                  @click="router.push({ name: 'support-ticket' })"
                >
                  Ir a la bandeja
                </button>
              </div>
            </div>
          </div>
        </div>

        <!--end::Faq main-->
      </div>
      <!--end::Content container-->
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue-demi";
import Question from "../components/Question.vue";
import { useFaqsStore } from "../stores/index.js";
import { useRouter } from "vue-router";

const router = useRouter();
const faqs_store = useFaqsStore();
onMounted(() => {
  faqs_store.loadSimpleFaqsList();
});
</script>

<style></style>
