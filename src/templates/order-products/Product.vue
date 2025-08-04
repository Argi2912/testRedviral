<template>
  <div class="border border-dashed rounded p-3 bg-body">
    <span class="d-none d-xxl-block">
      <div class="row align-items-center">
        <div class="col mr-2" align="center">
          <div align="left">
            <div>
              <div class="d-flex align-items-center">
                <span class="symbol symbol-50px">
                  <span
                    class="symbol-label"
                    :style="'background-image: url(' + product.image + ');'"
                  ></span>
                </span>
                <div class="ms-5">
                  <span class="text-gray-800 text-hover-primary fs-5 fw-bold">
                    {{ getLabel("title") }}
                  </span>
                  {{ product.title }}

                  <div class="fw-semibold fs-7">
                    {{ getLabel("subtitle") }} {{ product.subtitle }}
                  </div>

                  <div class="text-muted fs-7">
                    {{ getLabel("description") }} {{ product.description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div align="center" class="col">
          <div><b>Cantidad</b></div>
          <div>
            <input type="number" id="quantity-input" v-model="quantity" />
          </div>
          <div v-if="displayError" class="text-danger">
            Máximo permitido: {{ max }}
          </div>
        </div>
        <div align="center" class="col">
          <div><b>Total</b></div>
          <div>${{ product.price * quantity }}</div>
        </div>
      </div>
    </span>
    <span class="d-none d-xl-block d-xxl-none">
      <div class="row align-items-center">
        <div class="col">
          <div align="left">
            <div align="center">
              <img :src="product.image" class="image float-left" alt="" />
            </div>
            <div class="float-left text-truncate mx-2">
              <div>
                <b>
                  {{ getLabel("title") }}
                </b>
                {{ product.name }}
              </div>
              <div>
                {{ getLabel("subtitle") }}

                {{ product.price }}
              </div>
              <div>
                {{ getLabel("description") }}

                {{ product.code }}
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div align="center" class="col">
            <div><b>Cantidad</b></div>
            <input id="quantity-input" v-model="quantity" />
            <div v-if="displayError" class="text-danger">
              Máximo permitido: {{ max }}
            </div>
            <div><b>Total</b></div>
            <div>${{ product.price }}</div>
          </div>
        </div>
      </div>
    </span>
    <div class="d-xxl-none d-xl-none">
      <div class="row">
        <div class="col">
          <div align="center">
            <img :src="product.image" class="image" alt="" />
          </div>
          <div class="mt-2" align="center">
            <b>
              {{ getLabel("title") }}
            </b>
            {{ product.name }}
          </div>
          <div align="center">
            {{ getLabel("subtitle") }}

            {{ product.price }}
          </div>
          <div align="center">
            {{ getLabel("description") }}

            {{ product.code }}
          </div>
          <div class="mt-2" align="center">
            <div><b>Cantidadddd</b></div>
            <input id="quantity-input" v-model="quantity" />
            <div v-if="displayError" class="text-danger">
              Máximo permitido: {{ max }}
            </div>
          </div>
          <div align="center">
            <div><b>Total</b></div>
            <div>${{ product.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue-demi";
import { useOrderStore } from "./order.store.js";

const props = defineProps({
  product: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: -1,
  },
  max: {
    type: Number,
    default: -1,
  },
});

const displayError = computed(() => {
  return quantity.value > props.max && props.max != -1;
});

let quantity = ref(1);
watch(quantity, (v) => {
  if (v < 0) {
    quantity.value = 1;
  } else {
    order_store.updateItem(props.index, {
      quantity: v,
    });
  }
});
const order_store = useOrderStore();
const getLabel = (name) => {
  let label = order_store.getLabel(name);
  return label ? label + ":" : "";
};

onMounted(() => {
  console.log(props.product);
  quantity.value = props.product.quantity;
});
</script>

<style scoped>
.image {
  width: 50px;
  height: 50px;
  background: rgb(243, 243, 243);
  border-radius: 5px 5px 5px 5px;
  object-fit: cover;
}
.float-left {
  float: left;
}
#quantity-input {
  width: 70px;
  height: 20px;
  text-align: center;
  border: none;
}
#quantity-input::-webkit-outer-spin-button,
#quantity-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
#quantity-input[type="number"] {
  -moz-appearance: textfield;
}
</style>
