<template>
  <div id="main">
    <h1>Experiências como investidor</h1>

    <InvestorExperience
      v-for="investorExperience in investorExperienceOptions"
      v-bind:key="investorExperience + key"
      v-bind:kindName="investorExperience"
      v-bind:investorExperienceData="profileData.investorExperiences"
      v-on:apply="applyInvestorExperience"
    />

    <b-button
      id="success"
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Confirmar
    </b-button>
    <b-img v-show="status.registering" :src="registering" />
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";
import InvestorExperience from "../profile/InvestorExperience";
import { INVESTOR_EXPERIENCE_OPTIONS } from "../constants/arrays";

export default {
  name: "investorExperiences",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      key: 0,
      investorExperienceOptions: INVESTOR_EXPERIENCE_OPTIONS,
      registering: REGISTERING,
      profileData: {
        page: 10,
        investorExperiences: [],
      },
    };
  },
  components: { InvestorExperience },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.key = +1;
      this.$forceUpdate();
    }
    this.investorExperienceOptions = INVESTOR_EXPERIENCE_OPTIONS;
    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    applyInvestorExperience(kind, value) {
      if (value > 0) {
        this.addOrUpdateInvestorExperience(kind, value);
      } else {
        this.removeInvestorExperience(kind);
      }
    },
    addOrUpdateInvestorExperience(kind, value) {
      for (var i in this.profileData.investorExperiences) {
        if (this.profileData.investorExperiences[i].kind == kind) {
          this.profileData.investorExperiences[i].value = value;
          return;
        }
      }
      this.profileData.investorExperiences.push({
        kind: kind,
        value: value,
      });
    },
    removeInvestorExperience(kind) {
      for (var i in this.profileData.investorExperiences) {
        if (this.profileData.investorExperiences[i].kind == kind) {
          this.profileData.investorExperiences.splice(i, 1);
        }
      }
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

p {
  font-size: 17pt;
}
h1 {
  font-size: 20pt;
}
* {
  font-family: "Raleway", sans-serif;
  font-size: 15pt;
}
#stop,
#success {
  margin-right: 1%;
  font-size: 17pt;
}
#stop {
  background-color: gray;
  border-color: gray;
  color: black;
}
#main {
  margin-bottom: 5%;
}
button,
#success {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
button:hover,
#success:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}
#stop:hover {
  color: red;
  background-color: black;
  border-color: black;
}
#success {
  margin-left: 3.5%;
  padding: 2%, 2%;
}
</style>
