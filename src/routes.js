import ShipmentsList from './components/ShipmentsList.vue'
import ShipmentEdit from './components/ShipmentEdit.vue'

export const routes = [
    {
        path: '/',
        component: ShipmentsList,
        name: 'home'
    },
    {
        path: '/',
        component: ShipmentsList,
        name: 'list'
    },
    {
        path: '/edit',
        component: ShipmentEdit,
        props: {is_edit_mode: true},
        name: 'edit'
    },
    {
        path: '/create',
        component: ShipmentEdit,
        props: {is_edit_mode: false},
        name: 'create'
    },

    {
        path: '*',
        component: ShipmentsList
    }

]