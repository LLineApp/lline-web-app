<template>
  <div>
    <NavBar />
    <div id="background">
      <h1>Prospecção de novos clientes</h1>
      <p>Pesquisar:</p>
      <b-input-group id="search-group">
        <b-form-input id="search-input" v-model="search" />
        <b-input-group-append>
          <b-button id="search-button" v-on:click="doSearch"
            ><i class="fa fa-search"></i
          ></b-button>
        </b-input-group-append>
      </b-input-group>

      <b-pagination
        id="pagination"
        first-number
        last-number
        per-page="10"
        v-model="currentPage"
        :total-rows="totalRows"
        v-on:input="doSearch"
      ></b-pagination>

      <b-table hover :items="items" :fields="fields" id="table"></b-table>
    </div>
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import { getProspectProfile, handleError } from "../../datasource/profile";
export default {
  name: "prospect",
  components: { NavBar },
  data() {
    return {
      search: "",
      currentPage: 1,
      totalRows: 1,
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
      ],
      items: [
        {
          id: 0,
          fullname: "",
          email: "",
          preferredContact: "",
        },
      ],
    };
  },
  mounted() {
    this.doSearch();
  },
  methods: {
    doSearch() {
      getProspectProfile(this.$cookies.get("token"), this.currentPage, this.search)
        .then((data) => {
          if (data.data.getProspectProfile) {
            this.currentPage = data.data.getProspectProfile.currentPage;
            this.totalRows = data.data.getProspectProfile.totalCount;
            this.items = data.data.getProspectProfile.portfolio;
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
  margin-bottom: 0.4%;
}

#background {
  padding-inline: 10%;
  padding-top: 3%;
}

#search-input {
  width: 95%;
}

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

#search-button:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}

#pagination {
  margin-top: 1.5%;
  text-align: center;
}
</style>
