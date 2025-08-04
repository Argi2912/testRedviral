<template>
  <div class="container">
    <div id="dashboard" class="hidden-to-fade">
      <WorkersDashboard
        v-if="route.name == 'workers-dashboard'"
        @onDisplayPage="displayPage"
      />
      <ClientsDashboard
        v-if="route.name == 'clients-dashboard'"
        @onDisplayPage="displayPage"
      />
      <AdminDashboard
        v-if="route.name == 'admin-dashboard'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="second-area" class="hidden-to-fade">
      <SecondPage @onDisplayPage="displayPage" />
    </div>
  </div>
</template>
<script setup>
import WorkersDashboard from "./pages/WorkersDashboard.vue";
import ClientsDashboard from "./pages/ClientsDashboard.vue";
import AdminDashboard from "./pages/AdminDashboard.vue";
import SecondPage from "./pages/SecondPage.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import { useDashboardStore } from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const dashboard_store = useDashboardStore();
const displayPage = (fade_effect) => {
  fade(dashboard_store.active_page, fade_effect.page_to_show);
  dashboard_store.setActivePage(fade_effect.page_to_show);
};
const init = async () => {
  await dashboard_store.init(route);
  fadeIn(document.querySelector(dashboard_store.active_page));
};
onMounted(() => {
  init();
});
</script>
<script>
export default {
  name: "MainComponent",
};
</script>
