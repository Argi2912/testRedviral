<template>
  <div :key="rerender">
    <slot></slot>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue-demi";
const props = defineProps({
  props: {
    type: Array,
    default: [],
  },
});
let rerender = ref(0);
const resetRerender = () => {
  rerender.value = Math.random();
};
let internal_props = ref([]);
watch(props, () => {
  rerender.value++;
});
</script>

<style>
</style>