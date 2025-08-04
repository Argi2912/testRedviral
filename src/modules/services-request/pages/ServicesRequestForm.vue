<template>
  <div class="mx-20">
    <div
      id="kt_app_toolbar"
      class="app-toolbar align-items-center justify-content-between py-2 py-lg-6 mb-6"
    >
      <div
        class="d-flex flex-grow-1 flex-stack flex-wrap gap-2 mb-n10"
        id="kt_toolbar"
      >
        <div class="page-title d-flex flex-column justify-content-center me-3">
          <h1
            class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center me-3 my-0"
          >
            {{ services_request_store.module_name }}
          </h1>

          <ul
            class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
          >
            <li class="breadcrumb-item text-muted">
              <a class="text-muted text-hover-primary" @click="goToList">{{
                services_request_store.module_name
              }}</a>
            </li>

            <li class="breadcrumb-item">
              <span class="bullet bg-gray-400 w-5px h-2px"></span>
            </li>

            <li class="breadcrumb-item text-dark">Agregar</li>
          </ul>
        </div>
      </div>
    </div>

    <div id="kt_app_content" class="app-content flex-column-fluid">
      <span
        id="kt_ecommerce_edit_order_form"
        class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
        data-kt-redirect="../../demo1/dist/apps/ecommerce/sales/listing.html"
      >
        <div class="w-100 flex-lg-row-auto w-lg-300px mb-7 me-7 me-lg-10">
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>Detalles del pedido</h2>
              </div>
            </div>

            <div class="card-body pt-0">
              <div class="d-flex flex-column gap-10">
                <div class="fv-row fv-plugins-icon-container">
                  <label class="form-label">Método de pago</label>
                  <input
                    type="text"
                    class="form-control"
                    disabled
                    :value="'Saldo: ' + numberToCurrency('COP', balance)"
                  />
                  <div
                    class="fv-plugins-message-container invalid-feedback"
                  ></div>
                </div>

                <div class="fv-row fv-plugins-icon-container">
                  <label class="required form-label">Segmentación</label>
                  <div
                    class="form-check form-check-sm form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="form_state.is_global"
                    />
                    <span class="text-muted m-2">Global</span>
                  </div>
                  <Multiselect
                    v-show="!form_state.is_global"
                    @onSelectOption="onSelectOption"
                    :items="parsedCountries"
                    placeholder="Segmentación"
                  />
                  <ValidationFormMessages
                    v-show="!form_state.is_global"
                    v-if="errors['segmentation']"
                    :validation="errors['segmentation']"
                    lang="es"
                    field="segmentation"
                  />
                </div>
                <div class="fv-row fv-plugins-icon-container">
                  <Hoping
                    :loading="
                      accounts_store.getProperty(
                        'accounts',
                        'loading_simple_list'
                      )
                    "
                  >
                    <ShowResults
                      text="No tiene cuentas registradas, por lo que no puede solicitar un servicio. Por favor dirijase al modulo de cuentas y cree al menos una."
                      :results="
                        accounts_store.getProperty('accounts', 'simple_list')
                          .length > 0
                      "
                    >
                      <label class="required form-label">Cuenta</label>
                      <CustomSelect
                        :items="
                          accounts_store.getProperty('accounts', 'simple_list')
                        "
                        v-model="form_state.account_id"
                        placeholder="Seleccione una cuenta"
                      />
                      <ValidationFormMessages
                        v-if="errors['account_id']"
                        :validation="errors['account_id']"
                        lang="es"
                        field="account_id"
                      />
                    </ShowResults>
                  </Hoping>
                  <div
                    class="fv-plugins-message-container invalid-feedback"
                  ></div>
                </div>
                <button @click="handleSubmit" class="btn btn-success">
                  Solicitar y pagar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-10">
          <div class="card card-flush py-4">
            <div class="card-header">
              <div class="card-title">
                <h2>Seleccionar servicios</h2>
              </div>
            </div>

            <div class="card-body pt-0">
              <div class="d-flex flex-column gap-10">
                <div>
                  <label class="form-label"
                    >Agregar productos a este pedido</label
                  >
                  <br />

                  <label class="form-label"
                    >Máximo de interacciones disponibles:
                    {{ max_workers }}</label
                  >

                  <OrderProducts
                    :max="max_workers"
                    @onUpdateList="updateServices"
                  />
                </div>
                <ValidationFormMessages
                  v-if="errors['items']"
                  custom-error="Debe seleccionarse al menos un servicio"
                  :validation="errors['items']"
                  lang="es"
                  field="items"
                />
                <div class="separator"></div>

                <div
                  v-if="form_state.account_id"
                  class="d-flex align-items-center position-relative mb-n7"
                >
                  <span class="svg-icon svg-icon-1 position-absolute ms-4">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        opacity="0.5"
                        x="17.0365"
                        y="15.1223"
                        width="8.15546"
                        height="2"
                        rx="1"
                        transform="rotate(45 17.0365 15.1223)"
                        fill="currentColor"
                      ></rect>
                      <path
                        d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    v-model="search"
                    class="form-control form-control-solid w-100 w-lg-50 ps-14"
                    placeholder="Buscar"
                    @keyup="paginateBySearch"
                  />
                </div>

                <Hoping
                  v-if="form_state.account_id"
                  :loading="
                    services_store.getProperty('services', 'loading_list')
                  "
                >
                  <ShowResults
                    :results="services_store.items.services.list.length > 0"
                  >
                    <div
                      class="row align-items-center mt-2"
                      v-for="(service, i) in services_store.getList('services')"
                      :key="'service_' + i"
                    >
                      <div class="col-auto">
                        <div
                          class="form-check form-check-sm form-check-custom form-check-solid"
                        >
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :value="
                              JSON.stringify({ id: service.id, index: i })
                            "
                            :checked="checkIfServiceIsUsed(service)"
                            @change="addRemoveProduct"
                          />
                        </div>
                      </div>
                      <div class="col">
                        <div
                          class="d-flex align-items-center"
                          data-kt-ecommerce-edit-order-filter="product"
                          data-kt-ecommerce-edit-order-id="product_3"
                        >
                          <span class="symbol symbol-50px">
                            <span
                              class="symbol-label"
                              :style="
                                'background-image: url(' + service.photo + ');'
                              "
                            ></span>
                          </span>
                          <div class="ms-5">
                            <span
                              class="text-gray-800 text-hover-primary fs-5 fw-bold"
                              >{{ service.name }}</span
                            >

                            <div class="fw-semibold fs-7">
                              Price: $ {{ service.price }}
                            </div>

                            <div class="text-muted fs-7">
                              {{ service.code }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="col text-end pe-5">
                        <span class="badge badge-light-warning">Low stock</span>
                        <span class="fw-bold text-warning ms-3">7</span>
                      </div> -->
                    </div>
                  </ShowResults>
                  <Paginator
                    v-if="
                      Math.ceil(
                        services_store.items.services.paginator.total_pages
                      ) > 1
                    "
                    :key="services_store.items.services.paginator.key"
                    @onChangePage="onChangePage"
                    :items-per-page="
                      services_store.items.services.paginator.items_per_page
                    "
                    :max-buttons="5"
                    :total-items="
                      services_store.items.services.paginator.total_items
                    "
                    :total-pages="
                      Math.ceil(
                        services_store.items.services.paginator.total_pages
                      )
                    "
                    :current-page="
                      services_store.items.services.paginator.current_page
                    "
                  />
                </Hoping>
                <div class="text-muted" align="center">
                  Debe seleccionar una cuenta para que se carguen los servicios
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <a id="kt_ecommerce_edit_order_cancel" class="btn btn-light me-5"
              >Atras</a
            >
          </div>
        </div>
      </span>
    </div>
  </div>
</template>
<script setup>
import {
  computed,
  inject,
  onMounted,
  reactive,
  ref,
  watchEffect,
} from "vue-demi";
import { useServicesRequestStore } from "../stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import OrderProducts from "@/templates/order-products/OrderProducts.vue";
import { useServicesStore } from "../../services/stores/index.js";
import { useOrderStore } from "../../../templates/order-products/order.store";
import { countries } from "@/assets/js/countries.js";
import { useUsersStore } from "@/modules/users/stores/index.js";
import { useAuthStore } from "../../auth/stores/store.js";
import { useAccountsStore } from "@/modules/accounts/stores/index.js";
import { numberToCurrency } from "../../../utils/Functions";
import { useDashboardStore } from "@/modules/dashboard/stores/index.js";
const accounts_store = useAccountsStore();
const auth_store = useAuthStore();
const swal = inject("$swal");
const services_request_store = useServicesRequestStore();
const services_store = useServicesStore();
const order_store = useOrderStore();
const user_store = useUsersStore();
const dashboard_store = useDashboardStore();

let is_global = ref(false);

let max_workers = ref(0);
const loadMaxWorkers = async () => {
  max_workers.value = await dashboard_store.getMaxWorkers();
};

const parseItem = (item, original_item) => {
  return {
    item: "",
    amount: "",
    quantity: "",
  };
};
const parseItems = (items, original_items) => {
  let _items = [];
  for (let i = 0; i < original_items.length; i++) {
    _items.push({
      item: original_items[i].id,
      amount: items[i].quantity,
      quantity: items[i].quantity,
    });
  }
  return _items;
};
const updateServices = (data) => {
  form_state.items = parseItems(data.order_list, data.original_list);
  original_list.value = data.original_list;
};

const parsedCountries = computed(() => {
  let _countries = [];
  countries.map((country) => {
    _countries.push({
      name: country.name,
      value: country.name,
    });
  });
  return _countries;
});

const onSelectOption = (values) => {
  form_state.segmentation = values.join(",");
};
const addRemoveProduct = (event) => {
  let _check_value = JSON.parse(event.target.value);
  if (event.target.checked) {
    let service = services_store.getList("services")[_check_value.index];
    //console.log(service);
    order_store.addProduct(service, "service");
  } else {
    order_store.removeProduct({ index: "id", value: _check_value.id });
  }
};

const checkIfServiceIsUsed = (product) => {
  let _products_list = order_store.getProductsList("original");
  for (let i = 0; i < _products_list.length; i++) {
    if (product.id == _products_list[i].id) return true;
  }
  return false;
};

let errors = reactive({});
const clearErrors = () => {
  for (let i in errors) {
    errors[i] = undefined;
  }
};
const setErrors = (err) => {
  clearErrors();
  err.map((x) => {
    errors[x.$property] = x.$validator;
  });
};

let form_state = reactive({
  items: "",
  segmentation: "",
  items: [],
  is_global: false,
  account_id: "",
  is_active: true,
});
const isNotGlobal = computed(() => {
  return !form_state.is_global;
});
const rules = {
  items: { required },
  segmentation: { required: requiredIf(isNotGlobal) },
  items: { required },
  account_id: { required },
};

let original_list = ref([]);

const validateMaxInteractions = () => {
  let interactions_are_valid = true;
  console.log(form_state.items);

  for (let i = 0; i < form_state.items.length; i++) {
    if (form_state.items[i].quantity > max_workers.value) {
      interactions_are_valid = false;
      break;
    }
  }
  return interactions_are_valid;
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();

  if (v$.value.$invalid || !validateMaxInteractions()) {
    setErrors(v$.value.$errors);
    swal.fire({
      title: "",
      text: "El formulario no está llenado correctamente. Por favor corríjalo.",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    });

    return;
  }
  clearErrors();
  await services_request_store.createServicesRequest(
    form_state,
    original_list.value
  );

  emit("onDisplayPage", {
    page_to_show: "#list",
  });
};

const setForm = () => {
  //API WARNING
  //SELECTED ITEM COMES WITH API ATTRIBUTE NAMES
  form_state.description =
    "Descripcion del ServicesRequest " +
    services_request_store.items.services_request.selected_item.id;
};

const emit = defineEmits(["onDisplayPage"]);

const goToList = () => {
  services_request_store.setFormMode("create_update_services_request", "");
  emit("onDisplayPage", {
    page_to_show: "#list",
  });
};

let search = ref("");
const paginateBySearch = async () => {
  services_store.items.services.loading_list = true;
  search.value == ""
    ? await services_store.cleanSearchFilter("name")
    : await services_store.addSearchFilter({
        field: "name",
        value: search.value,
      });
  services_store.setPagination({
    paginator: "services",
    current_page: 1,
    search: search.value,
  });
  await services_store.setServicesList();
};

const onChangePage = (a) => {
  services_store.setPagination({
    paginator: "services",
    current_page: a,
  });
  services_store.setServicesList();
};

let items_per_page = ref(
  services_store.items.services.paginator.items_per_page
);

let balance = ref("...cargando...");

const setClientBalance = async () => {
  await auth_store.loadProfileInfo();
  console.log(auth_store.getProperty("user_data"));
  balance.value = auth_store.getProperty("user_data").balance;
};

const paginateByNetwork = async () => {
  services_store.setProperty("services", "loading_list", true);
  let account = accounts_store.getProperty("accounts", "simple_list");
  account = account.find((a) => a.id == form_state.account_id);
  await services_store.addSearchFilter({
    field: "network",
    value: account.network.id,
  });
  services_store.setServicesList();
};
const emptyProducts = () => {
  form_state.items = [];
};
watchEffect(() => {
  if (form_state.account_id != "") {
    paginateByNetwork();
    order_store.emptyProducts();
  }
});

const init = () => {
  //paginateBySearch()
  order_store.emptyProducts();
  setClientBalance();
  services_store.cleanSearchFilter("name");
  services_store.setProperty("services", "list", []);
  accounts_store.loadAccountsSimpleList();
};

onMounted(() => {
  if (services_request_store.forms.create_update_services_request != "create") {
    setForm();
  }

  init();
  loadMaxWorkers();
});
</script>

<script>
export default {
  name: "ServicesRequestFormComponent",
};
</script>
