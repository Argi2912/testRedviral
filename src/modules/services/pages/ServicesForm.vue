<template>
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <div id="kt_app_content_container" class="app-container container-xxl">
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
          <div
            class="page-title d-flex flex-column justify-content-center me-3"
          >
            <!--begin::Title-->
            <h1
              class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center me-3 my-0"
            >
              {{ services_store.module_name }}
            </h1>
            <!--end::Title-->
            <!--begin::Breadcrumb-->
            <ul
              class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
            >
              <!--begin::Item-->
              <li class="breadcrumb-item text-muted">
                <a class="text-muted text-hover-primary" @click="goToList">{{
                  services_store.module_name
                }}</a>
              </li>
              <!--end::Item-->

              <!--begin::Item-->
              <li class="breadcrumb-item">
                <span class="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <!--end::Item-->
              <!--begin::Item-->
              <li class="breadcrumb-item text-dark">Agregar</li>
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

      <div
        class="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework"
      >
        <!--begin::Aside column-->
        <div
          class="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10"
        >
          <!--begin::Thumbnail settings-->
          <div class="card card-flush py-4">
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2>Foto del servicio</h2>
              </div>
              <!--end::Card title-->
            </div>
            <!--end::Card header-->
            <!--begin::Card body-->
            <div class="card-body text-center pt-0">
              <Rerender :props="[image_url]">
                <ImagePicker
                  :image-url="image_url"
                  @onAddImage="addImage"
                  @onRemoveImage="removeImage"
                />
              </Rerender>
              <ValidationFormMessages
                v-if="errors['photo']"
                :validation="errors['photo']"
                lang="es"
                field="photo"
              />
              <!--begin::Description-->
              <div class="text-muted fs-7">
                Por favor agregue fotos en formatos válidos, como .png o .jpg
              </div>
              <!--end::Description-->
            </div>
            <!--end::Card body-->
          </div>
          <!--end::Thumbnail settings-->
          <!--begin::Status-->
          <div class="card card-flush py-4">
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2>Status</h2>
              </div>
              <!--end::Card title-->
            </div>
            <!--end::Card header-->
            <!--begin::Card body-->
            <div class="card-body pt-0">
              <!--begin::Select2-->
              <select class="form-select mb-2" v-model="form_state.is_active">
                <option :value="true">Activo</option>
                <option :value="false">Inactivo</option>
              </select>
            </div>
            <!--end::Card body-->
          </div>
          <!--end::Status-->
          <!--begin::Details-->
          <div class="card card-flush py-4">
            <!--begin::Card header-->
            <div class="card-header">
              <!--begin::Card title-->
              <div class="card-title">
                <h2>Detalles</h2>
              </div>
              <!--end::Card title-->
            </div>
            <!--end::Card header-->
            <!--begin::Card body-->
            <div class="card-body pt-0">
              <!--begin::Select2-->
              <p><b>Categoría</b></p>
              <Hoping :loading="loading_categories">
                <CustomSelect
                  :items="
                    categories_store
                      .getAllCategories()
                      .filter((item) => item.type_category == 'Servicio')
                  "
                  v-model="form_state.category_id"
                  placeholder="Seleccione una categoria"
                />
                <ValidationFormMessages
                  v-if="errors['category_id']"
                  :validation="errors['category_id']"
                  lang="es"
                  field="category_id"
                />
              </Hoping>
            </div>
            <!--end::Card body-->
          </div>
          <!--end::Details-->
        </div>
        <!--end::Aside column-->
        <!--begin::Main column-->
        <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
          <!--begin::Tab content-->
          <div class="tab-content">
            <!--begin::Tab pane-->
            <div
              class="tab-pane fade show active"
              id="kt_ecommerce_add_product_general"
              role="tab-panel"
            >
              <div class="d-flex flex-column gap-7 gap-lg-10">
                <!--begin::General options-->
                <div class="card card-flush py-4">
                  <!--begin::Card header-->
                  <div class="card-header">
                    <div class="card-title">
                      <h2>General</h2>
                    </div>
                  </div>
                  <!--end::Card header-->
                  <!--begin::Card body-->
                  <div class="card-body pt-0">
                    <!--begin::Input group-->
                    <div class="mb-10 fv-row fv-plugins-icon-container">
                      <div class="row">
                        <div class="col">
                          <!--begin::Label-->
                          <label class="required form-label"
                            >Nombre del servicio</label
                          >
                          <!--end::Label-->
                          <!--begin::Input-->
                          <input
                            type="text"
                            class="form-control mb-2"
                            placeholder="Nombre del servicio"
                            v-model="form_state.name"
                          />
                          <ValidationFormMessages
                            v-if="errors['name']"
                            :validation="errors['name']"
                            lang="es"
                            field="name"
                          />
                          <!--end::Input-->
                        </div>
                        <div class="col">
                          <!--begin::Label-->
                          <label class="required form-label">Código</label>
                          <!--end::Label-->
                          <!--begin::Input-->
                          <input
                            type="text"
                            class="form-control mb-2"
                            placeholder="Código"
                            v-model="form_state.code"
                          />
                          <ValidationFormMessages
                            v-if="errors['code']"
                            :validation="errors['code']"
                            lang="es"
                            field="code"
                          />
                          <!--end::Input-->
                        </div>
                      </div>
                    </div>
                    <!--end::Input group-->
                    <!--begin::Input group-->
                    <div>
                      <!--begin::Label-->
                      <label class="form-label">Description</label>
                      <textarea
                        v-model="form_state.description"
                        class="form-control"
                        cols="30"
                        rows="10"
                      ></textarea>
                      <ValidationFormMessages
                        v-if="errors['description']"
                        :validation="errors['description']"
                        lang="es"
                        field="description"
                      />
                    </div>
                    <!--end::Input group-->
                  </div>
                  <!--end::Card header-->
                </div>
                <!--end::General options-->
                <!--begin::Media-->
                <div class="card card-flush py-4">
                  <!--begin::Card body-->
                  <div class="card-body py-8">
                    <div class="row">
                      <div class="col">
                        <!--begin::Label-->
                        <label class="required form-label">Red social</label>
                        <!--end::Label-->
                        <!-- <Hoping :loading="loading_social_networks">
                          <select
                            class="form-select mb-2"
                            v-model="form_state.category_id"
                          >
                            <option
                              v-for="(
                                category, i
                              ) in categories_store.getAllCategories()"
                              :key="'category_' + i"
                              :value="category.id"
                            >
                              {{ category.name }}
                            </option>
                          </select>
                        </Hoping> -->
                        <Hoping
                          :loading="
                            social_networks_store.getProperty(
                              'social_networks',
                              'simple_list'
                            ).length == 0
                          "
                        >
                          <ShowResults
                            show-image
                            width="400"
                            :results="
                              social_networks_store.getProperty(
                                'social_networks',
                                'simple_list'
                              ).length > 0
                            "
                            :width="300"
                          >
                            <CustomSelect
                              :items="
                                social_networks_store.getProperty(
                                  'social_networks',
                                  'simple_list'
                                )
                              "
                              v-model="form_state.social_network_id"
                              :placeholder="'Seleccione una red social'"
                            />
                            <ValidationFormMessages
                              v-if="errors['social_network_id']"
                              :validation="errors['social_network_id']"
                              lang="es"
                              field="social_network_id"
                            />
                          </ShowResults>
                        </Hoping>
                      </div>
                      <div class="col">
                        <!--begin::Label-->
                        <label class="required form-label"
                          >Máximo de interacciones</label
                        >
                        <!--end::Label-->
                        <!--begin::Input-->
                        <input
                          type="text"
                          class="form-control mb-2"
                          placeholder="Máximo de interacciones"
                          v-model="form_state.max_interactions"
                        />
                        <label class="required form-label"
                          >Trabajadores registrados: {{ max_workers }}</label
                        ><br />
                        <span
                          style="color: salmon"
                          v-if="form_state.max_interactions > max_workers"
                          >No puede sobrepasar el máximo de trabajadores
                          actuales</span
                        >
                        <!--end::Input-->
                      </div>
                    </div>
                  </div>
                  <!--end::Card header-->
                </div>
                <!--end::Media-->
                <!--begin::Pricing-->
                <div class="card card-flush py-4">
                  <!--begin::Card header-->
                  <div class="card-header">
                    <div class="card-title">
                      <h2>Precios</h2>
                    </div>
                  </div>
                  <!--end::Card header-->
                  <!--begin::Card body-->
                  <div class="card-body pt-0">
                    <div class="row">
                      <div class="col mb-3 fv-row fv-plugins-icon-container">
                        <!--begin::Label-->
                        <label class="required form-label">Precio por tarea</label>
                        <!--end::Label-->
                        <!--begin::Input-->
                        <input
                          type="number"
                          class="form-control mb-2"
                          placeholder="Precio por tarea"
                          v-model="form_state.base_price"
                        />
                        <ValidationFormMessages
                          v-if="errors['base_price']"
                          :validation="errors['base_price']"
                          lang="es"
                          field="base_price"
                        />
                        <!--end::Input-->
                        <div
                          class="fv-plugins-message-container invalid-feedback"
                        ></div>
                      </div>
                    </div>
                    

                    <!--end::Input group-->
                  </div>
                  <!--end::Card header-->
                </div>
                <!--end::Pricing-->
              </div>
            </div>
            <!--end::Tab pane-->
          </div>
          <!--end::Tab content-->
          <div class="d-flex justify-content-end">
            <!--begin::Button-->
            <a class="btn btn-light me-5" @click="goToList">Regresar</a>
            <!--end::Button-->
            <!--begin::Button-->
            <button
              class="btn"
              :class="[
                services_store.forms.create_update_services == 'create' &&
                  'btn-success',
                services_store.forms.create_update_services == 'update' &&
                  'btn-primary',
              ]"
              @click="handleSubmit"
            >
              {{
                services_store.forms.create_update_services == "create"
                  ? "Guardar"
                  : "Actualizar"
              }}
            </button>
            <!--end::Button-->
          </div>
        </div>
        <!--end::Main column-->
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject, onMounted, reactive, ref } from "vue-demi";
import { useServicesStore } from "../stores/index.js";
import { useCategoriesStore } from "../../categories/stores/index.js";
import { useSocialNetworksStore } from "../../social-networks/stores/index.js";
import { useSettingsStore } from "../../settings/stores/index.js";
import { useDashboardStore } from "@/modules/dashboard/stores/index.js";
import ValidationFormMessages from "@/components/validation-errors/ValidationFormMessages.vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { numberToCurrency } from "../../../utils/Functions";

