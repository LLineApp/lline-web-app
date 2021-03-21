<template>
  <div :key="this.key">
    <NavBar />
    <Profile
      v-if="this.profileData.page < this.profilePages"
      v-on:paging="updatePage"
    />
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import Profile from "../profile/Profile";
import { getProfilePage, handleError } from "../../datasource/profile";

export default {
  name: "home",
  components: { NavBar, Profile },
  data() {
    return {
      key: 0,
      profilePages: 18,
      profileData: {
        page: 0,
      },
    };
  },
  mounted() {
    getProfilePage()
      .then((data) => {
        if (data.data.getProfile[0]) {
          this.profileData.page = data.data.getProfile[0].page || 0;
          this.key += 1;
        }
      })
      .catch((error) => {
        handleError(error.graphQLErrors[0].message);
      });
  },
  methods: {
    updatePage(page) {
      this.profileData.page = page;
      this.key += 1;
    },
  },
};
</script>

<style scoped></style>
