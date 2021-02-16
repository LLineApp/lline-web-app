<template>
  <div>
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
      label="Você gostaria de receber ???????? de um assessor financeiro?"
    >
      <b-form-radio-group
        id="doYouAcceptAFinancialAdvisorContact-radio"
        v-model="profileData.acceptFinancialAdvisorContact"
        :options="yesNo"
      />
    </b-form-group>
    <b-button
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Concluir
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button v-if="showButtons" v-on:click="$emit('stop')">Parar</b-button>
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
