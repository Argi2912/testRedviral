import { SERVICES_ROUTE } from "../config/config.js";
import SocialNetworksServices from "../services/index.js";
import useNotyf from "@/composables/useNotyf.js";
const loadingNotif = () => {
  let notyf = useNotyf();
  notyf.info("Cargando");
};

export const social_networks_properties = {
  social_networks: {
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
export const social_networks_methods = {
  async fetchSocialNetworksSimpleList() {
    let response = await SocialNetworksServices.simpleList();
    return response.data.data;
  },
  async fetchSocialNetworks(items_per_page, current_page, search) {
    let response = await SocialNetworksServices.paginate(
      items_per_page,
      current_page,
      search
    );
    return response.data.data;
  },
  async findSocialNetworksById(social_networks_id) {
    let response = await SocialNetworksServices.find(social_networks_id);
    return response.data.data;
  },
  async createSocialNetworks(form) {
    let data = {
      name: form.name,
      url: form.url,
      network: form.social_network_id,
    };
    loadingNotif();

    let response = await SocialNetworksServices.create(data);

    this.loadSocialNetworksList();
    this.setModal("");
    this.setModalTitle("");
    this.setFormMode("create_updatesocial_networks", "");
    await swal.fire({
      title: "",
      text: "Red social creada correctamente",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continuar",
    });

    return response.data.data;
  },
  async updateSocialNetworks(form, id) {
    loadingNotif();
    let response = await SocialNetworksServices.update(form, id);

    this.loadSocialNetworksList();
    this.setModal("");
    this.setModalTitle("");
    this.setFormMode("create_updatesocial_networks", "");
    swal.fire({
      title: "",
      text: "Red social actualizada correctamente",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continuar",
    });
    return response.data.data;
  },
  async deleteSocialNetworks(id) {
    loadingNotif();
    let response = await SocialNetworksServices.delete(id);
    this.setPagination("social_networks", {
      current_page: 1,
    });
    this.loadSocialNetworksList();
    swal.fire({
      title: "",
      text: "Red social eliminada correctamente",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Continuar",
    });
    return response.data.data;
  },
  async loadSocialNetworksList() {
    let social_networks = await this.fetchSocialNetworks(
      this.items.social_networks.paginator.items_per_page,
      this.items.social_networks.paginator.current_page,
      this.items.social_networks.paginator.search
    );
    this.setList("social_networks", social_networks.items);
    this.setPagination("social_networks", {
      current_page: social_networks.pagination.current_page,
      total_pages: Math.ceil(
        social_networks.pagination.total /
          parseInt(social_networks.pagination.per_page)
      ),
      total_items: social_networks.pagination.total,
      key: ++this.items.social_networks.paginator.key,
    });
    this.setProperty("social_networks", "loading_list", false);
  },
  async loadSocialNetworksSimpleList() {
    let social_networks = await this.fetchSocialNetworksSimpleList();
    this.setSimpleList("social_networks", social_networks);
    this.setProperty("social_networks", "loading_list", false);
  },
};
