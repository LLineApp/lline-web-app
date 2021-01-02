<template>
  <div class="container">
    <p>Formulário de dados</p>
    <Intro
      v-if="!this.profileData.accepted"
      v-on:didAccept="profileData.accepted = true"
      v-on:didNotAccept="profileData.accepted = false"
    ></Intro>
    <Email
      v-else-if="this.profileData.email == ''"
      v-on:done="feedProfileData"
      v-on:stopped="profileData.email = ''"
    >
    </Email>
  </div>
</template>


<script>
import Email from "../profile/Email";
import Intro from "../profile/Intro";

export default {
  data() {
    return {
      profileData: {
        accepted: false,
        email: "",
      },
    };
  },
  created() {
    const data = JSON.parse(sessionStorage.getItem("profileData"));
    if (data) {
      this.profileData = data;
    }
  },
  components: { Intro, Email },
  watch: {
    profileData: function () {
      sessionStorage.setItem("profileData", JSON.stringify(this.profileData));
    },
  },
  methods: {
    feedProfileData(portionProfileData) {
      const data = { ...this.profileData, ...portionProfileData };
      this.profileData = data;
    },
  },
};
</script> 