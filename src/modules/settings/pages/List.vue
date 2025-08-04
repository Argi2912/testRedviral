<template>
  <div
    id="kt_app_toolbar"
    class="app-toolbar align-items-center justify-content-between py-2 py-lg-6 mb-6"
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
          {{ settings_store.module_name }}
        </h1>
        <!--end::Title-->
        <!--begin::Breadcrumb-->
        <ul
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
        >
          <!--begin::Item-->
          <li class="breadcrumb-item text-muted">
            <a class="text-muted text-hover-primary">{{
              settings_store.module_name
            }}</a>
          </li>
          <!--end::Item-->

          <!--begin::Item-->
          <li class="breadcrumb-item">
            <span class="bullet bg-gray-400 w-5px h-2px"></span>
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <li class="breadcrumb-item text-dark">Lista</li>
          <!--end::Item-->
        </ul>
        <!--end::Breadcrumb-->
      </div>
      <!--end::Page title-->
      <!--begin::Actions-->

      <!--end::Actions-->
    </div>
    <!--end::Toolbar wrapper-->
  </div>

  <div id="kt_app_content" class="app-content flex-column-fluid">
    <div class="card">
      <div class="card-body">
        <Hoping :loading="settings_store.items.settings.loading_list">
          <ShowResults :results="settings_store.items.settings.list.length > 0">
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label fw-semibold fs-6">
                <span class="">Monto mínimo de retiro</span>
              </label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <input
                  class="form-control input-sm form-control-solid"
                  placeholder="Precio"
                  v-model="min_to_withdraw"
                  @keyup.enter="updateMinToWithdraw"
                  type="number"
                />
                <label class="form-label text-muted fs-7 mt-3"
                  >Presione enter para guardar</label
                >
              </div>
              <!--end::Col-->
            </div>
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label fw-semibold fs-6">
                <span class="">Actualizar automaticamente el numero maximo de interacciones</span>
              </label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <label class="form-check form-switch form-check-custom form-check-solid">
                  <input
                    class="form-check-input"
                    @change="updateAutoUpdateAmount"
                    type="checkbox"
                    v-model="auto_update_amount"
                  />
                </label>
                <label class="form-label text-muted fs-7 mt-3"
                  >Activa o desactiva esta configuración</label
                >
              </div>
              <!--end::Col-->
            </div>
          </ShowResults>
        </Hoping>
      </div>
    </div>
    <HeaderModal
      @onClose="closeSettingsModal()"
      :show="settings_store.modal != ''"
      :title="settings_store.modal_title"
      :is-static="true"
      :scrollable="true"
    >
      <template #body>
        <SettingsForm
          v-if="settings_store.forms.create_update_settings != ''"
        />
      </template>
    </HeaderModal>

    <!--begin::Modal - Adjust Balance-->
    <div
      class="modal fade"
      id="kt_customers_export_modal"
      tabindex="-1"
      aria-hidden="true"
    >
      <!--begin::Modal dialog-->
      <div class="modal-dialog modal-dialog-centered mw-650px">
        <!--begin::Modal content-->
        <div class="modal-content">
          <!--begin::Modal header-->
          <div class="modal-header">
            <!--begin::Modal title-->
            <h2 class="fw-bold">Export Customers</h2>
            <!--end::Modal title-->
            <!--begin::Close-->
            <div
              id="kt_customers_export_close"
              class="btn btn-icon btn-sm btn-active-icon-primary"
            >
              <!--begin::Svg Icon | path: icons/duotune/arrows/arr061.svg-->
              <span class="svg-icon svg-icon-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    opacity="0.5"
                    x="6"
                    y="17.3137"
                    width="16"
                    height="2"
                    rx="1"
                    transform="rotate(-45 6 17.3137)"
                    fill="currentColor"
                  />
                  <rect
                    x="7.41422"
                    y="6"
                    width="16"
                    height="2"
                    rx="1"
                    transform="rotate(45 7.41422 6)"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <!--end::Svg Icon-->
            </div>
            <!--end::Close-->
          </div>
          <!--end::Modal header-->
          <!--begin::Modal body-->
          <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
            <!--begin::Form-->
            <form id="kt_customers_export_form" class="form" action="#">
              <!--begin::Input group-->
              <div class="fv-row mb-10">
                <!--begin::Label-->
                <label class="fs-5 fw-semibold form-label mb-5"
                  >Select Export Format:</label
                >
                <!--end::Label-->
                <!--begin::Input-->
                <select
                  data-control="select2"
                  data-placeholder="Select a format"
                  data-hide-search="true"
                  name="format"
                  class="form-select form-select-solid"
                >
                  <option value="excell">Excel</option>
                  <option value="pdf">PDF</option>
                  <option value="cvs">CVS</option>
                  <option value="zip">ZIP</option>
                </select>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="fv-row mb-10">
                <!--begin::Label-->
                <label class="fs-5 fw-semibold form-label mb-5"
                  >Select Date Range:</label
                >
                <!--end::Label-->
                <!--begin::Input-->
                <input
                  class="form-control form-control-solid"
                  placeholder="Pick a date"
                  name="date"
                />
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              <!--begin::Row-->
              <div class="row fv-row mb-15">
                <!--begin::Label-->
                <label class="fs-5 fw-semibold form-label mb-5"
                  >Payment Type:</label
                >
                <!--end::Label-->
                <!--begin::Radio group-->
                <div class="d-flex flex-column">
                  <!--begin::Radio button-->
                  <label
                    class="form-check form-check-custom form-check-sm form-check-solid mb-3"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="1"
                      checked="checked"
                      name="payment_type"
                    />
                    <span class="form-check-label text-gray-600 fw-semibold"
                      >All</span
                    >
                  </label>
                  <!--end::Radio button-->
                  <!--begin::Radio button-->
                  <label
                    class="form-check form-check-custom form-check-sm form-check-solid mb-3"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="2"
                      checked="checked"
                      name="payment_type"
                    />
                    <span class="form-check-label text-gray-600 fw-semibold"
                      >Visa</span
                    >
                  </label>
                  <!--end::Radio button-->
                  <!--begin::Radio button-->
                  <label
                    class="form-check form-check-custom form-check-sm form-check-solid mb-3"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="3"
                      name="payment_type"
                    />
                    <span class="form-check-label text-gray-600 fw-semibold"
                      >Mastercard</span
                    >
                  </label>
                  <!--end::Radio button-->
                  <!--begin::Radio button-->
                  <label
                    class="form-check form-check-custom form-check-sm form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="4"
                      name="payment_type"
                    />
                    <span class="form-check-label text-gray-600 fw-semibold"
                      >American Express</span
                    >
                  </label>
                  <!--end::Radio button-->
                </div>
                <!--end::Input group-->
              </div>
              <!--end::Row-->
              <!--begin::Actions-->
              <div class="text-center">
                <button
                  type="reset"
                  id="kt_customers_export_cancel"
                  class="btn btn-light me-3"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  id="kt_customers_export_submit"
                  class="btn btn-primary"
                >
                  <span class="indicator-label">Submit</span>
                  <span class="indicator-progress"
                    >Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span
                  ></span>
                </button>
              </div>
              <!--end::Actions-->
            </form>
            <!--end::Form-->
          </div>
          <!--end::Modal body-->
        </div>
        <!--end::Modal content-->
      </div>
      <!--end::Modal dialog-->
    </div>
    <!--end::Modals-->
  </div>
