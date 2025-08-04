<template>
  <HeaderModal
    :show="support_ticket_store.modal != ''"
    :title="support_ticket_store.modal_title"
    :is-static="true"
    :scrollable="true"
    size="lg"
  >
    <template #body>
      <SupportTicketForm
        v-if="support_ticket_store.forms.create_update_support_ticket != ''"
      />
    </template>
  </HeaderModal>
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
              Ticket de soporte
            </h1>
            <!--end::Title-->
            <!--begin::Breadcrumb-->
            <ul
              class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
            >
              <!--begin::Item-->
              <li class="breadcrumb-item text-muted">
                <a class="text-muted text-hover-primary">Ticket de soporte</a>
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
      <!--begin::Inbox App - Messages -->
      <div class="d-flex flex-column flex-lg-row">
        <!--begin::Sidebar-->
        <div
          class="d-none d-lg-flex flex-column flex-lg-row-auto w-100 w-lg-275px"
          data-kt-drawer="true"
          data-kt-drawer-name="inbox-aside"
          data-kt-drawer-activate="{default: true, lg: false}"
          data-kt-drawer-overlay="true"
          data-kt-drawer-width="225px"
          data-kt-drawer-direction="start"
          data-kt-drawer-toggle="#kt_inbox_aside_toggle"
        >
          <!--begin::Sticky aside-->
          <div
            class="card card-flush mb-0"
            data-kt-sticky="false"
            data-kt-sticky-name="inbox-aside-sticky"
            data-kt-sticky-offset="{default: false, xl: '100px'}"
            data-kt-sticky-width="{lg: '275px'}"
            data-kt-sticky-left="auto"
            data-kt-sticky-top="100px"
            data-kt-sticky-animation="false"
            data-kt-sticky-zindex="95"
          >
            <!--begin::Aside content-->
            <div class="card-body">
              <!--begin::Button-->
              <a
                v-if="auth_store.getProperty('user').role != 1"
                @click="createSupportTicket"
                class="btn btn-primary fw-bold w-100 mb-8"
                ><span class="svg-icon svg-icon-muted svg-icon-1hx"
                  ><svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.3"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2 4.63158C2 3.1782 3.1782 2 4.63158 2H13.47C14.0155 2 14.278 2.66919 13.8778 3.04006L12.4556 4.35821C11.9009 4.87228 11.1726 5.15789 10.4163 5.15789H7.1579C6.05333 5.15789 5.15789 6.05333 5.15789 7.1579V16.8421C5.15789 17.9467 6.05333 18.8421 7.1579 18.8421H16.8421C17.9467 18.8421 18.8421 17.9467 18.8421 16.8421V13.7518C18.8421 12.927 19.1817 12.1387 19.7809 11.572L20.9878 10.4308C21.3703 10.0691 22 10.3403 22 10.8668V19.3684C22 20.8218 20.8218 22 19.3684 22H4.63158C3.1782 22 2 20.8218 2 19.3684V4.63158Z"
                      fill="currentColor"
                    />
                    <path
                      d="M10.9256 11.1882C10.5351 10.7977 10.5351 10.1645 10.9256 9.77397L18.0669 2.6327C18.8479 1.85165 20.1143 1.85165 20.8953 2.6327L21.3665 3.10391C22.1476 3.88496 22.1476 5.15129 21.3665 5.93234L14.2252 13.0736C13.8347 13.4641 13.2016 13.4641 12.811 13.0736L10.9256 11.1882Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8.82343 12.0064L8.08852 14.3348C7.8655 15.0414 8.46151 15.7366 9.19388 15.6242L11.8974 15.2092C12.4642 15.1222 12.6916 14.4278 12.2861 14.0223L9.98595 11.7221C9.61452 11.3507 8.98154 11.5055 8.82343 12.0064Z"
                      fill="currentColor"
                    />
                  </svg> </span
                >Redactar</a
              >
              <!--end::Button-->
              <!--begin::Menu-->
              <div
                class="menu menu-column menu-rounded menu-state-bg menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary"
              >
                <!--begin::Menu item-->
                <div class="menu-item mb-3">
                  <!--begin::Inbox-->
                  <span
                    class="menu-link"
                    :class="[active_option == 'all' && 'active']"
                    @click="selectOption('all')"
                  >
                    <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/communication/com010.svg-->
                      <span class="svg-icon svg-icon-2 me-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.5 11C8.98528 11 11 8.98528 11 6.5C11 4.01472 8.98528 2 6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11Z"
                            fill="currentColor"
                          ></path>
                          <path
                            opacity="0.3"
                            d="M13 6.5C13 4 15 2 17.5 2C20 2 22 4 22 6.5C22 9 20 11 17.5 11C15 11 13 9 13 6.5ZM6.5 22C9 22 11 20 11 17.5C11 15 9 13 6.5 13C4 13 2 15 2 17.5C2 20 4 22 6.5 22ZM17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      <!--end::Svg Icon-->
                    </span>
                    <span class="menu-title fw-bold">Todos</span>
                    <!-- <span class="badge badge-light-success">3</span> -->
                  </span>
                  <!--end::Inbox-->
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item mb-3">
                  <!--begin::Marked-->
                  <span
                    class="menu-link"
                    :class="[active_option == 'Abierto' && 'active']"
                    @click="selectOption('Abierto')"
                  >
                    <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/abstract/abs024.svg-->
                      <span class="svg-icon svg-icon-2 me-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.3"
                            d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      <!--end::Svg Icon-->
                    </span>
                    <span class="menu-title fw-bold">Sin contestar</span>
                  </span>
                  <!--end::Marked-->
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item mb-3">
                  <!--begin::Draft-->
                  <span
                    class="menu-link"
                    :class="[active_option == 'Contestado' && 'active']"
                    @click="selectOption('Contestado')"
                  >
                    <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/general/gen009.svg-->
                      <span class="svg-icon svg-icon-2 me-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 8.725C6 8.125 6.4 7.725 7 7.725H14L18 11.725V12.925L22 9.725L12.6 2.225C12.2 1.925 11.7 1.925 11.4 2.225L2 9.725L6 12.925V8.725Z"
                            fill="currentColor"
                          ></path>
                          <path
                            opacity="0.3"
                            d="M22 9.72498V20.725C22 21.325 21.6 21.725 21 21.725H3C2.4 21.725 2 21.325 2 20.725V9.72498L11.4 17.225C11.8 17.525 12.3 17.525 12.6 17.225L22 9.72498ZM15 11.725H18L14 7.72498V10.725C14 11.325 14.4 11.725 15 11.725Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                      <!--end::Svg Icon-->
                    </span>
                    <span class="menu-title fw-bold">Contestados</span>
                    <!-- <span class="badge badge-light-warning">5</span> -->
                  </span>
                  <!--end::Draft-->
                </div>
                <!--end::Menu item-->
                <!--begin::Menu item-->
                <div class="menu-item mb-3">
                  <!--begin::Sent-->
                  <span
                    class="menu-link"
                    :class="[active_option == 'Cerrado' && 'active']"
                    @click="selectOption('Cerrado')"
                  >
                    <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/general/gen016.svg-->
                      <span class="svg-icon svg-icon-2 me-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            opacity="0.3"
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="10"
                            fill="currentColor"
                          />
                          <path
                            d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <!--end::Svg Icon-->
                    </span>
                    <span class="menu-title fw-bold">Cerrados</span>
                  </span>
                  <!--end::Sent-->
                </div>
                <!--end::Menu item-->
              </div>
              <!--end::Menu-->
              <!--begin::Menu-->
              <div
                class="menu menu-column menu-rounded menu-state-bg menu-state-title-primary"
              ></div>
              <!--end::Menu-->
            </div>
            <!--end::Aside content-->
          </div>
          <!--end::Sticky aside-->
        </div>
        <!--end::Sidebar-->
        <!--begin::Content-->
        <div class="flex-lg-row-fluid ms-lg-7 ms-xl-10">
          <!--begin::Card-->
          <div class="card">
            <div class="card-header align-items-center py-5 gap-2 gap-md-5">
              <!--begin::Actions-->
              <div class="d-flex flex-wrap gap-2"></div>
              <!--end::Actions-->
              <!--begin::Actions-->
              <div class="d-flex align-items-center flex-wrap gap-2">
                <!--begin::Search-->
                <div class="d-flex align-items-center position-relative">
                  <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
                  <span class="svg-icon svg-icon-2 position-absolute ms-4">
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
                  <!--end::Svg Icon-->
                  <input
                    type="text"
                    class="form-control form-control-sm form-control-solid mw-100 min-w-125px min-w-lg-150px min-w-xxl-200px ps-12"
                    placeholder="Buscar"
                    v-model="search"
                    @keyup="paginateBySearch"
                  />
                </div>
                <!--end::Search-->
              </div>
              <!--end::Actions-->
            </div>
            <div class="card-body">
              <!--begin::Table-->

              <Hoping
                :loading="
                  support_ticket_store.items.support_ticket.loading_list
                "
              >
                <ShowResults
                  :results="
                    support_ticket_store.items.support_ticket.list.length > 0
                  "
                  text="No se han encontrado resultados"
                >
                  <div class="table-responsive">
                    <table
                      class="table table-hover table-row-dashed fs-6 gy-5 my-3 dataTable no-footer"
                    >
                      <!--begin::Table body-->
                      <tbody>
                        <tr
                          class="odd"
                          v-for="(ticket, i) in support_ticket_store.items
                            .support_ticket.list"
                          :key="'ticket_' + i"
                          @click="seeSupportTicket(ticket)"
                        >
                          <td
                            class="ps-9"
                            v-if="auth_store.getProperty('user').role == 1"
                          >
                            <a class="d-flex align-items-center text-dark">
                              <!--begin::Avatar-->
                              <Avatar
                                v-if="ticket.user.photo"
                                :picture="ticket.user.photo"
                              />
                              <div
                                v-if="!ticket.user.photo"
                                class="symbol symbol-40px me-4"
                              >
                                <div
                                  class="symbol-label fs-2 fw-semibold bg-danger text-inverse-danger"
                                >
                                  {{ ticket.user.name[0] }}
                                </div>
                              </div>
                              <!--end::Avatar-->
                              <!--begin::Name-->
                              <span class="fw-semibold">{{
                                ticket.user.name + " " + ticket.user.lastname
                              }}</span>
                              <!--end::Name-->
                            </a>
                          </td>
                          <!--end::Author-->
                          <!--begin::Title-->
                          <td class="ps-9">
                            <div class="text-dark mb-1">
                              <!--begin::Heading-->
                              <a class="text-dark">
                                <span class="fw-bold">{{ ticket.title }}</span>
                              </a>
                              <!--end::Heading-->
                            </div>
                            <!--begin::Badges-->
                            <span>
                              <div
                                class="badge badge-light-warning"
                                v-if="ticket.status == 'Abierto'"
                              >
                                Sin contestar
                              </div>
                              <div
                                class="badge badge-light-primary"
                                v-else-if="ticket.status == 'Contestado'"
                              >
                                Contestado
                              </div>
                              <div class="badge badge-light-success" v-else>
                                Cerrado
                              </div>
                            </span>

                            <!--end::Badges-->
                          </td>
                          <!--end::Title-->
                          <td><b>Prioridad:</b> {{ ticket.priority }}</td>
                          <!--begin::Date-->
                          <td class="w-100px text-end fs-7 pe-9">
                            <span class="fw-semibold">{{
                              parseDate(ticket.created_at)
                            }}</span>
                          </td>
                          <!--end::Date-->
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                  </div>
                  <div class="row mb-3">
                    <div class="col">
                      <div class="px-6">
                        <div style="float: left">
                          <select
                            name="kt_customers_table_length"
                            aria-controls="kt_customers_table"
                            class="form-select form-select-sm form-select-solid"
                            v-model="items_per_page"
                            @change="changeItemsPerPage"
                          >
                            <option :value="5">5</option>
                            <option :value="10">10</option>
                            <option :value="25">25</option>
                            <option :value="50">50</option>
                            <option :value="100">100</option>
                          </select>
                        </div>
                        <div style="float: right">
                          <Paginator
                            v-if="
                              Math.ceil(
                                support_ticket_store.items.support_ticket
                                  .paginator.total_pages
                              ) > 1
                            "
                            :key="
                              support_ticket_store.items.support_ticket
                                .paginator.key
                            "
                            @onChangePage="onChangePage"
                            :items-per-page="
                              support_ticket_store.items.support_ticket
                                .paginator.items_per_page
                            "
                            :max-buttons="5"
                            :total-items="
                              support_ticket_store.items.support_ticket
                                .paginator.total_items
                            "
                            :total-pages="
                              Math.ceil(
                                support_ticket_store.items.support_ticket
                                  .paginator.total_pages
                              )
                            "
                            :current-page="
                              support_ticket_store.items.support_ticket
                                .paginator.current_page
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ShowResults>
              </Hoping>

              <!--end::Table-->
            </div>
          </div>
          <!--end::Card-->
        </div>
        <!--end::Content-->
      </div>
      <!--end::Inbox App - Messages -->
    </div>
    <!--end::Content container-->
  </div>
