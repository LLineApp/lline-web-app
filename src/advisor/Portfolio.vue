<template>
  <div>
    <NavBar />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="background">
      <h1>Carteira de Clientes</h1>
      <p>Pesquisar:</p>
      <b-input-group id="search-group">
        <b-form-input
          id="search-input"
          v-model="searchData.filter"
          v-on:keyup.enter="newSearch()"
        />
        <b-input-group-append>
          <b-button id="search-button" v-on:click="newSearch"
            ><i class="fa fa-search"></i
          ></b-button>
        </b-input-group-append>
      </b-input-group>

      <b-pagination
        id="pagination"
        :key="searchData.page"
        first-number
        last-number
        per-page="10"
        :value="searchData.page"
        :total-rows="searchData.totalRows"
        v-on:input="doSearch"
      ></b-pagination>

      <b-table hover :items="searchData.items" :fields="fields" id="table">
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
import { getAdvisorsPortfolio, handleError } from "../../datasource/profile";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "portfolio",
  components: { NavBar },
  data() {
    return {
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
    if (this.searchData.items.length == 0) {
      this.search();
    }
  },
  computed: {
    ...mapGetters("loginData", ["loginData"]),
    ...mapGetters("searchData", ["searchData"]),
  },
  methods: {
    ...mapActions("searchData", ["updateSearchData"]),
    newSearch() {
      this.doSearch(1);
    },
    doSearch(page) {
      this.updateSearchData({
        updates: {
          page: page,
        },
      });
      this.search();
    },
    search() {
      getAdvisorsPortfolio(
        this.loginData.token,
        this.searchData.page,
        this.searchData.filter
      )
        .then((data) => {
          if (data.data.getAdvisorsPortfolio) {
            this.updateSearchData({
              updates: {
                page: data.data.getAdvisorsPortfolio.currentPage,
                totalRows: data.data.getAdvisorsPortfolio.totalCount,
                items: data.data.getAdvisorsPortfolio.portfolio,
              },
            });
          }
        })
        .catch((error) => {
          handleError(error.graphQLErrors[0].message);
        });
    },
    showClientProfile(cpf) {
      this.$router.push({
        name: "ProfileDataSheet",
        params: { clientCpf: cpf },
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
</style>
