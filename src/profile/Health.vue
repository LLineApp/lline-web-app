<template>
  <div id="main">
    <Memo
      :key="this.profileData.health"
      label="Me fale sobre a sua saúde"
      fieldName="health"
      :text="this.profileData.health"
      v-on:apply="applyValue"
      placeholder="Informe aqui se você tem alguma doença seja ela crônica ou não, sequelas de acidentes, acidentes cardíacos ou neurológicos (como AVC ou infarto), debilidades motoras ou sensitivas (como problemas de fala, visão ou audição)"
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
  name: "health",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 8,
        health: "",
      },
    };
  },
  components: { Memo },
  mounted() {
    this.$emit("setActiveComponent", this.$options.name);
    if (this.recordedData) {
      this.profileData.health = this.recordedData.health;
      this.profileData.page = 8;
      this.$forceUpdate();
    }
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
#stop,
#back,
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
