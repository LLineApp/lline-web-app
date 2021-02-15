<template>
  <div>
    <NavBar />
    <h1 id="welcome-h1">Bem vindo!</h1>
    <p id="welcome-p">Agora você faz parte da LLine</p>
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
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

#welcome-h1,
#welcome-p {
  font-family: "Raleway", sans-serif;
  text-align: center;
  padding-top: 5%;
  color: #26fed5;
}
#welcome-h1{
  font-size: 48pt;
}
#welcome-p{
  font-size: 24pt;
}
</style>>

