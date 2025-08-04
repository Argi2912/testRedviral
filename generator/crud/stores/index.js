import { defineStore } from 'pinia'
import { useGlobalStore } from '@/stores/GlobalStore.js'
import { SERVICES_ROUTE } from '../config/config.js'
import useNotyf from '@/composables/useNotyf.js'
import { __name__(snakeCase)_methods, __name__(snakeCase)_properties } from './__name__(snakeCase).js'

const loadingNotif = () => {
	let notyf = useNotyf()
	notyf.info('Cargando')
}

export const use__name__(pascalCase)Store = defineStore({
	id: '__name__(kebabCase)-store',
	state: () => ({
		module_name: '',
		active_page: '',
		modal: '',
		modal_title: '',
		items: {
			...__name__(snakeCase)_properties
		},
		forms: {
			create_update___name__(snakeCase): ''
		}
	}),

	actions: {
		setList(items_name, items) {
			this.items[items_name].list = items
		},
		
		getList(items_name) {
			return this.items[items_name].list
		},
		setSimpleList(items_name, items) {
			this.items[items_name].simple_list = items
		},
		
		getSimpleList(items_name) {
			return this.items[items_name].simple_list
		},
		setProperty(items_name,property,value){
			this.items[items_name][property] = value

		},
		getProperty(items_name,property){
			return this.items[items_name][property]

		},
		setModal(m) {
			this.modal = m
		},
		getModal() {
			return this.modal
		},
		setModalTitle(mt) {
			this.modal_title = mt;
		},
		getModalTitle() {
			return this.modal_title;
		},
		setSelectedItem(items_name, item) {
			this.items[items_name].selected_item = item
		},
		getSelectedItem(items_name) {
			return this.items[items_name].selected_item
		},
		setSelectedItemIndex(items_name, index) {
			this.items[items_name].selected_item_index = index
		},
		getSelectedItemIndex(items_name) {
			return this.items[items_name].selected_item_index
		},
		setActivePage(id) {
			this.active_page = id;
		},
		getActivePage(id) {
			return this.active_page;
		},
		setModuleName(mn) {
			this.module_name = mn
		},
		getModuleName() {
			return this.module_name
		},
		setPagination(paginator,settings) {
			this.items[paginator].paginator.current_page = settings.current_page ?? this.items[paginator].paginator.current_page;
			this.items[paginator].paginator.items_per_page = settings.items_per_page ?? this.items[paginator].paginator.items_per_page;
			this.items[paginator].paginator.search = settings.search ?? this.items[paginator].paginator.search;
			this.items[paginator].paginator.total_pages = settings.total_pages ?? this.items[paginator].paginator.total_pages;
			this.items[paginator].paginator.total_items = settings.total_items ?? this.items[paginator].paginator.total_items;
			this.items[paginator].paginator.key = settings.key ?? this.items[paginator].paginator.key;
		},
		getPagination(paginator){
			return {
				current_page: this.items[paginator].paginator.current_page,
				items_per_page: this.items[paginator].paginator.items_per_page,
				search: this.items[paginator].paginator.search,
				total_pages: this.items[paginator].paginator.total_pages,
				total_items: this.items[paginator].paginator.total_items,
				key: this.items[paginator].paginator.key,
			}
		},
		setFormMode(form, mode) {
			this.forms[form] = mode
		},
		getFormMode(form) {
			return this.forms[form]
		},

	async addSearchFilter(params) {
	let global_store = useGlobalStore();
	await global_store.addSearchFilter(SERVICES_ROUTE, params.field, params.value, params.type_search)
},
	async cleanSearchFilter() {
	let global_store = useGlobalStore();
	await global_store.cleanSearchFilter(SERVICES_ROUTE)
},
	...__name__(snakeCase)_methods,
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
