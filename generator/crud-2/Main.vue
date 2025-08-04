<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="__name__(snakeCase)_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="__name__(kebabCase)-details" class="hidden-to-fade">
      <__name__(pascalCase)Details v-if="__name__(snakeCase)_store.active_page
      == '#__name__(kebabCase)-details'" @onDisplayPage="displayPage" />
    </div>
    <div id="create-update-__name__(kebabCase)" class="hidden-to-fade">
      <__name__(pascalCase)Form v-if="__name__(snakeCase)_store.active_page ==
      '#create-update-__name__(kebabCase)'" @onDisplayPage="displayPage" />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import __name__(pascalCase)Details from "./pages/__name__(pascalCase)Details.vue";
import __name__(pascalCase)Form from "./pages/__name__(pascalCase)Form.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import {use__name__(pascalCase)Store} from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const __name__(snakeCase)_store = use__name__(pascalCase)Store();
const displayPage = (fade_effect) => {
  fade(__name__(snakeCase)_store.active_page, fade_effect.page_to_show,()=>{

    __name__(snakeCase)_store.setActivePage(fade_effect.page_to_show);
  });
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
  name: "__name__(pascalCase)MainComponent",
};
</script>
