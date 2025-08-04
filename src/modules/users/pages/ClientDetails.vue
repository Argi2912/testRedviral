<template>
  <div>
    <div class="d-flex flex-column flex-column-fluid">
      <!--begin::Toolbar-->
      <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
        <!--begin::Toolbar container-->
        <div
          id="kt_app_toolbar_container"
          class="app-container container-xxl d-flex flex-stack"
        >
          <!--begin::Page title-->
          <div
            class="page-title d-flex flex-column justify-content-center flex-wrap me-3"
          >
            <!--begin::Title-->
            <h1
              class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"
            >
              Detalles del cliente
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
                  >Usuarios</a
                >
              </li>
              <!--end::Item-->
              <!--begin::Item-->
              <li class="breadcrumb-item">
                <span class="bullet bg-gray-400 w-5px h-2px"></span>
              </li>
              <!--end::Item-->
              <!--begin::Item-->
              <li class="breadcrumb-item text-muted">Detalles del cliente</li>
              <!--end::Item-->
            </ul>
            <!--end::Breadcrumb-->
          </div>
          <!--end::Page title-->
        </div>
        <!--end::Toolbar container-->
      </div>
      <!--end::Toolbar-->
      <UserDetails
        :user="{
          name: user.name,
          lastname: user.lastname,
          role: user.role.name,
          photo: user.photo,
        }"
        :detail-boxes="[
          {
            title: details.total_accounts,
            description: 'Cuentas',
          },
          {
            title: details.active_accounts,
            description: 'Cuentas activas',
          },
        ]"
        :description="{
          title: 'Detalles',
          description: 'Detalles del historial de pago',
          boxes: [
            {
              title: numberToCurrency('COP', user.balance),
              description: 'Total invertido',
            },
            {
              title: details.active_services,
              description: 'Servicio de activos',
            },
            {
              title: details.canceled_services,
              description: 'Servicios cancelados',
            },
          ],
        }"
        :details="[
          { title: 'Código', description: user.uuid },
          { title: 'Email', description: user.email },
          { title: 'Teléfono', description: user.phone },
          { title: 'Sexo', description: user.gender },
        ]"
      >
        <template #description-options>
          <a href="#" class="btn btn-sm btn-light-primary flex-shrink-0"
            >Activo</a
          >
        </template>
        <template #content>
          <div class="card mb-6 mb-xl-9">
            <!--begin::Header-->
            <div class="card-header">
              <!--begin::Title-->
              <div class="card-title">
                <h2>Historial de pago</h2>
              </div>
              <!--end::Title-->
            </div>
            <!--end::Header-->
            <!--begin::Card body-->
            <div class="card-body pb-5">
              <!--begin::Tab Content-->
              <div
                id="kt_customer_view_statement_tab_content"
                class="tab-content"
              >
                <!--begin::Tab panel-->
                <div
                  id="kt_customer_view_statement_1"
                  class="py-0 tab-pane fade show active"
                  role="tabpanel"
                >
                  <!--begin::Table-->
                  <div
                    id="kt_customer_view_statement_table_1_wrapper"
                    class="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <div class="table-responsive">
                      <table
                        id="kt_customer_view_statement_table_1"
                        class="table align-middle table-row-dashed fs-6 text-gray-600 fw-semibold gy-4 dataTable no-footer"
                      >
                        <!--begin::Table head-->
                        <thead class="border-bottom border-gray-200">
                          <!--begin::Table row-->
                          <tr
                            class="text-start text-muted fw-bold fs-7 text-uppercase gs-0"
                          >
                            <th
                              class="w-125px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_1"
                              rowspan="1"
                              colspan="1"
                              aria-label="Date: activate to sort column ascending"
                              style="width: 125px"
                            >
                              ID DEL PAGO
                            </th>
                            <th
                              class="w-100px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_1"
                              rowspan="1"
                              colspan="1"
                              aria-label="Order ID: activate to sort column ascending"
                              style="width: 100px"
                            >
                              STATUS
                            </th>
                            <th
                              class="w-300px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_1"
                              rowspan="1"
                              colspan="1"
                              aria-label="Details: activate to sort column ascending"
                              style="width: 300px"
                            >
                              VALOR
                            </th>
                            <th
                              class="w-100px text-end"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_1"
                              rowspan="1"
                              colspan="1"
                              aria-label="Amount: activate to sort column ascending"
                              style="width: 100px"
                            >
                              FECHA
                            </th>
                          </tr>
                          <!--end::Table row-->
                        </thead>
                        <!--end::Table head-->
                        <!--begin::Table body-->
                        <tbody>
                          <tr
                            class="odd"
                            v-for="(transaction, i) in transactions_store.items
                              .transactions.list"
                            :key="'transaction_' + i"
                          >
                            <td data-order="2021-01-01T00:00:00-05:00">
                              {{ transaction.uuid }}
                            </td>
                            <td>
                              <Badge
                                :text="
                                  transaction.state == 'activo'
                                    ? 'Pendiente'
                                    : transaction.state
                                "
                                :background="
                                  transaction.state == 'activo'
                                    ? 'yellow'
                                    : 'green'
                                "
                              />
                            </td>
                            <td>
                              {{ numberToCurrency("COP", transaction.amount) }}
                            </td>
                            <td class="text-end">
                              {{ parseDate(transaction.created_at) }}
                            </td>
                          </tr>
                        </tbody>
                        <!--end::Table body-->
                      </table>
                      <div class="mt-6">
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
                                transactions_store.items.transactions.paginator
                                  .total_pages
                              ) > 1
                            "
                            :key="
                              transactions_store.items.transactions.paginator
                                .key
                            "
                            @onChangePage="onChangePage"
                            :items-per-page="
                              transactions_store.items.transactions.paginator
                                .items_per_page
                            "
                            :max-buttons="5"
                            :total-items="
                              transactions_store.items.transactions.paginator
                                .total_items
                            "
                            :total-pages="
                              Math.ceil(
                                transactions_store.items.transactions.paginator
                                  .total_pages
                              )
                            "
                            :current-page="
                              transactions_store.items.transactions.paginator
                                .current_page
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end::Table-->
                </div>
                <!--end::Tab panel-->
                <!--begin::Tab panel-->
                <div
                  id="kt_customer_view_statement_2"
                  class="py-0 tab-pane fade"
                  role="tabpanel"
                >
                  <!--begin::Table-->
                  <div
                    id="kt_customer_view_statement_table_2_wrapper"
                    class="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <div class="table-responsive">
                      <table
                        id="kt_customer_view_statement_table_2"
                        class="table align-middle table-row-dashed fs-6 text-gray-600 fw-semibold gy-4 dataTable no-footer"
                      >
                        <!--begin::Table head-->
                        <thead class="border-bottom border-gray-200">
                          <!--begin::Table row-->
                          <tr
                            class="text-start text-muted fw-bold fs-7 text-uppercase gs-0"
                          >
                            <th
                              class="w-125px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Date: activate to sort column ascending"
                              style="width: 125px"
                            >
                              Date
                            </th>
                            <th
                              class="w-100px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Order ID: activate to sort column ascending"
                              style="width: 100px"
                            >
                              Order ID
                            </th>
                            <th
                              class="w-300px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Details: activate to sort column ascending"
                              style="width: 300px"
                            >
                              Details
                            </th>
                            <th
                              class="w-100px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_2"
                              rowspan="1"
                              colspan="1"
                              aria-label="Amount: activate to sort column ascending"
                              style="width: 100px"
                            >
                              Amount
                            </th>
                            <th
                              class="w-100px text-end pe-7 sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              aria-label="Invoice"
                              style="width: 100px"
                            >
                              Invoice
                            </th>
                          </tr>
                          <!--end::Table row-->
                        </thead>
                        <!--end::Table head-->
                        <!--begin::Table body-->
                        <tbody>
                          <tr class="odd">
                            <td data-order="2020-01-30T00:00:00-05:00">
                              May 30, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >523445943</a
                              >
                            </td>
                            <td>Seller Fee</td>
                            <td class="text-danger">$-1.30</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2020-01-22T00:00:00-05:00">
                              Apr 22, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >231445943</a
                              >
                            </td>
                            <td>Parcel Shipping / Delivery Service App</td>
                            <td class="text-success">$204.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="odd">
                            <td data-order="2020-01-09T00:00:00-05:00">
                              Feb 09, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >426445943</a
                              >
                            </td>
                            <td>Visual Design Illustration</td>
                            <td class="text-success">$31.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2020-01-01T00:00:00-05:00">
                              Nov 01, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >984445943</a
                              >
                            </td>
                            <td>Abstract Vusial Pack</td>
                            <td class="text-success">$52.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="odd">
                            <td data-order="2020-01-04T00:00:00-05:00">
                              Jan 04, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >324442313</a
                              >
                            </td>
                            <td>Seller Fee</td>
                            <td class="text-danger">$-0.80</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2020-01-01T00:00:00-05:00">
                              Nov 01, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >102445788</a
                              >
                            </td>
                            <td>Darknight transparency 36 Icons Pack</td>
                            <td class="text-success">$38.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="odd">
                            <td data-order="2020-01-24T00:00:00-05:00">
                              Oct 24, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >423445721</a
                              >
                            </td>
                            <td>Seller Fee</td>
                            <td class="text-danger">$-2.60</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2020-01-08T00:00:00-05:00">
                              Oct 08, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >312445984</a
                              >
                            </td>
                            <td>Cartoon Mobile Emoji Phone Pack</td>
                            <td class="text-success">$76.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="odd">
                            <td data-order="2020-01-15T00:00:00-05:00">
                              Sep 15, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >312445984</a
                              >
                            </td>
                            <td>Iphone 12 Pro Mockup Mega Bundle</td>
                            <td class="text-success">$5.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2020-01-30T00:00:00-05:00">
                              May 30, 2020
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >523445943</a
                              >
                            </td>
                            <td>Seller Fee</td>
                            <td class="text-danger">$-1.30</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <!--end::Table body-->
                      </table>
                    </div>
                    <div class="row">
                      <div
                        class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"
                      ></div>
                      <div
                        class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end"
                      >
                        <div
                          class="dataTables_paginate paging_simple_numbers"
                          id="kt_customer_view_statement_table_2_paginate"
                        >
                          <ul class="pagination">
                            <li
                              class="paginate_button page-item previous disabled"
                              id="kt_customer_view_statement_table_2_previous"
                            >
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_2"
                                data-dt-idx="0"
                                tabindex="0"
                                class="page-link"
                                ><i class="previous"></i
                              ></a>
                            </li>
                            <li class="paginate_button page-item active">
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_2"
                                data-dt-idx="1"
                                tabindex="0"
                                class="page-link"
                                >1</a
                              >
                            </li>
                            <li class="paginate_button page-item">
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_2"
                                data-dt-idx="2"
                                tabindex="0"
                                class="page-link"
                                >2</a
                              >
                            </li>
                            <li
                              class="paginate_button page-item next"
                              id="kt_customer_view_statement_table_2_next"
                            >
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_2"
                                data-dt-idx="3"
                                tabindex="0"
                                class="page-link"
                                ><i class="next"></i
                              ></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end::Table-->
                </div>
                <!--end::Tab panel-->
                <!--begin::Tab panel-->
                <div
                  id="kt_customer_view_statement_3"
                  class="py-0 tab-pane fade"
                  role="tabpanel"
                >
                  <!--begin::Table-->
                  <div
                    id="kt_customer_view_statement_table_3_wrapper"
                    class="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <div class="table-responsive">
                      <table
                        id="kt_customer_view_statement_table_3"
                        class="table align-middle table-row-dashed fs-6 text-gray-600 fw-semibold gy-4 dataTable no-footer"
                      >
                        <!--begin::Table head-->
                        <thead class="border-bottom border-gray-200">
                          <!--begin::Table row-->
                          <tr
                            class="text-start text-muted fw-bold fs-7 text-uppercase gs-0"
                          >
                            <th
                              class="w-125px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_3"
                              rowspan="1"
                              colspan="1"
                              aria-label="Date: activate to sort column ascending"
                              style="width: 125px"
                            >
                              Date
                            </th>
                            <th
                              class="w-100px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_3"
                              rowspan="1"
                              colspan="1"
                              aria-label="Order ID: activate to sort column ascending"
                              style="width: 100px"
                            >
                              Order ID
                            </th>
                            <th
                              class="w-300px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_3"
                              rowspan="1"
                              colspan="1"
                              aria-label="Details: activate to sort column ascending"
                              style="width: 300px"
                            >
                              Details
                            </th>
                            <th
                              class="w-100px sorting"
                              tabindex="0"
                              aria-controls="kt_customer_view_statement_table_3"
                              rowspan="1"
                              colspan="1"
                              aria-label="Amount: activate to sort column ascending"
                              style="width: 100px"
                            >
                              Amount
                            </th>
                            <th
                              class="w-100px text-end pe-7 sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              aria-label="Invoice"
                              style="width: 100px"
                            >
                              Invoice
                            </th>
                          </tr>
                          <!--end::Table row-->
                        </thead>
                        <!--end::Table head-->
                        <!--begin::Table body-->
                        <tbody>
                          <tr class="odd">
                            <td data-order="2019-01-09T00:00:00-05:00">
                              Feb 09, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >426445943</a
                              >
                            </td>
                            <td>Visual Design Illustration</td>
                            <td class="text-success">$31.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2019-01-01T00:00:00-05:00">
                              Nov 01, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >984445943</a
                              >
                            </td>
                            <td>Abstract Vusial Pack</td>
                            <td class="text-success">$52.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="odd">
                            <td data-order="2019-01-04T00:00:00-05:00">
                              Jan 04, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >324442313</a
                              >
                            </td>
                            <td>Seller Fee</td>
                            <td class="text-danger">$-0.80</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2019-01-15T00:00:00-05:00">
                              Sep 15, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >312445984</a
                              >
                            </td>
                            <td>Iphone 12 Pro Mockup Mega Bundle</td>
                            <td class="text-success">$5.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="odd">
                            <td data-order="2019-01-01T00:00:00-05:00">
                              Nov 01, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >102445788</a
                              >
                            </td>
                            <td>Darknight transparency 36 Icons Pack</td>
                            <td class="text-success">$38.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2019-01-24T00:00:00-05:00">
                              Oct 24, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >423445721</a
                              >
                            </td>
                            <td>Seller Fee</td>
                            <td class="text-danger">$-2.60</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="odd">
                            <td data-order="2019-01-08T00:00:00-05:00">
                              Oct 08, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >312445984</a
                              >
                            </td>
                            <td>Cartoon Mobile Emoji Phone Pack</td>
                            <td class="text-success">$76.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2019-01-30T00:00:00-05:00">
                              May 30, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >523445943</a
                              >
                            </td>
                            <td>Seller Fee</td>
                            <td class="text-danger">$-1.30</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="odd">
                            <td data-order="2019-01-22T00:00:00-05:00">
                              Apr 22, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >231445943</a
                              >
                            </td>
                            <td>Parcel Shipping / Delivery Service App</td>
                            <td class="text-success">$204.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr class="even">
                            <td data-order="2019-01-09T00:00:00-05:00">
                              Feb 09, 2019
                            </td>
                            <td>
                              <a
                                href="#"
                                class="text-gray-600 text-hover-primary"
                                >426445943</a
                              >
                            </td>
                            <td>Visual Design Illustration</td>
                            <td class="text-success">$31.00</td>
                            <td class="text-end">
                              <button
                                class="btn btn-sm btn-light btn-active-light-primary"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                        </tbody>
                        <!--end::Table body-->
                      </table>
                    </div>
                    <div class="row">
                      <div
                        class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"
                      ></div>
                      <div
                        class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end"
                      >
                        <div
                          class="dataTables_paginate paging_simple_numbers"
                          id="kt_customer_view_statement_table_3_paginate"
                        >
                          <ul class="pagination">
                            <li
                              class="paginate_button page-item previous disabled"
                              id="kt_customer_view_statement_table_3_previous"
                            >
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_3"
                                data-dt-idx="0"
                                tabindex="0"
                                class="page-link"
                                ><i class="previous"></i
                              ></a>
                            </li>
                            <li class="paginate_button page-item active">
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_3"
                                data-dt-idx="1"
                                tabindex="0"
                                class="page-link"
                                >1</a
                              >
                            </li>
                            <li class="paginate_button page-item">
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_3"
                                data-dt-idx="2"
                                tabindex="0"
                                class="page-link"
                                >2</a
                              >
                            </li>
                            <li
                              class="paginate_button page-item next"
                              id="kt_customer_view_statement_table_3_next"
                            >
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_3"
                                data-dt-idx="3"
                                tabindex="0"
                                class="page-link"
                                ><i class="next"></i
                              ></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end::Table-->
                </div>
                <!--end::Tab panel-->
                <!--begin::Tab panel-->
                <div
                  id="kt_customer_view_statement_4"
                  class="py-0 tab-pane fade"
                  role="tabpanel"
                >
                  <!--begin::Table-->
                  <div
                    id="kt_customer_view_statement_table_4_wrapper"
                    class="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <div class="row">
                      <div
                        class="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start"
                      ></div>
                      <div
                        class="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end"
                      >
                        <div
                          class="dataTables_paginate paging_simple_numbers"
                          id="kt_customer_view_statement_table_4_paginate"
                        >
                          <ul class="pagination">
                            <li
                              class="paginate_button page-item previous disabled"
                              id="kt_customer_view_statement_table_4_previous"
                            >
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_4"
                                data-dt-idx="0"
                                tabindex="0"
                                class="page-link"
                                ><i class="previous"></i
                              ></a>
                            </li>
                            <li class="paginate_button page-item active">
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_4"
                                data-dt-idx="1"
                                tabindex="0"
                                class="page-link"
                                >1</a
                              >
                            </li>
                            <li class="paginate_button page-item">
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_4"
                                data-dt-idx="2"
                                tabindex="0"
                                class="page-link"
                                >2</a
                              >
                            </li>
                            <li
                              class="paginate_button page-item next"
                              id="kt_customer_view_statement_table_4_next"
                            >
                              <a
                                href="#"
                                aria-controls="kt_customer_view_statement_table_4"
                                data-dt-idx="3"
                                tabindex="0"
                                class="page-link"
                                ><i class="next"></i
                              ></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--end::Table-->
                </div>
                <!--end::Tab panel-->
              </div>
              <!--end::Tab Content-->
            </div>
            <!--end::Card body-->
          </div>
        </template>
      </UserDetails>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue-demi";
