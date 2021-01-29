<template>
  <div>
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from '../footer/Footer.vue';
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
  components: { Footer },
};
</script>
