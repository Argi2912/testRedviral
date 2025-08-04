<template>
  <select class="form-select mb-2" @input="updateValue">
    <option v-if="placeholder" disabled :selected="modelValue">
      {{ placeholder }}
    </option>
    <option
      v-for="(item, i) in final_items"
      :key="key + '_' + i"
      :value="item.value"
      :selected="item.value == modelValue"
    >
      {{ item.label }}
    </option>
  </select>
</template>

<script setup>
import { onMounted, ref } from "vue-demi";

const props = defineProps({
  modelValue: {
    type: String,
  },
  items: {
    type: Array,
    default: [],
  },
  options: {
    type: Array,
    default: [],
  },

  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

let key = ref(new Date().getTime());
let final_items = ref([]);

const parseItems = (items) => {
  let _array = [];
  items.map((item) => {
    _array.push({
      label: item.name,
      value: item.id,
    });
  });
  return _array;
};

onMounted(() => {
  if (props.options.length > 0) {
    final_items.value = props.options;
  } else {
    final_items.value = parseItems(props.items);
  }
});
</script>

<style>
</style>