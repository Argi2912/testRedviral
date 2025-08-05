<template>
  <div class="d-flex flex-column flex-xl-row gap-7 gap-lg-10">
    <!--begin::Order details-->
    <div
      class="card card-flush py-4 flex-row-fluid"
      v-for="(card, i) in cards"
      :key="'card_' + i"
    >
      <!--begin::Card header-->
      <div class="card-header">
        <div class="card-title">
          <h2>{{ card.title }}</h2>
        </div>
      </div>
      <!--end::Card header-->
      <!--begin::Card body-->
      <div class="card-body pt-0">
        <div class="table-responsive">
          <!--begin::Table-->
          <table
            class="table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px"
          >
            <!--begin::Table body-->
            <tbody class="fw-semibold text-gray-600">
              <!--begin::Date-->
              <tr v-for="(data, j) in card.data" :key="j">
                <td class="text-muted">
                  <div class="d-flex align-items-center">
                    {{ data.title }}
                  </div>
                </td>
                <td class="fw-bold text-end">
                  <div
                    class="d-flex align-items-center justify-content-end"
                    v-if="data.photo"
                  >
                    <!--begin:: Avatar -->
                    <div
                      class="symbol symbol-circle symbol-25px overflow-hidden me-3"
                    >
                      <a>
                        <div class="symbol-label">
                          <img
                            :src="data.photo"
                            alt="Dan Wilson"
                            class="w-100"
                          />
                        </div>
                      </a>
                    </div>
                    <!--end::Avatar-->
                    <!-- test -->
                    <!--begin::Name-->
                    <a
                      @click="onClick(data)"
                      :class="[data.emit && 'clickable']"
                      class="text-gray-600 text-hover-primary"
                      >{{ data.description }}</a
                    >
                    <!--end::Name-->
                  </div>
                  <a
                    @click="onClick(data)"
                    v-else
                    :class="[data.emit && 'clickable']"
                    class="text-gray-600 text-hover-primary"
                    >{{ data.description }}</a
                  >
                </td>
              </tr>
              <!--end::Date-->
            </tbody>
            <!--end::Table body-->
          </table>
          <!--end::Table-->
        </div>
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Order details-->
  </div>
  <!--begin::Tab content-->
  <ProductsList :items="items" :extras="extras" :total="total" />
  <!--end::Tab content-->
</template>

<script setup>
/*
    cards:[
        title: String,
        data: [
            {
                title: 'Fecha del pedido',
                description: String,
                photo: String,
                emit: String
            },
        ]
    ],

    items:[
        {
            photo: String,
            name: String,
            description: String,
            code: String,
            cuantity: Number,
            unit_price: String
        }
    ],

    extras: [
        {
            name:'String',
            value: 'String'
        }
    ],

    total: Number

*/

import ProductsList from "./ProductsList.vue";
const props = defineProps({
  cards: {
    type: Array,
    default: [],
  },

  items: {
    type: Array,
    default: [],
  },
  extras: {
    type: Array,
    default: [],
  },
  total: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["onAction"]);
const onClick = (data) => {
  if (data.emit) {
    emit("onAction", data.emit);
  }
};
</script>

<style></style>
