<template>
  <div id="main">
    <h1>Títulos de Renda Fixa</h1>

    <ul id="fixedIncomeSecurities">
      <li
        v-for="fixedIncomeSecurity in this.profileData.fixedIncomeSecurities"
        :key="fixedIncomeSecurity.key"
      >
        <FixedIncomeSecurity
          v-bind:fixedIncomeSecurityData="fixedIncomeSecurity"
          v-on:apply="applyFixedIncomeSecurity"
          v-on:remove="removeFixedIncomeSecurity"
        />
      </li>
    </ul>
    <p>
      Clique
      <b-button
        type="button"
        v-on:click="addFixedIncomeSecurity()"
        aria-hidden="true"
        ><i class="fa fa-plus"></i
      ></b-button>
      para adicionar outro Título de Renda Fixa
    </p>

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
import FixedIncomeSecurity from "../profile/FixedIncomeSecurity";

export default {
  name: "fixedIncomeSecurities",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 15,
        fixedIncomeSecurities: [
          {
            key: 0,
            kind: "",
            value: null,
            tx: null,
          },
        ],
      },
    };
  },
  components: { FixedIncomeSecurity },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.profileData.page = 15;
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
    addFixedIncomeSecurity() {
      const newKey = this.profileData.fixedIncomeSecurities.length;
      const newFixedIncomeSecurity = {
        key: newKey,
        kind: "",
        value: null,
        tx: null,
      };
      this.profileData.fixedIncomeSecurities.push(newFixedIncomeSecurity);
    },
    applyFixedIncomeSecurity(fixedIncomeSecurityData) {
      for (var i in this.profileData.fixedIncomeSecurities) {
        if (
          this.profileData.fixedIncomeSecurities[i].key ==
          fixedIncomeSecurityData.key
        ) {
          this.profileData.fixedIncomeSecurities[i] = fixedIncomeSecurityData;
          break;
        }
      }
    },
    removeFixedIncomeSecurity(fixedIncomeSecurityData) {
      var remainingFixedIncomeSecuritys = this.profileData.fixedIncomeSecurities.filter(
        function(value, index, arr) {
          return value != fixedIncomeSecurityData;
        }
      );
      this.profileData.fixedIncomeSecurities = remainingFixedIncomeSecuritys;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

p {
  font-size: 17pt;
}
h1 {
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
button,
#success {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
button:hover,
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
  margin-left: 3.5%;
  padding: 2%, 2%;
}
</style>
