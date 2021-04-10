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
              v-model.number="insurance.value"
              type="number"
              step="1"
              no-wheel
              placeholder="0,00"
              debounce="400"
              lazy-formatter
              :formatter="formatNumericField"
            />
            <b-input-group-append id="monthly-fee-append">
              <b-button
                id="monthlyFee-toggle-button"
                :pressed.sync="insurance.monthlyFee"
                variant="primary"
                >{{ this.monthlyFeeText }}</b-button
              >
            </b-input-group-append>
            <b-form-input
              id="coverage-input"
              v-model.number="insurance.coverage"
              type="number"
              step="1"
              no-wheel
              placeholder="0,00"
              debounce="400"
              lazy-formatter
              :formatter="formatNumericField"
            />
            <b-form-input
              id="company-input"
              v-model.number="insurance.company"
            />
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
      insurance: {
        kind: this.kind,
        value: null,
        monthlyFee: true,
        coverage: null,
        company: null,
      },
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
      monthlyFeeText: "Sim",
    };
  },
  mounted() {
    if (this.insuranceData) {
      this.insuranceData.forEach((insurance) => {
        if (insurance.kind == this.insurance.kind) {
          this.insurance = insurance;
        }
      });
    }
  },
  watch: {
    "insurance.value": function() {
      this.$emit("apply", this.insurance);
    },
    "insurance.monthlyFee": function() {
      this.monthlyFeeText = this.insurance.monthlyFee ? "Sim" : "Não";
      this.$emit("apply", this.insurance);
    },
    "insurance.coverage": function() {
      this.$emit("apply", this.insurance);
    },
    "insurance.company": function() {
      this.$emit("apply", this.insurance);
    },
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
#kind-prepend-text {
  width: 100%;
}
#kind-prepend {
  width: 23%;
}
#company-input {
  width: 20%;
}
</style>
