import { defineStore } from 'pinia'
import { useGlobalStore } from '@/stores/GlobalStore.js'
import { SERVICES_ROUTE } from '../config/config.js'
import useNotyf from '@/composables/useNotyf.js'
import __name__(pascalCase)Services from '../services/index.js'

const loadingNotif = () => {
	let notyf = useNotyf()
	notyf.info('Cargando')
}

export const use__name__(pascalCase) Store = defineStore({
	id: '__name__(kebabCase)-store',
	state: () => ({
		module_name: '',
		active_page: '',
		modal: '',
		modal_title: '',
		items: {
			__name__(snakeCase): {
				list: [],
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
		},
		forms: {
			create_update___name__(snakeCase): ''
		}
	}),

	actions: {
		setItems(items_name, items) {
			this.items[items_name].list = items
		},
		setModal(m) {
			this.modal = m
		},
		setModalTitle(mt) {
			this.modal_title = mt
		},
		setSelectedItem(items_name, item) {
			this.items[items_name].selected_item = item
		},
		setSelectedItemIndex(items_name, index) {
			this.items[items_name].selected_item_index = index
		},
		setActivePage(id) {
			this.active_page = id
		},
		setModuleName(mn) {
			this.module_name = mn
		},
		setPagination(settings) {
			this.items[settings.paginator].paginator.current_page = settings.current_page ?? this.items[settings.paginator].paginator.current_page;
			this.items[settings.paginator].paginator.items_per_page = settings.items_per_page ?? this.items[settings.paginator].paginator.items_per_page;
			this.items[settings.paginator].paginator.search = settings.search ?? this.items[settings.paginator].paginator.search;
			this.items[settings.paginator].paginator.total_pages = settings.total_pages ?? this.items[settings.paginator].paginator.total_pages;
			this.items[settings.paginator].paginator.total_items = settings.total_items ?? this.items[settings.paginator].paginator.total_items;
			this.items[settings.paginator].paginator.key = settings.key ?? this.items[settings.paginator].paginator.key;
		},
		setFormMode(form, mode) {
			this.forms[form] = mode
		},
		//begin::modal options
		configModal(config) {
			console.log(config)
		},
		//end::modal options
		async fetch__name__(pascalCase)(items_per_page, current_page, search) {

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
		this.setFormMode('create_update__name__(snakeCase)', '')
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
	// let data = {
	// 	name: form.name,
	// 	type_category: form.type,
	// 	description: form.description,
	// 	status: form.status ? 'active' : 'deleted'
	// }
	loadingNotif()
	let response = await __name__(pascalCase)Services.update(form, id)

		this.load__name__(pascalCase)List()
		this.setModal('')
		this.setModalTitle('')
		this.setFormMode('create_update__name__(snakeCase)', '')
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
		this.setPagination({
		paginator: '__name__(snakeCase)',
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
	let __name__(snakeCase) = await this.fetch__name__(pascalCase)(this.items.__name__(snakeCase).paginator.items_per_page, this.items.__name__(snakeCase).paginator.current_page, this.items.__name__(snakeCase).paginator.search)
	this.setItems('__name__(snakeCase)', __name__(snakeCase).items)
	this.setPagination({
		paginator: '__name__(snakeCase)',
		current_page: __name__(snakeCase).pagination.current_page,
		total_pages: Math.ceil(__name__(snakeCase).pagination.total / parseInt(__name__(snakeCase).pagination.per_page)),
		total_items: __name__(snakeCase).pagination.total,
		key: ++this.items.__name__(snakeCase).paginator.key
	})
},
	async addSearchFilter(params) {
	let global_store = useGlobalStore();
	await global_store.addSearchFilter(SERVICES_ROUTE, params.field, params.value, params.type_search)
},
	async cleanSearchFilter() {
	let global_store = useGlobalStore();
	await global_store.cleanSearchFilter(SERVICES_ROUTE)
},
	async init(route) {
	await this.cleanSearchFilter()
	if(route.meta.active_form) {
	this.setFormMode(route.meta.active_form.name, route.meta.active_form.mode)
	let __name__(snakeCase) = await this.find__name__(pascalCase)ById(route.params.id)
	this.setSelectedItem('__name__(snakeCase)', __name__(snakeCase))
	this.setModalTitle("Ver datos de __name__(snakeCase)")
	this.setModal('update___name__(snakeCase)')
}
this.load__name__(pascalCase)List()
this.setModuleName('__name__(pascalCase)')
this.setActivePage('#list')
},
}
	
})
