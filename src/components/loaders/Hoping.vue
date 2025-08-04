<template>
  <div>
    <div v-if="is_loading" align="center">
      <RippleLoader />
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue-demi";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});
let is_loading = ref(false);

watchEffect(() => {
  if (props.loading) is_loading.value = true;
  else is_loading.value = false;
});
</script>

<style></style>
