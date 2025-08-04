<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="roles_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="users" class="hidden-to-fade">
      <Users
        v-if="roles_store.active_page == '#users'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="create-update-roles" class="hidden-to-fade">
      <RolesForm
        v-if="roles_store.active_page == '#create-update-roles'"
        @onDisplayPage="displayPage"
      />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import Users from "./pages/Users.vue";
import RolesForm from "./pages/RolesForm.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import { useRolesStore } from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const roles_store = useRolesStore();
const displayPage = (fade_effect) => {
  fade(roles_store.active_page, fade_effect.page_to_show, () => {
    roles_store.setActivePage(fade_effect.page_to_show);
  });
};
const init = async () => {
  await roles_store.init(route);
  fadeIn(document.querySelector(roles_store.active_page));
};
onMounted(() => {
  init();
});
</script>
<script>
export default {
  name: "RolesMainComponent",
};
</script>
