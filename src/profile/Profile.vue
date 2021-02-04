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
    />
    <Parents
      v-else-if="!this.profileDataHasProp('parents')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.parents"
    />
    <Marital
      v-else-if="!this.profileDataHasProp('marital')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.marital"
    />
    <Children
      v-else-if="!this.profileDataHasProp('children')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.children"
    />
    <ProfessionalSituation
      v-else-if="!this.profileDataHasProp('occupation')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.occupation"
    />
    <ImmovableProperties
      v-else-if="!this.profileDataHasProp('immovableProperties')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.immovableProperties"
    />
    <FinancialSituation
      v-else-if="!this.profileDataHasProp('monthlyExpenses')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.monthlyExpenses"
    />
    <InvestorExperiences
      v-else-if="!this.profileDataHasProp('investorExperiences')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.investorExperiences"
    />
    <Insurances
      v-else-if="!this.profileDataHasProp('insurances')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.insurances"
    />
    <PersonalPrivateSecurities
      v-else-if="!this.profileDataHasProp('personalPrivateSecurities')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.personalPrivateSecurities"
    />
    <FixedIncomeSecurities
      v-else-if="!this.profileDataHasProp('fixedIncomeSecurities')"
      v-on:done="feedProfileData"
      v-on:stopped="delete profileData.fixedIncomeSecurities"
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
import FixedIncomeSecurities from "../profile/FixedIncomeSecurities";

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
    FixedIncomeSecurities,
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
