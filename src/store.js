import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        shipments: [],
        chosen_shipment: null,
        base_url: '/api',
    },
    mutations: {
        setBaseUrl(state, baseUrl) {
            state.base_url = baseUrl;
        },
        setShipments(state, shipments) {
            state.shipments = shipments;
        },
        setChosenShipment(state, chosen_shipment) {
            state.chosen_shipment = chosen_shipment;
        }
    },
    getters: {
        chosenShipmentId(state) {
            return (state.chosen_shipment ? state.chosen_shipment.id : 0);
        }
    },
    actions: {
        fetchShipments(context) {
            return new Promise((resolve) => {
                Vue.http.get(context.state.base_url.concat('/shipments/')).then((response) => {
                    response.json().then((result) => {
                        context.commit('setChosenShipment', null);
                        context.commit('setShipments', result);
                        resolve();
                    });
                    resolve();
                });
            });
        },
        searchShipmentsByTitle(context, search_request) {
            return new Promise((resolve) => {
                Vue.http.get(context.state.base_url.concat('/shipments/?title=').concat(search_request)).then((response) => {
                    response.json().then((result) => {
                        context.commit('setChosenShipment', null);
                        context.commit('setShipments', result);
                        resolve();
                    });
                    resolve();
                });
            });
        }

    }

});