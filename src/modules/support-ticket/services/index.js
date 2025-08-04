import { AppServices } from "@/utils/AppServices.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import { Http } from "@/utils/AppServices";
import { SERVICES_ROUTE } from "../config/config.js";
import { parseToFormData } from "@/utils/Functions.js";

export default {
  replySupportTicket: async (data, support_ticket_id) => {
    let auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE + "/resp/" + support_ticket_id,
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
  update: async (data, support_ticket_id) => {
    let auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE + "/update/" + support_ticket_id,
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  delete: async (support_ticket_id) => {
    let auth = useAuthStore();
    return await Http.delete({
      route: "/" + SERVICES_ROUTE + "/" + support_ticket_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  find: async (support_ticket_id) => {
    let auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/" + support_ticket_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  paginate: async (items_per_page, current_page, type) => {
    let auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE,
      query: {
        per_page: items_per_page,
        page: current_page,
        user: type,
      },
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
};
