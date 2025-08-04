import { AppServices } from "@/utils/AppServices.js";
import { useAuthStore } from "@/modules/auth/stores/store.js";
import { Http } from "@/utils/AppServices";
import { SERVICES_ROUTE } from "../config/config.js";
import { parseToFormData } from "@/utils/Functions.js";

export default {
  create: async (data) => {
    const auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE,
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  update: async (data, recharges_id) => {
    const auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE + "/update/" + recharges_id,
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },

  rayzarPayment: async (data, recharges_id) => {
    const auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/" + SERVICES_ROUTE + "/rayzarPayment/" + recharges_id,
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },

  markAsPaid: async (recharges_id) => {
    // const auth = useAuthStore()
    // return await Http.delete({
    //     route: '/' + SERVICES_ROUTE + '/' + recharges_id,
    //     headers: {
    //         Authorization: 'Bearer ' + auth.user.token
    //     }
    // })
  },
  delete: async (recharges_id) => {
    const auth = useAuthStore();
    return await Http.delete({
      route: "/" + SERVICES_ROUTE + "/" + recharges_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  find: async (recharges_id) => {
    const auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/" + recharges_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  paginate: async (items_per_page, current_page) => {
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
  getAdminTransactions: async (items_per_page, current_page) => {
    const auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/0",
      query: {
        per_page: items_per_page,
        page: current_page,
      },
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  getClientTransactions: async (items_per_page, current_page) => {
    const auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/" + auth.user.id,
      query: {
        per_page: items_per_page,
        page: current_page,
      },
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  getUserTransactions: async (items_per_page, current_page, user_id) => {
    const auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/" + user_id,
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
