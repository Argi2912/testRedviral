import Main from '../Main.vue'
export default [
    {
        path: "test-uno",
        name: "admin-test-uno",
        meta: {
            login_required: true,
            accepted_roles: [1, 2]
        },
        component: Main
    },
    {
        path: "test-uno/:id",
        name: "admin-test-uno-details",
        meta: {
            login_required: true,
            active_form: {
                name: 'create_update_test_uno',
                mode: 'update'
            },
            accepted_roles: [1, 2]
        },
        component: Main
    },

]