<template>
  <v-select
    :items="vehicleTypes"
    v-model="getVehicleType"
    label="Vehicle Type"
    item-text="name"
    return-object
    @change="selectVehicleType()" 
    :rules="getVehicleTypeRule" 
  ></v-select>
</template>


<script>
import VehicleType from '@/store/models/vehicle_type'  
export default {

  name: 'vehicleType',
  props: [ 'vehicleType', 'vehicleTypeRule'],

  async created(){
    const res = await VehicleType.api().fetchAll()
    if(res.response.status === 200){
      this.vehicleTypes = res.response.data.data
    }
  },



  data: function () {
    return {
      vehicleTypes: null,
      getVehicleType: this.vehicleType,
      getVehicleTypeRule: this.vehicleTypeRule
    }
  },

  mounted(){

  },

  methods: {
    selectVehicleType(){
      this.$emit('update:vehicleType', this.getVehicleType)
    },
  },

}

</script>