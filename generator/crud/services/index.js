import { AppServices } from '@/utils/AppServices.js'
import { useAuthStore } from '@/modules/auth/stores/store.js'
import { Http } from '@/utils/AppServices'
import { SERVICES_ROUTE } from '../config/config.js'
import { parseToFormData } from '@/utils/Functions.js'

export default {
    create: async (data) => {
        let auth = useAuthStore()
        let parsed_data = parseToFormData(data)
        return await Http.post({

            route: '/' + SERVICES_ROUTE,
            data: parsed_data,
            headers: {
                Authorization: 'Bearer ' + auth.user.token
            }
        })
    },
    update: async(data, __name__(snakeCase)_id) => {
    let auth = useAuthStore()
    let parsed_data = parseToFormData(data)
    return await Http.post({

        route: '/' + SERVICES_ROUTE + '/update/' + __name__(snakeCase)_id,
        data: parsed_data,
        headers: {
            Authorization: 'Bearer ' + auth.user.token
        }
    })
},
delete: async(__name__(snakeCase)_id) => {
    let auth = useAuthStore()
    return await Http.delete({

        route: '/' + SERVICES_ROUTE + '/' + __name__(snakeCase)_id,
        headers: {
            Authorization: 'Bearer ' + auth.user.token
        }
    })

},
find: async(__name__(snakeCase)_id) => {
    let auth = useAuthStore()
    return await Http.get({

        route: '/' + SERVICES_ROUTE + '/' + __name__(snakeCase)_id,
        headers: {
            Authorization: 'Bearer ' + auth.user.token
        }
    })

},
paginate: async (items_per_page, current_page) => {
    let auth = useAuthStore()
    return await Http.get({

        route: '/' + SERVICES_ROUTE,
        query: {
            per_page: items_per_page,
            page: current_page
        },
        headers: {
            Authorization: 'Bearer ' + auth.user.token
        }
    })
}
simpleList: async () => {
    let auth = useAuthStore()
    return await Http.get({

        route: '/' + SERVICES_ROUTE + '/simple',
        headers: {
            Authorization: 'Bearer ' + auth.user.token
        }
    })
}

}