<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="comissions_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="comissions-details" class="hidden-to-fade">
      <ComissionsDetails v-if="comissions_store.active_page
      == '#comissions-details'" @onDisplayPage="displayPage" />
    </div>
    <div id="create-update-comissions" class="hidden-to-fade">
      <ComissionsForm v-if="comissions_store.active_page ==
      '#create-update-comissions'" @onDisplayPage="displayPage" />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import ComissionsDetails from "./pages/ComissionsDetails.vue";
import ComissionsForm from "./pages/ComissionsForm.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import {useComissionsStore} from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const comissions_store = useComissionsStore();
const displayPage = (fade_effect) => {
  fade(comissions_store.active_page, fade_effect.page_to_show,()=>{

    comissions_store.setActivePage(fade_effect.page_to_show);
  });
};
const init = async () => {
  await comissions_store.init(route);
  fadeIn(document.querySelector(comissions_store.active_page));
};
onMounted(() => {
  init();
});
</script>
<script>
export default {
  name: "ComissionsMainComponent",
};
</script>
