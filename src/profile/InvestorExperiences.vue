<template>
  <div>
    <p>Experiências como investidor</p>

    <b-button variant="light" v-on:click="addInvestorExperience()"
      ><span aria-hidden="true">&#43;</span></b-button
    >

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
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Cadastrar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button v-if="showButtons" v-on:click="$emit('stop')">Parar</b-button>
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
        function(value) {
          return value != investorExperienceData;
        }
      );
      this.profileData.investorExperiences = remainingInvestorExperiences;
    },
  },
};
</script>
