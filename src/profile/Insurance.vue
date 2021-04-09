<template>
  <div id="insurance">
    <b-form-group content-cols-md>
      <b-row align-v="center">
        <b-col>
          <b-input-group id="insurance-input">
            <b-input-group-prepend id="kind-prepend">
              <b-input-group-text id="kind-prepend-text">
                {{ kind }}
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              id="value-input"
              v-model.number="value"
              type="number"
              step="1"
              no-wheel
              placeholder="0,00"
              debounce="400"
              lazy-formatter
              :formatter="formatNumericField"
            />
            <b-input-group-append id="monthly-fee-append">
              <b-input-group-text id="monthly-fee-append-text">
                <b-form-radio-group
                  id="monthlyFee-radio-group"
                  v-model="monthlyFee"
                  :options="yesNo"
                />
              </b-input-group-text>
            </b-input-group-append>
            <b-form-input
              id="coverage-input"
              v-model.number="coverage"
              type="number"
              step="1"
              no-wheel
              placeholder="0,00"
              debounce="400"
              lazy-formatter
              :formatter="formatNumericField"
            />
            <b-form-input id="company-input" v-model.number="company" />
          </b-input-group>
        </b-col>
      </b-row>
    </b-form-group>
  </div>
</template>

<script>
import { InMemoryCache } from "apollo-cache-inmemory";
import { formatNumericField } from "../_helpers/formaters";

export default {
  name: "insurance",
  props: ["insuranceData", "kind"],
  data() {
    return {
      value: null,
      monthlyFee: false,
      coverage: null,
      company: null,
      yesNo: [
        { text: "Não", value: false, default:true},
        { text: "Sim", value: true },
      ],
    };
  },

  mounted() {
    if (this.insuranceData) {
      this.insuranceData.forEach((insurance) => {
        if (insurance.kind == this.kind) {
          this.value = insurance.value;
        }
      });
    }
  },
  methods: {
    formatNumericField(value) {
      return formatNumericField(value);
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
#kind-prepend-text,
#monthly-fee-append-text {
  width: 100%;
}
#kind-prepend {
  width: 23%;
}
#company-input {
  width: 20%;
}
#monthlyFee-radio-group{
  font-size: 12pt;
}
</style>
