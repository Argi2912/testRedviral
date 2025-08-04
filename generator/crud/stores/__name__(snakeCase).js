import { SERVICES_ROUTE } from '../config/config.js'
import __name__(pascalCase)Services from '../services/index.js'
import useNotyf from '@/composables/useNotyf.js'
const loadingNotif = () => {
	let notyf = useNotyf()
	notyf.info('Cargando')
}

export const __name__(snakeCase)_properties = {
    __name__(snakeCase): {
        list: [],
        loading_list: true,
        simple_list: [],
        loading_simple_list: true,
        selected_item: {},
        selected_item_index: -1,
        paginator: {
            items_per_page: 5,
            current_page: 1,
            search: '',
            total_pages: 0,
            total_items: 0,
            key: 0
        }
    }
}
export const __name__(snakeCase)_methods = {
    async fetch__name__(pascalCase)SimpleList() {

        let response = await __name__(pascalCase)Services.simpleList();
        return response.data.data
    
    
    },
    async fetch__name__(pascalCase)List(items_per_page, current_page, search) {

        let response = await __name__(pascalCase)Services.paginate(items_per_page, current_page, search);
        return response.data.data
    
    
    },
        async find__name__(pascalCase)ById(__name__(snakeCase)_id) {
        let response = await __name__(pascalCase)Services.find(__name__(snakeCase)_id)
        return response.data.data
    
    },
        async create__name__(pascalCase)(form) {
        // let data = {
        // 	name: form.name,
        // 	type_category: form.type,
        // 	description: form.description,
        // }
        loadingNotif()
    
        let response = await __name__(pascalCase)Services.create(form)
            
            this.load__name__(pascalCase)List()
            this.setModal('')
            this.setModalTitle('')
            this.setFormMode('create_update___name__(snakeCase)', '')
            await swal
            .fire({
                title: "",
                text: '========= creadx correctamente',
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Continuar",
            })
    
            return response.data.data
    
    },
    
        async update__name__(pascalCase)(form, id) {
    
        loadingNotif()
        let response = await __name__(pascalCase)Services.update(form, id)
    
            this.load__name__(pascalCase)List()
            this.setModal('')
            this.setModalTitle('')
            this.setFormMode('create_update___name__(snakeCase)', '')
            swal.fire({
            title: "",
            text: '========= actualizadx correctamente',
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Continuar",
        })
        return response.data.data
    
    },
        async delete__name__(pascalCase)(id) {
        loadingNotif()
        let response = await __name__(pascalCase)Services.delete(id)
            this.setPagination('__name__(snakeCase)',{
            current_page: 1
        })
            this.load__name__(pascalCase)List()
            swal.fire({
            title: "",
            text: '========= eliminadx correctamente',
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Continuar",
        })
        return response.data.data
    
    },
    
        async load__name__(pascalCase)List() {
        let __name__(snakeCase) = await this.fetch__name__(pascalCase)List(this.items.__name__(snakeCase).paginator.items_per_page, this.items.__name__(snakeCase).paginator.current_page, this.items.__name__(snakeCase).paginator.search)
        this.setList("__name__(snakeCase)", __name__(snakeCase).items);
        this.setPagination('__name__(snakeCase)',{
            current_page: __name__(snakeCase).pagination.current_page,
            total_pages: Math.ceil(__name__(snakeCase).pagination.total / parseInt(__name__(snakeCase).pagination.per_page)),
            total_items: __name__(snakeCase).pagination.total,
            key: ++this.items.__name__(snakeCase).paginator.key
        })
        this.setProperty('__name__(snakeCase)','loading_list',false)
    },
    
        async load__name__(pascalCase)SimpleList() {
        let __name__(snakeCase) = await this.fetch__name__(pascalCase)SimpleList()
        this.setSimpleList("__name__(snakeCase)", __name__(snakeCase));
        this.setProperty('__name__(snakeCase)','loading_simple_list',false)
    },
}