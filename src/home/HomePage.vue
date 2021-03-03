<template>
  <div>
    <NavBar />    
    <Profile />
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import Profile from "../profile/Profile";

export default {
  name: "home",
  components: { NavBar, Profile },
};
</script>

<style scoped>

</style>
