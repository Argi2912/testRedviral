import Main from "../Main.vue";
export default [
  {
    path: "/workers/dashboard",
    name: "workers-dashboard",
    meta: {
      login_required: true,
      permissions_group: "Home",
    },
    component: Main,
  },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    meta: {
      login_required: true,
      permissions_group: "Home",
    },
    component: Main,
  },
  {
    path: "/clients/dashboard",
    name: "clients-dashboard",
    meta: {
      login_required: true,
      permissions_group: "Home",
    },
    component: Main,
  },
];
