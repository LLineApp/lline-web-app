<template>
  <div>
    <p>Títulos de Renda Fixa</p>
    <b-button variant="light" v-on:click="addFixedIncomeSecurity()"
      ><span aria-hidden="true">&#43;</span></b-button
    >
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
import FixedIncomeSecurity from "../profile/FixedIncomeSecurity";

export default {
  name: "fixedIncomeSecurities",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
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
      this.$forceUpdate();
    }
  },
  computed: {
    ...mapState("account", ["status"]),
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
