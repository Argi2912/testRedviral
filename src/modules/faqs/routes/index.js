import Main from "../Main.vue";

export default [
  {
    path: "faqs",
    name: "admin-faqs",
    meta: {
      login_required: true,
      permissions_group: "Faqs",
    },
    component: Main,
  },
  {
    path: "faqs/:id",
    name: "admin-faqs-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_faqs",
        mode: "update",
      },
      permissions_group: "Faqs",
    },
    component: Main,
  },
];
