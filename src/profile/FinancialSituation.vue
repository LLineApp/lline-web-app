<template>
  <div id="main">
    <p>Sobre sua situação financeira</p>
    <Money
      :key="this.key"
      label="Qual sua despesa mensal?"
      field="monthlyExpenses"
      :fieldValue="this.profileData.monthlyExpenses"
      v-on:apply="applyValue"
    />
    <Money
      label="Gastos com dependentes"
      field="costsWithDependents"
      :fieldValue="this.profileData.costsWithDependents"
      v-on:apply="applyValue"
    />
    <Money
      label="Quanto você poupa?"
      field="howMuchYouSave"
      :fieldValue="this.profileData.howMuchYouSave"
      v-on:apply="applyValue"
    />
    <Money
      label="Tem dívidas/financiamentos?"
      field="debtLoans"
      :fieldValue="this.profileData.debtLoans"
      v-on:apply="applyValue"
    />
    <Money
      label="É sócio de empresa? (Informe o percentual, ou zero (0) caso não seja sócio)"
      field="partnerInCompany"
      :fieldValue="this.profileData.partnerInCompany"
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
    <b-button id="back" v-if="showButtons" v-on:click="$emit('back')"
      >Voltar</b-button
    >
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import Money from "../inputs/Money";

export default {
  name: "financialSituation",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      key: 0,
      profileData: {
        page: 9,
        monthlyExpenses: null,
        costsWithDependents: null,
        howMuchYouSave: null,
        debtLoans: null,
        partnerInCompany: null,
      },
    };
  },
  components: { Money },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.profileData.page = 9;
      this.key += 1;
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
</style>
