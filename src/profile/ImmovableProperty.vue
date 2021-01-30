<template>
  <div>
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
        placeholder="0.00"
        no-wheel="true"
        :formatter="formatNumericField"
      />
    </b-form-group>

    <b-form-group label="É alugado?">
      <b-form-radio-group
        id="rented-radio-group"
        v-model="immovablePropertyData.rented"
        :options="yesNo"
      />
    </b-form-group>

    <b-form-group label="É financiado?">
      <b-form-radio-group
        id="funded-radio-group"
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
        no-wheel="true"
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
      class="close"
      aria-label="Close"
      v-on:click="$emit('apply', immovablePropertyData)"
      ><span aria-hidden="true">&#10003;</span></b-button
    >
    <b-button
      type="button"
      class="close"
      aria-label="Close"
      v-on:click="$emit('remove', immovablePropertyData)"
      ><span aria-hidden="true">&times;</span></b-button
    >
  </div>
</template>

<script>
export default {
  props: ["immovablePropertyData"],
  data() {
    return {
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
    };
  },

  mounted() {
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.description.focus();
    },
    formatNumericField(value) {
      return parseFloat(value);
    },
  },
};
</script>
