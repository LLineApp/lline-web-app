<template>
  <div :key="this.key">
    <NavBar :key="this.keyNavBar" />
    <Chart />
    <Profile
      v-if="this.profileData.page < this.profilePages"
      v-bind:currentPage="profileData.page"
      v-on:paging="updatePage"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getProfile, handleError } from "../../datasource/profile";

export default {
  name: "home",
  components: {
    NavBar: require("../navbar/NavBar").default,
    Profile: require("../profile/Profile").default,
    Chart: require("../home/Chart").default,
  },
  data() {
    return {
      key: 0,
      keyNavBar: 0,
      profilePages: 19,
    };
  },
  computed: {
    ...mapGetters("profileData", ["profileData"]),
    ...mapGetters("loginData", ["loginData"]),
  },
  mounted() {
    getProfile(this.loginData.token, this.loginData.cpf)
      .then((data) => {
        if (data.data.getProfile[0]) {
          this.updateProfileData({ updates: data.data.getProfile[0] });
          this.key += 1;
        }
      })
      .catch((error) => {
        handleError(error.graphQLErrors[0].message);
      });
  },
  methods: {
    ...mapActions("profileData", ["updateProfileData"]),

    updatePage(page) {
      this.updateProfileData({
        updates: {
          page: page,
        },
      });
      this.key += 1;
      this.keyNavBar += 1;
    },
  },
};
</script>
