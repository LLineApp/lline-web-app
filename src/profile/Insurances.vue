<template>
  <div id="main">
    <h1>Seguros</h1>
    <div id="subtitle">
      <p id="kind">Tipo</p>
      <p id="value">Valor</p>
      <p id="monthlyFee">Con. Mensalmente</p>
      <p id="coverage">Cobertura</p>
      <p id="company">Compania</p>
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
    <b-img v-show="status.registering" :src="registering" />
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";
import Insurance from "../profile/Insurance";
import { INSURANCE_OPTIONS } from "../constants/arrays";

export default {
  name: "insurances",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      key: 0,
      insurancesOptions: INSURANCE_OPTIONS,
      registering: REGISTERING,
      profileData: {
        page: 10,
        insurances: [],
      },
    };
  },
  components: { Insurance },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.$forceUpdate();
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    addInsurance() {
      const newKey = this.profileData.insurances.length;
      const newInsurance = {
        key: newKey,
        value: null,
        monthlyFee: true,
        coverage: null,
        company: "",
      };
      this.profileData.insurances.push(newInsurance);
    },
    applyInsurance(insuranceData) {
      for (var i in this.profileData.insurances) {
        if (this.profileData.insurances[i].key == insuranceData.key) {
          this.profileData.insurances[i] = insuranceData;
          break;
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
}
#stop,
#success {
  margin-right: 1%;
  font-size: 17pt;
}
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
#value, #coverage {
  width: 13%;
}
#monthlyFee{
  width: 21%;
}
#company{
  width: 30%;
}
#subtitle{
  height: 40px;
}
</style>

