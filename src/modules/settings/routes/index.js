import Main from "../Main.vue";
export default [
  {
    path: "settings",
    name: "admin-settings",
    meta: {
      login_required: true,
      accepted_roles: [1, 2],
    },
    component: Main,
  },
  {
    path: "settings/:id",
    name: "admin-settings-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_settings",
        mode: "update",
      },
      accepted_roles: [1, 2],
    },
    component: Main,
  },
];