import { useUsersStore } from "../stores/index.js";
import UserDetails from "../../../templates/UserDetails.vue";
import { numberToCurrency, parseDate } from "@/utils/Functions";
import { useTransactionsStore } from "@/modules/transactions/stores/index.js";
import Paginator from "@/components/paginator/Paginator.vue";
const users_store = useUsersStore();
const transactions_store = useTransactionsStore();
const emit = defineEmits(["onDisplayPage"]);
const goToPage = (page) => {
  emit("onDisplayPage", {
    page_to_show: page,
  });
};

const onChangePage = async (a) => {
  transactions_store.items.transactions.loading_list = true;
  transactions_store.setPagination({
    paginator: "transactions",
    current_page: a,
  });
  transactions_store.loadUserTransactionsList(
    users_store.getSelectedItem("users").id
  );
};
let items_per_page = ref(
  transactions_store.items.transactions.paginator.items_per_page
);

const changeItemsPerPage = () => {
  transactions_store.items.transactions.loading_list = true;
  transactions_store.setPagination({
    paginator: "transactions",
    items_per_page: items_per_page.value,
    current_page: 1,
  });
  transactions_store.loadUserTransactionsList(
    users_store.getSelectedItem("users").id
  );
};

let search = ref("");
const paginateBySearch = async () => {
  transactions_store.items.transactions.loading_list = true;
  search.value == ""
    ? await transactions_store.cleanSearchFilter("uuid")
    : await transactions_store.addSearchFilter({
        field: "uuid",
        value: search.value,
      });
  transactions_store.setPagination({
    paginator: "transactions",
    search: search.value,
  });
  transactions_store.loadUserTransactionsList(
    users_store.getSelectedItem("users").id
  );
};

let user = reactive(users_store.getSelectedItem("users"));

let details = reactive({
  active_services: "",
  canceled_services: "",
  active_accounts: "",
  total_accounts: "",
});
const init = async () => {
  await users_store.loadClientDetails();
  details.active_services = users_store.getClientDetails("active_services");
  details.canceled_services = users_store.getClientDetails("canceled_services");
  details.active_accounts = users_store.getClientDetails("active_accounts");
  details.total_accounts = users_store.getClientDetails("total_accounts");
};
onMounted(() => {
  transactions_store.loadUserTransactionsList(
    users_store.getSelectedItem("users").id
  );
  init();
});
</script>
<script>
export default {
  name: "SecondPage",
};
</script>
