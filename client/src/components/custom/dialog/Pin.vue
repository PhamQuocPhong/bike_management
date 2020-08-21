<template>
  <v-container>
    <v-dialog
      class="confirm"
      v-model="showPinDialog"
      persistent
      max-width="300"
    >
      <v-card>
        <v-form ref="form">
          <v-card-title class="d-flex  justify-center">
            {{ title }}
          </v-card-title>
          <v-card-text class="text-center">
            <v-text-field
              v-model="msg"
              outlined
              dense
              clearable
              autocomplete="off"
              :rules="[$validation.required(msg, title)]"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="btn-grid justify-space-between">
            <v-btn
              class="btn btn-left"
              color="blue darken-1"
              text
              @click.native="save()"
              >Join</v-btn
            >
            <v-btn
              class="btn btn-right"
              color="blue darken-1"
              text
              @click.native="cancel()"
              >Cancel</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: {
    title: String,
    showPinDialog: Boolean,
    pin: String
  },

  data() {
    return {
      msg: ""
    };
  },

  mounted() {},

  methods: {
    cancel() {
      this.$emit("update:showPinDialog", false);
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$emit("update:showPinDialog", false);
        this.$emit("update:pin", this.msg);
      }
    }
  }
};
</script>

<style scoped>
.confirm {
  position: absolute;
  top: 50px;
  border-radius: 20px;
}

.btn-grid {
  padding: 0;
  border-top: 1px ridge #1e88e5;
  height: 50px;
}

.btn-grid .btn {
  height: 100% !important;
  padding: 0 !important;
  width: 50%;
  margin: 0 !important;
  border-radius: unset;
}

.btn-left {
  border-right: 1px solid;
}
</style>
