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
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";
import Memo from "../inputs/Memo";

export default {
  name: "health",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        health: "",
        page: 7,
      },
    };
  },
  components: { Memo },
  mounted() {
    this.$emit("setActiveComponent", this.$options.name);
    if (this.recordedData) {
      this.profileData.health = this.recordedData.health;
      this.$forceUpdate();
    }
  },
  computed: {
    ...mapState("account", ["status"]),
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
#success {
  margin-right: 1%;
  font-size: 17pt;
}
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
