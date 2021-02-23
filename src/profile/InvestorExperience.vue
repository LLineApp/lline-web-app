<template>
  <div>
    <b-form-group id="kind-group" label="Tipo" label-for="kind-select">
      <b-form-select
        id="kind-select"
        v-model="investorExperienceData.kind"
        :options="investorExperienceOptions"
        ref="kind"
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
    if (this.$parent.$parent.$options.name != "ProfileDataSheet") {  
      this.focusInput();
    }
  },
  methods: {
    focusInput() {
      this.$refs.kind.focus();
    },
    formatNumericField(value) {
      return parseFloat(value);
    },
  },
};
</script>
