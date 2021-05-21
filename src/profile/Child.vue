<template>
  <div id="child">
    <b-form-group
      id="fullname-group"
      label="Nome completo"
      label-for="fullname-input"
    >
      <b-form-input
        type="text"
        id="fullname-input"
        ref="fullname"
        v-model="childData.fullname"
      />
    </b-form-group>
    <b-form-group
      id="birthdate-group"
      label="Data de nascimento"
      label-for="birthdate-input"
    >
      <b-form-input
        type="date"
        id="birthdate-input"
        v-model="childData.birthdate"
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
      v-on:click="doApply()"
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
export default {
  name: "child",
  props: ["childData"],
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
      this.$refs.fullname.focus();
    },
    alertCountDownChanged(dismissCountDown) {
      this.alert.dismissCountDown = dismissCountDown;
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
#child {
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
