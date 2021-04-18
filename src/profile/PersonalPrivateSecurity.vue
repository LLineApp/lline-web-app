<template>
  <div id="personalPrivateSecurity">
    <b-form-group id="bank-group" label="Banco" label-for="bank-input">
      <b-form-input
        type="text"
        id="bank-input"
        ref="bank"
        v-model="personalPrivateSecurityData.bank"
      />
    </b-form-group>
    <b-form-group label="É empresarial?">
      <b-form-radio-group
        id="enterprise-radio-group"
        v-model="personalPrivateSecurityData.enterprise"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group label="É cooperativo?">
      <b-form-radio-group
        id="cooperative-radio-group"
        v-model="personalPrivateSecurityData.cooperative"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group label="Qual plano?">
      <b-form-radio-group
        id="survival-radio-group"
        v-model="personalPrivateSecurityData.survival"
        :options="survivalOptions"
      />
    </b-form-group>
    <b-form-group label="Qual tabela?">
      <b-form-radio-group
        id="table-radio-group"
        v-model="personalPrivateSecurityData.table"
        :options="tableOptions"
      />
    </b-form-group>
    <b-form-group
      id="balance-group"
      label="Qual o saldo?"
      label-for="balance-input"
    >
      <b-form-input
        id="balance-input"
        v-model.number="personalPrivateSecurityData.balance"
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
      v-on:click="$emit('remove', personalPrivateSecurityData)"
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
import { InMemoryCache } from "apollo-cache-inmemory";
import { formatNumericField } from "../_helpers/formaters";

export default {
  name: "personalPrivateSecurity",
  props: ["personalPrivateSecurityData"],
  data() {
    return {
      alert: {
        dismissSecs: 5,
        dismissCountDown: 0,
      },
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
      survivalOptions: ["VGBL", "PGBL"],
      tableOptions: ["Progressiva", "Regressiva"],
    };
  },
  mounted() {
    if (this.$parent.$parent.$options.name != "profileDataSheet") {  
      this.focusInput();
    }
  },
  methods: {
    focusInput() {
      this.$refs.bank.focus();
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
#personalPrivateSecurity {
  padding-bottom: 1%;
  border-bottom: 1px solid black;
}
#alert {
  position: fixed;
  top: 20px;
  width: 60%;
}
</style>

