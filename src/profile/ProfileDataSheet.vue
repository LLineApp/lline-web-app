<template>
  <div>
    <NavBar />
    <div id="datasheet">
      <p>Estes são os seus dados</p>
      <SideMenuDataSheet v-bind:activeComponentName="activeComponentName" />
      <div id="data">
        <Email
          v-bind:recordedData="profileData"
          v-if="(activeComponentName = 'email')"
        />
        <Parents
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'parents')"
        />
        <Marital
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'maritial')"
        />
        <Children
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'children')"
        />
        <ProfessionalSituation
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'professionalSituation')"
        />
        <ImmovableProperties
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'immovableProperties')"
        />
        <Health
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'health')"
        />
        <FinancialSituation
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'financialSituation')"
        />
        <InvestorExperiences
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'investorExperiences')"
        />
        <Insurances
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'insurances')"
        />
        <PersonalPrivateSecurities
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'personalPrivateSecurities')"
        />
        <PlansAndProjects
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'plansAndProjects')"
        />
        <InvestmentPortfolios
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'investmentPortfolios')"
        />
        <FixedIncomeSecurities
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'fixedIncomeSecurities')"
        />
        <Knowledge
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'knowledge')"
        />
        <AdditionalInformations
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'additionalInformations')"
        />
        <FinancialAdvisor
          v-bind:recordedData="profileData"
          v-else-if="(activeComponentName = 'financialAdvisor')"
        />
      </div>
    </div>
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
import SideMenuDataSheet from "../profile/SideMenuDataSheet";

export default {
  name: "profileDataSheet",
  data() {
    return {
      key: 0,
      profileData: {
        accepted: true,
      },
      activeComponentName: "",
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
    SideMenuDataSheet,
  },
  methods: {
    setActiveComponent(name) {
      this.activeComponentName = name;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

p {
  margin-top: 1.5%;
  font-size: 25pt;
  text-align: center;
  font-family: "Raleway", sans-serif;
  float: right;
  width: 80%;
}

ul {
  list-style-type: none;
}
#data {
  width: 75%;
  float: right;
  padding-top: 4.5%;
}

#datasheet {
  padding-inline: 5%;
  padding-top: 0;
}
</style>
