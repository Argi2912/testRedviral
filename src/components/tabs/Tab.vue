<template>
  <ul class="nav nav-tabs justify-content-center">
    <li class="nav-item" v-for="(tab, i) in tabs" :key="'tab_' + i">
      <a
        class="nav-link"
        :class="[tab.id == selected_tab && 'active', readonly && 'disabled']"
        @click="selectTab(tab)"
        aria-current="page"
        href="#"
        >{{ tab.label }}</a
      >
    </li>
  </ul>
  <div v-for="(tab, i) in tabs" :key="'content_tab' + i" class="pt-4">
    <slot :name="tab.id" v-if="tab.id == selected_tab" />
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue-demi";

const props = defineProps({
  tabs: {
    type: Array,
    default: [],
  },

  selectedTab: {
    type: String,
    default: "",
  },

  readonly: {
    type: Boolean,
    default: false,
  },
});

let selected_tab = ref("");
const emit = defineEmits(["onChangeTab"]);
const selectTab = (tab) => {
  selected_tab.value = tab.id;
  emit("onChangeTab", {
    tab: tab.id,
  });
};

onMounted(() => {
  if (props.selectedTab != "") selected_tab.value = props.selectedTab;
  else if (props.tabs.length > 0) selected_tab.value = props.tabs[0].id;
});
</script>
