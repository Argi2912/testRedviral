import Main from "../Main.vue";
export default [
  {
    path: "recharges",
    name: "admin-recharges",
    meta: {
      login_required: true,
      permissions_group: "Transactions",
    },
    component: Main,
  },
  {
    path: "recharges/:id",
    name: "admin-recharges-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_recharges",
        mode: "update",
      },
      permissions_group: "Transactions",
    },
    component: Main,
  },
];
