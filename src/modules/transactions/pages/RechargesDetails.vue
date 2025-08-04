<template>
  <div
    id="kt_app_toolbar"
    class="app-toolbar align-items-center justify-content-between py-2 py-lg-6"
  >
    <!--begin::Toolbar wrapper-->
    <div
      class="d-flex flex-grow-1 flex-stack flex-wrap gap-2 mb-n10"
      id="kt_toolbar"
    >
      <!--begin::Page title-->
      <div class="page-title d-flex flex-column justify-content-center me-3">
        <!--begin::Title-->
        <h1
          class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center me-3 my-0"
        >
          Detalles de la transacción
        </h1>
        <!--end::Title-->
        <!--begin::Breadcrumb-->
        <ul
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
        >
          <!--begin::Item-->
          <li class="breadcrumb-item text-muted">
            <a class="text-muted text-hover-primary clickable" @click="goBack()"
              >Transacciones</a
            >
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <li class="breadcrumb-item">
            <span class="bullet bg-gray-400 w-5px h-2px"></span>
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <li class="breadcrumb-item text-dark">Detalles de cliente</li>
          <!--end::Item-->
        </ul>
        <!--end::Breadcrumb-->
      </div>
      <!--end::Page title-->
    </div>
    <!--end::Toolbar wrapper-->
  </div>
  <!--end::Toolbar-->
  <div id="kt_app_content" class="app-content flex-column-fluid mt-8">
    <div class="d-flex flex-column gap-7 gap-lg-10">
      <OrderDetails
        :key="rerender_order_details"
        @onAction="executeAction"
        :cards="[
          {
            title:
              'Detalles (#' + store.items.transactions.selected_item.id + ')',
            data: [
              {
                title: 'Fecha del pedido',
                description: parseDate(
                  store.items.transactions.selected_item.created_at
                ),
              },
              {
                title: 'Método de pago',
                description:
                  store.items.transactions.selected_item.payment_method,
              },
            ],
          },
          {
            title: 'Mis datos',
            data: [
              {
                title: 'Cliente',
                description: fullName(
                  store.items.transactions.selected_item.user
                ),
                photo: store.items.transactions.selected_item.user.photo,
              },
              {
                title: 'Email',
                description: store.items.transactions.selected_item.user.email,
              },
              {
                title: 'Teléfono',
                description: store.items.transactions.selected_item.user.phone,
              },
            ],
          },
          {
            title: 'Factura',
            data: [
              {
                title: 'Factura',
                description: '#' + store.items.transactions.selected_item.id,
              },
              {
                title: 'Accion',
                description:
                  transaction_state == 'activo' ? 'Aceptar' : 'Aceptado',
                emit:
                  transaction_state == 'activo'
                    ? 'accept_transaction'
                    : undefined,
              },
            ],
          },
        ]"
        :items="[
          {
            photo: '',
            alt: 'R',
            name: 'Recarga',
            description: store.items.transactions.selected_item.payment_method,
            code: 'N/A',
            cuantity: 1,
            unit_price: numberToCurrency(
              'COP',
              store.items.transactions.selected_item.amount
            ),
            total: numberToCurrency(
              'COP',
              store.items.transactions.selected_item.amount
            ),
          },
        ]"
        :extras="[
          {
            name: 'Subtotal',
            value: numberToCurrency(
              'COP',
              store.items.transactions.selected_item.amount
            ),
          },
        ]"
        :total="
          numberToCurrency('COP', store.items.transactions.selected_item.amount)
        "
      />
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useTransactionsStore } from "../stores/index.js";
import { numberToCurrency, parseDate } from "@/utils/Functions.js";
import OrderDetails from "@/templates/OrderDetails.vue";
const fullName = (user) => {
  return user.name + " " + user.lastname;
};
let transaction_state = ref("Pagado");
const executeAction = (action) => {
  if (action == "accept_transaction") {
    let _state = "Pagado";
    store.updateTransactions(
      {
        state: _state,
      },
      store.items.transactions.selected_item.id
    );
    transaction_state.value = _state;
  }
};
const store = useTransactionsStore();
const goBack = () => {
  store.setModal("");
  store.setFormMode("create_update_transactions", "");
  store.setSelectedItem("transactions", {});
  store.setSelectedItemIndex("transactions", -1);
  goToPage("#list");
};
const emit = defineEmits(["onDisplayPage"]);
const goToPage = (page) => {
  emit("onDisplayPage", {
    page_to_show: page,
  });
};
onBeforeMount(() => {
  transaction_state.value = store.items.transactions.selected_item.state;
});
</script>
<script>
export default {
  name: "SecondPage",
};
</script>
