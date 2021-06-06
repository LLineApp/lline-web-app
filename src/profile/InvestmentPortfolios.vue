<template>
  <div id="main">
    <h1>Descreva sua carteira de investimentos</h1>

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
    <p>
      Clique
      <b-button
        type="button"
        v-on:click="addInvestmentPortfolio()"
        aria-hidden="true"
        ><i class="fa fa-plus"></i
      ></b-button>
      para adicionar mais um item à sua carteira
    </p>

    <b-button
      id="success"
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Confirmar
    </b-button>
    <b-button id="back" v-if="showButtons" v-on:click="$emit('back')"
      >Voltar</b-button
    >
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import InvestmentPortfolio from "../profile/InvestmentPortfolio";

export default {
  name: "investmentPortfolios",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 15,
        investmentPortfolios: [
          {
            key: 0,
            kind: "",
            value: null,
            tx: null,
            txType: "Taxa fixa",
          },
        ],
      },
    };
  },
  components: { InvestmentPortfolio },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.profileData.page = 15;
      this.$forceUpdate();
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  updated() {
    if (!this.showButtons) {
      this.$emit("done", this.profileData);
    }
  },
  methods: {
    addInvestmentPortfolio() {
      const newKey = this.profileData.investmentPortfolios.length;
      const newInvestmentPortfolio = {
        key: newKey,
        kind: "",
        value: null,
        tx: null,
        txType: "Taxa fixa",
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
#back,
#success {
  margin-right: 1%;
  font-size: 17pt;
}
#back,
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
