<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="tasks_store.active_page == '#list'"
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
import {useTasksStore} from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const tasks_store = useTasksStore();
const displayPage = (fade_effect) => {
  fade(tasks_store.active_page, fade_effect.page_to_show);
  tasks_store.setActivePage(fade_effect.page_to_show);
};
const init = async () => {
  await tasks_store.init(route);
  fadeIn(document.querySelector(tasks_store.active_page));
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
