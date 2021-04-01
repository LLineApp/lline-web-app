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
        v-on:didNotAccept="doStop('accepted')"
      />
      <Email
        v-else-if="this.profileData.email == ''"
        v-on:done="feedProfileData"
        v-on:stop="doStop('email')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:filledByAdvisor="this.filledByAdvisor"
      />
      <Parents
        v-else-if="
          !this.profileData.hasOwnProperty('parentsAreThemSupportedByYou')
        "
        v-on:done="feedProfileData"
        v-on:stop="doStop('parentsAreThemSupportedByYou')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Marital
        v-else-if="!this.profileDataHasProp('maritalStatus')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('maritalStatus')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Children
        v-else-if="!this.profileDataHasProp('children')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('children')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <ProfessionalSituation
        v-else-if="!this.profileDataHasProp('occupation')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('occupation')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <ImmovableProperties
        v-else-if="!this.profileDataHasProp('immovableProperties')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('immovableProperties')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Health
        v-else-if="!this.profileDataHasProp('health')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('health')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <FinancialSituation
        v-else-if="!this.profileData.hasOwnProperty('monthlyExpenses')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('monthlyExpenses')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <InvestorExperiences
        v-else-if="!this.profileDataHasProp('investorExperiences')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('investorExperiences')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Insurances
        v-else-if="!this.profileDataHasProp('insurances')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('insurances')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <PersonalPrivateSecurities
        v-else-if="!this.profileDataHasProp('personalPrivateSecurities')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('personalPrivateSecurities')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <PlansAndProjects
        v-else-if="!this.profileDataHasProp('plansAndProjects')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('plansAndProjects')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <InvestmentPortfolios
        v-else-if="!this.profileDataHasProp('investmentPortfolios')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('investmentPortfolios')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <FixedIncomeSecurities
        v-else-if="!this.profileDataHasProp('fixedIncomeSecurities')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('fixedIncomeSecurities')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <Knowledge
        v-else-if="!this.profileDataHasProp('currentInvestmentProcess')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('currentInvestmentProcess')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <AdditionalInformations
        v-else-if="!this.profileData.hasOwnProperty('additionalInfo')"
        v-on:done="feedProfileData"
        v-on:stop="doStop('additionalInfo')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
      <FinancialAdvisor
        v-else-if="
          !(
            this.profileDataHasProp('financialAdvisor') && this.filledByAdvisor
          ) && this.profileData.page < 17
        "
        v-on:done="feedProfileData"
        v-on:stop="doStop('financialAdvisor')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <Congrats
        v-else-if="!this.profileIsComplete()"
        v-on:done="feedProfileData"
        v-bind:filledByAdvisor="this.filledByAdvisor"
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
import { getProfile, setProfile, handleError } from "../../datasource/profile";
import SideMenu from "../profile/SideMenu";
import Congrats from "../profile/Congrats";

export default {
  name: "profile",
  props: ["filledByAdvisor"],
  data() {
    return {
      key: 0,
      profileData: {
        accepted: false,
        email: "",
      },
      activeComponentName: "",
      profilePages: 18,
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
    if (!this.filledByAdvisor) {
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
          handleError(error.graphQLErrors[0].message);
        });
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
    Congrats,
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
      if (this.profileData.cpf) {
        portionProfileData["cpf"] = this.profileData.cpf;
      }
      setProfile(portionProfileData);
      this.$emit("paging", this.profileData.page);
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
    profileIsComplete() {
      return (
        this.profileData.page == this.profilePages &&
        this.profileData.email != "" &&
        this.profileData.hasOwnProperty("parentsAreThemSupportedByYou") &&
        this.profileDataHasProp("maritalStatus") &&
        this.profileDataHasProp("children") &&
        this.profileDataHasProp("occupation") &&
        this.profileDataHasProp("immovableProperties") &&
        this.profileDataHasProp("health") &&
        this.profileData.hasOwnProperty("monthlyExpenses") &&
        this.profileDataHasProp("investorExperiences") &&
        this.profileDataHasProp("insurances") &&
        this.profileDataHasProp("personalPrivateSecurities") &&
        this.profileDataHasProp("plansAndProjects") &&
        this.profileDataHasProp("investmentPortfolios") &&
        this.profileDataHasProp("fixedIncomeSecurities") &&
        this.profileDataHasProp("currentInvestmentProcess") &&
        this.profileData.hasOwnProperty("additionalInfo") &&
        this.profileDataHasProp("financialAdvisor")
      );
    },
    setActiveComponent(name) {
      this.activeComponentName = name;
    },
    doStop(prop) {
      console.log("prop = ", prop);
      if (this.profileData[prop]) {
        console.log("prop exists");
        if (prop == "accepted") {
          console.log("prop is 'accepted'");
          this.profileData.accepted = false;
        } else {
          console.log("prop different than 'accepted'");
          if (
            this.profileData[prop] === Object(this.profileData[prop]) ||
            Array.isArray(this.profileData[prop])
          ) {
            console.log("prop is an array or object");
            delete this.profileData[prop];
          } else {
            console.log("prop is a single value");
            this.profileData[prop] = undefined;
          }
        }
      }
      this.$router.push("/");
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
