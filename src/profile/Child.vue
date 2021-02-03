<template>
  <div>
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
      class="close"
      aria-label="Close"
      v-on:click="$emit('apply', childData)"
      ><span aria-hidden="true">&#10003;</span></b-button
    >
    <b-button
      type="button"
      class="close"
      aria-label="Close"
      v-on:click="$emit('remove', childData)"
      ><span aria-hidden="true">&times;</span></b-button
    >
  </div>
</template>

<script>
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  props: ["childData"],
  mounted() {
    this.focusInput();
  },
  methods: {
    focusInput() {
      this.$refs.fullName.focus();
    },
  },
};
</script>
