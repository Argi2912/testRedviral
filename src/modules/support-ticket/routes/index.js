import Main from '../Main.vue'
export default [
    {
        path: "support-ticket",
        name: "admin-support-ticket",
        meta: {
            login_required: true,
            accepted_roles: [1, 2]
        },
        component: Main
    },
    {
        path: "support-ticket/:id",
        name: "admin-support-ticket-details",
        meta: {
            login_required: true,
            active_form: {
                name: 'create_update_support_ticket',
                mode: 'update'
            },
            accepted_roles: [1, 2]
        },
        component: Main
    },
]