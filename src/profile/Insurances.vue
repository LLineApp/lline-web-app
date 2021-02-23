<template>
  <div>
    <p>Seguros</p>

    <b-button variant="light" v-on:click="addInsurance()"
      ><span aria-hidden="true">&#43;</span></b-button
    >
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
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Cadastrar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button v-if="showButtons" v-on:click="$emit('stop')">Parar</b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";
import Insurance from "../profile/Insurance";

export default {
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
      var remainingInsurances = this.profileData.insurances.filter(function(
        value
      ) {
        return value != insuranceData;
      });
      this.profileData.insurances = remainingInsurances;
    },
  },
};
</script>
