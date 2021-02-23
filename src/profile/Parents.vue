<template>
  <div>
    <p>Sobre seus pais</p>

    <b-form-group label="Seus pais são dependentes de você?">
      <b-form-radio-group
        id="parentsAreThemSupportedByYou-radio"
        v-model="profileData.parentsAreThemSupportedByYou"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group
      id="parentsHowMuchYouSuportThem-group"
      label="Você colabora com quanto?"
      label-for="parentsparentsHowMuchYouSuportThem-input"
      v-if="this.profileData.parentsAreThemSupportedByYou"
    >
      <b-form-input
        id="parentsHowMuchYouSuportThem-input"
        v-model.number="profileData.parentsHowMuchYouSuportThem"
        type="number"
        step="1"
        placeholder="0.00"
        no-wheel
        :formatter="formatNumericField"
      />
    </b-form-group>
    <b-form-group label="Há possiblidade de herança?">
      <b-form-radio-group
        id="parentsIsThereAPossibilityOfInheritance-radio"
        v-model="profileData.parentsIsThereAPossibilityOfInheritance"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group
      id="parentsOfWhom-group"
      label="De quem?"
      label-for="parentsOfWhom-select"
      v-if="this.profileData.parentsIsThereAPossibilityOfInheritance"
    >
      <b-form-select
        id="parentsOfWhom-select"
        v-model="profileData.parentsOfWhom"
        :options="whichParents"
      />
    </b-form-group>
    <b-form-group
      id="parentsWhatIsTheEstimatedValue-group"
      label="Qual o valor estimado?"
      label-for="parentsWhatIsTheEstimatedValue-input"
      v-if="this.profileData.parentsIsThereAPossibilityOfInheritance"
    >
      <b-form-input
        id="parentsWhatIsTheEstimatedValue-input"
        v-model.number="profileData.parentsWhatIsTheEstimatedValue"
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
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
          parentsAreThemSupportedByYou: false,
          parentsHowMuchYouSuportThem: 0.0,
          parentsIsThereAPossibilityOfInheritance: false,
          parentsOfWhom: "",
          parentsWhatIsTheEstimatedValue: 0.0,
      },
      submitted: false,
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
      whichParents: ["Pai", "Mãe", "Ambos"],
    };
  },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.$forceUpdate();
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
