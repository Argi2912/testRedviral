import Main from "../Main.vue";
export default [
  {
    path: "social-networks",
    name: "admin-social-networks",
    meta: {
      login_required: true,
      permissions_group: "Networks",
    },
    component: Main,
  },
  {
    path: "social-networks/:id",
    name: "admin-social-networks-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_social_networks",
        mode: "update",
      },
      permissions_group: "Networks",
    },
    component: Main,
  },
];
