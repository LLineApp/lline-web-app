<template>
  <div id="main">
    <p>{{ intro }}</p>
    <b-form-group label="Você tem assessor financeiro credenciado?">
      <b-form-radio-group
        id="doYouHaveFinancialAdvisor-radio"
        v-model="doYouHaveFinancialAdvisor"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group
      id="financialAdvisor-group"
      label="Qual o nome dele?"
      label-for="financialAdvisor-input"
      v-if="this.doYouHaveFinancialAdvisor"
    >
      <b-form-input
        id="financialAdvisor-input"
        v-model="profileData.financialAdvisor.fullName"
      />
    </b-form-group>
    <b-form-group
      id="financialAdvisorCompany-group"
      label="Qual a operadora?"
      label-for="financialAdvisorCompany-input"
      v-if="this.doYouHaveFinancialAdvisor"
    >
      <b-form-input
        id="financialAdvisorCompany-input"
        v-model="profileData.financialAdvisor.company"
      />
    </b-form-group>
    <b-form-group
      label="Você gostaria de receber alguma acessoria financeira profisional?"
    >
      <b-form-radio-group
        id="doYouAcceptAFinancialAdvisorContact-radio"
        v-model="profileData.acceptFinancialAdvisorContact"
        :options="yesNo"
      />
    </b-form-group>
    <b-button
      id="success"
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Concluir
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REGISTERING } from "../constants/base64";

export default {
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        financialAdvisor: {
          fullName: "",
          company: "",
        },
        acceptFinancialAdvisorContact: false,
      },
      doYouHaveFinancialAdvisor: false,
      intro: "Este é o último grupo de perguntas:",

      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
    };
  },
  created() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.intro = "";
      this.doYouHaveFinancialAdvisor = Boolean(
        this.profileData.financialAdvisor.fullName
      );
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  watch() {
    profileData.acceptFinancialAdvisorContact = Boolean(
      this.profileData.financialAdvisor
    );
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
