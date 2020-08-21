<template>
  <v-progress-circular
    indeterminate
    color="primary"
    v-show="show"
  ></v-progress-circular>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },

  methods: {
    show() {
      this.show = true;
    },

    hide() {
      this.show = false;
    }
  }
};
</script>
