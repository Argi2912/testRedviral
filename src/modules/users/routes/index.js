import Main from "../Main.vue";
export default [
  {
    path: "users",
    name: "admin-users",
    meta: {
      login_required: true,
      permissions_group: "Users",
    },
    component: Main,
  },
  {
    path: "users/:id",
    name: "admin-users-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_users",
        mode: "update",
      },
      permissions_group: "Users",
    },
    component: Main,
  },
];
