<template>
    <div class="card" v-if="shipment">
        <div class="card-body">
            <h5 class="card-title">{{shipment.title}} [ID: {{shipment.id}}]</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{shipment.from_country}} -> {{shipment.to_country}}</h6>
            <p class="card-text">
                <span class="font-weight-bold">Arrived:</span> {{shipment.arrived_ts}}<br/>
                <span class="font-weight-bolder">Weight, kg:</span> {{shipment.weight_kg}}
            </p>
            <a href="#" class="card-link btn btn-primary" @click.prevent="editShipment">Edit</a>
            <a href="#" class="card-link btn btn-danger" @click.prevent="removeShipment">Remove</a>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'shipment-details',
        computed: {
            shipment() {
                return this.$store.state.chosen_shipment
            }
        },
        methods: {
            editShipment() {
                this.$router.push({name: "edit"});
            },
            removeShipment() {
                this.$http.delete(this.$store.state.base_url.concat("/shipments/").concat(this.shipment.id)).then(() => {
                    this.$router.push({name: "list"});
                    this.$router.go();
                });
            }
        },
        data() {
            return {
                is_edit_mode: false,
            }
        }
    }
</script>