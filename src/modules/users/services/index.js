import { AppServices } from "@/utils/AppServices.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import { Http } from "@/utils/AppServices";
import { SERVICES_ROUTE } from "../config/config.js";
import { parseToFormData } from "@/utils/Functions.js";

export default {
  getClientDetails: async (user_id) => {
    let auth = useAuthStore();
    return await Http.get({
      route: "/home/datauser/" + user_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  addBalance: async (data) => {
    let auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/transactions",
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  devolution: async (data) => {
    let auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/transactions",
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
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
  update: async (data, users_id) => {
    let auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE + "/update/" + users_id,
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  delete: async (users_id) => {
    let auth = useAuthStore();
    return await Http.delete({
      route: "/" + SERVICES_ROUTE + "/" + users_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  find: async (users_id) => {
    let auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/" + users_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  paginate: async (items_per_page, current_page, role) => {
    let auth = useAuthStore();
    let query = {
      per_page: items_per_page,
      page: current_page,
    };
    if (role) query.by_role = role;
    return await Http.get({
      route: "/" + SERVICES_ROUTE,
      query,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
};
