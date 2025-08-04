<template>
  <div class="multiselect">
    <div class="form-control">
      <div class="selected-items">
        <div v-if="selected_items.length === 0">
          <span class="text-muted">{{ placeholder }}</span>
        </div>
        <div v-else id="values" class="hide-scrollbar">
          <span v-for="(item, index) in selectedItems" :key="index">
            <CloseBadge
              :text="item"
              background="blue"
              class="m-1"
              :readonly="readonly"
              @onClose="unselect(index)"
            />
          </span>
        </div>
        <div v-if="!readonly" @click="toggleDropdown" align="center">
          <i v-if="dropdown_is_open" class="bi bi-arrow-up-short"></i>
          <i v-else class="bi bi-arrow-down-short"></i>
        </div>
      </div>
    </div>
    <div class="dropdown-menu p-2" :class="{ show: dropdown_is_open }">
      <div class="input-group mb-3">
        <input
          id="searcher"
          class="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          v-model.trim="search_query"
        />
      </div>
      <div id="results" class="hide-scrollbar">
        <div v-for="(item, index) in filteredItems" :key="index" class="my-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :id="`item-${index}`"
              :value="item.value"
              v-model="selected_items"
            />
            <label class="form-check-label" :for="`item-${index}`">{{
              item.name
            }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect, onMounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: "Seleccionar items",
  },
  readonly: {
    type: Boolean,
  },
  test: {
    type: Boolean,
  },
  selectedItems: {
    type: Array,
    default: [],
  },
});
const selected_items = ref([]);
let dropdown_is_open = ref(false);
const search_query = ref("");

const unselect = (index) => {
  selected_items.value.splice(index, 1);
  emit("onSelectOption", selected_items.value);
};

const toggleDropdown = () => {
  dropdown_is_open.value = !dropdown_is_open.value;
};
const emit = defineEmits(["onSelectOption"]);

watch(selected_items, () => {
  emit("onSelectOption", selected_items.value);
});

const parseExternalSelectedItems = () => {
  let _items = [];
  props.selectedItems.map((item) => {
    _items.push(item.value);
  });
  return _items;
};

watchEffect(() => {
  if (props.selectedItems.length > 0) {
    selected_items.value = parseExternalSelectedItems();
  }
});
const selectedItems = computed(() => {
  let _selected_items = [...selected_items.value];
  return _selected_items.reverse();
});
const filteredItems = computed(() => {
  if (!search_query.value) {
    return props.items;
  }
  return props.items.filter((item) =>
    item.name.toLowerCase().includes(search_query.value.toLowerCase())
  );
});
</script>

<style>
.multiselect {
  position: relative;
}

.selected-items {
  overflow: hidden;
}

.dropdown-menu {
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.dropdown-menu.show {
  display: block;
}
#searcher::-webkit-outer-spin-button,
#searcher::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
#searcher[type="number"] {
  -moz-appearance: textfield;
}
#results {
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
}
#values {
  max-height: 100px;
  overflow-y: scroll;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>