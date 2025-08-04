<template>
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <!--begin::Card-->
    <!--begin::Content container-->
    <div id="kt_app_content_container" class="app-container container-xxl">
      <!--begin::Order details page-->
      <div class="d-flex flex-column gap-7 gap-lg-10">
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
            <div
              class="page-title d-flex flex-column justify-content-center me-3"
            >
              <!--begin::Title-->
              <h1
                class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center me-3 my-0"
              >
                Solicitudes de servicio
              </h1>
              <!--end::Title-->
              <!--begin::Breadcrumb-->
              <ul
                class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
              >
                <!--begin::Item-->
                <li class="breadcrumb-item text-muted">
                  <a
                    class="text-muted text-hover-primary clickable"
                    @click="goToPage('#list')"
                    >Solicitudes de servicio</a
                  >
                </li>
                <!--end::Item-->
                <!--begin::Item-->
                <li class="breadcrumb-item">
                  <span class="bullet bg-gray-400 w-5px h-2px"></span>
                </li>
                <!--end::Item-->
                <!--begin::Item-->
                <li class="breadcrumb-item text-dark">
                  Detalles de la solicitud
                </li>
                <!--end::Item-->
              </ul>
              <!--end::Breadcrumb-->
            </div>
            <!--end::Page title-->
          </div>
          <!--end::Toolbar wrapper-->
        </div>
        <OrderDetails
          :key="rerender_order_details"
          @onAction="executeAction"
          :cards="[
            {
              title:
                'Detalles (#' +
                services_request_store.items.services_request.selected_item.id +
                ')',
              data: [
                {
                  title: 'Fecha del pedido',
                  description: parseDate(
                    services_request_store.items.services_request.selected_item
                      .created_at
                  ),
                },
                {
                  title: 'Método de pago',
                  description:
                    services_request_store.items.services_request.selected_item
                      .payment_method,
                },
                {
                  title: 'Link',
                  description:
                    services_request_store.items.services_request.selected_item
                      .account.url,
                },
              ],
            },
            {
              title: 'Mis datos',
              data: [
                {
                  title: 'Cliente',
                  description:
                    services_request_store.items.services_request.selected_item
                      .user.name +
                    ' ' +
                    services_request_store.items.services_request.selected_item
                      .user.lastname,
                  photo:
                    services_request_store.items.services_request.selected_item
                      .user.photo,
                },
                {
                  title: 'Email',
                  description:
                    services_request_store.items.services_request.selected_item
                      .user.email,
                },
                {
                  title: 'Teléfono',
                  description:
                    services_request_store.items.services_request.selected_item
                      .user.phone,
                },
              ],
            },
            {
              title: 'Factura',
              data: [
                {
                  title: 'Factura',
                  description:
                    services_request_store.items.services_request.selected_item
                      .uuid,
                },
                {
                  title: 'Segmentación',
                  description: services_request_store.parseSegmentation(
                    services_request_store.items.services_request.selected_item
                      .segmentation
                  ),
                },
                {
                  title: 'Tipo de acción',
                  description: showOption ? 'Cancelar' : 'N/A',
                  emit: showOption ? 'onCancelRequest' : undefined,
                },
              ],
            },
          ]"
          :items="items"
          :extras="[
            {
              name: 'Subtotal',
              value: numberToCurrency(
                'COP',
                services_request_store.getSelectedItem('services_request')
                  .amount
              ),
            },
          ]"
          :total="
            numberToCurrency(
              'COP',
              services_request_store.getSelectedItem('services_request').amount
            )
          "
        />
      </div>
      <!--end::Order details page-->
    </div>

    <!--end::Content container-->
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue-demi";
import { useServicesRequestStore } from "../stores/index.js";
import OrderDetails from "@/templates/OrderDetails.vue";
import { parseDate, numberToCurrency } from "@/utils/Functions.js";
import { useAuthStore } from "../../auth/stores/store";
const auth_store = useAuthStore();
const showOption = computed(() => {
  return (
    action.value != "Cancelado" &&
    action.value != "cancelado parcial" &&
    action.value != "completado"
  );
});

const services_request_store = useServicesRequestStore();
let rerender_order_details = ref(0);
const executeAction = async (executed_action) => {
  if (executed_action == "onCancelRequest") {
    let service_request = await services_request_store.changeStateRequest();
    action.value = service_request.state;
    rerender_order_details.value++;
  }
};

let items = ref([]);

const parseInvoice = (invoice_items) => {
  invoice_items.map((invoice_item) => {
    items.value.push({
      photo: invoice_item.service.photo,
      name: invoice_item.service.name,
      description: "Code: " + invoice_item.service.code,
      code: invoice_item.service.code,
      cuantity: invoice_item.amount,
      delivered: invoice_item.delivered_goal,
      remaining: invoice_item.amount - invoice_item.delivered_goal,
      reached: numberToCurrency("COP", invoice_item.delivered_goal * invoice_item.price),
      unit_price: numberToCurrency("COP", invoice_item.price),
      total: numberToCurrency("COP", invoice_item.amount * invoice_item.price),
    });
  });
};

const emit = defineEmits(["onDisplayPage"]);
const goToPage = (page) => {
  emit("onDisplayPage", {
    page_to_show: page,
  });
};
let loading_products = ref(true);

const setProduct = async () => {
  loading_products.value = true;
  await services_request_store.loadProducts();
  let services = services_request_store.getSimpleList("products");
  console.log(services);
  parseInvoice(services);
  loading_products.value = false;
};
let action = ref("");
const setAction = async () => {
  action.value =
    services_request_store.getSelectedItem("services_request").state;
};
const init = async () => {
  setProduct();
  setAction();
};
onMounted(() => {
  init();
});
</script>
<script>
export default {
  name: "SecondPage",
};
</script>
