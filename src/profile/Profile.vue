<template>
  <div id="main">
    <SideMenu
      v-if="this.profileData.page > 0"
      v-bind:activeComponentName="activeComponentName"
    />
    <div id="dados-div">
      <Intro
        :key="this.key"
        v-if="this.profileData.page == 0"
        v-on:didAccept="doAccept()"
        v-on:didNotAccept="doStop('accepted')"
      />
      <Email
        v-else-if="profileData.page == 1"
        v-on:done="feedProfileData"
        v-on:stop="doStop('email')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:filledByAdvisor="this.filledByAdvisor"
        v-bind:recordedData="this.profileData"
      />
      <Parents
        v-else-if="this.profileData.page == 2"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('parentsAreThemSupportedByYou')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="this.profileData"
      />
      <Marital
        v-else-if="this.profileData.page == 3"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('maritalStatus')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <Children
        v-else-if="this.profileData.page == 4"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('children')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <ProfessionalSituation
        v-else-if="this.profileData.page == 5"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('occupation')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <ImmovableProperties
        v-else-if="this.profileData.page == 6"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('immovableProperties')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <Health
        v-else-if="this.profileData.page == 7"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('health')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <FinancialSituation
        v-else-if="this.profileData.page == 8"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('monthlyExpenses')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <InvestorExperiences
        v-else-if="this.profileData.page == 9"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('investorExperiences')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <Insurances
        v-else-if="this.profileData.page == 10"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('insurances')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <PersonalPrivateSecurities
        v-else-if="this.profileData.page == 11"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('personalPrivateSecurities')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <PlansAndProjects
        v-else-if="this.profileData.page == 12"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('plansAndProjects')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <InvestmentPortfolios
        v-else-if="this.profileData.page == 13"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('investmentPortfolios')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <!-- <FixedIncomeSecurities
        v-else-if="this.profileData.page == 14"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('fixedIncomeSecurities')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      /> -->
      <Knowledge
        v-else-if="this.profileData.page == 15"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('currentInvestmentProcess')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <AdditionalInformations
        v-else-if="this.profileData.page == 16"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('additionalInfo')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <FinancialAdvisor
        v-else-if="this.showAdvisorPage"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('financialAdvisor')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
        v-bind:recordedData="profileData"
      />
      <Congrats
        v-else-if="this.profileData.page == 18"
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
// import FixedIncomeSecurities from "../profile/FixedIncomeSecurities";
import InvestmentPortfolios from "../profile/InvestmentPortfolios";
import Knowledge from "./Knowledge.vue";
import AdditionalInformations from "../profile/AdditionalInformations";
import FinancialAdvisor from "../profile/FinancialAdvisor";
import { getProfile, setProfile, handleError } from "../../datasource/profile";
import SideMenu from "../profile/SideMenu";
import Congrats from "../profile/Congrats";

export default {
  name: "profile",
  props: ["filledByAdvisor", "currentPage"],
  data() {
    return {
      key: 0,
      profileData: {
        page: -1,
        accepted: false,
        email: "",
      },
      activeComponentName: "",
    };
  },
  updated() {
    const dDiv = document.getElementById("dados-div");
    if (this.profileData.page == 0) {
      dDiv.style.width = "100%";
    } else {
      dDiv.style.width = "80%";
    }
  },
  created() {
    if (!this.filledByAdvisor) {
      if (this.$cookies.get("token")) {
        getProfile(this.$cookies.get("token"), this.$cookies.get("cpf"))
          .then((data) => {
            if (data.data.getProfile[0]) {
              const rawData = data.data.getProfile[0];
              for (var key in rawData) {
                if (rawData[key] != null) {
                  this.profileData[key] = rawData[key];
                }
              }
              this.profileData.accepted = this.profileData.hasOwnProperty(
                "cpf"
              );
              if (this.currentPage < this.profileData.page) {
                this.profileData.page = this.currentPage;
              }
              this.key += 1;
            } else {
              this.profileData.page = 0;
            }
          })
          .catch((error) => {
            handleError(error.graphQLErrors[0].message);
          });
      }
    } else {
      this.profileData.page = 1;
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
    // FixedIncomeSecurities,
    InvestmentPortfolios,
    Knowledge,
    AdditionalInformations,
    FinancialAdvisor,
    SideMenu,
    Congrats,
  },
  computed: {
    showAdvisorPage: function() {
      if (this.filledByAdvisor) {
        this.profileData.page = 18;
      }
      return this.profileData.page == 17;
    },
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

      if (this.profileData.cpf != "") {
        portionProfileData["cpf"] = this.profileData.cpf;
      }
      if (portionProfileData["cpf"] == "") {
        portionProfileData["cpf"] = this.$cookies.get("cpf");
      }

      if (portionProfileData.financialAdvisor) {
        delete portionProfileData.financialAdvisor["id"];
        delete portionProfileData.financialAdvisor["__typename"];
      }
      setProfile(this.$cookies.get("token"), portionProfileData).then(() => {
        this.$emit("paging", this.profileData.page);
        this.key += 1;
        this.$forceUpdate();
      });
    },
    setActiveComponent(name) {
      this.activeComponentName = name;
    },
    doAccept() {
      this.profileData.accepted = true;
      this.profileData.page = 1;
    },
    doStop(prop) {
      if (this.profileData[prop]) {
        if (prop == "accepted") {
          this.profileData.accepted = false;
        } else {
          if (
            this.profileData[prop] === Object(this.profileData[prop]) ||
            Array.isArray(this.profileData[prop])
          ) {
            delete this.profileData[prop];
          } else {
            this.profileData[prop] = undefined;
          }
        }
      }
      this.$router.push("/");
    },
    goBack() {
      this.profileData.page -= 1;
      if (this.profileData.page == 14) {
        this.profileData.page -= 1;
      }
      this.$emit("paging", this.profileData.page);
      this.key += 1;
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
