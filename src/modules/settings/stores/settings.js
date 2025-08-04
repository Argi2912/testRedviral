import { SERVICES_ROUTE } from "../config/config.js";
import SettingsServices from "../services/index.js";
import useNotyf from "@/composables/useNotyf.js";
const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const settings_properties = {
  settings: {
    token: 0,
    min_to_withdraw: 0,
    auto_update_amount: null,
    list: [],
    loading_list: true,
    simple_list: [],
    loading_simple_list: true,
    selected_item: {},
    selected_item_index: -1,
    paginator: {
      items_per_page: 5,
      current_page: 1,
      search: "",
      total_pages: 0,
      total_items: 0,
      key: 0,
    },
  },
};
export const settings_methods = {
  async fetchSettingsSimpleList() {
    let response = await SettingsServices.simpleList();
    return response.data.data;
  },
  async fetchSettingsList(items_per_page, current_page, search) {
    let response = await SettingsServices.paginate(
      items_per_page,
      current_page,
      search
    );
    return response.data.data;
  },
  async fetchAutoUpdateAmountSetting() {
    const res = await SettingsServices.fetchAutoUpdateAmountSetting();
    this.auto_update_amount = res.data.data;
  },
  async fetchToken() {
    let response = await SettingsServices.fetchToken();
    return response.data.data;
  },
  async getToken() {
    return await this.fetchToken();
  },
  async loadToken() {
    this.token = await this.fetchToken();
  },
  async loadMinToWithdraw() {
    this.min_to_withdraw = await this.fetchMinToWithdraw();
  },
  async createSettings(form) {
    loadingNotif();

    let response = await SettingsServices.create(form);

    this.loadSettingsList();
    this.setModal("");
    this.setModalTitle("");
    this.setFormMode("create_update_settings", "");
    await swal.fire({
      title: "",
      text: "========= creadx correctamente",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continuar",
    });
    return response.data.data;
  },
  async updateTokenPrice(price) {
    loadingNotif();
    let response = await SettingsServices.updateTokenPrice({ token: price });
    swal.fire({
      title: "",
      text: "Token actualizado correctamente",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continuar",
    });
    return response.data.data;
  },
  async updateAutoUpdateAmount(value) {
    loadingNotif();
    await SettingsServices.updateAutoUpdateAmount(value);
  },
  async fetchMinToWithdraw() {
    let response = await SettingsServices.fetchMinToWithdraw();
    return response.data.data;
  },
  async updateMinToWithdraw(amount) {
    loadingNotif();
    let response = await SettingsServices.updateMinToWithdraw({
      minimum_withdrawal_amount: amount,
    });
    swal.fire({
      title: "",
      text: "Monto actualizado correctamente",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continuar",
    });
    return response.data.data;
  },
  async deleteSettings(id) {
    loadingNotif();
    let response = await SettingsServices.delete(id);
    this.setPagination("settings", {
      current_page: 1,
    });
    this.loadSettingsList();
    swal.fire({
      title: "",
      text: "========= eliminadx correctamente",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continuar",
    });
    return response.data.data;
  },

  async loadSettingsList() {
    let settings = await this.fetchSettingsList(
      this.items.settings.paginator.items_per_page,
      this.items.settings.paginator.current_page,
      this.items.settings.paginator.search
    );
    this.setList("settings", settings.items);
    this.setPagination("settings", {
      current_page: settings.pagination.current_page,
      total_pages: Math.ceil(
        settings.pagination.total / parseInt(settings.pagination.per_page)
      ),
      total_items: settings.pagination.total,
      key: ++this.items.settings.paginator.key,
    });
    this.setProperty("settings", "loading_list", false);
  },

  async loadSettingsSimpleList() {
    let settings = await this.fetchSettingsSimpleList();
    this.setSimpleList("settings", settings);
    this.setProperty("settings", "loading_simple_list", false);
  },
};
