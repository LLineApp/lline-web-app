<template>
  <div id="insurance">
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
      aria-label="Close"
      v-on:click="$emit('apply', insuranceData)"
      aria-hidden="true"
      ><i class="fa fa-check"></i
    ></b-button>
    <b-button
      type="button"
      aria-label="Close"
      v-on:click="$emit('remove', insuranceData)"
      aria-hidden="true"
      ><i class="fa fa-times"></i
    ></b-button>
  </div>
</template>

<script>
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  name: "insurance",
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
    if (this.$parent.$parent.$options.name != "profileDataSheet") {  
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
#insurance {
  padding-bottom: 1.5%;
  padding-top: 1%;
  border-bottom: 1px solid black;
}
</style>
