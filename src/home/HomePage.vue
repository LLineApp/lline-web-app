<template>
  <div>
    <NavBar />
    <h1>Bem vindo!</h1>
    <p>Agora você faz parte do LLine</p>
    <Profile />
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import Profile from "../profile/Profile";

export default {
  components: { NavBar, Profile },
};
</script>