const settings_store = useSettingsStore();

const dashboard_store = useDashboardStore();
let max_workers = ref(0);
const loadMaxWorkers = async () => {
  max_workers.value = await dashboard_store.getMaxWorkers();
};

let image_url = ref("");
const addImage = (file) => {
  form_state.photo = file;
  image_url = URL.createObjectURL(file);
};
const removeImage = () => {
  form_state.photo = {};
  image_url = "";
};
const setDistributedPercent = () => {
  form_state.distributed_percent =
    (((form_state.base_price - form_state.gain) / form_state.max_interactions) *
      100) /
    form_state.base_price;
};
const setNetDistributedPercent = computed(() => {
  let net = form_state.base_price - form_state.gain;
  return 100 / form_state.max_interactions;
});
const setDistributedValue = () => {
  form_state.distributed_value =
    (form_state.base_price - form_state.gain) / form_state.max_interactions;
};
const calculateDistributedValue = computed(() => {
  if (
    form_state.base_price == "" ||
    form_state.gain == "" ||
    form_state.max_interactions == ""
  )
    return 0;
  setDistributedPercent();
  setDistributedValue();
  return (
    (form_state.base_price - form_state.gain) / form_state.max_interactions
  );
});
let token_price = ref(0);
let token_price_loaded = ref(true);

