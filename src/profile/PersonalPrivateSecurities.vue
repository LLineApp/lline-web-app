<template>
  <div>
    <p>Previdência Privadas</p>
    <b-button variant="light" v-on:click="addPersonalPrivateSecurity()"
      ><span aria-hidden="true">&#43;</span></b-button
    >
    <ul id="personalPrivateSecurities">
      <li
        v-for="personalPrivateSecurity in this.profileData
          .personalPrivateSecurities"
        :key="personalPrivateSecurity.key"
      >
        <PersonalPrivateSecurity
          v-bind:personalPrivateSecurityData="personalPrivateSecurity"
          v-on:apply="applyPersonalPrivateSecurity"
          v-on:remove="removePersonalPrivateSecurity"
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
import PersonalPrivateSecurity from "../profile/PersonalPrivateSecurity";

export default {
  name: "personalPrivateSecurities",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        personalPrivateSecurities: [
          {
            key: 0,
            bank: "",
            enterprise: "",
            cooperative: "",
            survival: "",
            table: "",
            balance: null,
          },
        ],
      },
    };
  },
  components: { PersonalPrivateSecurity },
  created() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    addPersonalPrivateSecurity() {
      const newKey = this.profileData.personalPrivateSecurities.length;
      const newPersonalPrivateSecurity = {
        key: newKey,
        bank: "",
        enterprise: "",
        cooperative: "",
        survival: "",
        table: "",
        balance: null,
      };
      this.profileData.personalPrivateSecurities.push(
        newPersonalPrivateSecurity
      );
    },
    applyPersonalPrivateSecurity(personalPrivateSecurityData) {
      for (var i in this.profileData.personalPrivateSecurities) {
        if (
          this.profileData.personalPrivateSecurities[i].key ==
          personalPrivateSecurityData.key
        ) {
          this.profileData.personalPrivateSecurities[
            i
          ] = personalPrivateSecurityData;
          break;
        }
      }
    },
    removePersonalPrivateSecurity(personalPrivateSecurityData) {
      var remainingPersonalPrivateSecurities = this.profileData.personalPrivateSecurities.filter(
        function(value) {
          return value != personalPrivateSecurityData;
        }
      );
      this.profileData.personalPrivateSecurities = remainingPersonalPrivateSecurities;
    },
  },
};
</script>
