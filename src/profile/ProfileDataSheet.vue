<template>
  <div :key="key">
    <NavBar />
    <b-button-toolbar id="toolbuttons">
      <b-button-group>
        <b-button
          type="button"
          id="back-btn"
          aria-label="Close"
          v-if="isClientProfile"
          v-on:click="goBack()"
          aria-hidden="true"
          variant="outline-secondary"
          squared
          ><i class="fa fa-arrow-left fa-lg"></i>
        </b-button>
        <b-button
          type="button"
          id="save-btn"
          aria-label="Close"
          v-on:click="save()"
          aria-hidden="true"
          variant="outline-secondary"
          squared
          ><i class="fa fa-floppy-o fa-lg"></i>
        </b-button>
        <b-button
          type="button"
          id="print-btn"
          aria-label="Close"
          v-print="printObj"
          aria-hidden="true"
          variant="outline-secondary"
          squared
          ><i class="fa fa-print fa-lg"></i>
        </b-button>
      </b-button-group>
    </b-button-toolbar>
    <div id="main">
      <SideMenu
        v-bind:activeComponentName="activeComponentName"
        v-bind:navigate="true"
        v-on:page="setPage"
      />
      <div id="datasheet">
        <Alert variant="warning" v-bind:showAlert.sync="showAlert"
          >Os dados de {{ profileData.fullname }} foram gravado com sucesso</Alert
        >
        <p>{{ this.title }}</p>
        <Email
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-bind:isClientData="isClientProfile"
          v-on:done="feedProfileData"
          v-if="this.page == 2"
        />
        <Parents
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 3"
        />
        <Marital
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 4"
        />
        <Children
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 5"
        />
        <ProfessionalSituation
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 6"
        />
        <ImmovableProperties
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 7"
        />
        <Health
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 8"
        />
        <FinancialSituation
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 9"
        />
        <InvestorExperiences
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 10"
        />
        <Insurances
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 11"
        />
        <PersonalPrivateSecurities
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 12"
        />
        <PlansAndProjects
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 13"
        />
        <InvestmentPortfolios
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 14"
        />
        <!-- <FixedIncomeSecurities v-on:setActiveComponent="setActiveComponent" v-bind:recordedData="profileData" v-if="this.page == 15"/> -->
        <Knowledge
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 16"
        />
        <AdditionalInformations
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-if="this.page == 17"
        />
        <Advisors
          v-on:setActiveComponent="setActiveComponent"
          v-bind:recordedData="profileData"
          v-on:done="feedProfileData"
          v-on:changeAdv="loadProfile()"
          v-if="this.page == 18"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile, setProfile } from "../../datasource/profile";
import { mapGetters } from "vuex";

export default {
  name: "profileDataSheet",
  data() {
    return {
      key: 0,
      page: 2,
      title: "Estes são os seus dados",
      activeComponentName: "",
      showAlert: false,
      profileData: {
        accepted: true,
      },
      printObj: {
        id: "datasheet",
        popTitle: "Perfil",
        extraCss: "https://www.google.com,https://www.google.com",
        extraHead: '<meta http-equiv="Content-Language"content="pt-br"/>',
      },
    };
  },
  created() {
    this.loadProfile();
  },
  computed: {
    ...mapGetters("loginData", ["loginData"]),
    isClientProfile: function () {
      return Boolean(this.$route.params.clientCpf);
    },
  },
  methods: {
    loadProfile() {
      getProfile(this.loginData.token, this.$route.params.clientCpf)
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
    goBack() {
      this.$router.go(-1);
    },
    setPage(page) {
      this.page = page;
    },
    save() {
      this.profileData.page += 1;
      this.$forceUpdate();
      this.profileData.page = 19;
      delete this.profileData.financialAdvisor;
      setProfile(this.loginData.token, this.profileData).then((data) => {
        this.showAlert = true;
      });
    },
    feedProfileData(portionProfileData) {
      const data = { ...this.profileData, ...portionProfileData };
      this.profileData = data;
    },
    setActiveComponent(name) {
      this.activeComponentName = name;
    },
  },
  components: {
    NavBar: require("../navbar/NavBar").default,
    Email: require("./Email").default,
    Parents: require("./Parents").default,
    Marital: require("./Marital").default,
    Children: require("./Children").default,
    ProfessionalSituation: require("./ProfessionalSituation").default,
    ImmovableProperties: require("./ImmovableProperties").default,
    Health: require("./Health").default,
    FinancialSituation: require("./FinancialSituation").default,
    InvestorExperiences: require("./InvestorExperiences").default,
    Insurances: require("./Insurances").default,
    PersonalPrivateSecurities: require("./PersonalPrivateSecurities").default,
    PlansAndProjects: require("./PlansAndProjects").default,
    InvestmentPortfolios: require("./InvestmentPortfolios").default,
    // FixedIncomeSecurities: require("./FixedIncomeSecurities").default,
    Knowledge: require("./Knowledge.vue").default,
    AdditionalInformations: require("./AdditionalInformations").default,
    Advisors: require("./Advisors").default,
    SideMenu: require("./SideMenu").default,
    Alert: require("../components/Alert").default,
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
#main {
  width: 100%;
  padding-inline: 5%;
}
#datasheet {
  padding-inline: 10%;
  padding-top: 3%;
  width: 80%;
  float: right;
}
ul {
  list-style-type: none;
}
#toolbuttons {
  width: 70%;
  background: #0000000e;
  float: right;
}
#back-btn,
#print-btn,
#save-btn {
  text-align: center;
  width: 45pt;
  border: none;
  float: left;
}
#back-btn:hover,
#print-btn:hover,
#save-btn:hover {
  color: #26fed5;
  background-color: rgba(0, 0, 0, 0.795);
  border-color: black;
}
</style>
