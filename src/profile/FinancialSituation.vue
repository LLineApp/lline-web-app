<template>
  <div id="main">
    <p>Sobre sua situação financeira</p>
    <Money
      label="Qual sua despesa mensal?"
      field="monthlyExpenses"
      v-on:apply="applyValue"
    />
    <Money
      label="Gastos com dependentes"
      field="costsWithDependents"
      v-on:apply="applyValue"
    />
    <Money
      label="Quanto você poupa?"
      field="howMuchYouSave"
      v-on:apply="applyValue"
    />
    <Money
      label="Tem dívidas/financiamentos?"
      field="debtsLoans"
      v-on:apply="applyValue"
    />
    <Money
      label="É sócio de empresa? (Informe o percentual, ou zero (0) caso não seja sócio)"
      field="partnerInACompany"
      v-on:apply="applyValue"
    />
    <b-button
      id="success"
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Confirmar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";
import Money from "../inputs/Money";

export default {
  name: "financialSituation",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        monthlyExpenses: null,
        costsWithDependents: null,
        howMuchYouSave: null,
        debtsLoans: null,
        partnerInACompany: null,
      },
    };
  },
  components: { Money },
  created() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    applyValue(property, value) {
      this.profileData[property] = value;
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
#stop,
#success {
  margin-right: 1%;
  font-size: 17pt;
}
#stop {
  background-color: red;
  border-color: red;
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
</style>
