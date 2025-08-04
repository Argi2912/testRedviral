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
  updateTokenPrice: async (data) => {
    const auth = useAuthStore();
    let parsed_data = parseToFormData(data);
    return await Http.post({
      route: "/settings/update",
      data: parsed_data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  fetchMinToWithdraw: async () => {
    const auth = useAuthStore();
    return await Http.get({
      route: "/settings/minimum-withdrawal-amount",
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  updateMinToWithdraw: async (data) => {
    const auth = useAuthStore();
    return await Http.post({
      route: "/settings/minimum-withdrawal-amount",
      data,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  delete: async (settings_id) => {
    const auth = useAuthStore();
    return await Http.delete({
      route: "/" + SERVICES_ROUTE + "/" + settings_id,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  fetchToken: async () => {
    const auth = useAuthStore();
    return await Http.get({
      route: "/settings",
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  fetchAutoUpdateAmountSetting: async () => {
    const auth = useAuthStore();
    return await Http.get({
      route: "/settings/auto-update-amount",
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
  updateAutoUpdateAmount: async (data) => {
    const auth = useAuthStore();
    return await Http.post({
      route: "/settings/auto-update-amount",
      data: { auto_update_amount: data } ,
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    })

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
  simpleList: async () => {
    const auth = useAuthStore();
    return await Http.get({
      route: "/" + SERVICES_ROUTE + "/simple",
      headers: {
        Authorization: "Bearer " + auth.user.token,
      },
    });
  },
};
