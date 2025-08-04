<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="support_ticket_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="support-ticket-details" class="hidden-to-fade">
      <SupportTicketDetails
        v-if="support_ticket_store.active_page == '#support-ticket-details'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="create-update-support-ticket" class="hidden-to-fade">
      <SupportTicketForm
        v-if="
          support_ticket_store.active_page == '#create-update-support-ticket'
        "
        @onDisplayPage="displayPage"
      />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import SupportTicketDetails from "./pages/SupportTicketDetails.vue";
import SupportTicketForm from "./pages/SupportTicketForm.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import { useSupportTicketStore } from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const support_ticket_store = useSupportTicketStore();
const displayPage = (fade_effect) => {
  fade(support_ticket_store.active_page, fade_effect.page_to_show, () => {
    support_ticket_store.setActivePage(fade_effect.page_to_show);
  });
};
const init = async () => {
  await support_ticket_store.init(route);
  fadeIn(document.querySelector(support_ticket_store.active_page));
};
onMounted(() => {
  init();
});
</script>
<script>
export default {
  name: "SupportTicketMainComponent",
};
</script>
