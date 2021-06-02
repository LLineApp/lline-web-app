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
        ref="email"
        v-model="profileData.email"
        :state="validateEmail"
        :formatter="formatEmail"
        v-on:blur="checkIfEmailIsBeingUsed()"
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
      v-if="isClientData"
      id="cpf-group"
      label="CPF"
      label-for="cpf-input"
      :state="validateCPF"
    >
      <b-form-input
        id="cpf-input"
        ref="cpf"
        v-model="profileData.cpf"
        :state="validateCPF"
        v-on:blur="checkIfCPFIsBeingUsed()"
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

    <b-form-group
      label="Informe qual telefone preferencial"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-radio-group
        id="phone-radio-slots"
        v-model="profileData.preferredContact"
        :options="profileData.phones"
        :aria-describedby="ariaDescribedby"
        name="radio-options-slots"
      />
    </b-form-group>

    <b-button
      id="success"
      variant="primary"
      v-if="showButtons"
      v-on:click="doDone()"
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
import {
  getAdvisorByLink,
  getSomeFieldsFromProfile,
  getAnyProfile,
} from "../../datasource/profile";

export default {
  name: "email",
  props: ["recordedData", "showButtons", "isClientData"],
  data() {
    return {
      profileData: {
        fullname: "",
        cpf: "",
        email: "",
        birthdate: null,
        phones: [],
        preferredContact: "",
        page: 2,
      },
      submitted: false,
      phoneInput: "",
      advisorsLink: null,
      isAdvisor: false,
    };
  },
  mounted() {
    this.advisorsLink = sessionStorage.getItem("advisorsLink");

    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      if (this.profileData.fullname == "Usuário") {
        this.profileData.fullname = "";
      }
      this.profileData.page = 2;
      this.$forceUpdate();
    }

    this.fillUpAdvisorData();

    if (!this.isClientData) {
      this.checkIfUserIsAdvisor();
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  updated() {
    if (!this.showButtons) {
      this.$emit("done", this.profileData);
    }
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
      if ((this.advisorsLink || this.isClientData) && this.showButtons) {
        getAdvisorByLink(this.$cookies.get("token"), this.advisorsLink)
          .then((data) => {
            if (data.data.setAdvisorsLink.advisorsLinkData.advisor) {
              this.profileData["advisors"] = [
                parseInt(data.data.setAdvisorsLink.advisorsLinkData.advisor.id),
              ];

              this.profileData["financialAdvisor"] = {};
              this.profileData.financialAdvisor["fullname"] =
                data.data.setAdvisorsLink.advisorsLinkData.advisor.fullname;
              this.profileData.financialAdvisor["register"] =
                data.data.setAdvisorsLink.advisorsLinkData.advisor.register;
              this.profileData.financialAdvisor["company"] =
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
    doDone() {
      if (this.isAdvisor) {
        this.askUserToContinue();
      } else {
        this.$emit("done", this.profileData);
      }
    },
    askUserToContinue() {
      this.$bvModal
        .msgBoxConfirm(
          "Identifiquei em nossos registros que você é um assessor. Você pode continuar o seu cadastro ou terminar agora se assim preferir.",
          {
            title: "Confirmação",
            size: "md",
            buttonSize: "md",
            okVariant: "success",
            okTitle: "Terminar",
            cancelTitle: "Continuar",
            footerClass: "p-2",
            hideHeaderClose: true,
            centered: true,
          }
        )
        .then((value) => {
          this.profileData.page = value ? 18 : 2;
          this.$emit("done", this.profileData);
        })
        .catch((err) => {});
    },
    checkIfUserIsAdvisor() {
      getSomeFieldsFromProfile(this.$cookies.get("token"), ["isAdvisor"])
        .then((data) => {
          if (data.data.getProfile[0]) {
            this.isAdvisor = data.data.getProfile[0].isAdvisor;
          }
        })
        .catch((error) => {
          handleError(error.graphQLErrors[0].message);
        });
    },
    checkIfEmailIsBeingUsed() {
      if (this.profileData.email)
        getAnyProfile(this.$cookies.get("token"), this.profileData.email)
          .then((data) => {
            if (data.data.getAnyProfile) {
              if (data.data.getAnyProfile.totalCount > 0) {
                this.$bvModal
                  .msgBoxConfirm(
                    `O e-mail ${this.profileData.email} já está sendo utilizado em um outro cadastro, deseja continuar?`,
                    {
                      title: "Confirmação",
                      size: "md",
                      buttonSize: "md",
                      okVariant: "warning",
                      okTitle: "Sim",
                      cancelTitle: "Não",
                      footerClass: "p-2",
                      hideHeaderClose: true,
                      centered: true,
                    }
                  )
                  .then((value) => {
                    if (!value) {
                      this.profileData.email = "";
                      this.$refs.email.focus();
                    }
                  })
                  .catch((err) => {});
              }
            }
          })
          .catch((error) => {
            handleError(error.errors[0].message);
          });
    },
    checkIfCPFIsBeingUsed() {
      if (this.profileData.cpf)
        getAnyProfile(this.$cookies.get("token"), this.profileData.cpf)
          .then((data) => {
            if (data.data.getAnyProfile) {
              if (data.data.getAnyProfile.totalCount > 0) {
                this.$bvModal
                  .msgBoxOk(
                    `O CPF ${this.profileData.cpf} já está sendo utilizado em um outro cadastro, no usuário ${data.data.getAnyProfile.profiles[0].fullname}.`,
                    {
                      title: "Aviso",
                      size: "md",
                      buttonSize: "md",
                      okVariant: "warning",
                      footerClass: "p-2",
                      hideHeaderClose: true,
                      centered: true,
                    }
                  )
                  .then((value) => {
                    this.profileData.cpf = "";
                    this.$refs.cpf.focus();
                  })
                  .catch((err) => {});
              }
            }
          })
          .catch((error) => {
            handleError(error.errors[0].message);
          });
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
