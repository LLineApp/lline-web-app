<template>
  <div id="main">
    <SideMenu v-if="this.profileData.accepted" v-bind:activeComponentName="activeComponentName"/>
    <div id="dados-div">
      <Intro
        v-if="!this.profileData.accepted"
        v-on:didAccept="profileData.accepted = true"
        v-on:didNotAccept="profileData.accepted = false"
      />
      <Email
        v-else-if="this.profileData.email == ''"
        v-on:done="feedProfileData"
        v-on:stopped="profileData.email = ''"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Parents
        v-else-if="!this.profileDataHasProp('parents')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.parents"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Marital
        v-else-if="!this.profileDataHasProp('marital')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.marital"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Children
        v-else-if="!this.profileDataHasProp('children')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.children"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <ProfessionalSituation
        v-else-if="!this.profileDataHasProp('occupation')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.occupation"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <ImmovableProperties
        v-else-if="!this.profileDataHasProp('immovableProperties')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.immovableProperties"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Health
        v-else-if="!this.profileDataHasProp('health')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.health"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <FinancialSituation
        v-else-if="!this.profileDataHasProp('monthlyExpenses')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.monthlyExpenses"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <InvestorExperiences
        v-else-if="!this.profileDataHasProp('investorExperiences')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.investorExperiences"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Insurances
        v-else-if="!this.profileDataHasProp('insurances')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.insurances"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <PersonalPrivateSecurities
        v-else-if="!this.profileDataHasProp('personalPrivateSecurities')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.personalPrivateSecurities"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <PlansAndProjects
        v-else-if="!this.profileDataHasProp('plansAndProjects')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.plansAndProjects"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <InvestmentPortfolios
        v-else-if="!this.profileDataHasProp('investmentPortfolios')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.investmentPortfolios"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <FixedIncomeSecurities
        v-else-if="!this.profileDataHasProp('fixedIncomeSecurities')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.fixedIncomeSecurities"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Knowledge
        v-else-if="!this.profileDataHasProp('currentInvestmentProcess')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.currentInvestmentProcess"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <AdditionalInformations
        v-else-if="!this.profileDataHasProp('additionalInformations')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.additionalInformations"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <FinancialAdvisor
        v-else-if="!this.profileDataHasProp('financialAdvisor')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.financialAdvisor"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
    </div>
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
import SideMenu from "../profile/SideMenu";

export default {
  name: "profile",
  data() {
    return {
      profileData: {
        accepted: false,
        email: "",
      },
      activeComponentName:"",
    };
  },
  updated() {
    var dDiv = document.getElementById("dados-div");
    if (this.profileData.accepted) {
      dDiv.style.width = "80%";
    } else {
      dDiv.style.width = "100%";
    }
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
    SideMenu,
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
    setActiveComponent(name) {
      this.activeComponentName = name;
    }
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
#main {
  width: 100%;
  padding-inline: 5%;
}
#dados-div {
  width: 100%;
  float: right;
  padding-top: 5%;
}
</style>
