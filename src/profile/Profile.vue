<template>
  <div id="main">
    <SideMenu
      v-if="this.profileData.page > 0"
      v-bind:activeComponentName="activeComponentName"
      v-bind:navigate="false"
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
        v-bind:isClientData="false"
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
      <Targets
        v-else-if="this.profileData.page == 14"
        v-on:done="feedProfileData"
        v-on:back="goBack"
        v-on:stop="doStop('targets')"
        v-on:setActiveComponent="setActiveComponent"
        v-bind:showButtons="true"
      />
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
        v-else-if="this.profileData.page == 17"
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
        v-bind:isClientData="false"
      />
    </div>
  </div>
</template>

<script>
import { getProfile, setProfile, handleError } from "../../datasource/profile";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "profile",
  props: ["currentPage"],
  data() {
    return {
      key: 0,
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
    if (this.loginData.token) {
      getProfile(this.loginData.token, this.loginData.cpf)
        .then((data) => {
          const profileData = {};
          profileData["page"] = 0;
          if (data.data.getProfile[0]) {
            const rawData = data.data.getProfile[0];
            for (var key in rawData) {
              if (rawData[key] != null) {
                profileData[key] = rawData[key];
              }
            }
            profileData["accepted"] = this.profileData.hasOwnProperty("cpf");
            if (this.currentPage < this.profileData.page) {
              profileData["page"] = this.currentPage;
            }
            this.key += 1;
          }
          this.updateProfileData({
            updates: profileData,
          });
        })
        .catch((error) => {
          handleError(error.graphQLErrors[0].message);
        });
    }
  },
  components: {
    Email: require("../profile/Email").default,
    Intro: require("../profile/Intro").default,
    Parents: require("../profile/Parents").default,
    Marital: require("../profile/Marital").default,
    Children: require("../profile/Children").default,
    ProfessionalSituation: require("../profile/ProfessionalSituation").default,
    ImmovableProperties: require("../profile/ImmovableProperties").default,
    FinancialSituation: require("../profile/FinancialSituation").default,
    InvestorExperiences: require("../profile/InvestorExperiences").default,
    Insurances: require("../profile/Insurances").default,
    PersonalPrivateSecurities: require("../profile/PersonalPrivateSecurities")
      .default,
    PlansAndProjects: require("../profile/PlansAndProjects").default,
    Health: require("../profile/Health").default,
    Targets: require("../targets/Targets").default,
    InvestmentPortfolios: require("../profile/InvestmentPortfolios").default,
    Knowledge: require("./Knowledge.vue").default,
    AdditionalInformations: require("../profile/AdditionalInformations")
      .default,
    FinancialAdvisor: require("../profile/FinancialAdvisor").default,
    SideMenu: require("../profile/SideMenu").default,
    Congrats: require("../profile/Congrats").default,
  },
  computed: {
    ...mapGetters("profileData", ["profileData"]),
    ...mapGetters("loginData", ["loginData"]),
  },
  methods: {
    ...mapActions("profileData", ["updateProfileData"]),
    feedProfileData(portionProfileData) {
      if (portionProfileData) {
        if (!this.profileData.cpf) {
          portionProfileData["cpf"] = this.profileData.cpf;
        }
        if (!portionProfileData["cpf"]) {
          portionProfileData["cpf"] = this.loginData.cpf;
        }
        const data = { ...this.profileData, ...portionProfileData };
        this.updateProfileData({
          updates: data,
        });

        if (portionProfileData.financialAdvisor) {
          delete portionProfileData.financialAdvisor["id"];
          delete portionProfileData.financialAdvisor["__typename"];
        }
        setProfile(this.loginData.token, portionProfileData).then((data) => {
          if (!this.profileData.cpf) {
            this.updateProfileData({
              cpf: data.data.setProfile.profile.cpf,
            });
          }
          this.$emit("paging", this.profileData.page);
          this.key += 1;
          this.$forceUpdate();
        });
      }
    },
    setActiveComponent(name) {
      this.activeComponentName = name;
    },
    doAccept() {
      this.updateProfileData({
        updates: {
          accepted: true,
          page: 1,
        },
      });
    },
    doStop(prop) {
      if (this.profileData[prop]) {
        if (prop == "accepted") {
          this.updateProfileData({
            updates: {
              accepted: false,
            },
          });
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
      let page = this.profileData.page;
      page -= 1;
      if (page == 14) {
        page -= 1;
      }
      this.updateProfileData({
        updates: {
          page: page,
        },
      });
      this.$emit("paging", page);
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
