<template>
  <div id="main">
    <h1>Previdências Privadas</h1>

    <ul id="personalPrivateSecurities">
      <li
        v-for="personalPrivateSecurity in this.profileData
          .personalPrivateSecurities"
        :key="personalPrivateSecurity.key"
      >
        <PersonalPrivateSecurity
          v-bind:personalPrivateSecurityData="personalPrivateSecurity"
          v-on:apply="applyPersonalPrivateSecurity"
          v-on:remove="removePersonalPrivateSecurity"
        />
      </li>
    </ul>
    <p>
      Clique
      <b-button
        type="button"
        aria-label="Close"
        v-on:click="addPersonalPrivateSecurity()"
        aria-hidden="true"
        ><i class="fa fa-plus"></i
      ></b-button>
      para adicionar outra previdência privada
    </p>
    <b-button
      id="success"
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Confirmar
    </b-button>
    <b-button id="back" v-if="showButtons" v-on:click="$emit('back')"
      >Voltar</b-button
    >
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import PersonalPrivateSecurity from "../profile/PersonalPrivateSecurity";

export default {
  name: "personalPrivateSecurities",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 12,
        personalPrivateSecurities: [
          {
            key: 0,
            bank: "",
            enterprise: false,
            cooperative: false,
            survival: "",
            table: "",
            balance: null,
          },
        ],
      },
    };
  },
  components: { PersonalPrivateSecurity },
  mounted() {
    if (this.recordedData) {
      Object.assign(
        this.profileData.personalPrivateSecurities,
        this.recordedData.personalPrivateSecurities
      );
    }
    this.$emit("setActiveComponent", this.$options.name);
    this.profileData.page = 12;
    this.$forceUpdate();
  },
  updated() {
    if (!this.showButtons) {
      this.$emit("done", this.profileData);
    }
  },
  methods: {
    addPersonalPrivateSecurity() {
      const newKey = this.profileData.personalPrivateSecurities.length;
      const newPersonalPrivateSecurity = {
        key: newKey,
        bank: "",
        enterprise: "",
        cooperative: "",
        survival: "",
        table: "",
        balance: null,
      };
      this.profileData.personalPrivateSecurities.push(
        newPersonalPrivateSecurity
      );
    },
    applyPersonalPrivateSecurity(personalPrivateSecurityData) {
      for (var i in this.profileData.personalPrivateSecurities) {
        if (
          this.profileData.personalPrivateSecurities[i].key ==
          personalPrivateSecurityData.key
        ) {
          this.profileData.personalPrivateSecurities[
            i
          ] = personalPrivateSecurityData;
          break;
        }
      }
    },
    removePersonalPrivateSecurity(personalPrivateSecurityData) {
      var remainingPersonalPrivateSecurities = this.profileData.personalPrivateSecurities.filter(
        function(value) {
          return value != personalPrivateSecurityData;
        }
      );
      this.profileData.personalPrivateSecurities = remainingPersonalPrivateSecurities;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

p {
  font-size: 17pt;
}
h1 {
  font-size: 20pt;
}
* {
  font-family: "Raleway", sans-serif;
  font-size: 15pt;
}
#stop,
#back,
#success {
  margin-right: 1%;
  font-size: 17pt;
}
#back,
#stop {
  background-color: gray;
  border-color: gray;
  color: black;
}
#main {
  margin-bottom: 5%;
}
button,
#success {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
button:hover,
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
#success {
  margin-left: 3.5%;
  padding: 2%, 2%;
}
</style>
