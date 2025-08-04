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
          Ticket de soporte
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
              >Regresar</a
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
            Detalles del ticket de soporte
          </li>
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
    <!--begin::Card-->
    <div class="card mb-5 mb-xl-8">
      <!--begin::Card body-->
      <div class="card-body">
        <!--begin::Title-->
        <div class="d-flex flex-wrap gap-2 justify-content-between mb-8">
          <div class="d-flex align-items-center flex-wrap gap-2">
            <!--begin::Heading-->
            <h2 class="fw-semibold me-3 my-1">
              {{
                support_ticket_store.items.support_ticket.selected_item.title
              }}
            </h2>
          </div>
        </div>
        <!--end::Title-->
        <!--begin::Message accordion-->
        <Hoping
          :loading="
            support_ticket_store.items.support_ticket.loading_found_item
          "
        >
          <div
            data-kt-inbox-message="message_wrapper"
            v-for="(message, i) in messages"
            :key="'message_' + message.id"
          >
            <!--begin::Message header-->
            <Message :message="message" />
            <!--end::Message header-->
            <div class="separator my-6"></div>
          </div>
          <span
            v-if="
              support_ticket_store.items.support_ticket.selected_item.status !=
              'Cerrado'
            "
          >
            <div align="right" class="mb-4">
              <span class="text-primary clickable" @click="closeTicket">
                Marcar ticket como "cerrado"
              </span>
            </div>

            <!--begin::Form-->
            <span id="kt_inbox_reply_form" class="rounded mt-10">
              <!--begin::Body-->
              <div class="d-block">
                <!--begin::Message-->
                <textarea
                  v-model="form_state.description"
                  class="form-control"
                  cols="30"
                  rows="10"
                ></textarea>
                <span class="text-danger" v-if="show_error"
                  >Este campo es obligatorio</span
                >
                <div class="mt-6">
                  <!--begin::Submit-->
                  <button
                    class="btn btn-primary fs-bold px-6 me-4"
                    :disabled="submitting"
                  >
                    <span class="indicator-label" @click="handleSubmit">{{
                      submitting ? "Enviando" : "Enviar"
                    }}</span>
                  </button>
                  <!--end::Submit-->

                  <label for="file" class="btn btn-success">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark-arrow-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"
                      ></path>
                      <path
                        d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"
                      ></path>
                    </svg>
                    Subir archivo
                  </label>
                  <span v-if="file_selected">
                    <span class="text-muted mx-4">Un archivo seleccionado</span>
                    <span class="text-primary clickable" @click="removeFile"
                      >Eliminar</span
                    >
                  </span>
                  <input id="file" type="file" hidden @change="catchFile" />
                </div>
              </div>

              <!--end::Body-->

              <!--end::Footer-->
            </span>
            <!--end::Form-->
          </span>
        </Hoping>
        <!--end::Message accordion-->
      </div>
    </div>
  </div>
</template>
<script setup>
import { useSupportTicketStore } from "../stores/index.js";
import { onMounted, reactive, ref, inject } from "vue";
import Message from "../components/Message.vue";
import { extractFile } from "@/utils/Functions";
const swal = inject("$swal");
const closeTicket = () => {
  swal
    .fire({
      title: "¿Desea marcar este ticket como 'Cerrado'?",
      text: "No podrá enviar mas mensajes en este ticket",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    })
    .then(async () => {
      await support_ticket_store.deleteSupportTicket();
      goToPage("#list");
    });
};

let messages = ref([]);

let form_state = reactive({
  description: "",
  file: {},
});
let file_selected = ref(false);
let submitting = ref(false);
let show_error = ref(false);
const handleSubmit = async () => {
  if (form_state.description == "") {
    show_error.value = true;
    return;
  }
  show_error.value = false;
  submitting.value = true;
  let _support_ticket_id =
    support_ticket_store.items.support_ticket.selected_item.id;
  await support_ticket_store.replySupportTicket(form_state, _support_ticket_id);
  loadMessages();
  clearForm();
  submitting.value = false;
};
const removeFile = () => {
  form_state.file = {};
  file_selected.value = false;
};
const clearForm = () => {
  form_state.description = "";
  removeFile();
};
const catchFile = () => {
  form_state.file = extractFile("file");
  file_selected.value = true;
};
const support_ticket_store = useSupportTicketStore();
const emit = defineEmits(["onDisplayPage"]);
const goToPage = (page) => {
  emit("onDisplayPage", {
    page_to_show: page,
  });
};

const loadMessages = async () => {
  support_ticket_store.items.support_ticket.loading_found_item = true;
  let _support_ticket_id =
    support_ticket_store.items.support_ticket.selected_item.id;
  await support_ticket_store.loadSupportTicketById(_support_ticket_id);
  messages.value = support_ticket_store.items.support_ticket.found_item.msjs;
};
const init = () => {
  loadMessages();
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
