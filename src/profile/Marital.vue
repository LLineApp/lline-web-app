<template>
  <div>
    <p>Sobre sua vida familiar - Casamento</p>
    <b-form-group label="Qual o seu estado civil?">
      <b-form-select
        id="status-select"
        v-model="profileData.marital.status"
        :options="maritalStatuses"
      />
    </b-form-group>
    <b-form-group
      id="howManyYears-group"
      :label="this.howManyYearsLabel"
      label-for="howManyYears-input"
      v-if="this.hasSpouse"
    >
      <b-form-input
        id="howManyYears-input"
        v-model.number="profileData.marital.howManyYears"
        number
        step="1"
        min="0"
        max="100"
        no-wheel
        placeholder="0"
        :formatter="formatToInt"
      />
    </b-form-group>
    <b-form-group
      id="spouseName-group"
      label="Qual o nome do seu cônjuge?"
      label-for="spouseName-input"
      v-if="this.hasSpouse"
    >
      <b-form-input
        id="spouseName-input"
        v-model="profileData.marital.spouseName"
      />
    </b-form-group>
    <b-form-group
      id="spouseOccupation-group"
      label="Qual a ocupação do seu cônjuge?"
      label-for="spouseOccupation-input"
      v-if="this.hasSpouse"
    >
      <b-form-input
        id="spouseOccupation-input"
        v-model.number="profileData.marital.spouseOccupation"
      />
    </b-form-group>
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

export default {
  name: "marital",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        marital: {
          status: "",
          howManyYears: 0,
          spouseName: "",
          spouseOccupation: "",
        },
      },
      maritalStatuses: [
        "Solteiro(a)",
        "Casado(a)",
        "Divorciado(a)",
        "Viúvo(a)",
        "Separado(a)",
        "União estável",
      ],
    };
  },
  created() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
    hasSpouse: function () {
      return ["Casado(a)", "União estável"].includes(
        this.profileData.marital.status
      );
    },
    howManyYearsLabel: function () {
      let status = "casados";
      if (this.profileData.marital.status == "União estável") {
        status = "em união estável";
      }
      return "Vocês estão " + status + " há quantos anos?";
    },
  },
  methods: {
    formatToInt(value) {
      return parseInt(value);
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

p {
  font-size: 20pt;
}
* {
  font-family: "Raleway", sans-serif;
  font-size: 15pt;
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
#success {
  padding: 2%, 2%;
}
</style>
