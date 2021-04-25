<template>
  <div :key="key">
    <NavBar />
    <div id="toolbuttons">
      <b-button
        type="button"
        id="print-btn"
        aria-label="Close"
        v-on:click="print()"
        aria-hidden="true"
        variant="outline-secondary"
        squared
        ><i class="fa fa-print fa-lg"></i>
      </b-button>
      <b-button
        type="button"
        id="back-btn"
        aria-label="Close"
        v-on:click="goBack()"
        aria-hidden="true"
        variant="outline-secondary"
        squared
        ><i class="fa fa-arrow-left fa-lg"></i>
      </b-button>
    </div>
    <div id="datasheet">
      <p>{{ this.title }}</p>
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
      isClientProfile: false,
      title: "Estes são os seus dados",
      profileData: {
        accepted: true,
      },
    };
  },
  created() {
    const cpf = this.$route.params.clientCpf;
    if (cpf) {
      this.isClientProfile = true;
    }

    getProfile(this.$cookies.get("token"), cpf)
      .then((data) => {
        this.profileData = data.data.getProfile[0];
        if (this.isClientProfile) {
          this.title = `Estes são os dados de ${this.profileData.fullname}`;
        }
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    print() {
      this.$htmlToPaper("datasheet");
    },
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

p {
  margin-top: 1.5%;
  font-size: 25pt;
  text-align: center;
}
* {
  font-family: "Raleway", sans-serif;
  font-size: 15pt;
}
#datasheet {
  padding-inline: 10%;
  padding-top: 3%;
}
ul {
  list-style-type: none;
}
#toolbuttons {
  background: #0000000e;
}
#back-btn,
#print-btn {
  text-align: center;
  width: 45pt;
  border: none;
  float: right;
}
#back-btn:hover,
#print-btn:hover {
  color: #26fed5;
  background-color: rgba(0, 0, 0, 0.795);
  border-color: black;
}
</style>
