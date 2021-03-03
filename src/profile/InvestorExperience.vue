<template>
  <div id="experience">
    <b-form-group id="type-group" label="Tipo" label-for="type-select">
      <b-form-select
        id="type-select"
        v-model="investorExperienceData.type"
        :options="investorExperienceOptions"
        ref="type"
      />
    </b-form-group>
    <b-form-group id="value-group" label="Valor" label-for="value-input">
      <b-form-input
        id="value-input"
        v-model.number="investorExperienceData.value"
        type="number"
        step="1"
        no-wheel
        placeholder="0.00"
        :formatter="formatNumericField"
      />
    </b-form-group>
    <b-button
      type="button"
      aria-label="Close"
      v-on:click="$emit('apply', investorExperienceData)"
      aria-hidden="true"
      ><i class="fa fa-check"></i
    ></b-button>
    <b-button
      type="button"
      aria-label="Close"
      v-on:click="$emit('remove', investorExperienceData)"
      aria-hidden="true"
      ><i class="fa fa-times"></i
    ></b-button>
  </div>
</template>

<script>
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  name: "investorExperience",
  props: ["investorExperienceData"],
  data() {
    return {
      investorExperienceOptions: [
        "Bolsa",
        "Dólar",
        "Fundos de investimento",
        "Tesouro direto",
        "Fii",
        "Bm&F",
        "Debentures Incentivadas",
      ],
    };
  },
  mounted() {
    if (!this.investorExperienceData.type) {
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
#experience {
  padding-bottom: 1%;
  border-bottom: 1px solid black;
}
</style>
