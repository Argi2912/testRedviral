import Main from "../Main.vue";
export default [
  {
    path: "payment-requests",
    name: "admin-payment-requests",
    meta: {
      login_required: true,
      permissions_group: "Reffils",
    },
    component: Main,
  },
  {
    path: "payment-requests/:id",
    name: "admin-payment-requests-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_payment_requests",
        mode: "update",
      },
      permissions_group: "Reffils",
    },
    component: Main,
  },
];