const loadTokenPrice = async () => {
  token_price_loaded.value = false;
  await settings_store.loadToken();
  token_price.value = settings_store.token;
  token_price_loaded.value = true;
};

const setTokens = (tokens) => {
  form_state.tokens = tokens;
};

const calculateReceiveTokens = computed(() => {
  let _tokens = calculateDistributedValue.value / token_price.value;
  setTokens(_tokens);
  return _tokens + " T";
});
const swal = inject("$swal");
const services_store = useServicesStore();
const categories_store = useCategoriesStore();
const social_networks_store = useSocialNetworksStore();
let errors = reactive({});
const cleanErrors = () => {
  for (let i in errors) {
    errors[i] = undefined;
  }
};
const setErrors = (err) => {
  cleanErrors();
  err.map((x) => {
    errors[x.$property] = x.$validator;
  });
  console.log(errors);
};

let form_state = reactive({
  photo: {},
  name: "",
  code: "",
  description: "",
  social_network: "",
  social_network_id: "",
  max_interactions: "",
  distributed_value: 0,
  distributed_percent: 0,
  base_price: "",
  gain: 0,
  tokens: 0,
  category_id: "",
  is_active: true,
});

const rules = {
  photo: { required },
  name: { required },
  code: { required },
  description: { required },
  max_interactions: { required },
  base_price: { required },
  category_id: { required },
  social_network_id: { required },
  description: { required },
};

