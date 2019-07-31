<template>
    <div class="input-group mb-3">
        <input type="text" class="form-control" aria-describedby="inputGroup-search" v-model="search_request" placeholder="type part of shipment title...">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click.prevent="searchShipment">Search</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'shipment-search',
        data() {
            return {
                search_request: '',
            }
        },
        methods: {
            searchShipment() {
                this.$store.dispatch('searchShipmentsByTitle', this.search_request);

            }
        }
    }
</script>