</template>
<script setup>
import { useSettingsStore } from "../stores/index.js";
import SettingsForm from "./SettingsForm.vue";
import Paginator from "@/components/paginator/Paginator.vue";
import { parseDate, cutText } from "@/utils/Functions.js";
import { inject, onMounted, ref } from "vue-demi";
import { confirm } from "@/utils/Swals.js";

const emit = defineEmits(["onDisplayPage"]);
const swal = inject("$swal");

const settings_store = useSettingsStore();

let selected_items = ref([]);

const deleteMany = () => {
  confirm(
    swal,
    "¿Está seguro que desea eliminar los elementos seleccionados?",
    () => {
      console.log("eliminar items", selected_items.value);
    }
  );
};

const deleteSettings = (item, id) => {
  settings_store.setSelectedItem("settings", item);
  confirm(swal, "¿Está seguro que desea eliminar este elemento?", () => {
    settings_store.deleteSettings(id);
  });
};

const checkUncheckAll = (v) => {
  if (v.target.checked) {
    selected_items.value = [];
    settings_store.items.settings.list.map((item) => {
      selected_items.value.push(item.id);
    });
  } else {
    selected_items.value = [];
  }
};
const onChangePage = async (a) => {
  settings_store.setProperty("settings", "loading_list", true);
  settings_store.setPagination("settings", {
    current_page: a,
  });
  await settings_store.loadSettingsList();
};
let items_per_page = ref(
  settings_store.items.settings.paginator.items_per_page
);

const changeItemsPerPage = async () => {
  settings_store.setProperty("settings", "loading_list", true);
  settings_store.setPagination("settings", {
    items_per_page: items_per_page.value,
    current_page: 1,
  });
  await settings_store.loadSettingsList();
};

let search = ref("");
const paginateBySearch = async () => {
  settings_store.setProperty("settings", "loading_list", true);
  search.value == ""
    ? await settings_store.cleanSearchFilter()
    : await settings_store.addSearchFilter({
        field: "name",
        value: search.value,
      });
  settings_store.setPagination("settings", {
    search: search.value,
  });
  settings_store.loadSettingsList();
};
const createSettings = () => {
  settings_store.setModal("create_settings");
  settings_store.setModalTitle("Agregar settings");
  settings_store.setFormMode("create_update_settings", "create");
};
const seeSettings = (item, index) => {
  settings_store.setModal("see_settings");
  settings_store.setModalTitle("Ver datos de settings");
  settings_store.setFormMode("create_update_settings", "see");
  settings_store.setSelectedItem("settings", item);
  settings_store.setSelectedItemIndex("settings", index);
};

let token_price = ref(0);
let min_to_withdraw = ref(0);
let auto_update_amount = ref(null);

const updateTokenPrice = () => {
  settings_store.updateTokenPrice(token_price.value);
};

const updateMinToWithdraw = () => {
  settings_store.updateMinToWithdraw(min_to_withdraw.value);
};

const getToken = async () => {
  await settings_store.loadToken();
  token_price.value = settings_store.token;
};

const getMinToWithdraw = async () => {
  await settings_store.loadMinToWithdraw();
  min_to_withdraw.value = settings_store.min_to_withdraw;
}

const getAutoUpdateAmountSettings = async () => {
  await settings_store.fetchAutoUpdateAmountSetting();
  auto_update_amount.value = settings_store.auto_update_amount;
}

const updateAutoUpdateAmount = async (e) => {
  settings_store.updateAutoUpdateAmount(e.target.checked);
}

const closeSettingsModal = () => {
  settings_store.setModal("");
  settings_store.setModalTitle("");
  settings_store.setFormMode("create_update_settings", "");
  settings_store.setSelectedItem("settings", {});
  settings_store.setSelectedItemIndex("settings", -1);
};
onMounted(() => {
  getToken();
  getMinToWithdraw();
  getAutoUpdateAmountSettings();
});
</script>

<script>
export default {
  name: "ListComponent",
};
</script>
