import Main from "../Main.vue";
export default [
  {
    path: "services-request",
    name: "admin-services-request",
    meta: {
      login_required: true,
      permissions_group: "Requests",
    },
    component: Main,
  },
  {
    path: "services-request/:id",
    name: "admin-services-request-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_services_request",
        mode: "update",
      },
      permissions_group: "Requests",
    },
    component: Main,
  },
];
