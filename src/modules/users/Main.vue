<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="users_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="client-details" class="hidden-to-fade">
      <ClientDetails
        v-if="users_store.active_page == '#client-details'"
        @onDisplayPage="displayPage"
      />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import ClientDetails from "./pages/ClientDetails.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import { useUsersStore } from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const users_store = useUsersStore();
const displayPage = (fade_effect) => {
  fade(users_store.active_page, fade_effect.page_to_show);
  users_store.setActivePage(fade_effect.page_to_show);
};
const init = async () => {
  await users_store.init(route);
  fadeIn(document.querySelector(users_store.active_page));
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
