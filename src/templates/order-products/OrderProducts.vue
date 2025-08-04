<template>
  <div
    class="row row-cols-1 border border-dashed rounded pt-3 pb-1 px-2 mb-5 mh-300px overflow-scroll"
  >
    <span
      class="w-100 text-muted"
      v-if="order_store.getProductsList().length == 0"
      >Debe seleccionar al menos un producto</span
    >
    <div
      v-for="(product, i) in order_store.getProductsList()"
      :key="'product_' + product.description"
      class="col my-2"
    >
      <Product :max="max" :product="product" :index="i" />
    </div>
  </div>
  <div align="center" v-if="order_store.validateCeroQuantity()">
    <span style="color: salmon">La cantidad a comprar no puede ser cero</span>
  </div>
  <div class="fw-bold fs-4">Total: $ {{ order_store.getTotal() }}</div>
</template>

<script setup>
import { onMounted, watch } from "vue-demi";
import { useOrderStore } from "./order.store.js";
import Product from "./Product.vue";

const props = defineProps({
  max: {
    type: Number,
    default: -1,
  },
});

const order_store = useOrderStore();
const emit = defineEmits(["onUpdateList"]);

const onUpdateList = () => {
  emit("onUpdateList", {
    order_list: order_store.getProductsList(),
    original_list: order_store.getProductsList("original"),
  });
};
watch(() => {
  if (order_store.getProductsList().length > 0) {
    onUpdateList();
  }
});
</script>
