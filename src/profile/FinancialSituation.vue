<template>
  <div>
    <p>Sobre sua situação financeira</p>
    <Money
      label="Qual sua despesa mensal?"
      field="monthlyExpenses"
      v-on:apply="applyValue"
    />
    <Money
      label="Gastos com dependentes"
      field="costsWithDependents"
      v-on:apply="applyValue"
    />
    <Money
      label="Quanto você poupa?"
      field="howMuchYouSave"
      v-on:apply="applyValue"
    />
    <Money
      label="Tem dívidas/financiamentos?"
      field="debtsLoans"
      v-on:apply="applyValue"
    />
    <Money
      label="É sócio de empresa? (Informe o percentual, ou zero (0) caso não seja sócio)"
      field="partnerInACompany"
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
        debtsLoans: null,
        partnerInACompany: null,
      },
    };
  },
  components: { Money },
  created(){
    if(this.recordedData){
      Object.assign(this.profileData, this.recordedData);
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
