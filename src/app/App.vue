<template>
  <div>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
    <img
      id="background"
      src="https://res.cloudinary.com/tiagogbt/image/upload/v1613605064/background-white-gradient_ac6ayb.png"
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
</style>
