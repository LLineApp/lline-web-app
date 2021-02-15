<template>
  <div class="container">
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
import { getProfile } from "../../datasource/profile";

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
    const data = getProfile();
    this.profileData = data;
    console.log(JSON.stringify(data.fullname));
  },
  components: {
    NavBar,
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
  },
  watch: {
    profileData: function() {
      sessionStorage.setItem("profileData", JSON.stringify(this.profileData));
    },
  },
  methods: {},
};
</script>
