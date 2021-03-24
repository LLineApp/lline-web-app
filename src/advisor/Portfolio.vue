<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <b-form-group
      id="email-group"
      label="Pesquisar por"
      label-for="search-input"
    >
      <b-form-input
        id="search-input"
        v-model="search"
      />
      <b-input-group-append>
        <b-button id="search-button" variant="primary" v-on:click="doSearch"
          ><i class="fa fa-search"></i
        ></b-button>
      </b-input-group-append>
    </b-form-group>

    <b-pagination
      first-number
      last-number
      per-page="10"
      v-model="currentPage"
      :total-rows="totalRows"
      v-on:input="doSearch"
    ></b-pagination>

    <b-table hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import { getAdvisorsPortfolio, handleError } from "../../datasource/profile";
export default {
  name: "portfolio",
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
  methods: {
    doSearch() {
      getAdvisorsPortfolio(this.currentPage)
        .then((data) => {
          if (data.data.getAdvisorsPortfolio) {
            this.currentPage = data.data.getAdvisorsPortfolio.currentPage;
            this.totalRows = data.data.getAdvisorsPortfolio.totalCount;
            this.items = data.data.getAdvisorsPortfolio.portfolio;
          }
        })
        .catch((error) => {
          handleError(error.graphQLErrors[0].message);
        });
    },
  },
};
</script>

<style></style>
