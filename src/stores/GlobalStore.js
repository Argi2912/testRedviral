import { defineStore } from "pinia";
//import useNotyf from '@/composables/useNotyf.js'
import { AppServices } from "@/utils/AppServices";
import { parseToFormData } from "@/utils/Functions";
export const useGlobalStore = defineStore({
  id: "global-store",
  state: () => ({
    initialized: false,
    active_module: {
      name: "",
      active_page: "",
    },
  }),

  actions: {
    setModule(m) {
      this.active_module.module = m;
    },
    setActivePage(mt) {
      this.active_module.modal_title = mt;
    },
    init() {
      //aqui se consulta del storage el modulo y la pagina activos
    },
    async addSearchFilter(list, field, value, type_search) {
      let data = {
        list: list,
        field: field ?? "all",
        value: value ?? "",
        type_search: type_search ?? "like",
      };
      let filter_data = parseToFormData(data);
      let response = await AppServices.addSearchFilter(filter_data);
      let get_response = await AppServices.getSearchFilter(filter_data);
      console.log(get_response);
    },
    async cleanSearchFilter(list, field) {
      let response = await AppServices.cleanSearchFilter({ list, field });
      console.log(response);
    },
  },
});
