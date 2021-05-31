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
      <b-alert
        fade
        :show="alert.dismissCountDown"
        dismissible
        variant="warning"
        v-on:dismissed="alert.dismissCountDown = 0"
        v-on:dismiss-count-down="alertCountDownChanged"
      >
        Selecione um nome válido para Assessor
      </b-alert>

      <b-form-input
        id="financialAdvisor-input"
        ref="financialAdvisorInput"
        list="advisors-list"
        v-model="profileData.financialAdvisor.fullname"
        v-on:input="getSelectedAdvisor"
        v-on:blur="validateAdvisor"
      />
      <datalist id="advisors-list">
        <option
          v-for="advisor in advisorsList"
          v-bind:key="advisor.id"
          v-bind:data-id="advisor.id"
          v-bind:data-company="advisor.company"
          v-bind:data-fullname="advisor.fullname"
          v-bind:data-register="advisor.register"
          v-bind:value="advisor.id"
          >{{ advisor.fullname }}</option
        >
      </datalist>
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
      :disabled="invalidAdvisorName"
      v-on:click="$emit('done', profileData)"
    >
      Concluir
    </b-button>
    <b-img v-show="status.registering" :src="registering" />
    <b-button id="back" v-if="showButtons" v-on:click="$emit('back')"
      >Voltar</b-button
    >
    <b-button
      id="stop"
      v-if="showButtons && !this.alreadyHasFinancialAdvisor"
      v-on:click="getSelectedAdvisor"
      >Parar</b-button
    >
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { REGISTERING } from "../constants/base64";
import { getAllAdvisors, handleError } from "../../datasource/profile";

export default {
  name: "financialAdvisor",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 18,
        acceptFinancialAdvisorContact: false,
        advisors: [],
        financialAdvisor: {
          fullname: "",
          register: "0",
          company: "",
        },
      },
      registering: REGISTERING,
      advisorId: 0,
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
      alert: {
        dismissSecs: 5,
        dismissCountDown: 0,
      },
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
    if (this.advisorData.link) {
      if (this.profileData.financialAdvisor.fullname) {
        this.doYouHaveFinancialAdvisor = true;
        this.profileData.acceptFinancialAdvisorContact = true;
        this.alreadyHasFinancialAdvisor = true;
        this.intro =
          "Que legal! Você já tem um assessor financeiro credenciado";
        this.whatIsHisNameLabel = "O nome dele é";
        this.whatIsHisCompanyLabel = "A operadora é";
      }

      this.updateAdvisorData({
        updates: {
          link: "",
        },
      });
      loadList = false;
      this.$forceUpdate();
    }
    if (loadList) {
      this.loadAdvisorsList();
    }
    this.profileData.page = 18;
  },
  updated() {
    if (!this.showButtons) {
      this.$emit("done", this.profileData);
    }
  },
  computed: {
    ...mapState("account", ["status"]),
    ...mapGetters("advisorData", ["advisorData"]),
    ...mapGetters("loginData", ["loginData"]),
    invalidAdvisorName: function() {
      return (
        (this.advisorId == 0 &&
          !this.profileData.financialAdvisor.fullname == "") ||
        (!this.advisorId == 0 &&
          this.profileData.financialAdvisor.fullname == "")
      );
    },
  },
  watch: {
    "profileData.acceptFinancialAdvisorContact": function() {
      return Boolean(this.profileData.financialAdvisor);
    },
    "profileData.financialAdvisor": function() {
      if (!this.profileData.financialAdvisor.fullname) {
        return {
          fullname: "",
          register: "0",
          company: "",
        };
      }
    },
    advisorId: function() {
      if (!this.profileData.financialAdvisor.fullname) {
        return 0;
      }
    },
    doYouHaveFinancialAdvisor: function() {
      if (this.doYouHaveFinancialAdvisor && !this.advisorsList.length) {
        this.loadAdvisorsList();
      }
    },
  },
  methods: {
    ...mapActions("advisorData", ["updateAdvisorData"]),
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
    getSelectedAdvisor: function(event) {
      this.advisorId = 0;
      const advisorInput = document.getElementById("financialAdvisor-input")
        .value;
      if (advisorInput) {
        const advisorQuerySelector = document.querySelector(
          "#advisors-list option[value='" + advisorInput + "']"
        );
        if (advisorQuerySelector) {
          this.advisorId = advisorQuerySelector.dataset.id;
          this.profileData.advisors.push(parseInt(this.advisorId));
          this.profileData.financialAdvisor.fullname =
            advisorQuerySelector.dataset.fullname;
          this.profileData.financialAdvisor.company =
            advisorQuerySelector.dataset.company;
          this.profileData.financialAdvisor.register =
            advisorQuerySelector.dataset.register;
        }
      }
    },
    validateAdvisor() {
      if (this.invalidAdvisorName) {
        this.alert.dismissCountDown = this.alert.dismissSecs;
      }
    },
    alertCountDownChanged(dismissCountDown) {
      this.alert.dismissCountDown = dismissCountDown;
      this.$refs.financialAdvisorInput.focus();
    },
    loadAdvisorsList() {
      getAllAdvisors(this.loginData.token)
        .then((data) => {
          if (data.data.getAdvisors.advisorsList) {
            this.advisorsList = data.data.getAdvisors.advisorsList;
            this.$forceUpdate();
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