</template>
<script setup>
import { useSupportTicketStore } from "../stores/index.js";
import SupportTicketForm from "../pages/SupportTicketForm.vue";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import Paginator from "@/components/paginator/Paginator.vue";
import { inject, onMounted, ref } from "vue-demi";
import { parseDate, cutText } from "@/utils/Functions.js";
import { confirm } from "@/utils/Swals.js";

const auth_store = useAuthStore();
const swal = inject("$swal");
const support_ticket_store = useSupportTicketStore();

let active_option = ref("all");

const markOption = (option) => {
  active_option.value = option;
};
const filterByOption = async (option) => {
  support_ticket_store.items.support_ticket.loading_list = true;
  option == "all"
    ? await support_ticket_store.cleanSearchFilter("status")
    : await support_ticket_store.addSearchFilter({
        field: "status",
        value: option,
      });
  support_ticket_store.setSupportTicketList();
};
const selectOption = (option) => {
  markOption(option);
  filterByOption(option);
};

let selected_items = ref([]);

const emit = defineEmits(["onDisplayPage"]);

const deleteMany = () => {
  confirm(
    swal,
    "¿Está seguro que desea eliminar los elementos seleccionados?",
    () => {
      console.log("eliminar items", selected_items.value);
    }
  );
};

const deleteSupportTicket = (item, id) => {
  support_ticket_store.setSelectedItem("support_ticket", item);
  confirm(swal, "¿Está seguro que desea eliminar este elemento?", () => {
    support_ticket_store.deleteSupportTicket(id);
  });
};

