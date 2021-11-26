<template>
  <div id="property">
    <b-form-group
      id="description-group"
      label="Descrição"
      label-for="description-input"
    >
      <b-form-input
        type="text"
        id="description-input"
        ref="description"
        v-model="immovablePropertyData.description"
      />
    </b-form-group>

    <b-form-group id="value-group" label="Qual o valor?" label-for="valueValue">
      <b-form-input
        id="valueValue"
        v-model.number="immovablePropertyData.value"
        type="number"
        step="1"
        placeholder="0,00"
        no-wheel
        lazy-formatter
        :formatter="formatNumericField"
      />
    </b-form-group>

    <b-form-group label="É alugado?">
      <b-form-radio-group
        class="rented-radio-group"
        v-model="immovablePropertyData.rented"
        :options="yesNo"
      />
    </b-form-group>

    <b-form-group label="É financiado?">
      <b-form-radio-group
        class="funded-radio-group"
        v-model="immovablePropertyData.funded"
        :options="yesNo"
      />
    </b-form-group>

    <b-form-group
      id="insuranceValue-group"
      label="Qual o valor do seguro? (Informe 0,00 se não tem seguro)"
      label-for="insuranceValueValue"
    >
      <b-form-input
        id="insuranceValueValue"
        v-model.number="immovablePropertyData.insuranceValue"
        type="number"
        step="1"
        placeholder="0,00"
        no-wheel
        lazy-formatter
        :formatter="formatNumericField"
      />
    </b-form-group>

    <b-form-group
      id="insuranceCompany-group"
      label="Seguradora"
      label-for="insuranceCompany-input"
      v-if="this.immovablePropertyData.insuranceValue > 0"
    >
      <b-form-input
        type="text"
        id="insuranceCompany-input"
        ref="insuranceCompany"
        v-model="immovablePropertyData.insuranceCompany"
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
      v-on:click="$emit('remove', immovablePropertyData)"
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
  name: "immovableProperty",
  props: ["immovablePropertyData"],
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
    };
  },
  mounted() {
    if (this.$parent.$parent.$options.name != "profileDataSheet") {
      this.focusInput();
    }
  },
  methods: {
    focusInput() {
      this.$refs.description.focus();
    },
    formatNumericField(value) {
      return formatNumericField(value);
    },
    alertCountDownChanged(dismissCountDown) {
      this.alert.dismissCountDown = dismissCountDown;
    },
    doApply() {
      this.$emit("apply", this.immovablePropertyData);
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
#property {
  padding-bottom: 1%;
  border-bottom: 1px solid black;
}
#alert {
  position: fixed;
  top: 20px;
  width: 60%;
}
</style>
