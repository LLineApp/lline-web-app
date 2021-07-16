<template>
  <div id="main">
    <NavBar />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="header">
      <h1 id="client-logo">Tiago</h1>
      <p>Assessores</p>
    </div>
    <div id="advisors-div">
      <b-table id="advisors-table" :items="clientAdvisorsList" :fields="fields" hover>
        <template #cell(actions)="row">
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Remover
          </b-button>
          <b-button
            size="sm"
            @click="info(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Tornar Principal
          </b-button>
        </template>
      </b-table>
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
          v-bind:value="advisor.id+' - '+advisor.fullname"
          ></option
        >
      </datalist>
    </b-form-group>
      <b-button id="add-advisor" size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
        Adicionar Assessor
      </b-button>
    </div>
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import { mapGetters, mapActions } from "vuex";
import { getAllAdvisorsByClient, getAllAdvisors, handleError } from "../../datasource/profile";

export default {
  name: "advisors",
  components: { NavBar },
  data() {
    return {
      fields: [
        { key: "cpf", label: "CPF" },
        { key: "fullname", label: "Nome" },
        { key: "company", label: "Empresa" },
        { key: "actions", label: "Ações" },
      ],
      advisorsListKey: 0,
      advisorsList: [],
      clientAdvisorsListKey: 0,
      clientAdvisorsList: [],
    };
  },
  mounted() {
    this.loadAdvisorsList();
    this.loadClientAdvisorsList();
  },
  updated() {},
  computed: {
    ...mapGetters("advisorData", ["advisorData"]),
    ...mapGetters("loginData", ["loginData"]),
  },
  watch: {},
  methods: {
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

    loadClientAdvisorsList() {
      getAllAdvisorsByClient(this.loginData.token, "19176206801")
        .then((data) => {
          if (data.data.getProfile.advisors) {
            this.clientAdvisorsList = data.data.getProfile.advisors;
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
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

* {
  font-family: "Raleway", sans-serif;
}

#header {
  margin-top: 5%;
  margin-inline: 10%;
}

#advisors-div {
  margin-top: 2%;
  margin-inline: 10%;
}

#financialAdvisor-input{
  width: 50%;
  margin: 0;
  padding: 0;
  font-size: 15pt;
  float: left;
}

#add-advisor{
  margin-left: 1%;
}
</style>
