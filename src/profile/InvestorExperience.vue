<template>
  <div>
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
      class="close"
      aria-label="Close"
      v-on:click="$emit('apply', investorExperienceData)"
      ><span aria-hidden="true">&#10003;</span></b-button
    >
    <b-button
      type="button"
      class="close"
      aria-label="Close"
      v-on:click="$emit('remove', investorExperienceData)"
      ><span aria-hidden="true">&times;</span></b-button
    >
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
