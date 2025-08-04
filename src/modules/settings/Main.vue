<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="settings_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="second-area" class="hidden-to-fade">
      <SecondPage @onDisplayPage="displayPage" />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import SecondPage from "./pages/SecondPage.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import {useSettingsStore} from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const settings_store = useSettingsStore();
const displayPage = (fade_effect) => {
  fade(settings_store.active_page, fade_effect.page_to_show);
  settings_store.setActivePage(fade_effect.page_to_show);
};
const init = async () => {
  await settings_store.init(route);
  fadeIn(document.querySelector(settings_store.active_page));
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
