<template>
  <div>
    <div id="welcome-div">
      <h1 id="welcome-h1">Nossas boas-vindas a você!</h1>
      <p id="welcome-p">Agora você faz parte do LLine</p>
    </div>
    <p>
      Olá! É um prazer ter você conosco no Lline!<br />Ainda não sabemos muito
      sobre você, então, para que possamos estruturar sua <b>Linha da Vida</b>,
      precisamos de mais informações a seu respeito. Entendemos que esses dados
      são pessoais e delicados, mas tudo o que for submetido aqui está protegido
      por sigilo bancário, porém eles influenciam diretamente no cálculo da sua
      <b>Linha da Vida</b>.
      <br />
      <button
        id="success"
        class="btn btn-primary"
        v-on:click="$emit('didAccept')"
      >
        OK, vamos começar
      </button>
      <button
        id="stop"
        class="btn btn-secondary"
        v-on:click="$emit('didNotAccept')"
      >
        Não quero
      </button>
    </p>
  </div>
</template>

<script>
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  name: "intro",
  data() {
    return {
      profileData: {
        accepted: false,
      },
    };
  },
  methods: {
    handleAccept(e) {
      this.profileData.accepted = true;
    },
    handleDontAccept(e) {
      this.profileData.accepted = false;
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Raleway", sans-serif;
  font-size: 15pt;
}
#welcome-div {
  width: 100%;
  float: right;
}
#welcome-h1,
#welcome-p {
  text-align: center;
  color: black;
}
#welcome-h1 {
  font-size: 60pt;
  padding-top: 4%;
}
#welcome-p {
  font-size: 30pt;
  padding-bottom: 2%;
}
#success {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
  margin-top: 1%;
  margin-right: 1%;
}
#success:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}
#stop:hover {
  color: red;
  background-color: black;
  border-color: black;
}
#stop {
  background-color: gray;
  border-color: gray;
  color: black;
  margin-top: 1%;
}
</style>
