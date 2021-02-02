<template>
  <div>
    <b-form-group id="bank-group" label="banco" label-for="bank-input">
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
        placeholder="0.00"
        no-wheel
        :formatter="formatNumericField"
      />
    </b-form-group>
    <b-button
      type="button"
      class="close"
      aria-label="Close"
      v-on:click="$emit('apply', personalPrivateSecurityData)"
      ><span aria-hidden="true">&#10003;</span></b-button
    >
    <b-button
      type="button"
      class="close"
      aria-label="Close"
      v-on:click="$emit('remove', personalPrivateSecurityData)"
      ><span aria-hidden="true">&times;</span></b-button
    >
  </div>
</template>

<script>
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  props: ["personalPrivateSecurityData"],
  data() {
    return {
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
      survivalOptions: ["VGBL", "PGBL"],
      tableOptions: ["Progressiva", "Regressiva"],
    };
  },
  mounted() {
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.bank.focus();
    },
    formatNumericField(value) {
      return parseFloat(value);
    },
  },
};
</script>
