<template>
  <div class="container">
    <p>Formulário de dados</p>
    <Intro
      v-if="!this.profileData.accepted"
      v-on:didAccept="profileData.accepted = true"
      v-on:didNotAccept="profileData.accepted = false"
    />
    <Email
      v-else-if="this.profileData.email == ''"
      v-on:done="feedProfileData"
      v-on:stopped="profileData.email = ''"
      v-bind:showButtons="true"
    />
    <Parents
      v-else-if="!this.profileDataHasProp('parents')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.parents"
      v-bind:showButtons="true"
    />
    <Marital
      v-else-if="!this.profileDataHasProp('marital')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.marital"
      v-bind:showButtons="true"
    />
    <Children
      v-else-if="!this.profileDataHasProp('children')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.children"
      v-bind:showButtons="true"
    />
    <ProfessionalSituation
      v-else-if="!this.profileDataHasProp('occupation')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.occupation"
      v-bind:showButtons="true"
    />
    <ImmovableProperties
      v-else-if="!this.profileDataHasProp('immovableProperties')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.immovableProperties"
      v-bind:showButtons="true"
    />
    <Health
      v-else-if="!this.profileDataHasProp('health')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.health"
      v-bind:showButtons="true"
    />
    <FinancialSituation
      v-else-if="!this.profileDataHasProp('monthlyExpenses')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.monthlyExpenses"
      v-bind:showButtons="true"
    />
    <InvestorExperiences
      v-else-if="!this.profileDataHasProp('investorExperiences')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.investorExperiences"
      v-bind:showButtons="true"
    />
    <Insurances
      v-else-if="!this.profileDataHasProp('insurances')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.insurances"
      v-bind:showButtons="true"
    />
    <PersonalPrivateSecurities
      v-else-if="!this.profileDataHasProp('personalPrivateSecurities')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.personalPrivateSecurities"
      v-bind:showButtons="true"
    />
    <PlansAndProjects
      v-else-if="!this.profileDataHasProp('plansAndProjects')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.plansAndProjects"
      v-bind:showButtons="true"
    />
    <InvestmentPortfolios
      v-else-if="!this.profileDataHasProp('investmentPortfolios')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.investmentPortfolios"
      v-bind:showButtons="true"
    />
    <FixedIncomeSecurities
      v-else-if="!this.profileDataHasProp('fixedIncomeSecurities')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.fixedIncomeSecurities"
      v-bind:showButtons="true"
    />
    <Knowledge
      v-else-if="!this.profileDataHasProp('currentInvestmentProcess')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.currentInvestmentProcess"
      v-bind:showButtons="true"
    />
    <AdditionalInformations
      v-else-if="!this.profileDataHasProp('additionalInformations')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.additionalInformations"
      v-bind:showButtons="true"
    />
    <FinancialAdvisor
      v-else-if="!this.profileDataHasProp('financialAdvisor')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.financialAdvisor"
      v-bind:showButtons="true"
    />
  </div>
</template>

<script>
import Email from "../profile/Email";
import Intro from "../profile/Intro";
import Parents from "../profile/Parents";
import Marital from "../profile/Marital";
import Children from "../profile/Children";
import ProfessionalSituation from "../profile/ProfessionalSituation";
import ImmovableProperties from "../profile/ImmovableProperties";
import FinancialSituation from "../profile/FinancialSituation";
import InvestorExperiences from "../profile/InvestorExperiences";
import Insurances from "../profile/Insurances";
import PersonalPrivateSecurities from "../profile/PersonalPrivateSecurities";
import PlansAndProjects from "../profile/PlansAndProjects";
import Health from "../profile/Health";
import FixedIncomeSecurities from "../profile/FixedIncomeSecurities";
import InvestmentPortfolios from "../profile/InvestmentPortfolios";
import Knowledge from "./Knowledge.vue";
import AdditionalInformations from "../profile/AdditionalInformations";
import FinancialAdvisor from "../profile/FinancialAdvisor";

export default {
  data() {
    return {
      profileData: {
        accepted: false,
        email: "",
      },
    };
  },
  created() {
    const data = JSON.parse(sessionStorage.getItem("profileData"));
    if (data) {
      this.profileData = data;
    }
  },
  components: {
    Intro,
    Email,
    Parents,
    Marital,
    Children,
    ProfessionalSituation,
    ImmovableProperties,
    FinancialSituation,
    InvestorExperiences,
    Insurances,
    PersonalPrivateSecurities,
    PlansAndProjects,
    Health,
    FixedIncomeSecurities,
    InvestmentPortfolios,
    Knowledge,
    AdditionalInformations,
    FinancialAdvisor,
  },
  watch: {
    profileData: function() {
      sessionStorage.setItem("profileData", JSON.stringify(this.profileData));
    },
  },
  methods: {
    feedProfileData(portionProfileData) {
      const data = { ...this.profileData, ...portionProfileData };
      this.profileData = data;
    },
    profileDataHasProp(prop) {
      if (this.profileData.hasOwnProperty(prop)) {
        return Object.keys(this.profileData[prop]).length != 0;
      } else {
        return false;
      }
    },
  },
};
</script>
