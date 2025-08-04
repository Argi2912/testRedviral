import { AppServices } from "@/utils/AppServices.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import { Http } from "@/utils/AppServices";
import { SERVICES_ROUTE } from "../config/config.js";
import { parseToFormData } from "@/utils/Functions.js";

export default {
  getAllProducts: async (services_request_id) => {
    let auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/items/" + services_request_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  changeStateRequest: async (services_request_id, data) => {
    let auth = useAuthStore();
    let parsed_data = parseToFormData(data);

    return await Http.post({
      route: "/" + SERVICES_ROUTE + "/update/" + services_request_id,
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  create: async (data) => {
    let auth = useAuthStore();
    //let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE,
      data: data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  update: async (data, services_request_id) => {
    let auth = useAuthStore();
    //let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE + "/update/" + services_request_id,
      data: data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  delete: async (services_request_id) => {
    let auth = useAuthStore();
    return await Http.delete({
      route: "/" + SERVICES_ROUTE + "/" + services_request_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  find: async (services_request_id) => {
    let auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/" + services_request_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  paginate: async (items_per_page, current_page) => {
    const auth = useAuthStore();

    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/byuserlist/" + auth.user.id,
      query: {
        per_page: items_per_page,
        page: current_page,
      },
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  paginateForAdmin: async (items_per_page, current_page) => {
    const auth = useAuthStore();

    return await Http.get({
      route: "/" + SERVICES_ROUTE,
      query: {
        per_page: items_per_page,
        page: current_page,
      },
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
};
