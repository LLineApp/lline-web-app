<template>
  <div id="portifolio">
    <b-form-group id="type-group" label="Que tipo?" label-for="type-input">
      <b-form-input
        type="text"
        id="type-input"
        ref="type"
        v-model="investmentPortfolioData.type"
      />
    </b-form-group>
    <b-form-group id="value-group" label="Qual o valor?" label-for="valueValue">
      <b-form-input
        id="valueValue"
        v-model.number="investmentPortfolioData.value"
        type="number"
        step="1"
        placeholder="0.00"
        no-wheel
        :formatter="formatNumericField"
      />
    </b-form-group>
    <b-form-group id="tx-group" label="Qual a taxa? (%)" label-for="tx-input">
      <b-form-input
        id="tx-input"
        v-model.number="investmentPortfolioData.tx"
        type="number"
        step="1"
        placeholder="0,00"
        no-wheel
        :formatter="formatNumericField"
      />
    </b-form-group>

    <b-button
      type="button"
      aria-label="Close"
      v-on:click="$emit('apply', investmentPortfolioData)"
      aria-hidden="true"
      ><i class="fa fa-check"></i
    ></b-button>
    <b-button
      type="button"
      aria-label="Close"
      v-on:click="$emit('remove', investmentPortfolioData)"
      aria-hidden="true"
      ><i class="fa fa-times"></i
    ></b-button>
  </div>
</template>

<script>
export default {
  name: "investmentPortfolio",
  props: ["investmentPortfolioData"],
  mounted() {
    if (!this.investmentPortfolioData.type) {
      this.focusInput();
    }
  },
  methods: {
    focusInput() {
      this.$refs.type.focus();
    },
    formatNumericField(value) {
      return parseFloat(value);
    },
  },
};
</script>
<style scoped>
button {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
button:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}
#portifolio {
  padding-bottom: 1.5%;
  padding-top: 1%;
  border-bottom: 1px solid black;
}
</style>

