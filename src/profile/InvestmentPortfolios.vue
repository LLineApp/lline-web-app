<template>
  <div>
    <p>Descreva sua carteira de investimentos</p>
    <b-button variant="light" v-on:click="addInvestmentPortfolio()"
      ><span aria-hidden="true">&#43;</span></b-button
    >
    <ul id="investmentPortfolios">
      <li
        v-for="investmentPortfolio in this.profileData.investmentPortfolios"
        :key="investmentPortfolio.key"
      >
        <InvestmentPortfolio
          v-bind:investmentPortfolioData="investmentPortfolio"
          v-on:apply="applyInvestmentPortfolio"
          v-on:remove="removeInvestmentPortfolio"
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
import InvestmentPortfolio from "../profile/InvestmentPortfolio";

export default {
  name: "investmentPortfolios",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        investmentPortfolios: [
          {
            key: 0,
            kind: "",
            value: null,
            tx: null,
          },
        ],
      },
    };
  },
  components: { InvestmentPortfolio },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.$forceUpdate();
    }
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    addInvestmentPortfolio() {
      const newKey = this.profileData.investmentPortfolios.length;
      const newInvestmentPortfolio = {
        key: newKey,
        kind: "",
        value: null,
        tx: null,
      };
      this.profileData.investmentPortfolios.push(newInvestmentPortfolio);
    },
    applyInvestmentPortfolio(investmentPortfolioData) {
      for (var i in this.profileData.investmentPortfolios) {
        if (
          this.profileData.investmentPortfolios[i].key ==
          investmentPortfolioData.key
        ) {
          this.profileData.investmentPortfolios[i] = investmentPortfolioData;
          break;
        }
      }
    },
    removeInvestmentPortfolio(investmentPortfolioData) {
      var remainingInvestmentPortfolios = this.profileData.investmentPortfolios.filter(
        function(value, index, arr) {
          return value != investmentPortfolioData;
        }
      );
      this.profileData.investmentPortfolios = remainingInvestmentPortfolios;
    },
  },
};
</script>
