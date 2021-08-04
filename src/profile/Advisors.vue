<template>
  <div id="main">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div id="header">
      <p>Assessores</p>
    </div>
    <div id="advisors-div">
      <b-table
        id="advisors-table"
        :items="this.recordedData.advisors"
        :fields="fields"
        hover
      >
        <template #cell(actions)="row">
          <b-button
            v-if="!row.item.mainAdvisor && showButtons"
            size="sm"
            @click="removeAdvisor(recordedData.id, recordedData.advisors[row.index].id)"
            class="mr-1"
          >
            Remover
          </b-button>
          <b-button
            size="sm"
            @click="
              changeMainAdvisor(recordedData.id, recordedData.advisors[row.index].id)
            "
            class="mr-1"
            v-if="showButtons"
          >
            Tornar Principal
          </b-button>
        </template>
      </b-table>
      <b-form-input
        id="financialAdvisor-input"
        ref="financialAdvisorInput"
        list="advisors-list"
        v-if="showButtons"
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
      <b-button
        id="add-advisor"
        size="sm"
        @click="addAdvisor(recordedData.id)"
        class="mr-1"
        v-if="showButtons"
      >
        Adicionar Assessor
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getAllAdvisors,
  addAdvisorToClient,
  removeAdvisorFromProfile,
  changeMainAdvisorOfProfile,
  handleError,
} from "../../datasource/profile";

export default {
  name: "advisors",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      advisorsListKey: 0,
      advisorsList: [],
      clientAdvisorsListKey: 0,
      clientAdvisorsList: [],
    };
  },
  mounted() {
    this.loadAdvisorsList();
  },
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
    changeMainAdvisor(profileid, advisorid) {
      changeMainAdvisorOfProfile(this.loginData.token, profileid, advisorid).then(
        (data) => {
          alert(data.data.changeMainAdvisorOfProfile.message.text);
          this.$emit("changeAdv");
        }
      );
    },
    removeAdvisor(profileid, advisorid) {
      removeAdvisorFromProfile(this.loginData.token, profileid, advisorid).then(
        (data) => {
          alert(data.data.removeAdvisorFromProfile.message.text);
          this.$emit("changeAdv");
        }
      );
    },
    addAdvisor(profileid) {
      const advisorInput = document.getElementById("financialAdvisor-input").value;
      const advisorId = document.querySelector(
        "#advisors-list option[value='" + advisorInput + "']"
      ).dataset.id;
      addAdvisorToClient(this.loginData.token, profileid, advisorId).then((data) => {
        alert(data.data.addAdvisorToProfile.message.text);
        this.$emit("changeAdv");
      });
    },
  },
  computed: {
    ...mapGetters("loginData", ["loginData"]),
    ...mapGetters("profileData", ["profileData"]),
    fields() {
      const listOfFields = [];
      listOfFields.push({ key: "fullname", label: "Nome" });
      listOfFields.push({ key: "company", label: "Empresa" });

      if (this.showButtons) {
        listOfFields.push({ key: "actions", label: "Ações" });
      }
      return listOfFields;
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
}

#advisors-div {
  margin-top: 2%;
}

#financialAdvisor-input {
  width: 50%;
  margin: 0;
  padding: 0;
  font-size: 15pt;
  float: left;
}

#add-advisor {
  margin-left: 1%;
}
</style>
