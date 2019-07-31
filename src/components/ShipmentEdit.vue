<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <a href="#" class="btn btn-success" @click.prevent="saveShipment">Save</a>
            </div>
            <div class="col-sm-6 text-right">
                <router-link :to="{name: 'home'}" class="btn btm-sm btn-primary">Home</router-link>
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-title">Title</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-title" v-model="shipment.title" placeholder="ex: Banana">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-arrived">Arrived</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-arrived"
                       v-model="shipment.arrived_ts" placeholder="ex: 2019-07-30 10:00">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-weight">Weight, kg</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-weight"
                       v-model="shipment.weight_kg" placeholder="ex: 1000">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-from">From</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-from"
                       v-model="shipment.from_country" placeholder="ex: Egypt">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-to">To</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-to"
                       v-model="shipment.to_country" placeholder="ex: Estonia">
            </div>
        </div>
        <div class="row" v-if="errors">
            <p class="text-danger">
                Detected Errors
                <ol>
                    <li v-for="(value, key) in errors" :key="key">{{key}}: {{value}}</li>
                </ol>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'shipment-edit',
        props: {
            is_edit_mode: false
        },
        data() {
            return {
                shipment: {
                    title: null,
                    arrived_ts: null,
                    weight_kg: null,
                    from_country: null,
                    to_country: null
                },
                errors: null
            }
        },
        methods: {
            saveShipment() {
                if(this.is_edit_mode) {
                    this.editShipment();
                } else {
                    this.createShipmnet();
                }
            },
            createShipmnet() {
                this.$http.post(this.$store.state.base_url.concat("/shipments/"), this.shipment, {emulateJSON: true})
                    .then(() => {
                        this.$router.push({name: "home"});
                    }, (error) => {
                        this.errors = error.body;
                    });
            },
            editShipment() {
                let id = this.$store.getters.chosenShipmentId;
                this.$http.put(this.$store.state.base_url.concat("/shipments/").concat(id).concat("/"), this.shipment, {emulateJSON: true})
                    .then(() => {
                        this.$router.push({name: "home"});
                    }, (error) => {
                        this.errors = error.body;
                    });

            }

        },
        mounted() {
            if(this.is_edit_mode) {
                this.shipment.title = this.$store.state.chosen_shipment.title;
                this.shipment.arrived_ts= this.$store.state.chosen_shipment.arrived_ts;
                this.shipment.weight_kg= this.$store.state.chosen_shipment.weight_kg;
                this.shipment.from_country = this.$store.state.chosen_shipment.from_country;
                this.shipment.to_country= this.$store.state.chosen_shipment.to_country;
            }
        }

    }
</script>

<style>
    .col-sm-6 {
        padding: 0;
    }

    .input-group > .input-group-prepend {
        flex: 0 0 20%;
        text-align: right;
    }

    .input-group .input-group-text {
        width: 100%;
    }

</style>