<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="services_request_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="services-request-details" class="hidden-to-fade">
      <ServicesRequestDetails
        v-if="services_request_store.active_page == '#services-request-details'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="create-update-services-request" class="hidden-to-fade">
      <ServicesRequestForm
        v-if="
          services_request_store.active_page ==
          '#create-update-services-request'
        "
        @onDisplayPage="displayPage"
      />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import ServicesRequestDetails from "./pages/ServicesRequestDetails.vue";
import ServicesRequestForm from "./pages/ServicesRequestForm.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import { useServicesRequestStore } from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const services_request_store = useServicesRequestStore();
const displayPage = (fade_effect) => {
  fade(services_request_store.active_page, fade_effect.page_to_show, () => {
    services_request_store.setActivePage(fade_effect.page_to_show);
  });
};
const init = async () => {
  await services_request_store.init(route);
  fadeIn(document.querySelector(services_request_store.active_page));
};
onMounted(() => {
  init();
});
</script>
<script>
export default {
  name: "ServicesRequestMainComponent",
};
</script>
