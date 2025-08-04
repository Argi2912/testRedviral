import Main from "../Main.vue";
export default [
  {
    path: "services",
    name: "admin-services",
    meta: {
      login_required: true,
      permissions_group: "Services",
    },
    component: Main,
  },
  {
    path: "services/:id",
    name: "admin-services-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_services",
        mode: "update",
      },
      permissions_group: "Services",
    },
    component: Main,
  },
];
