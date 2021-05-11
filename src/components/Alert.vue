<template>
  <b-alert
    fade
    :show="dismissCountDown"
    dismissible
    :variant="variant"
    v-on:dismissed="dismissCountDown = 0"
    v-on:dismiss-count-down="alertCountDownChanged"
  >
    <slot />
  </b-alert>
</template>

<script>
export default {
  props: ["variant", "showAlert"],
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  watch: {
    showAlert: function() {
      if (this.showAlert) {
        this.dismissCountDown = this.dismissSecs;
        this.$emit("update:showAlert", false);
      }
    },
  },
  methods: {
    alertCountDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
};
</script>

<style></style>
