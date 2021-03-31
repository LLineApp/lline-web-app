<template>
  <div id="main">
    <p>Sobre sua situação profissional</p>
    <b-form-group
      id="occupation-form-group"
      label="Qual a sua profissão?"
      label-for="occupation-input"
    >
      <b-form-input id="occupation-input" v-model="profileData.occupation" />
    </b-form-group>
    <b-form-group
      id="role-form-group"
      label="Qual o seu cargo ou função?"
      label-for="role-input"
    >
      <b-form-input id="role-input" v-model="profileData.role" />
    </b-form-group>
    <b-form-group
      id="companyName-form-group"
      label="Qual o nome da empresa onde você trabalha?"
      label-for="companyName-input"
    >
      <b-form-input id="companyName-input" v-model="profileData.companyName" />
    </b-form-group>
    <b-form-group
      id="phones-form-group"
      label="Qual o telefone da empresa? (Caso haja mais que um, separar por vírgulas)"
      label-for="phones-input"
    >
      <b-form-input id="phones-input" v-model="profileData.businessPhones" />
    </b-form-group>
    <b-form-group
      id="businessEmail-form-group"
      label="Qual o e-mail da empresa?"
      label-for="businessEmail-input"
    >
      <b-form-input
        id="businessEmail-input"
        v-model="profileData.businessEmail"
        :formatter="formatLowerCase"
      />
    </b-form-group>
    <b-form-group label="Que tipo é a empresa?">
      <b-form-radio-group
        id="businessKind-radio-group"
        v-model="profileData.businessKind"
        :options="businessKind"
      />
    </b-form-group>
    <b-form-group
      id="businessField-form-group"
      label="Qual o ramo de atividade da empresa?"
      label-for="businessField-input"
    >
      <b-form-input
        id="businessField-input"
        v-model="profileData.businessField"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Qual o tipo da sua declaração de Imposto de Renda?">
      <b-form-radio-group
        id="incomeTaxDeclarationType-select"
        v-model="profileData.incomeTaxDeclarationType"
        :options="incomeTaxDeclarationType"
      />
    </b-form-group>
    <b-form-group label="A empresa tem seguro Empresarial?">
      <b-form-radio-group
        id="companyHasPrivateInsurance-select"
        v-model="profileData.companyHasPrivateInsurance"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group
      id="socialSecurityValue-form-group"
      label="Qual o valor do recolhimento do seu INSS? (Informe 0,00 caso não recolha)"
      label-for="socialSecurityValue-input"
    >
      <b-form-input
        id="socialSecurityValue-input"
        v-model.number="profileData.socialSecurityValue"
        type="number"
        step="1"
        placeholder="0,00"
        no-wheel
        lazy-formatter
        :formatter="formatNumericField"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="A empresa tem previdência corporativa?">
      <b-form-radio-group
        id="companyHasPrivateSecurity-select"
        v-model="companyHasPrivateSecurity"
        :options="yesNo"
      />
    </b-form-group>
    <b-form-group
      id="privateSecurityYourValue-form-group"
      label="Qual o valor da sua contribuição?"
      label-for="privateSecurityYourValue-input"
      v-if="this.companyHasPrivateSecurity"
    >
      <b-form-input
        id="privateSecurityYourValue-input"
        v-model.number="profileData.privateSecurityYourValue"
        number
        step="1"
        placeholder="0,00"
        no-wheel
        lazy-formatter
        :formatter="formatNumericField"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="privateSecurityCompanyValue-form-group"
      label="Qual o valor da contribuição da sua empresa?"
      label-for="privateSecurityCompanyValue-input"
      v-if="this.companyHasPrivateSecurity"
    >
      <b-form-input
        id="privateSecurityCompanyValue-input"
        v-model.number="profileData.privateSecurityCompanyValue"
        type="number"
        step="1"
        placeholder="0,00"
        no-wheel
        lazy-formatter
        :formatter="formatNumericField"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="privateSecurityCurrentBalance-form-group"
      label="Qual o saldo atual da sua previdência corporativa?"
      label-for="privateSecurityCurrentBalance-input"
      v-if="this.companyHasPrivateSecurity"
    >
      <b-form-input
        id="privateSecurityCurrentBalance-input"
        v-model.number="profileData.privateSecurityCurrentBalance"
        type="number"
        step="1"
        placeholder="0,00"
        no-wheel
        lazy-formatter
        :formatter="formatNumericField"
      ></b-form-input>
    </b-form-group>
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
import { mapState } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";
import { formatNumericField } from "../_helpers/formaters";

export default {
  name: "professionalSituation",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        occupation: "",
        role: "",
        companyName: "",
        businessPhones: "",
        businessEmail: "",
        businessKind: "",
        businessField: "",
        incomeTaxDeclarationType: "",
        companyHasPrivateInsurance: false,
        socialSecurityValue: null,
        privateSecurityYourValue: null,
        privateSecurityCompanyValue: null,
        privateSecurityCurrentBalance: null,
        page: 5,
      },
      companyHasPrivateSecurity: false,
      yesNo: [
        { text: "Não", value: false },
        { text: "Sim", value: true },
      ],
      businessKind: ["Autônomo", "Pessoa Jurídica"],
      incomeTaxDeclarationType: ["Simples", "Completa", "Não declarante"],
    };
  },
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
    formatNumericField(value) {
      return formatNumericField(value);
    },
    formatLowerCase(value) {
      return value.toLowerCase();
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
  padding: 2%, 2%;
}
</style>
