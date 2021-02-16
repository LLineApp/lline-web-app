<template>
  <div>
    <p>Sobre seus pais</p>

    <b-form-group label="Seus pais são dependentes de você?">
      <b-form-radio-group
        id="areThemSupportedByYou-radio"
        v-model="profileData.parents.areThemSupportedByYou"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group
      id="howMuchYouSuportThem-group"
      label="Você colabora com quanto?"
      label-for="howMuchYouSuportThem-input"
      v-if="this.profileData.parents.areThemSupportedByYou"
    >
      <b-form-input
        id="howMuchYouSuportThem-input"
        v-model.number="profileData.parents.howMuchYouSuportThem"
        type="number"
        step="1"
        placeholder="0.00"
        no-wheel
        :formatter="formatNumericField"
      />
    </b-form-group>
    <b-form-group label="Há possiblidade de herança?">
      <b-form-radio-group
        id="isThereAPossibilityOfInheritance-radio"
        v-model="profileData.parents.isThereAPossibilityOfInheritance"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group
      id="ofWhom-group"
      label="De quem?"
      label-for="ofWhom-select"
      v-if="this.profileData.parents.isThereAPossibilityOfInheritance"
    >
      <b-form-select
        id="ofWhom-select"
        v-model="profileData.parents.ofWhom"
        :options="whichParents"
      />
    </b-form-group>
    <b-form-group
      id="whatIsTheEstimatedValue-group"
      label="Qual o valor estimado?"
      label-for="whatIsTheEstimatedValue-input"
      v-if="this.profileData.parents.isThereAPossibilityOfInheritance"
    >
      <b-form-input
        id="whatIsTheEstimatedValue-input"
        v-model.number="profileData.parents.whatIsTheEstimatedValue"
        type="number"
        step="1"
        placeholder="0.00"
        no-wheel
        :formatter="formatNumericField"
      />
    </b-form-group>
    <b-button
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Cadastrar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button v-if="showButtons" v-on:click="$emit('stop')">Parar</b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";

export default {
  name: "parents",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        parents: {
          areThemSupportedByYou: false,
          howMuchYouSuportThem: 0.0,
          isThereAPossibilityOfInheritance: false,
          ofWhom: "",
          whatIsTheEstimatedValue: 0.0,
        },
      },
      submitted: false,
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
      whichParents: ["Pai", "Mãe", "Ambos"],
    };
  },
  created() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
    }
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    formatNumericField(value) {
      return parseFloat(value);
    },
  },
};
</script>
