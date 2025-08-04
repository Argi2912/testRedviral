import Main from "../Main.vue";
export default [
  {
    path: "__name__(kebabCase)",
    name: "admin-__name__(kebabCase)",
    meta: {
      login_required: true,
      accepted_roles: [1, 2],
    },
    component: Main,
  },
  {
    path: "__name__(kebabCase)/:id",
    name: "admin-__name__(kebabCase)-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update___name__(snakeCase)",
        mode: "update",
      },
      accepted_roles: [1, 2],
    },
    component: Main,
  },
];
