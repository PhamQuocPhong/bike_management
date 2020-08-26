<template>
  <div>
    <v-layout row justify-center>
      <v-dialog
        persistent
        max-width="900"
        v-if="receptionCustomerBuy"
      >
        <v-card>

        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>

import Modal from "@/store/models/modal";

export default {
  

  data() {
    return {
      right: 10,
      top: 10,
      valid: true,
      lazy: false,
      // rule form
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      search: "",
      itemsPerPageList: [5, 10, 15],

    };
  },


};
</script>
