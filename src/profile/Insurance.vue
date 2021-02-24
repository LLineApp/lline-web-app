<template>
  <div>
    <b-form-group label="Tipo">
      <b-form-select
        id="kind-select"
        v-model="insuranceData.kind"
        :options="insuranceOptions"
        ref="kind"
      />
    </b-form-group>
    <b-form-group id="value-group" label="Valor" label-for="value-input">
      <b-form-input
        id="value-input"
        v-model.number="insuranceData.value"
        type="number"
        step="1"
        placeholder="0.00"
        no-wheel
        :formatter="formatNumericField"
      />
    </b-form-group>
    <b-form-group label="Contribui mensalmente?">
      <b-form-radio-group
        id="monthlyFee-radio-group"
        v-model="insuranceData.monthlyFee"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group
      id="coverage-group"
      label="Cobertura"
      label-for="coverage-input"
    >
      <b-form-input
        id="coverage-input"
        v-model.number="insuranceData.coverage"
        type="number"
        step="1"
        placeholder="0.00"
        no-wheel
        :formatter="formatNumericField"
      />
    </b-form-group>
    <b-form-group
      id="company-group"
      label="Companhia"
      label-for="company-input"
    >
      <b-form-input
        type="text"
        id="company-input"
        v-model="insuranceData.company"
      />
    </b-form-group>
    <b-button
      type="button"
      class="close"
      aria-label="Close"
      v-on:click="$emit('apply', insuranceData)"
      ><span aria-hidden="true">&#10003;</span></b-button
    >
    <b-button
      type="button"
      class="close"
      aria-label="Close"
      v-on:click="$emit('remove', insuranceData)"
      ><span aria-hidden="true">&times;</span></b-button
    >
  </div>
</template>

<script>
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  props: ["insuranceData"],
  data() {
    return {
      insuranceOptions: [
        "Vida",
        "RC",
        "DIT",
        "Consórcio",
        "Título de capitalização",
      ],
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
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
