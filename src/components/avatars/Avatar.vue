<template>
  <div :class="`symbol symbol-circle symbol-${size}px overflow-hidden me-3`">
    <img v-if="picture" :src="picture" class="`w-100`" />
    <div
      v-else
      :class="`symbol-label fs-${fontSize} bg-light-danger text-danger`"
    >
      {{ initials }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  initials: {
    type: String,
    default: "",
  },
  picture: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: "50",
  },
  fontSize: {
    type: String,
    default: "3",
  },
});
</script>

<style>
</style>