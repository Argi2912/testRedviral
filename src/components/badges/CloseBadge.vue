<template>
  <div id="current-badge" :class="`bg-${background} text-${textColor}`">
    <i
      v-if="!readonly"
      class="bi bi-x clickable"
      :class="[`text-${textColor}`]"
      @click="closeBadge"
    ></i
    ><b>{{ text }}</b>
  </div>
</template>

<script setup>
import { computed } from "vue-demi";

const emit = defineEmits(["onClose"]);
const closeBadge = () => {
  if (!props.readonly) emit("onClose");
};
const colors_for_text = {
  red: "light",
  yellow: "dark",
  blue: "light",
  green: "light",
};
const textColor = computed(() => {
  return colors_for_text[props.background];
});

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  background: {
    type: String,
    default: "",
  },

  readonly: {
    type: Boolean,
  },
});
</script>
<style scoped>
#current-badge {
  font-size: 12px;
  display: inline-block;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 6px;
  padding-right: 6px;
  border-radius: 4px 4px 4px 4px;
}
.bg-red {
  background: salmon;
}
.bg-blue {
  background: rgb(23, 151, 224);
}
.bg-green {
  background: rgb(139, 222, 135);
}
.bg-yellow {
  background: rgb(255, 250, 158);
}
.text-dark {
  color: rgb(31, 31, 31);
}
.text-light {
  color: rgb(220, 220, 220);
}
</style>