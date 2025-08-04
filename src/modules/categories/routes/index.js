import Main from "../Main.vue";
export default [
  {
    path: "categories",
    name: "admin-categories",
    meta: {
      login_required: true,
      permissions_group: "Categories",
    },
    component: Main,
  },
  {
    path: "categories/:id",
    name: "admin-categories-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_categories",
        mode: "update",
      },
      permissions_group: "Categories",
    },
    component: Main,
  },
];
