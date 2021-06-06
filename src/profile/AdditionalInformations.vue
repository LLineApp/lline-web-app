<template>
  <div id="main">
    <Memo
      :key="this.profileData.additionalInfo"
      label="Informações adicionais"
      fieldName="additionalInfo"
      :text="this.profileData.additionalInfo"
      v-on:apply="applyValue"
      placeholder="Mais alguma coisa que a gente precisa saber?"
    />
    <b-button
      id="success"
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Confirmar
    </b-button>
    <b-button id="back" v-if="showButtons" v-on:click="$emit('back')"
      >Voltar</b-button
    >

    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import Memo from "../inputs/Memo";

export default {
  name: "additionalInformations",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 17,
        additionalInfo: "",
      },
    };
  },
  components: { Memo },
  mounted() {
    if (this.recordedData) {
      this.profileData.additionalInfo = this.recordedData.additionalInfo;
      this.profileData.page = 17;
      this.$forceUpdate();
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  updated() {
    if (!this.showButtons) {
      this.$emit("done", this.profileData);
    }
  },
  methods: {
    applyValue(property, value) {
      this.profileData[property] = value;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

* {
  font-family: "Raleway", sans-serif;
  font-size: 20pt;
}
#back,
#stop,
#success {
  margin-right: 1%;
  font-size: 17pt;
}
#back,
#stop {
  background-color: gray;
  border-color: gray;
  color: black;
}
#main {
  margin-bottom: 5%;
}
#success {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
#back:hover,
#success:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}
#stop:hover {
  color: red;
  background-color: black;
  border-color: black;
}
</style>
