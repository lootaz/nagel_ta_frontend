<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <a href="#" class="btn btn-primary" @click.prevent="refreshList">Refresh</a>
                <router-link :to="{name: 'create'}" class="btn btn-success">Create</router-link>

            </div>
            <div class="col-sm-6 text-right">
                <shipment-search></shipment-search>
            </div>
        </div>
        <div class="row" v-if="shipments.length > 0">
            <div class="col-4">
                <div class="list-group">
                    <shipment-item
                            :shipment="shipment"
                            v-for="shipment in shipments"
                            :key="shipment.id"
                            :class="active_shipment === shipment.id ? 'active' : ''"
                    ></shipment-item>
                </div>
            </div>
            <div class="col-8">
                <shipment-details/>
            </div>
        </div>
        <div v-else>
            <h2 class="text-center text-info">Shipments not found.</h2>
        </div>

    </div>
</template>

<script>
    import ShipmentItem from "./ShipmentItem.vue"
    import ShipmentDetails from "./ShipmentDetails.vue"
    import ShipmentSearch from './ShipmentSearch.vue'

    export default {
        name: 'shipments-list',
        components: {
            ShipmentItem,
            ShipmentDetails,
            ShipmentSearch
        },
        computed: {
            shipments() {
                return this.$store.state.shipments;
            },
            active_shipment() {
                return this.$store.getters.chosenShipmentId;
            }

        },
        methods: {
            refreshList() {
                this.$store.dispatch('fetchShipments');
            }
        },
        mounted() {
            this.$store.commit("setChosenShipment", null);
            this.$store.dispatch('fetchShipments');
        }
    }
</script>

<style>
    .col-4 {
        padding-left: 0;
    }
    .col-8 {
        padding-right: 0;
    }
    .btn {
        margin-right: 10px;
    }

</style>