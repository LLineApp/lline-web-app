<template>
  <div>
    <p>Conhecimento</p>
    <Memo
      :key=this.profileData.currentInvestmentProcess
      label="Como é o seu processo de investimento hoje?"
      fieldName="currentInvestmentProcess"
      :text=this.profileData.currentInvestmentProcess
      v-on:apply="applyValue"
      placeholder=""
    />
    <b-form-group label="Acompanha noticiário econômico?">
      <b-form-radio-group
        id="followEconomicNews-radio-group"
        v-model="profileData.followEconomicNews"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group label="Gostaria de ser informado sobre cursos e palestras?">
      <b-form-radio-group
        id="acceptsInfoAboutCourses-radio-group"
        v-model="profileData.acceptsInfoAboutCourses"
        :options="yesNo"
      />
    </b-form-group>
    <Memo
      :key=this.profileData.haveFinancialConcerns
      label="Você tem alguma preocupação financeira?"
      fieldName="haveFinancialConcerns"
      :text=this.profileData.haveFinancialConcerns
      v-on:apply="applyValue"
      placeholder=""
    />
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
import Memo from "../inputs/Memo";

export default {
  name: "knowledge",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        currentInvestmentProcess: "",
        followEconomicNews: null,
        acceptsInfoAboutCourses: null,
        haveFinancialConcerns: null,
      },
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
    };
  },
  components: { Memo },
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
    applyValue(property, value) {
      this.profileData[property] = value;
    },
  },
};
</script>
