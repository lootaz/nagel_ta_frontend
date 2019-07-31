<template>
    <a href="#" class="list-group-item list-group-item-action" @click.prevent="pickItem">{{shipment.title}} [ID: {{shipment.id}}]</a>
</template>

<script>
    export default {
        name: 'shipment-item',
        props: {
            shipment: {
                type: Object,
                required: true
            },
        },
        methods: {
            pickItem() {
                if(this.$store.getters.chosenShipmentId && this.$store.getters.chosenShipmentId === this.shipment.id) {
                    this.$store.commit('setChosenShipment', null);
                } else {
                    this.$store.commit('setChosenShipment', this.shipment);
                }
            },
        }
    }
</script>

<style>
</style>