<template>
  <div>
    <p>Sobre sua vida familiar - Casamento</p>
    <b-form-group label="Qual o seu estado civil?">
      <b-form-select
        id="status-select"
        v-model="profileData.maritalStatus"
        :options="maritalStatuses"
      />
    </b-form-group>
    <b-form-group
      id="howManyYears-group"
      :label="this.howManyYearsLabel"
      label-for="maritalHowManyYears-input"
      v-if="this.hasSpouse"
    >
      <b-form-input
        id="maritalHowManyYears-input"
        type="number"
        v-model.number="profileData.maritalHowManyYears"
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
      <b-form-input id="spouseName-input" v-model="profileData.spouseName" />
    </b-form-group>
    <b-form-group
      id="spouseOccupation-group"
      label="Qual a ocupação do seu cônjuge?"
      label-for="spouseOccupation-input"
      v-if="this.hasSpouse"
    >
      <b-form-input
        id="spouseOccupation-input"
        v-model="profileData.spouseOccupation"
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
    <b-button id="back" v-if="showButtons" v-on:click="$emit('back')"
      >Voltar</b-button
    >
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
export default {
  name: "marital",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 4,
        maritalStatus: "",
        maritalHowManyYears: null,
        spouseName: "",
        spouseOccupation: "",
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
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.profileData.page = 4;
      this.$forceUpdate();
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  updated() {
    if (!this.showButtons) {
      this.$emit("done", this.profileData);
    }
  },
  computed: {
    hasSpouse: function() {
      return ["Casado(a)", "União estável"].includes(
        this.profileData.maritalStatus
      );
    },
    howManyYearsLabel: function() {
      let status = "casados";
      if (this.profileData.maritalStatus == "União estável") {
        status = "em união estável";
      }
      return "Vocês estão " + status + " há quantos anos?";
    },
  },
  methods: {
    formatToInt(value) {
      if (value) {
        value = value.replace(/\D/g, "");
        value = isNaN(value) ? 0 : value;
        return parseInt(value);
      }
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
#success {
  padding: 2%, 2%;
}
</style>
