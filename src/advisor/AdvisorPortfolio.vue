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
          v-bind:value="advisor.id + ' - ' + advisor.fullname"
        ></option>
      </datalist>
      <b-button id="search-clients" size="sm" @click="" class="mr-1">
        Consultar Clientes </b-button
      ><b-table hover :items="searchData.items" :fields="fields" id="table">
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
  getAdvisorsPortfolio,
  handleError,
} from "../../datasource/profile";

export default {
  name: "advisorPortfolio",
  components: { NavBar },
  props: ["recordedData"],
  data() {
    return {
      advisorsListKey: 0,
      advisorsList: [],
      fields: [
        {
          key: "fullname",
          label: "Nome",
          sortable: true,
        },
        {
          key: "email",
          label: "E-mail",
          sortable: true,
        },
        {
          key: "preferredContact",
          label: "Telefone",
          sortable: true,
        },
        {
          key: "showProfile",
          label: "Perfil",
          sortable: false,
        },
      ],
    };
  },
  mounted() {
    this.loadAdvisorsList();
  },
  computed: {
    ...mapGetters("loginData", ["loginData"]),
    ...mapGetters("searchData", ["searchData"]),
    ...mapGetters("profileData", ["profileData"]),
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
            this.$forceUpdate();
          }
        })
        .catch((error) => {
          handleError(error.graphQLErrors[0].message);
        });
    },
    getClientList(cpf) {},
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
#search-button {
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
#search-button:hover {
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

#search-clients {
  margin-left: 1%;
  margin-bottom: 2%;
}
</style>
