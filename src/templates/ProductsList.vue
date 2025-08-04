<template>
  <div class="tab-content">
    <div
      class="tab-pane fade show active"
      id="kt_ecommerce_sales_order_summary"
      role="tab-panel"
    >
      <div class="d-flex flex-column gap-7 gap-lg-10">
        <div class="card card-flush py-4 flex-row-fluid overflow-hidden">
          <div class="card-header">
            <div class="card-title">
              <h2>Servicios de la solicitud</h2>
            </div>
          </div>
          <div class="card-body pt-0">
            <div class="table-responsive">
              <table class="table align-middle table-row-dashed fs-6 gy-5 mb-0">
                <thead>
                  <tr
                    class="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0"
                  >
                    <th class="min-w-175px">Servicio</th>
                    <th class="min-w-100px text-end">Código</th>
                    <th class="min-w-100px text-end">Cantidad</th>
                    <th class="min-w-100px text-end">Completados</th>
                    <th class="min-w-100px text-end">Pendiente</th>
                    <th class="min-w-100px text-end">Precio unitario</th>
                    <th class="min-w-100px text-end">Entregado</th>
                    <th class="min-w-100px text-end">Total</th>
                  </tr>
                </thead>
                <tbody class="fw-semibold text-gray-600">
                  <tr v-for="(item, i) in items" :key="'item_' + i">
                    <td>
                      <div class="d-flex align-items-center">
                        <a class="symbol symbol-50px">
                          <Avatar :picture="item.photo" :initials="item.alt" />
                        </a>
                        <div class="ms-5">
                          <a class="fw-bold text-gray-600 text-hover-primary">{{
                            item.name
                          }}</a>
                          <div class="fs-7 text-muted">
                            {{ item.description ?? "" }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="text-end">{{ item.code }}</td>
                    <td class="text-end">{{ item.cuantity }}</td>
                    <td class="text-end">{{ item.delivered ?? 0 }}</td>
                    <td class="text-end">{{ item.remaining ?? 0 }}</td>
                    <td class="text-end">{{ item.unit_price }}</td>
                    <td class="text-end">{{ item.reached ?? 0 }}</td>
                    <td class="text-end">
                      {{ item.total }}
                    </td>
                  </tr>
                  <tr v-for="(item, i) in items" :key="'item_' + i">
                    <td colspan="7" class="text-end fw-bold">Subtotal</td>
                    <td class="text-end fw-bolder">{{ item.reached }}</td>
                  </tr>
                  
                  <tr  v-for="(item, i) in items" :key="'item_' + i">
                    <td colspan="7" class="fs-3 text-dark text-end">Total Entregado</td>
                    <td class="text-dark fs-3 fw-bolder text-end">
                      {{ item.reached }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { numberToCurrency } from '../utils/Functions';

const props = defineProps({
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
  alt: {
    type: String,
    default: "",
  },
});
</script>

<style></style>