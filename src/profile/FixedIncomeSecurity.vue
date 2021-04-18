<template>
  <div id="fixedIncomeSecurity">
    <b-form-group id="kind-group" label="Que tipo?" label-for="kind-input">
      <b-form-input
        type="text"
        id="kind-input"
        ref="kind"
        v-model="fixedIncomeSecurityData.kind"
      />
    </b-form-group>
    <b-form-group id="value-group" label="Qual o valor?" label-for="valueValue">
      <b-form-input
        id="valueValue"
        v-model.number="fixedIncomeSecurityData.value"
        type="number"
        step="1"
        placeholder="0,00"
        no-wheel
        lazy-formatter
        :formatter="formatNumericField"
      />
    </b-form-group>
    <b-form-group id="tx-group" label="Qual a taxa? (%)" label-for="tx-input">
      <b-form-input
        id="tx-input"
        v-model.number="fixedIncomeSecurityData.tx"
        type="number"
        step="1"
        placeholder="0,00"
        no-wheel
        lazy-formatter
        :formatter="formatNumericField"
      />
    </b-form-group>

    <b-button
      type="button"
      aria-label="Close"
      v-on:click="doApply()"
      aria-hidden="true"
      ><i class="fa fa-check"></i
    ></b-button>
    <b-button
      type="button"
      aria-label="Close"
      v-on:click="$emit('remove', fixedIncomeSecurityData)"
      aria-hidden="true"
      ><i class="fa fa-times"></i
    ></b-button>
    <b-alert
      id="alert"
      fade
      :show="alert.dismissCountDown"
      dismissible
      variant="success"
      v-on:dismissed="alert.dismissCountDown = 0"
      v-on:dismiss-count-down="alertCountDownChanged"
    >
      Registro incluído com sucesso
    </b-alert>
  </div>
</template>

<script>
import { formatNumericField } from "../_helpers/formaters";
export default {
  name: "fixedIncomeSecurity",
  props: ["fixedIncomeSecurityData"],
  data() {
    return {
      alert: {
        dismissSecs: 5,
        dismissCountDown: 0,
      },
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
      return formatNumericField(value);
    },
    alertCountDownChanged(dismissCountDown) {
      this.alert.dismissCountDown = dismissCountDown;
      this.$refs.financialAdvisorInput.focus();
    },
    doApply() {
      this.$emit("apply", this.childData);
      this.alert.dismissCountDown = this.alert.dismissSecs;
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
#fixedIncomeSecurity {
  padding-bottom: 1.5%;
  padding-top: 1%;
  border-bottom: 1px solid black;
}
#alert {
  position: fixed;
  top: 20px;
  width: 60%;
}
</style>
