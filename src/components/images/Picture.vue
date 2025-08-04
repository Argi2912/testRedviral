<template>
  <div>
    <img :src="src" class="height-auto" :style="'width:' + width + 'px'" />
  </div>
</template>
<script setup>
const props = defineProps({
  src: {
    type: String,
    default: "https://picsum.photos/200",
  },
  width: {
    type: String,
    default: "300",
  },
  showImage: {
    type: Boolean,
  },
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
