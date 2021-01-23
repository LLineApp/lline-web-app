<template>
  <div>
    <p>Sobre seus pais</p>

    <b-form-group label="Seus pais são dependentes de você?">
      <b-form-radio-group
        id="areThemSupportedByYou-radio-slots"
        v-model="profileData.parents.areThemSupportedByYou"
        :options="yesNo"
        name="radio-options-slots"
      >
      </b-form-radio-group>
    </b-form-group>
    <b-form-group
      id="howMuchYouSuportThem"
      label="Você colabora com quanto?"
      label-for="howMuchYouSuportThem"
      v-if="this.profileData.parents.areThemSupportedByYou"
    >
      <b-form-input
        id="howMuchYouSuportThem"
        v-model.number="profileData.parents.howMuchYouSuportThem"
        type="number"
        step="0.01"
        placeholder="0.00"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Há possiblidade de herança?">
      <b-form-radio-group
        id="isThereAPossibilityOfInheritance-radio-slots"
        v-model="profileData.parents.isThereAPossibilityOfInheritance"
        :options="yesNo"
        name="radio-options-slots"
      >
      </b-form-radio-group>
    </b-form-group>

    <b-form-group
      id="ofWhom"
      label="De quem?"
      label-for="ofWhom"
      v-if="this.profileData.parents.isThereAPossibilityOfInheritance"
    >
      <b-form-select
        id="ofWhom"
        v-model="profileData.parents.ofWhom"
        :options="whichParents"
      ></b-form-select>
    </b-form-group>

    <b-form-group
      id="whatIsTheEstimatedValue"
      label="Qual o valor estimado?"
      label-for="whatIsTheEstimatedValue"
      v-if="this.profileData.parents.isThereAPossibilityOfInheritance"
    >
      <b-form-input
        id="whatIsTheEstimatedValue"
        v-model.number="profileData.parents.whatIsTheEstimatedValue"
        type="number"
        step="0.01"
        placeholder="0.00"
      ></b-form-input>
    </b-form-group>

    <b-button variant="success" v-on:click="$emit('done', profileData)">
      Cadastrar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button v-on:click="$emit('stop')">Parar</b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";

export default {
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
      whichParents: [ "Pai", "Mãe", "Ambos"],
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {},
};
</script> 