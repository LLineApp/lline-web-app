<template>
  <div id="main">
    <p>Dados Pessoais</p>
    <b-form-group
      id="email-group"
      label="E-mail"
      label-for="email-input"
      :state="validateEmail"
    >
      <b-form-input
        id="email-input"
        v-model="profileData.email"
        :state="validateEmail"
        :formatter="formatEmail"
      />
    </b-form-group>

    <b-form-group
      id="fullname-group"
      label="Nome completo"
      label-for="fullname-input"
    >
      <b-form-input
        id="fullname-input"
        v-model="profileData.fullname"
        :state="this.profileData.fullname.length > 2 ? true : false"
      />
    </b-form-group>

    <b-form-group
      v-if="this.filledByAdvisor"
      id="cpf-group"
      label="CPF"
      label-for="cpf-input"
      :state="validateCPF"
    >
      <b-form-input
        id="cpf-input"
        v-model="profileData.cpf"
        :state="validateCPF"
      />
    </b-form-group>

    <b-form-group
      id="birthdate-group"
      label="Data de nascimento"
      label-for="birthdate-input"
    >
      <b-form-input
        id="birthdate-input"
        type="date"
        v-model="profileData.birthdate"
      />
    </b-form-group>

    <b-form-group
      id="phone-group"
      label="Informe aqui todos os seus números de telefone com DDD, um por um"
      label-for="phone-input"
    >
      <b-input-group>
        <b-form-input
          id="phone-input"
          name="phoneInput"
          type="text"
          v-model="phoneInput"
          v-on:keyup.enter="addPhone()"
        />
        <b-input-group-append>
          <b-button id="add" variant="info" v-on:click="addPhone()"
            >Adicionar</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <b-form-group :label="phoneListLabel" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="phone-radio-slots"
        v-model="profileData.preferredContact"
        :options="profileData.phones"
        :aria-describedby="ariaDescribedby"
        name="radio-options-slots"
      />
    </b-form-group>

    <b-form-group
      id="requestAdvisorStatus-group"
      label=""
      label-for="requestAdvisorStatus-input"
    >
      <b-form-checkbox
        id="requestAdvisorStatus-input"
        name="requestAdvisorStatus"
        v-model="profileData.requestAdvisorStatus"
        v-if="!(this.filledByAdvisor || this.advisorsLink)"
      >
        Solicitar status de Assessor
      </b-form-checkbox>
    </b-form-group>

    <b-button
      id="success"
      variant="primary"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Confirmar
    </b-button>
    <b-button
      id="stop"
      variant="secondary"
      v-if="showButtons"
      v-on:click="$emit('stop')"
    >
      Parar
    </b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { parsePhoneNumber } from "libphonenumber-js";
import { getAdvisorByLink } from "../../datasource/profile";

export default {
  name: "email",
  props: ["recordedData", "showButtons", "filledByAdvisor"],
  data() {
    return {
      profileData: {
        fullname: "",
        cpf: "",
        email: "",
        birthdate: null,
        phones: [],
        preferredContact: "",
        requestAdvisorStatus: false,
        page: 1,
        financialAdvisor: {
          fullname: null,
          register: 0,
          company: null,
        },
      },
      submitted: false,
      phoneInput: "",
      phoneListLabel: "Telefones",
      advisorsLink: null,
    };
  },
  mounted() {
    this.advisorsLink = localStorage.getItem("advisorsLink");

    if (this.showButtons) {
      this.phoneListLabel = "Informe qual é o seu telefone preferencial";
    }
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.$forceUpdate();
    }
    if (!this.recordedData) {
      this.fillUpAdvisorData();
    }

    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
    formatDate(value) {
      return moment(value).format("DD/MM/YYYY");
    },
    validateEmail() {
      const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return re.test(String(this.profileData.email).toLowerCase());
    },
    validateCPF() {
      const cpf = this.profileData.cpf.replace(/\D/g, "");
      return cpf.length == 11;
    },
  },
  methods: {
    addPhone() {
      this.phoneInput = this.phoneInput.replace(/\D+/g, "");
      if (this.phoneInput) {
        const phoneParsed = parsePhoneNumber(this.phoneInput, "BR");
        this.profileData.phones.push(phoneParsed.formatNational());
        this.phoneInput = "";
      }
    },
    formatEmail(value) {
      return String(value)
        .toLowerCase()
        .trim();
    },
    fillUpAdvisorData() {
      if (this.advisorsLink || this.filledByAdvisor) {
        getAdvisorByLink(this.advisorsLink)
          .then((data) => {
            if (data.data.setAdvisorsLink.advisorsLinkData.advisor) {
              this.profileData.financialAdvisor.fullname =
                data.data.setAdvisorsLink.advisorsLinkData.advisor.fullname;
              this.profileData.financialAdvisor.register =
                data.data.setAdvisorsLink.advisorsLinkData.advisor.register;
              this.profileData.financialAdvisor.company =
                data.data.setAdvisorsLink.advisorsLinkData.advisor.company;

              this.profileData.acceptFinancialAdvisorContact = Boolean(
                this.profileData.financialAdvisor.fullname
              );
            }
          })
          .catch((error) => {
            const message = error.graphQLErrors[0].message;
            const options = {
              position: "top-center",
              duration: 4000,
              fullWidth: true,
              closeOnSwipe: true,
            };

            this.$toasted.error(message, options);
          });
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

* {
  font-family: "Raleway", sans-serif;
  font-size: 15pt;
}
p {
  font-size: 20pt;
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
#success,
#add {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
#success:hover,
#add:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}
#stop:hover {
  color: red;
  background-color: black;
  border-color: black;
}
</style>
