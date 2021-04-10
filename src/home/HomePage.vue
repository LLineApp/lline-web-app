<template>
  <div :key="this.key">
    <NavBar />
    <Profile
      v-if="this.userData.page < this.profilePages"
      v-on:paging="updatePage"
    />
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import Profile from "../profile/Profile";
import { getSomeFieldsFromProfile, handleError } from "../../datasource/profile";

export default {
  name: "home",
  components: { NavBar, Profile },
  data() {
    return {
      key: 0,
      profilePages: 19,
      userData: {
        page: 0,
        fullname: "Usuário",
        isAdvisor: false,
      },
    };
  },
  mounted() {
    getSomeFieldsFromProfile(['page', 'fullname', "isAdvisor"])
      .then((data) => {
        if (data.data.getProfile[0]) {
          this.userData.page = data.data.getProfile[0].page || 0;
          this.userData.fullname = data.data.getProfile[0].fullname || "Usuário";
          this.userData.isAdvisor = data.data.getProfile[0].isAdvisor;
          localStorage.setItem("userData", JSON.stringify(this.userData));
          this.key += 1;
          this.$forceUpdate();
        }
      })
      .catch((error) => {
        handleError(error.graphQLErrors[0].message);
      });
  },
  methods: {
    updatePage(page) {
      this.userData.page = page;
      this.key += 1;
    },
  },
};
</script>

<style scoped></style>
