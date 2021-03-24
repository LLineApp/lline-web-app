<template>
  <div id="main">
    <div id="congrats-div">
      <h1 id="congrats-h1">{{ this.title }}</h1>
    </div>
    <p>
      {{ this.message }}
    </p>
    <br />
    <b-button
      id="goto-profilesheet"
      class="btn btn-primary"
      v-on:click="routeToProfileSheet"
      v-if="!this.filledByAdvisor"
    >
      Revisar meu perfil
    </b-button>
    <b-button
      id="goto-home"
      class="btn btn-primary"
      v-on:click="routeToHome"
      v-if="!this.filledByAdvisor"
    >
      Ir para a tela principal
    </b-button>
  </div>
</template>

<script>
export default {
  name: "congrats",
  props: ["filledByAdvisor"],
  data() {
    return {
      title: "Parabéns",
      message: "Você concluiu o questionário (melhorar)",
    };
  },

  mounted() {
      this.title = "Concluído";
      this.message = "O questionário foi devidamente preenchido. Solicite ao seu cliente que ele abra uma conta na LLine usando o CPF dele como login.";
  },
  methods: {
    routeToHome() {
      this.$emit("done", { page: 18 });
      this.$router.go();
    },
    routeToProfileSheet() {
      this.$emit("done", { page: 18 });
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
p {
  font-size: 20pt;
}
* {
  font-family: "Raleway", sans-serif;
  font-size: 15pt;
}
#main {
  margin-bottom: 5%;
}
#congrats-div {
  width: 100%;
  float: right;
}
#congrats-h1 {
  text-align: center;
  color: black;
  font-size: 60pt;
  padding-top: 4%;
}
#goto-profilesheet,
#goto-home {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
  margin-top: 1%;
  margin-right: 1%;
}
#goto-profilesheet:hover,
#goto-home:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}
</style>
