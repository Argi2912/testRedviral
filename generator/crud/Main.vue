<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="__name__(snakeCase)_store.active_page == '#list'"
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
import {use__name__(pascalCase)Store} from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const __name__(snakeCase)_store = use__name__(pascalCase)Store();
const displayPage = (fade_effect) => {
  fade(__name__(snakeCase)_store.active_page, fade_effect.page_to_show);
  __name__(snakeCase)_store.setActivePage(fade_effect.page_to_show);
};
const init = async () => {
  await __name__(snakeCase)_store.init(route);
  fadeIn(document.querySelector(__name__(snakeCase)_store.active_page));
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
