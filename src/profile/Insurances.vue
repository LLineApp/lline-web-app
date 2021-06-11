<template>
  <div id="main">
    <h1>Seguros</h1>
    <div id="subtitle" class="container">
      <p id="kind"><br />Tipo</p>
      <p id="value"><br />Valor</p>
      <p id="monthlyFee">Con. Mensal</p>
      <p id="coverage"><br />Cobertura</p>
      <p id="company"><br />Companhia</p>
    </div>
    <div id="insurances">
      <Insurance
        v-for="insurance in insurancesOptions"
        v-bind:key="insurance + key"
        v-bind:kind="insurance"
        v-bind:insuranceData="profileData.Insurances"
        v-on:apply="applyInsurance"
      />
    </div>
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
import Insurance from "../profile/Insurance";
import { INSURANCE_OPTIONS } from "../constants/arrays";

export default {
  name: "insurances",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      key: 0,
      insurancesOptions: INSURANCE_OPTIONS,
      profileData: {
        page: 11,
        insurances: [],
      },
    };
  },
  components: { Insurance },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.profileData.page = 11;
      this.$forceUpdate();
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  updated() {
    if (!this.showButtons) {
      this.$emit("done", this.profileData);
    }
  },
  methods: {
    applyInsurance(insurance) {
      if (insurance.value > 0) {
        this.addOrUpdateInsurance(insurance);
      } else {
        this.removeInsurance(insurance.kind);
      }
    },
    addOrUpdateInsurance(insurance) {
      for (var i in this.profileData.insurances) {
        if (this.profileData.insurances[i].kind == insurance.kind) {
          this.profileData.insurances[i] = insurance;
          return;
        }
      }
      this.profileData.insurances.push(insurance);
    },
    removeInsurance(kind) {
      for (var i in this.profileData.insurances) {
        if (this.profileData.insurances[i].kind == kind) {
          this.profileData.insurances.splice(i, 1);
        }
      }
    },
  },
};
</script>
<style scoped>
h1 {
  font-size: 20pt;
}
* {
  font-family: "Raleway", sans-serif;
  font-size: 15pt;
}
p {
  font-size: 12pt;
  float: left;
  margin-bottom: 0;
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
  padding: 2%, 2%;
}
#kind {
  width: 23%;
}
#value {
  width: 16.5%;
}
#coverage {
  width: 17%;
}
#monthlyFee {
  width: 10%;
}
#company {
  width: 30%;
}
#subtitle {
  overflow: hidden;
  padding: 0;
}
</style>
