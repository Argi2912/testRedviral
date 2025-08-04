<template>
  <button :disabled="isLoading" :class="buttonClasses">
    {{ isLoading ? loadingText : text }}
  </button>
</template>
<script setup>
const porps = defineProps({
  isLoading: {
    type: Boolean,
  },
  loadingText: {
    type: String,
    default: "...cargando...",
  },
  text: {
    type: String,
    default: "*****",
  },
  buttonClasses: {
    type: String,
    default: "btn btn-primary btn-sm",
  },
});
</script>
