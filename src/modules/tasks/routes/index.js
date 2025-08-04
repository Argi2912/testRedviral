import Main from "../Main.vue";
export default [
  {
    path: "tasks",
    name: "admin-tasks",
    meta: {
      login_required: true,
      permissions_group: "Tasks",
    },
    component: Main,
  },
  {
    path: "tasks/:id",
    name: "admin-tasks-details",
    meta: {
      login_required: true,
      active_form: {
        name: "create_update_tasks",
        mode: "update",
      },
      permissions_group: "Tasks",
    },
    component: Main,
  },
];
