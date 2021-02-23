<template>
  <div>
    <p>Sobre sua situação financeira</p>
    <Money
      :key=this.profileData.monthlyExpenses
      label="Qual sua despesa mensal?"
      field="monthlyExpenses"
      :fieldValue=this.profileData.monthlyExpenses
      v-on:apply="applyValue"
    />
    <Money
      :key=this.profileData.costsWithDependents
      label="Gastos com dependentes"
      field="costsWithDependents"
      :fieldValue=this.profileData.costsWithDependents
      v-on:apply="applyValue"
    />
    <Money
      :key=this.profileData.howMuchYouSave
      label="Quanto você poupa?"
      field="howMuchYouSave"
      :fieldValue=this.profileData.howMuchYouSave
      v-on:apply="applyValue"
    />
    <Money
      :key=this.profileData.debtLoans
      label="Tem dívidas/financiamentos?"
      field="debtLoans"
      :fieldValue=this.profileData.debtLoans
      v-on:apply="applyValue"
    />
    <Money
      :key=this.profileData.partnerInCompany
      label="É sócio de empresa? (Informe o percentual, ou zero (0) caso não seja sócio)"
      field="partnerInCompany"
      :fieldValue=this.profileData.partnerInCompany
      v-on:apply="applyValue"
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
import Money from "../inputs/Money";

export default {
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        monthlyExpenses: null,
        costsWithDependents: null,
        howMuchYouSave: null,
        debtLoans: null,
        partnerInCompany: null,
      },
    };
  },
  components: { Money },
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
