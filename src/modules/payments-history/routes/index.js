import Main from "../Main.vue";
export default [
  {
    path: "payments-history",
    name: "admin-payments-history",
    meta: {
      login_required: true,
      permissions_group: "Payments",
    },
    component: Main,
  },
  {
    path: "payments-history/:id",
    name: "admin-payments-history-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_payments_history",
        mode: "update",
      },
      permissions_group: "Payments",
    },
    component: Main,
  },
];
