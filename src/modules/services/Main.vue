<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="services_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="services-details" class="hidden-to-fade">
      <ServicesDetails v-if="services_store.active_page
      == '#services-details'" @onDisplayPage="displayPage" />
    </div>
    <div id="create-update-services" class="hidden-to-fade">
      <ServicesForm v-if="services_store.active_page ==
      '#create-update-services'" @onDisplayPage="displayPage" />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import ServicesDetails from "./pages/ServicesDetails.vue";
import ServicesForm from "./pages/ServicesForm.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import {useServicesStore} from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const services_store = useServicesStore();
const displayPage = (fade_effect) => {
  fade(services_store.active_page, fade_effect.page_to_show,()=>{

    services_store.setActivePage(fade_effect.page_to_show);
  });
};
const init = async () => {
  await services_store.init(route);
  fadeIn(document.querySelector(services_store.active_page));
};
onMounted(() => {
  init();
});
</script>
<script>
export default {
  name: "ServicesMainComponent",
};
</script>
