<template>
  <div v-if="there_are_results">
    <slot></slot>
  </div>
  <div v-else align="center">
    <div>
      <img
        v-if="showImage"
        :src="getImage"
        class="height-auto"
        :class="'width-' + width"
      />
    </div>
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue-demi";
const props = defineProps({
  results: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "auto",
  },
  showImage: {
    type: Boolean,
  },
  text: {
    type: String,
    default: "",
  },
});

const getImage = computed(() => {
  let rand = Math.floor(Math.random() * 2) + 1;
  return "/assets/core-svg/question-" + rand + ".svg";
});

let there_are_results = ref(false);

watchEffect(() => {
  if (props.results) there_are_results.value = true;
  else there_are_results.value = false;
});
</script>

<style scoped>
.height-auto {
  height: auto;
}
.width-100 {
  width: 100px;
}
.width-200 {
  width: 200px;
}
.width-300 {
  width: 300px;
}
.width-400 {
  width: 400px;
}
.width-500 {
  width: 500px;
}
.width-auto {
  width: 100%;
}
</style>
