import Main from "../Main.vue";
export default [
  {
    path: "roles",
    name: "admin-roles",
    meta: {
      login_required: true,
      permissions_group: "Roles",
    },
    component: Main,
  },
  {
    path: "roles/:id",
    name: "admin-roles-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_roles",
        mode: "update",
      },
      permissions_group: "Roles",
    },
    component: Main,
  },
];
