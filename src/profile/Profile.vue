<template>
  <div id="main">
    <SideMenu
      v-if="this.profileData.accepted"
      v-bind:activeComponentName="activeComponentName"
    />
    <div id="dados-div">
      <Intro
        :key="this.key"
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
        v-else-if="
          !this.profileData.hasOwnProperty('parentsAreThemSupportedByYou')
        "
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.parentsAreThemSupportedByYou"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Marital
        v-else-if="!this.profileDataHasProp('maritalStatus')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.maritalStatus"
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
        v-else-if="!this.profileData.hasOwnProperty('monthlyExpenses')"
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
        v-else-if="!this.profileData.hasOwnProperty('additionalInfo')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.additionalInfo"
        v-bind:showButtons="true"
        v-on:setActiveComponent="setActiveComponent"
      />
      <FinancialAdvisor
        v-else-if="!this.profileDataHasProp('financialAdvisor')"
        v-on:done="feedProfileData"
        v-on:stopped="delete profileData.financialAdvisor"
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
import { getProfile, setProfile } from "../../datasource/profile";
import SideMenu from "../profile/SideMenu";

export default {
  name: "profile",
  data() {
    return {
      key: 0,
      profileData: {
        accepted: false,
        email: "",
      },
      activeComponentName: "",
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
    getProfile()
      .then((data) => {
        if (data.data.getProfile[0]) {
          const rawData = data.data.getProfile[0];
          for (var key in rawData) {
            if (rawData[key] != null) {
              this.profileData[key] = rawData[key];
            }
          }
          this.profileData.accepted = this.profileData.hasOwnProperty("cpf");
          delete this.profileData["cpf"];
          this.key += 1;
        }
      })
      .catch((error) => {
        const message = error.graphQLErrors[0].message;
        const options = {
          position: "top-center",
          duration: 4000,
          fullWidth: true,
          closeOnSwipe: true,
        };

        this.$toasted.error(message, options);
      });
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

      setProfile(portionProfileData);
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
    },
  },
};
</script>

<style>
ul {
  list-style-type: none;
}
</style>
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
