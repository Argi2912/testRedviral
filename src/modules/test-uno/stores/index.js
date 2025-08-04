import { defineStore } from 'pinia'
import { useGlobalStore } from '@/stores/GlobalStore.js'
import { SERVICES_ROUTE } from '../config/config.js'
import useNotyf from '@/composables/useNotyf.js'
import TestUnoServices from '../services/index.js'

const loadingNotif = () => {
	let notyf = useNotyf()
	notyf.info('Cargando')
}

export const useTestUnoStore = defineStore({
	id: 'test-uno-store',
	state: () => ({
		module_name: '',
		active_page: '',
		modal: '',
		modal_title: '',
		items: {
			test_uno: {
				list: [],
				loading_list: true,
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
			create_update_test_uno: ''
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
		async fetchTestUno(items_per_page, current_page, search) {

	let response = await TestUnoServices.paginate(items_per_page, current_page, search);
	return response.data.data


},
	async findTestUnoById(test_uno_id) {
	let response = await TestUnoServices.find(test_uno_id)
	return response.data.data

},
	async createTestUno(form) {
	// let data = {
	// 	name: form.name,
	// 	type_category: form.type,
	// 	description: form.description,
	// }
	loadingNotif()

	let response = await TestUnoServices.create(form)
		
		this.setTestUnoList()
		this.setModal('')
		this.setModalTitle('')
		this.setFormMode('create_updatetest_uno', '')
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

	async updateTestUno(form, id) {

	loadingNotif()
	let response = await TestUnoServices.update(form, id)

		this.setTestUnoList()
		this.setModal('')
		this.setModalTitle('')
		this.setFormMode('create_updatetest_uno', '')
		swal.fire({
		title: "",
		text: '========= actualizadx correctamente',
		icon: "success",
		confirmButtonColor: "#3085d6",
		confirmButtonText: "Continuar",
	})
	return response.data.data

},
	async deleteTestUno(id) {
	loadingNotif()
	let response = await TestUnoServices.delete(id)
		this.setPagination({
		paginator: 'test_uno',
		current_page: 1
	})
		this.setTestUnoList()
		swal.fire({
		title: "",
		text: '========= eliminadx correctamente',
		icon: "success",
		confirmButtonColor: "#3085d6",
		confirmButtonText: "Continuar",
	})
	return response.data.data

},

	async setTestUnoList() {
	let test_uno = await this.fetchTestUno(this.items.test_uno.paginator.items_per_page, this.items.test_uno.paginator.current_page, this.items.test_uno.paginator.search)
	this.setItems('test_uno', test_uno.items)
	this.setPagination({
		paginator: 'test_uno',
		current_page: test_uno.pagination.current_page,
		total_pages: Math.ceil(test_uno.pagination.total / parseInt(test_uno.pagination.per_page)),
		total_items: test_uno.pagination.total,
		key: ++this.items.test_uno.paginator.key
	})
	this.items.test_uno.loading_list = false;
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
	let test_uno = await this.findTestUnoById(route.params.id)
	this.setSelectedItem('test_uno', test_uno)
	this.setModalTitle("Ver datos de test_uno")
	this.setModal('update_TestUno(snake_case)')
}
this.setTestUnoList()
this.setModuleName('TestUno')
this.setActivePage('#list')
},
}
	
})
