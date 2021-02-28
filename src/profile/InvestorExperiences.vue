<template>
  <div id="main">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <h1>Experiências como investidor</h1>
    <p>
      Clique
      <b-button
        type="button"
        v-on:click="addInvestorExperience()"
        aria-hidden="true"
        ><i class="fa fa-plus"></i
      ></b-button>
      para adicionar uma nova experiência
    </p>
    <ul id="investorExperiences">
      <li
        v-for="investorExperience in this.profileData.investorExperiences"
        :key="investorExperience.key"
      >
        <InvestorExperience
          v-bind:investorExperienceData="investorExperience"
          v-on:apply="applyInvestorExperience"
          v-on:remove="removeInvestorExperience"
        />
      </li>
    </ul>
    <b-button
      id="success"
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Confirmar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
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

export default {
  name: "investorExperiences",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        investorExperiences: [
          {
            key: 0,
            type: "",
            value: null,
          },
        ],
      },
    };
  },
  components: { InvestorExperience },
  created() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    addInvestorExperience() {
      const newKey = this.profileData.investorExperiences.length;
      const newInvestorExperience = {
        key: 0,
        type: "",
        value: null,
      };
      this.profileData.investorExperiences.push(newInvestorExperience);
    },
    applyInvestorExperience(investorExperienceData) {
      for (var i in this.profileData.investorExperiences) {
        if (
          this.profileData.investorExperiences[i].key ==
          investorExperienceData.key
        ) {
          this.profileData.investorExperiences[i] = investorExperienceData;
          break;
        }
      }
    },
    removeInvestorExperience(investorExperienceData) {
      var remainingInvestorExperiences = this.profileData.investorExperiences.filter(
        function (value) {
          return value != investorExperienceData;
        }
      );
      this.profileData.investorExperiences = remainingInvestorExperiences;
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
