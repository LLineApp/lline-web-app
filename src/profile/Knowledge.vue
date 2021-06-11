<template>
  <div id="main">
    <p>Conhecimento</p>
    <Memo
      :key="this.profileData.currentInvestmentProcess"
      label="Como é o seu processo de investimento hoje?"
      fieldName="currentInvestmentProcess"
      :text="this.profileData.currentInvestmentProcess"
      v-on:apply="applyValue"
      placeholder=""
    />
    <b-form-group label="Acompanha noticiário econômico?">
      <b-form-radio-group
        id="followEconomicNews-radio-group"
        v-model="profileData.followEconomicNews"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group label="Gostaria de ser informado sobre cursos e palestras?">
      <b-form-radio-group
        id="acceptsInfoAboutCourses-radio-group"
        v-model="profileData.acceptsInfoAboutCourses"
        :options="yesNo"
      />
    </b-form-group>
    <Memo
      :key="this.profileData.haveFinancialConcerns"
      label="Você tem alguma preocupação financeira?"
      fieldName="haveFinancialConcerns"
      :text="this.profileData.haveFinancialConcerns"
      v-on:apply="applyValue"
      placeholder=""
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
import Memo from "../inputs/Memo";

export default {
  name: "knowledge",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 16,
        currentInvestmentProcess: "",
        followEconomicNews: null,
        acceptsInfoAboutCourses: null,
        haveFinancialConcerns: null,
      },
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
    };
  },
  components: { Memo },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.profileData.page = 16;
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
#success {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
#back:hover,
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
