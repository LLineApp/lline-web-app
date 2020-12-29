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
      v-on:done="setProfileData(profileData)"
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
  components: { Intro, Email },
  computed: {
    setProfileData(profileData) {
      this.profileData = profileData;
    },
  },
};
</script> 