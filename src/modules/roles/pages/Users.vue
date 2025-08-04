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
          Usuarios
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
              >Roles</a
            >
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <li class="breadcrumb-item">
            <span class="bullet bg-gray-400 w-5px h-2px"></span>
          </li>
          <!--end::Item-->
          <!--begin::Item-->
          <li class="breadcrumb-item text-dark">Usuarios</li>
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
    <div class="d-flex flex-column flex-lg-row">
      <!--begin::Sidebar-->
      <div
        class="flex-column flex-lg-row-auto w-100 w-lg-200px w-xl-300px mb-10"
      >
        <RoleCard
          :role="roles_store.items.roles.selected_item"
          :display-buttons="false"
        />
        <!--begin::Modal-->
        <!--begin::Modal - Update role-->
        <div
          class="modal fade"
          id="kt_modal_update_role"
          tabindex="-1"
          style="display: none"
          aria-hidden="true"
        >
          <!--begin::Modal dialog-->
          <div class="modal-dialog modal-dialog-centered mw-750px">
            <!--begin::Modal content-->
            <div class="modal-content">
              <!--begin::Modal header-->
              <div class="modal-header">
                <!--begin::Modal title-->
                <h2 class="fw-bold">Update Role</h2>
                <!--end::Modal title-->
                <!--begin::Close-->
                <div
                  class="btn btn-icon btn-sm btn-active-icon-primary"
                  data-kt-roles-modal-action="close"
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
                      ></rect>
                      <rect
                        x="7.41422"
                        y="6"
                        width="16"
                        height="2"
                        rx="1"
                        transform="rotate(45 7.41422 6)"
                        fill="currentColor"
                      ></rect>
                    </svg>
                  </span>
                  <!--end::Svg Icon-->
                </div>
                <!--end::Close-->
              </div>
              <!--end::Modal header-->
              <!--begin::Modal body-->
              <div class="modal-body scroll-y mx-5 my-7">
                <!--begin::Form-->
                <form
                  id="kt_modal_update_role_form"
                  class="form fv-plugins-bootstrap5 fv-plugins-framework"
                  action="#"
                >
                  <!--begin::Scroll-->
                  <div
                    class="d-flex flex-column scroll-y me-n7 pe-7"
                    id="kt_modal_update_role_scroll"
                    data-kt-scroll="true"
                    data-kt-scroll-activate="{default: false, lg: true}"
                    data-kt-scroll-max-height="auto"
                    data-kt-scroll-dependencies="#kt_modal_update_role_header"
                    data-kt-scroll-wrappers="#kt_modal_update_role_scroll"
                    data-kt-scroll-offset="300px"
                    style="max-height: 675px"
                  >
                    <!--begin::Input group-->
                    <div class="fv-row mb-10 fv-plugins-icon-container">
                      <!--begin::Label-->
                      <label class="fs-5 fw-bold form-label mb-2">
                        <span class="required">Role name</span>
                      </label>
                      <!--end::Label-->
                      <!--begin::Input-->
                      <input
                        class="form-control form-control-solid"
                        placeholder="Enter a role name"
                        name="role_name"
                        value="Developer"
                      />
                      <!--end::Input-->
                      <div
                        class="fv-plugins-message-container invalid-feedback"
                      ></div>
                    </div>
                    <!--end::Input group-->
                    <!--begin::Permissions-->
                    <div class="fv-row">
                      <!--begin::Label-->
                      <label class="fs-5 fw-bold form-label mb-2"
                        >Role Permissions</label
                      >
                      <!--end::Label-->
                      <!--begin::Table wrapper-->
                      <div class="table-responsive">
                        <!--begin::Table-->
                        <table
                          class="table align-middle table-row-dashed fs-6 gy-5"
                        >
                          <!--begin::Table body-->
                          <tbody class="text-gray-600 fw-semibold">
                            <!--begin::Table row-->
                            <tr>
                              <td class="text-gray-800">
                                Administrator Access
                                <i
                                  class="fas fa-exclamation-circle ms-1 fs-7"
                                  data-bs-toggle="tooltip"
                                  aria-label="Allows a full access to the system"
                                  data-bs-original-title="Allows a full access to the system"
                                  data-kt-initialized="1"
                                ></i>
                              </td>
                              <td>
                                <!--begin::Checkbox-->
                                <label
                                  class="form-check form-check-sm form-check-custom form-check-solid me-9"
                                >
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="kt_roles_select_all"
                                  />
                                  <span
                                    class="form-check-label"
                                    for="kt_roles_select_all"
                                    >Select all</span
                                  >
                                </label>
                                <!--end::Checkbox-->
                              </td>
                            </tr>
                            <!--end::Table row-->
                            <!--begin::Table row-->
                            <tr>
                              <!--begin::Label-->
                              <td class="text-gray-800">User Management</td>
                              <!--end::Label-->
                              <!--begin::Input group-->
                              <td>
                                <!--begin::Wrapper-->
                                <div class="d-flex">
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="user_management_read"
                                    />
                                    <span class="form-check-label">Read</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="user_management_write"
                                    />
                                    <span class="form-check-label">Write</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="user_management_create"
                                    />
                                    <span class="form-check-label">Create</span>
                                  </label>
                                  <!--end::Checkbox-->
                                </div>
                                <!--end::Wrapper-->
                              </td>
                              <!--end::Input group-->
                            </tr>
                            <!--end::Table row-->
                            <!--begin::Table row-->
                            <tr>
                              <!--begin::Label-->
                              <td class="text-gray-800">Content Management</td>
                              <!--end::Label-->
                              <!--begin::Input group-->
                              <td>
                                <!--begin::Wrapper-->
                                <div class="d-flex">
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="content_management_read"
                                    />
                                    <span class="form-check-label">Read</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="content_management_write"
                                    />
                                    <span class="form-check-label">Write</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="content_management_create"
                                    />
                                    <span class="form-check-label">Create</span>
                                  </label>
                                  <!--end::Checkbox-->
                                </div>
                                <!--end::Wrapper-->
                              </td>
                              <!--end::Input group-->
                            </tr>
                            <!--end::Table row-->
                            <!--begin::Table row-->
                            <tr>
                              <!--begin::Label-->
                              <td class="text-gray-800">
                                Financial Management
                              </td>
                              <!--end::Label-->
                              <!--begin::Input group-->
                              <td>
                                <!--begin::Wrapper-->
                                <div class="d-flex">
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="financial_management_read"
                                    />
                                    <span class="form-check-label">Read</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="financial_management_write"
                                    />
                                    <span class="form-check-label">Write</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="financial_management_create"
                                    />
                                    <span class="form-check-label">Create</span>
                                  </label>
                                  <!--end::Checkbox-->
                                </div>
                                <!--end::Wrapper-->
                              </td>
                              <!--end::Input group-->
                            </tr>
                            <!--end::Table row-->
                            <!--begin::Table row-->
                            <tr>
                              <!--begin::Label-->
                              <td class="text-gray-800">Reporting</td>
                              <!--end::Label-->
                              <!--begin::Input group-->
                              <td>
                                <!--begin::Wrapper-->
                                <div class="d-flex">
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="reporting_read"
                                    />
                                    <span class="form-check-label">Read</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="reporting_write"
                                    />
                                    <span class="form-check-label">Write</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="reporting_create"
                                    />
                                    <span class="form-check-label">Create</span>
                                  </label>
                                  <!--end::Checkbox-->
                                </div>
                                <!--end::Wrapper-->
                              </td>
                              <!--end::Input group-->
                            </tr>
                            <!--end::Table row-->
                            <!--begin::Table row-->
                            <tr>
                              <!--begin::Label-->
                              <td class="text-gray-800">Payroll</td>
                              <!--end::Label-->
                              <!--begin::Input group-->
                              <td>
                                <!--begin::Wrapper-->
                                <div class="d-flex">
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="payroll_read"
                                    />
                                    <span class="form-check-label">Read</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="payroll_write"
                                    />
                                    <span class="form-check-label">Write</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="payroll_create"
                                    />
                                    <span class="form-check-label">Create</span>
                                  </label>
                                  <!--end::Checkbox-->
                                </div>
                                <!--end::Wrapper-->
                              </td>
                              <!--end::Input group-->
                            </tr>
                            <!--end::Table row-->
                            <!--begin::Table row-->
                            <tr>
                              <!--begin::Label-->
                              <td class="text-gray-800">Disputes Management</td>
                              <!--end::Label-->
                              <!--begin::Input group-->
                              <td>
                                <!--begin::Wrapper-->
                                <div class="d-flex">
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="disputes_management_read"
                                    />
                                    <span class="form-check-label">Read</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="disputes_management_write"
                                    />
                                    <span class="form-check-label">Write</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="disputes_management_create"
                                    />
                                    <span class="form-check-label">Create</span>
                                  </label>
                                  <!--end::Checkbox-->
                                </div>
                                <!--end::Wrapper-->
                              </td>
                              <!--end::Input group-->
                            </tr>
                            <!--end::Table row-->
                            <!--begin::Table row-->
                            <tr>
                              <!--begin::Label-->
                              <td class="text-gray-800">API Controls</td>
                              <!--end::Label-->
                              <!--begin::Input group-->
                              <td>
                                <!--begin::Wrapper-->
                                <div class="d-flex">
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="api_controls_read"
                                    />
                                    <span class="form-check-label">Read</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="api_controls_write"
                                    />
                                    <span class="form-check-label">Write</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="api_controls_create"
                                    />
                                    <span class="form-check-label">Create</span>
                                  </label>
                                  <!--end::Checkbox-->
                                </div>
                                <!--end::Wrapper-->
                              </td>
                              <!--end::Input group-->
                            </tr>
                            <!--end::Table row-->
                            <!--begin::Table row-->
                            <tr>
                              <!--begin::Label-->
                              <td class="text-gray-800">Database Management</td>
                              <!--end::Label-->
                              <!--begin::Input group-->
                              <td>
                                <!--begin::Wrapper-->
                                <div class="d-flex">
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="database_management_read"
                                    />
                                    <span class="form-check-label">Read</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="database_management_write"
                                    />
                                    <span class="form-check-label">Write</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="database_management_create"
                                    />
                                    <span class="form-check-label">Create</span>
                                  </label>
                                  <!--end::Checkbox-->
                                </div>
                                <!--end::Wrapper-->
                              </td>
                              <!--end::Input group-->
                            </tr>
                            <!--end::Table row-->
                            <!--begin::Table row-->
                            <tr>
                              <!--begin::Label-->
                              <td class="text-gray-800">
                                Repository Management
                              </td>
                              <!--end::Label-->
                              <!--begin::Input group-->
                              <td>
                                <!--begin::Wrapper-->
                                <div class="d-flex">
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="repository_management_read"
                                    />
                                    <span class="form-check-label">Read</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid me-5 me-lg-20"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="repository_management_write"
                                    />
                                    <span class="form-check-label">Write</span>
                                  </label>
                                  <!--end::Checkbox-->
                                  <!--begin::Checkbox-->
                                  <label
                                    class="form-check form-check-custom form-check-solid"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      value=""
                                      name="repository_management_create"
                                    />
                                    <span class="form-check-label">Create</span>
                                  </label>
                                  <!--end::Checkbox-->
                                </div>
                                <!--end::Wrapper-->
                              </td>
                              <!--end::Input group-->
                            </tr>
                            <!--end::Table row-->
                          </tbody>
                          <!--end::Table body-->
                        </table>
                        <!--end::Table-->
                      </div>
                      <!--end::Table wrapper-->
                    </div>
                    <!--end::Permissions-->
                  </div>
                  <!--end::Scroll-->
                  <!--begin::Actions-->
                  <div class="text-center pt-15">
                    <button
                      type="reset"
                      class="btn btn-light me-3"
                      data-kt-roles-modal-action="cancel"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-kt-roles-modal-action="submit"
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
        <!--end::Modal - Update role-->
        <!--end::Modal-->
      </div>
      <!--end::Sidebar-->
      <!--begin::Content-->
      <div class="flex-lg-row-fluid ms-lg-10">
        <!--begin::Card-->
        <div class="card card-flush mb-6 mb-xl-9">
          <!--begin::Card header-->
          <div class="card-header pt-5">
            <!--begin::Card title-->
            <div class="card-title">
              <h2 class="d-flex align-items-center">Usuarios de este rol</h2>
            </div>
            <!--end::Card title-->
            <!--begin::Card toolbar-->
            <div class="card-toolbar">
              <!--begin::Search-->
              <div
                class="d-flex align-items-center position-relative my-1"
                data-kt-view-roles-table-toolbar="base"
              >
                <!--begin::Svg Icon | path: icons/duotune/general/gen021.svg-->
                <span class="svg-icon svg-icon-1 position-absolute ms-6">
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
                  class="form-control form-control-solid w-250px ps-15"
                  placeholder="Buscar usuario"
                  v-model="search"
                  @keyup="paginateBySearch"
                />
              </div>
              <!--end::Search-->
              <!--begin::Group actions-->
              <div
                class="d-flex justify-content-end align-items-center d-none"
                data-kt-view-roles-table-toolbar="selected"
              >
                <div class="fw-bold me-5">
                  <span
                    class="me-2"
                    data-kt-view-roles-table-select="selected_count"
                  ></span
                  >Selected
                </div>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-kt-view-roles-table-select="delete_selected"
                >
                  Delete Selected
                </button>
              </div>
              <!--end::Group actions-->
            </div>
            <!--end::Card toolbar-->
          </div>
          <!--end::Card header-->
          <!--begin::Card body-->
          <div class="card-body pt-0">
            <!--begin::Table-->
            <Forbidden
              show-image
              text="No tiene permiso para listar usuarios."
              :permission-tag="'list_users'"
              :user-permissions="auth_store.getProperty('role').permissions"
            >
              <div
                id="kt_roles_view_table_wrapper"
                class="dataTables_wrapper dt-bootstrap4 no-footer"
              >
                <div
                  v-if="users_store.items.users.loading_list"
                  class="text-muted py-8"
                  align="center"
                >
                  <RippleLoader />
                </div>
                <div v-else>
                  <div
                    v-if="users_store.items.users.list.length == 0"
                    class="text-muted py-8"
                    align="center"
                  >
                    No se han encontrado resultados
                  </div>
                  <div v-else>
                    <div class="table-responsive">
                      <table
                        class="table align-middle table-row-dashed fs-6 gy-5 mb-0 dataTable no-footer"
                        id="kt_roles_view_table"
                      >
                        <!--begin::Table head-->
                        <thead>
                          <!--begin::Table row-->
                          <tr
                            class="text-start text-muted fw-bold fs-7 text-uppercase gs-0"
                          >
                            <th
                              class="min-w-50px sorting"
                              tabindex="0"
                              aria-controls="kt_roles_view_table"
                              rowspan="1"
                              colspan="1"
                              aria-label="ID: activate to sort column ascending"
                              style="width: 90.5156px"
                            >
                              ID
                            </th>
                            <th
                              class="min-w-150px sorting"
                              tabindex="0"
                              aria-controls="kt_roles_view_table"
                              rowspan="1"
                              colspan="1"
                              aria-label="User: activate to sort column ascending"
                              style="width: 316.359px"
                            >
                              Usuario
                            </th>
                            <th
                              class="min-w-125px sorting"
                              tabindex="0"
                              aria-controls="kt_roles_view_table"
                              rowspan="1"
                              colspan="1"
                              aria-label="Joined Date: activate to sort column ascending"
                              style="width: 237.219px"
                            >
                              Fecha
                            </th>
                            <th
                              class="text-end min-w-100px sorting_disabled"
                              rowspan="1"
                              colspan="1"
                              aria-label="Actions"
                              style="width: 149.516px"
                            >
                              Opciones
                            </th>
                          </tr>
                          <!--end::Table row-->
                        </thead>
                        <!--end::Table head-->
                        <!--begin::Table body-->
                        <tbody class="fw-semibold text-gray-600">
                          <tr
                            v-for="(user, i) in users_store.items.users.list"
                            :key="i"
                            class="odd"
                          >
                            <!--begin::ID-->
                            <td>{{ user.id }}</td>
                            <!--begin::ID-->
                            <!--begin::User=-->
                            <td class="d-flex align-items-center">
                              <!--begin:: Avatar -->
                              <Avatar
                                :picture="user.photo"
                                :initials="initials(user.name, user.lastname)"
                              />
                              <!--end::Avatar-->
                              <!--begin::User details-->
                              <div class="d-flex flex-column">
                                <a
                                  class="text-gray-800 text-hover-primary mb-1"
                                  >{{ user.name }}</a
                                >
                                <span>{{ user.email }}</span>
                              </div>
                              <!--begin::User details-->
                            </td>
                            <!--end::user=-->
                            <!--begin::Joined date=-->
                            <td>
                              {{ parseDate(user.created_at) }}
                            </td>
                            <!--end::Joined date=-->
                            <!--begin::Action=-->
                            <td class="text-end">
                              <a
                                href="#"
                                class="btn btn-sm btn-light btn-active-light-primary"
                                @click="
                                  router.push({
                                    name: 'admin-users-details',
                                    params: { id: user.id },
                                  })
                                "
                                >Ver
                              </a>
                              <!--begin::Menu-->
                              <div
                                class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"
                                data-kt-menu="true"
                              >
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                  <a class="menu-link px-3">View</a>
                                </div>
                                <!--end::Menu item-->
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                  <a
                                    href="#"
                                    class="menu-link px-3"
                                    data-kt-roles-table-filter="delete_row"
                                    >Delete</a
                                  >
                                </div>
                                <!--end::Menu item-->
                              </div>
                              <!--end::Menu-->
                            </td>
                            <!--end::Action=-->
                          </tr>
                        </tbody>
                        <!--end::Table body-->
                      </table>
                    </div>
                    <div class="row">
                      <Paginator
                        v-if="
                          Math.ceil(
                            users_store.items.users.paginator.total_pages
                          ) > 1
                        "
                        :key="users_store.items.users.paginator.key"
                        @onChangePage="onChangePage"
                        :items-per-page="
                          users_store.items.users.paginator.items_per_page
                        "
                        :max-buttons="5"
                        :total-items="
                          users_store.items.users.paginator.total_items
                        "
                        :total-pages="
                          Math.ceil(
                            users_store.items.users.paginator.total_pages
                          )
                        "
                        :current-page="
                          users_store.items.users.paginator.current_page
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Table-->
            </Forbidden>
          </div>
          <!--end::Card body-->
        </div>
        <!--end::Card-->
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>
<script setup>
import { useRolesStore } from "../stores/index.js";
import { useUsersStore } from "@/modules/users/stores/index.js";
import RoleCard from "../components/RoleCard.vue";
import { initials, parseDate } from "@/utils/Functions.js";
import { onMounted, ref } from "vue-demi";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/modules/auth/stores/store.js";

const auth_store = useAuthStore();
const router = useRouter();
const roles_store = useRolesStore();
const users_store = useUsersStore();

let search = ref("");

const paginateBySearch = async () => {
  users_store.items.users.loading_list = true;
  search.value == ""
    ? await users_store.cleanSearchFilter()
    : await users_store.addSearchFilter({
        field: "name",
        value: search.value,
      });

  users_store.setPagination({
    paginator: "users",
    search: search.value,
  });
  users_store.listUsersByRol(roles_store.items.roles.selected_item);
};

const emit = defineEmits(["onDisplayPage"]);
const goToPage = (page) => {
  emit("onDisplayPage", {
    page_to_show: page,
  });
};
const onChangePage = (a) => {
  users_store.setPagination({
    paginator: "users",
    current_page: a,
  });
  users_store.listUsersByRol(roles_store.items.roles.selected_item);
};
onMounted(() => {
  users_store.listUsersByRol(roles_store.items.roles.selected_item);
});
</script>
<script>
export default {
  name: "SecondPage",
};
</script>
