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
        number=true
        type="number"
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
    <b-button variant="success" v-on:click="$emit('done', profileData)">
      Cadastrar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button v-on:click="$emit('stop')">Parar</b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";

export default {
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