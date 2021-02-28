<template>
  <div id="child">
    <b-form-group
      id="fullName-group"
      label="Nome completo"
      label-for="fullName-input"
    >
      <b-form-input
        type="text"
        id="fullName-input"
        ref="fullName"
        v-model="childData.fullName"
      />
    </b-form-group>
    <b-form-group
      id="birthDate-group"
      label="Data de nascimento"
      label-for="birthDate-input"
    >
      <b-form-input
        type="date"
        id="birthDate-input"
        v-model="childData.birthDate"
      />
    </b-form-group>
    <b-form-group
      id="occupationTraining-group"
      label=" Profissão/Formação"
      label-for="occupationTraining-input"
    >
      <b-form-input
        type="text"
        id="occupationTraining-input"
        v-model="childData.occupationTraining"
      />
    </b-form-group>
    <b-form-group
      id="additionalInfo-group"
      label="Informações adicionais"
      label-for="additionalInfo-input"
    >
      <b-form-textarea
        type="text"
        id="additionalInfo-input"
        v-model="childData.additionalInfo"
        placeholder=" Está na faculdade, em intercâmbio, na escola, é casado(a) ou emancipado(a), tem filhos?"
      />
    </b-form-group>

    <b-button
      type="button"
      aria-label="Close"
      v-on:click="$emit('apply', childData)"
      aria-hidden="true"
      ><i class="fa fa-check"></i
    ></b-button>
    <b-button
      type="button"
      aria-label="Close"
      v-on:click="$emit('remove', childData)"
      aria-hidden="true"
      ><i class="fa fa-times"></i
    ></b-button>
  </div>
</template>

<script>
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  name: "child",
  props: ["childData"],
  mounted() {
    if (!this.childData.fullName) {
      this.focusInput();
    }
  },
  methods: {
    focusInput() {
      this.$refs.fullName.focus();
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
#child {
  padding-bottom: 1.5%;
  padding-top: 1%;
  border-bottom: 1px solid black;
}
</style>
