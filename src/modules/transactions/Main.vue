<template>
  <div class="container">
    <div id="list" class="hidden-to-fade">
      <List
        v-if="transactions_store.active_page == '#list'"
        @onDisplayPage="displayPage"
      />
    </div>
    <div id="transactions-details" class="hidden-to-fade">
      <RechargesDetails v-if="transactions_store.active_page
      == '#transactions-details'" @onDisplayPage="displayPage" />
    </div>
    <div id="create-update-transactions" class="hidden-to-fade">
      <RechargesForm v-if="transactions_store.active_page ==
      '#create-update-transactions'" @onDisplayPage="displayPage" />
    </div>
  </div>
</template>
<script setup>
import List from "./pages/List.vue";
import RechargesDetails from "./pages/RechargesDetails.vue";
import RechargesForm from "./pages/RechargesForm.vue";
import { fade, fadeIn } from "@/utils/Functions.js";
import {useTransactionsStore} from "./stores/index.js";
import { onMounted } from "vue-demi";
import { useRoute } from "vue-router";
const route = useRoute();
const transactions_store = useTransactionsStore();
const displayPage = (fade_effect) => {
  fade(transactions_store.active_page, fade_effect.page_to_show,()=>{

    transactions_store.setActivePage(fade_effect.page_to_show);
  });
};
const init = async () => {
  await transactions_store.init(route);
  fadeIn(document.querySelector(transactions_store.active_page));
};
onMounted(() => {
  init();
});
</script>
<script>
export default {
  name: "TransactionsMainComponent",
};
</script>
