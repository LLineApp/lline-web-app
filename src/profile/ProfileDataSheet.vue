<template>
  <div class="container" :key="key">
    <NavBar />
    <p>Estes são os seus dados</p>
    <Email v-bind:recordedData="profileData" />
    <Parents v-bind:recordedData="profileData" />
    <Marital v-bind:recordedData="profileData" />
    <Children v-bind:recordedData="profileData" />
    <ProfessionalSituation v-bind:recordedData="profileData" />
    <ImmovableProperties v-bind:recordedData="profileData" />
    <Health v-bind:recordedData="profileData" />
    <FinancialSituation v-bind:recordedData="profileData" />
    <InvestorExperiences v-bind:recordedData="profileData" />
    <Insurances v-bind:recordedData="profileData" />
    <PersonalPrivateSecurities v-bind:recordedData="profileData" />
    <PlansAndProjects v-bind:recordedData="profileData" />
    <InvestmentPortfolios v-bind:recordedData="profileData" />
    <FixedIncomeSecurities v-bind:recordedData="profileData" />
    <Knowledge v-bind:recordedData="profileData" />
    <AdditionalInformations v-bind:recordedData="profileData" />
    <FinancialAdvisor v-bind:recordedData="profileData" />
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import Email from "../profile/Email";
import Parents from "../profile/Parents";
import Marital from "../profile/Marital";
import Children from "../profile/Children";
import ProfessionalSituation from "../profile/ProfessionalSituation";
import ImmovableProperties from "../profile/ImmovableProperties";
import Health from "../profile/Health";
import FinancialSituation from "../profile/FinancialSituation";
import InvestorExperiences from "../profile/InvestorExperiences";
import Insurances from "../profile/Insurances";
import PersonalPrivateSecurities from "../profile/PersonalPrivateSecurities";
import PlansAndProjects from "../profile/PlansAndProjects";
import InvestmentPortfolios from "../profile/InvestmentPortfolios";
import FixedIncomeSecurities from "../profile/FixedIncomeSecurities";
import Knowledge from "./Knowledge.vue";
import AdditionalInformations from "../profile/AdditionalInformations";
import FinancialAdvisor from "../profile/FinancialAdvisor";
import { getProfile } from "../../datasource/profile";

export default {
  name: "profileDataSheet",
  data() {
    return {
      key: 0,
      profileData: {
        accepted: true,
      },
    };
  },
  created() {
    getProfile()
      .then((data) => {
        this.profileData = data.data.getProfile[0];
        this.key += 1;
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
    NavBar,
    Email,
    Parents,
    Marital,
    Children,
    ProfessionalSituation,
    ImmovableProperties,
    Health,
    FinancialSituation,
    InvestorExperiences,
    Insurances,
    PersonalPrivateSecurities,
    PlansAndProjects,
    InvestmentPortfolios,
    FixedIncomeSecurities,
    Knowledge,
    AdditionalInformations,
    FinancialAdvisor,
  },
};
</script>

<style>
ul {
  list-style-type: none;
}
</style>
