import Main from "../Main.vue";
export default [
  {
    path: "accounts",
    name: "admin-accounts",
    meta: {
      login_required: true,
      permissions_group: "Accounts",
    },
    component: Main,
  },
  {
    path: "accounts/:id",
    name: "admin-accounts-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_accounts",
        mode: "update",
      },
      permissions_group: "Accounts",
    },
    component: Main,
  },
];
