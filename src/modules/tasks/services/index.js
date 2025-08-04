import { AppServices } from "@/utils/AppServices.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import { Http } from "@/utils/AppServices";
import { SERVICES_ROUTE } from "../config/config.js";
import { parseToFormData } from "@/utils/Functions.js";

export default {
  create: async (data) => {
    let auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE,
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  update: async (data, tasks_id) => {
    let auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE + "/update/" + tasks_id,
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  simularCompletado: async (data) => {
    let auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/taskresponse",
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  delete: async (tasks_id) => {
    let auth = useAuthStore();
    return await Http.delete({
      route: "/" + SERVICES_ROUTE + "/" + tasks_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  find: async (tasks_id) => {
    let auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/" + tasks_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  completedTasks: async (items_per_page, current_page, user) => {
    let auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE,
      query: {
        per_page: items_per_page,
        page: current_page,
        user,
      },
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  paginate: async (items_per_page, current_page, admin, user, global) => {
    let auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE,
      query: {
        per_page: items_per_page,
        page: current_page,
        admin,
        user,
        global,
      },
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
};
