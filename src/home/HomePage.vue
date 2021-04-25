<template>
  <div :key="this.key">
    <NavBar :key="this.keyNavBar"/>
    <Profile
      v-if="this.userData.page < this.profilePages"
      v-bind:currentPage="userData.page"
      v-on:paging="updatePage"
    />
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import Profile from "../profile/Profile";
import {
  getSomeFieldsFromProfile,
  handleError,
} from "../../datasource/profile";

export default {
  name: "home",
  components: { NavBar, Profile },
  data() {
    return {
      key: 0,
      keyNavBar:0,
      profilePages: 19,
      userData: {
        page: 0,
        fullname: "Usuário",
        isAdvisor: false,
      },
    };
  },
  mounted() {
    if (this.$cookies.get("token")) {
    getSomeFieldsFromProfile(this.$cookies.get("token"), ["page", "fullname", "isAdvisor"])
      .then((data) => {
        const userData = data.data.getProfile[0];
        if (userData) {
          this.userData.page = userData.page || 0;
          this.userData.fullname = userData.fullname || "Usuário";
          this.userData.isAdvisor = userData.isAdvisor;
          sessionStorage.setItem("userData", JSON.stringify(this.userData));
          this.key += 1;
          this.$forceUpdate();
        }
      })
      .catch((error) => {
        handleError(error.graphQLErrors[0].message);
      });
    }
  },
  methods: {
    updatePage(page) {
      this.userData.page = page;
      this.key += 1;
      this.keyNavBar += 1;
    },
  },
};
</script>