const handleSubmit = async () => {
  let v$ = useVuelidate(rules, form_state, { $autoDirty: true });
  await v$.value.$validate();
  if (v$.value.$invalid) {
    setErrors(v$.value.$errors);
    console.log(form_state)
    swal.fire({
      title: "",
      text: "El formulario no está llenado correctamente. Por favor corríjalo.",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    });

    return;
  }
  cleanErrors();
  services_store.forms.create_update_services == "create"
    ? services_store.createServices(form_state)
    : services_store.updateServices(
        form_state,
        services_store.items.services.selected_item.id
      );
};

const setForm = () => {
  if (services_store.items.services.selected_item.photo != "null") {
    form_state.photo = services_store.items.services.selected_item.photo;
    image_url.value = services_store.items.services.selected_item.photo;
  }

  form_state.name = services_store.items.services.selected_item.name;
  form_state.code = services_store.items.services.selected_item.code;
  form_state.description =
    services_store.items.services.selected_item.description;
  form_state.social_network_id =
    services_store.items.services.selected_item.network.id;
  form_state.max_interactions =
    services_store.items.services.selected_item.amount;
  form_state.base_price = services_store.items.services.selected_item.price;
  form_state.gain = services_store.items.services.selected_item.ganancia;
  form_state.tokens = services_store.items.services.selected_item.tokens;
  form_state.category_id =
    services_store.items.services.selected_item.category.id;
  form_state.description =
    services_store.items.services.selected_item.description;
  form_state.is_active =
    services_store.items.services.selected_item.state == "activo";
};

const emit = defineEmits(["onDisplayPage"]);
const test = () => {
  // alert();
};
const goToList = () => {
  services_store.setFormMode("create_update_services", "");
  emit("onDisplayPage", {
    page_to_show: "#list",
  });
};
let loading_categories = ref(false);
const setCategories = async () => {
  loading_categories.value = true;
  await categories_store.setSimpleCategoryList();
  loading_categories.value = false;
};
onMounted(() => {
  if (services_store.forms.create_update_services != "create") setForm();
  setCategories();
  loadTokenPrice();
  social_networks_store.loadSocialNetworksSimpleList();
  loadMaxWorkers();
});
</script>