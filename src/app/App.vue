<template>
  <div>
    <img
      id="background"
      src="https://res.cloudinary.com/tiagogbt/image/upload/v1613332779/background-back-gradient_hwoosu.png"
      alt=""
    />
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
  },
  watch: {
    $route(to, from) {
      this.clearAlert();
    },
  },
};
</script>

<style scoped>
#background {
  position: fixed;
  z-index: -1;
  transform: translate(-1px, -1px);
}
</style>
