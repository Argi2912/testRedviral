import Main from "../Main.vue";
export default [
  {
    path: "comissions",
    name: "admin-comissions",
    meta: {
      login_required: true,
      permissions_group: "Commissions",
    },
    component: Main,
  },
  {
    path: "comissions/:id",
    name: "admin-comissions-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_comissions",
        mode: "update",
      },
      permissions_group: "Commissions",
    },
    component: Main,
  },
];
