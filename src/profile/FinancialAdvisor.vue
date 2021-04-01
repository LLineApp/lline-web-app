<template>
  <div id="main">
    <p>{{ intro }}</p>
    <b-form-group
      label="Você tem assessor financeiro credenciado?"
      v-if="!this.alreadyHasFinancialAdvisor"
    >
      <b-form-radio-group
        id="doYouHaveFinancialAdvisor-radio"
        v-model="doYouHaveFinancialAdvisor"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group
      id="financialAdvisor-group"
      :label="whatIsHisNameLabel"
      label-for="financialAdvisor-input"
      v-if="this.doYouHaveFinancialAdvisor"
    >
      <b-form-input
        id="financialAdvisor-input"
        v-model="profileData.financialAdvisor.fullname"
        list="advisors-list"
      />
      <datalist id="advisors-list">
        <option v-bind:key="advisor.id" v-for="advisor in advisorsList[0]">{{
          advisor
        }}</option>
      </datalist>
      <p>{{ this.advisorsList }}</p>
    </b-form-group>
    <b-form-group
      id="financialAdvisorCompany-group"
      :label="whatIsHisCompanyLabel"
      label-for="financialAdvisorCompany-input"
      v-if="this.doYouHaveFinancialAdvisor"
    >
      <b-form-input
        id="financialAdvisorCompany-input"
        v-model="profileData.financialAdvisor.company"
      />
    </b-form-group>
    <b-form-group
      label="Você gostaria de receber alguma assessoria financeira profissional?"
      v-if="!this.alreadyHasFinancialAdvisor"
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
    <b-button
      id="stop"
      v-if="showButtons && !this.alreadyHasFinancialAdvisor"
      v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REGISTERING } from "../constants/base64";
import { getAdvisors, handleError } from "../../datasource/profile";

export default {
  name: "financialAdvisor",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 17,
        acceptFinancialAdvisorContact: false,
        financialAdvisor: {
          fullname: "",
          register: "0",
          company: "",
        },
      },
      alreadyHasFinancialAdvisor: false,
      doYouHaveFinancialAdvisor: false,
      intro: "Este é o último grupo de perguntas:",
      whatIsHisNameLabel: "Qual o nome dele?",
      whatIsHisCompanyLabel: "Qual a operadora?",

      advisorsListKey: 0,

      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],

      advisorsList: [],
    };
  },
  mounted() {
    let loadList = true;
    if (this.recordedData["financialAdvisor"]) {
      Object.assign(
        this.profileData.financialAdvisor,
        this.recordedData.financialAdvisor
      );
      this.intro = "";
      this.doYouHaveFinancialAdvisor = Boolean(
        this.profileData.financialAdvisor.fullname
      );
      loadList = false;
      this.$forceUpdate();
    }
    if (localStorage.getItem("advisorsLink")) {
      if (this.profileData.financialAdvisor.fullname) {
        this.doYouHaveFinancialAdvisor = true;
        this.profileData.acceptFinancialAdvisorContact = true;
        this.alreadyHasFinancialAdvisor = true;
        this.intro =
          "Que legal! Você já tem um assessor financeiro credenciado";
        this.whatIsHisNameLabel = "O nome dele é";
        this.whatIsHisCompanyLabel = "A operadora é";
      }

      localStorage.removeItem("advisorsLink");
      loadList = false;
      this.$forceUpdate();
    }
    if (loadList) {
      this.doSearch();
    }
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  watch: {
    "profileData.acceptFinancialAdvisorContact": function() {
      return Boolean(this.profileData.financialAdvisor);
    },
    "profileData.financialAdvisor.fullname": function() {
        this.doSearch();
    },
  },
  methods: {
    setLabelsToAdvisorsLink: function() {
      this.intro = "Que legal! Você já tem um assessor financeiro crendenciado";
      this.whatIsHisNameLabel = "O nome dele é";
      this.whatIsHisCompanyLabel = "A operadora é";
    },
    setLabelsToFilledByAdvisor: function() {
      this.intro = "Assessor financeiro crendenciado";
      this.whatIsHisNameLabel = "Nome";
      this.whatIsHisCompanyLabel = "Operadora";
    },


    doSearch() {
      getAdvisors(1, this.profileData.financialAdvisor.fullname)
        .then((data) => {
          if (data.data.getAdvisors.advisorsList) {
            this.advisorsList.splice(0, Number.MAX_VALUE, data.data.getAdvisors.advisorsList);
            // this.advisorsListKey += 1;
            // this.$forceUpdate();
          }
        })
        .catch((error) => {
          handleError(error.graphQLErrors[0].message);
        });
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