const checkUncheckAll = (v) => {
  if (v.target.checked) {
    selected_items.value = [];
    support_ticket_store.items.support_ticket.list.map((item) => {
      selected_items.value.push(item.id);
    });
  } else {
    selected_items.value = [];
  }
};
const onChangePage = (a) => {
  support_ticket_store.items.support_ticket.loading_list = true;
  support_ticket_store.setPagination({
    paginator: "support_ticket",
    current_page: a,
  });
  support_ticket_store.setSupportTicketList();
};
let items_per_page = ref(
  support_ticket_store.items.support_ticket.paginator.items_per_page
);

const changeItemsPerPage = () => {
  support_ticket_store.items.support_ticket.loading_list = true;
  support_ticket_store.setPagination({
    paginator: "support_ticket",
    items_per_page: items_per_page.value,
    current_page: 1,
  });
  support_ticket_store.setSupportTicketList();
};

let search = ref("");
const paginateBySearch = async () => {
  support_ticket_store.items.support_ticket.loading_list = true;
  search.value == ""
    ? await support_ticket_store.cleanSearchFilter("title")
    : await support_ticket_store.addSearchFilter({
        field: "title",
        value: search.value,
      });
  support_ticket_store.setPagination({
    paginator: "support_ticket",
    search: search.value,
  });
  support_ticket_store.setSupportTicketList();
};
const createSupportTicket = () => {
  support_ticket_store.setModal("create_support_ticket");
  support_ticket_store.setModalTitle("Solicitar ticket de soporte");
  support_ticket_store.setFormMode("create_update_support_ticket", "create");
};
const seeSupportTicket = (item, index) => {
  support_ticket_store.setSelectedItem("support_ticket", item);
  support_ticket_store.setSelectedItemIndex("support_ticket", index);
  emit("onDisplayPage", {
    page_to_show: "#support-ticket-details",
  });
};

const closeSupportTicketModal = () => {
  support_ticket_store.setModal("");
  support_ticket_store.setModalTitle("");
  support_ticket_store.setFormMode("create_update_support_ticket", "");
  support_ticket_store.setSelectedItem("support_ticket", {});
  support_ticket_store.setSelectedItemIndex("support_ticket", -1);
};
</script>

<script>
export default {
  name: "ListComponent",
};
</script>
