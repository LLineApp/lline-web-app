<template>
  <div>
    <NavBar />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="background">
      <h1>Carteira de Clientes</h1>
      <p>Selecione o Assessor</p>
      <b-form-input
        id="financialAdvisor-input"
        ref="financialAdvisorInput"
        list="advisors-list"
      />
      <datalist id="advisors-list">
        <option
          v-for="advisor in advisorsList"
          v-bind:key="advisor.id"
          v-bind:data-id="advisor.id"
          v-bind:data-company="advisor.company"
          v-bind:data-fullname="advisor.fullname"
          v-bind:data-register="advisor.register"
          v-bind:data-cpf="advisor.cpf"
          v-bind:value="advisor.id + ' - ' + advisor.fullname"
        ></option>
      </datalist>
      <b-button id="search-clients" size="sm" @click="getClientList()">
        Consultar
      </b-button>
      <JsonExcel
        size="sm"
        v-if="clientAdvisorsList.length > 0"
        id="export-data"
        class="btn btn-default"
        :data="clientAdvisorsList"
        :fields="json_fields"
        worksheet="Clientes"
        :name="filename"
      >
        Exportar
      </JsonExcel>
      <p>Total de Clientes: {{ clientAdvisorsList.length }}</p>
      <b-table hover :items="clientAdvisorsList" :fields="fields" id="table">
        <template #cell(showProfile)="item">
          <b-button
            id="show-client-profile-button"
            v-on:click="showClientProfile(item.item.cpf)"
          >
            Mostrar
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import { mapGetters } from "vuex";
import {
  getAllAdvisors,
  GetAdvisorPortfolioByCpf,
  handleError,
} from "../../datasource/profile";
import JsonExcel from "vue-json-excel";

export default {
  name: "advisorPortfolio",
  components: { NavBar, JsonExcel },
  props: ["recordedData"],
  data() {
    return {
      advisorsListKey: 0,
      advisorsList: [],
      clientAdvisorsListKey: 0,
      clientAdvisorsList: [],
      fields: [
        {
          key: "fullname",
          label: "Nome",
          sortable: true,
        },
        {
          key: "cpf",
          label: "CPF",
          sortable: true,
        },
        {
          key: "showProfile",
          label: "Perfil",
          sortable: false,
        },
      ],
      json_fields: {
        Código: "id",
        "Nome completo": "fullname",
        CPF: "cpf",
        "E-mail": "email",
        Telefone: "preferredContact",
      },
    };
  },
  mounted() {
    this.loadAdvisorsList();
  },
  computed: {
    ...mapGetters("loginData", ["loginData"]),
    filename: () => {
      var advisorInput = document.getElementById("financialAdvisor-input")
        .value;
      var advisorName = document.querySelector(
        "#advisors-list option[value='" + advisorInput + "']"
      ).dataset.fullname;
      return advisorName + ".xlsx";
    },
  },
  methods: {
    showClientProfile(cpf) {
      this.$router.push({
        name: "ProfileDataSheet",
        params: { clientCpf: cpf },
      });
    },
    loadAdvisorsList() {
      getAllAdvisors(this.loginData.token)
        .then((data) => {
          if (data.data.getAdvisors.advisorsList) {
            this.advisorsList = data.data.getAdvisors.advisorsList;
            this.advisorsList.sort((a, b) => a.fullname.localeCompare(b.fullname));
            this.$forceUpdate();
          }
        })
        .catch((error) => {
          handleError(error.graphQLErrors[0].message);
        });
    },
    getClientList() {
      var advisorInput = document.getElementById("financialAdvisor-input").value;
      var advisorCpf = document.querySelector(
        "#advisors-list option[value='" + advisorInput + "']"
      ).dataset.cpf;
      GetAdvisorPortfolioByCpf(this.loginData.token, advisorCpf, "")
        .then((data) => {
          if (data.data.getClientsPortfolioFromAdvisor.portfolio) {
            this.clientAdvisorsList = data.data.getClientsPortfolioFromAdvisor.portfolio;
            this.$forceUpdate();
          }
        })
        .catch((error) => {
          handleError(error.graphQLErrors[0].message);
        });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Raleway", sans-serif;
}

p {
  margin-top: 0.4%;
  margin-bottom: 0.4%;
}

#background {
  padding-inline: 10%;
  padding-top: 3%;
}

#search-input {
  width: 95%;
}

#show-client-profile-button,
#search-clients,
#export-data {
  right: 0;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}

.page-item {
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}

#show-client-profile-button:hover,
#search-clients:hover,
#export-data:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}

#pagination {
  margin-top: 1.5%;
  text-align: center;
}

#financialAdvisor-input {
  width: 50%;
  margin: 0;
  padding: 0;
  font-size: 15pt;
  float: left;
}

#search-clients,
#export-data {
  margin-left: 1%;
  margin-right: 0;
}
</style>
