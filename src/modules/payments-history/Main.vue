<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="payments_history_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="details" class="hidden-to-fade">
      <SecondPage
        v-if="payments_history_store.active_page == '#details'"
        @onDisplayPage="displayPage"
      />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import SecondPage from "./pages/SecondPage.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import { usePaymentsHistoryStore } from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const payments_history_store = usePaymentsHistoryStore();
const displayPage = (fade_effect) => {
  fade(payments_history_store.active_page, fade_effect.page_to_show);
  payments_history_store.setActivePage(fade_effect.page_to_show);
};
const init = async () => {
  await payments_history_store.init(route);
  fadeIn(document.querySelector(payments_history_store.active_page));
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
