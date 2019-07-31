<template>
    <div class="container-fluid">
        <h1 class="text-center">Nagel Shipments</h1>
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from 'vue'
    import ShipmentsList from './components/ShipmentsList.vue'

    export default {
        components: {
            ShipmentsList
        },
    }
</script>

<style>
    .row {
        padding-bottom: 10px;
    }

</style>
