<template>
  <div>
    <span v-if="has_permission">
      <slot></slot>
    </span>
    <div v-else :align="textAlign">
      <Picture
        v-if="showImage"
        :src="'/assets/core-svg/forbidden-' + getRandomNumber + '.svg'"
        :width="imageWidth"
      />
      <span v-if="text">{{ text }}</span>
    </div>
  </div>
</template>
<script setup>
import { computed } from "@vue/reactivity";
import { ref, watchEffect } from "vue";
import {
  validatePermission,
  validateManyPermissions,
} from "@/utils/Functions.js";
const props = defineProps({
  showImage: {
    type: Boolean,
  },
  imageWidth: {
    type: Number,
    default: 300,
  },
  text: {
    type: String,
    default: "",
  },
  textAlign: {
    type: String,
    default: "center",
  },
  permissionTag: {
    type: String,
    default: "",
  },
  permissionTags: {
    type: Array,
    default: [],
  },
  userPermissions: {
    type: Array,
    default: [],
  },
});
let has_permission = ref(false);
watchEffect(() => {
  if (props.userPermissions.length > 0) {
    if (props.permissionTag != "") {
      has_permission.value = validatePermission(
        props.permissionTag,
        props.userPermissions
      );
    }

    if (props.permissionTags.length > 0) {
      has_permission.value = validateManyPermissions(
        props.permissionTags,
        props.userPermissions
      );
    }
  }
});
const getRandomNumber = computed(() => {
  return Math.floor(Math.random() * 1) + 1;
});
</script>
<style></style>
