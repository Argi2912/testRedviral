import { defineStore } from 'pinia'
import { useGlobalStore } from '@/stores/GlobalStore.js'
import { SERVICES_ROUTE } from '../config/config.js'
import useNotyf from '@/composables/useNotyf.js'
import PaymentRequestsServices from '../services/index.js'

const loadingNotif = () => {
	let notyf = useNotyf()
	notyf.info('Cargando')
}

export const usePaymentRequestsStore = defineStore({
	id: 'payment-requests-store',
	state: () => ({
		module_name: '',
		active_page: '',
		modal: '',
		modal_title: '',
		items: {
			payment_requests: {
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
			create_update_payment_requests: ''
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
		async fetchPaymentRequests(items_per_page, current_page, search) {

	let response = await PaymentRequestsServices.paginate(items_per_page, current_page, search);
	return response.data.data


},
	async findPaymentRequestsById(payment_requests_id) {
	let response = await PaymentRequestsServices.find(payment_requests_id)
	return response.data.data

},
	async createPaymentRequests(form) {
	// let data = {
	// 	name: form.name,
	// 	type_category: form.type,
	// 	description: form.description,
	// }
	loadingNotif()

	let response = await PaymentRequestsServices.create(form)
		
		this.setPaymentRequestsList()
		this.setModal('')
		this.setModalTitle('')
		this.setFormMode('create_updatepayment_requests', '')
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

	async updatePaymentRequests(form, id) {

	loadingNotif()
	let response = await PaymentRequestsServices.update(form, id)

		this.setPaymentRequestsList()
		this.setModal('')
		this.setModalTitle('')
		this.setFormMode('create_updatepayment_requests', '')
		swal.fire({
		title: "",
		text: '========= actualizadx correctamente',
		icon: "success",
		confirmButtonColor: "#3085d6",
		confirmButtonText: "Continuar",
	})
	return response.data.data

},
	async deletePaymentRequests(id) {
	loadingNotif()
	let response = await PaymentRequestsServices.delete(id)
		this.setPagination({
		paginator: 'payment_requests',
		current_page: 1
	})
		this.setPaymentRequestsList()
		swal.fire({
		title: "",
		text: '========= eliminadx correctamente',
		icon: "success",
		confirmButtonColor: "#3085d6",
		confirmButtonText: "Continuar",
	})
	return response.data.data

},

	async setPaymentRequestsList() {
	let payment_requests = await this.fetchPaymentRequests(this.items.payment_requests.paginator.items_per_page, this.items.payment_requests.paginator.current_page, this.items.payment_requests.paginator.search)
	this.setItems('payment_requests', payment_requests.items)
	this.setPagination({
		paginator: 'payment_requests',
		current_page: payment_requests.pagination.current_page,
		total_pages: Math.ceil(payment_requests.pagination.total / parseInt(payment_requests.pagination.per_page)),
		total_items: payment_requests.pagination.total,
		key: ++this.items.payment_requests.paginator.key
	})
	this.items.payment_requests.loading_list = false;
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
	let payment_requests = await this.findPaymentRequestsById(route.params.id)
	this.setSelectedItem('payment_requests', payment_requests)
	this.setModalTitle("Ver datos de payment_requests")
	this.setModal('update_PaymentRequests(snake_case)')
}
this.setPaymentRequestsList()
this.setModuleName('PaymentRequests')
this.setActivePage('#list')
},
}
	
})
