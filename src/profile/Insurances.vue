<template>
  <div id="main">
    <h1>Seguros</h1>
    <p>
      Clique
      <b-button
        type="button"
        aria-label="Close"
        v-on:click="addInsurance()"
        aria-hidden="true"
        ><i class="fa fa-plus"></i
      ></b-button>
      para adicionar outro seguro
    </p>
    <ul id="insurances">
      <li v-for="insurance in this.profileData.insurances" :key="insurance.key">
        <Insurance
          v-bind:insuranceData="insurance"
          v-on:apply="applyInsurance"
          v-on:remove="removeInsurance"
        />
      </li>
    </ul>
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
import Insurance from "../profile/Insurance";

export default {
  name: "insurances",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        insurances: [
          {
            key: 0,
            kind: "",
            value: null,
            monthlyFee: true,
            coverage: null,
            company: "",
          },
        ],
      },
    };
  },
  components: { Insurance },
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.$forceUpdate();
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    addInsurance() {
      const newKey = this.profileData.insurances.length;
      const newInsurance = {
        key: newKey,
        value: null,
        monthlyFee: true,
        coverage: null,
        company: "",
      };
      this.profileData.insurances.push(newInsurance);
    },
    applyInsurance(insuranceData) {
      for (var i in this.profileData.insurances) {
        if (this.profileData.insurances[i].key == insuranceData.key) {
          this.profileData.insurances[i] = insuranceData;
          break;
        }
      }
    },
    removeInsurance(insuranceData) {
      var remainingInsurances = this.profileData.insurances.filter(function (
        value
      ) {
        return value != insuranceData;
      });
      this.profileData.insurances = remainingInsurances;
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

