<template>
  <div id="side-menu-div">
    <ul class="nav flex-column" id="side-menu">
      <li
        class="nav-item"
        v-for="sideMenuItem in this.sideMenuItems"
        :key="sideMenuItem.key"
      >
        <a
          class="nav-link"
          :style="sideMenuItem.style"
          href="#"
          @click="menuOptionSwitch(sideMenuItem.name)"
          >{{ sideMenuItem.text }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sideMenuDataSheet",
  props: ["activeComponentName",],
  data() {
    return {
      sideMenuItems: [
        {
          text: "Dados Pessoais",
          name: "email",
          style: "",
          class: "nav-link",
        },
        { text: "Parentesco", name: "parents", style: "", class: "nav-link" },
        { text: "Matrimonial", name: "marital", style: "", class: "nav-link" },
        { text: "Filhos", name: "children", style: "", class: "nav-link" },
        {
          text: "Situação Profisional",
          name: "professionalSituation",
          style: "",
          class: "nav-link",
        },
        {
          text: "Bens Imóveis",
          name: "immovableProperties",
          style: "",
          class: "nav-link",
        },
        { text: "Saúde", name: "health", style: "", class: "nav-link" },
        {
          text: "Situação Financeira",
          name: "financialSituation",
          style: "",
          class: "nav-link",
        },
        {
          text: "Experiência em Investimentos",
          name: "investorExperiences",
          style: "",
          class: "nav-link",
        },
        { text: "Seguros", name: "insurances", style: "", class: "nav-link" },
        {
          text: "Seguros Pessoais",
          name: "personalPrivateSecurities",
          style: "",
          class: "nav-link",
        },
        {
          text: "Planos e Projetos",
          name: "plansAndProjects",
          style: "",
          class: "nav-link",
        },
        {
          text: "Carteira de Investimentos",
          name: "investmentPortfolios",
          style: "",
          class: "nav-link",
        },
        {
          text: "Títulos de Renda Fixa",
          name: "fixedIncomeSecurities",
          style: "",
          class: "nav-link",
        },
        {
          text: "Conhecimentos",
          name: "knowledge",
          style: "",
          class: "nav-link",
        },
        {
          text: "Informações Adicionais",
          name: "additionalInformations",
          style: "",
          class: "nav-link",
        },
        {
          text: "Assessor Financeiro",
          name: "financialAdvisor",
          style: "",
          class: "nav-link",
        },
      ],
    };
  },
  watch: {
    activeComponentName: function () {
      this.sideMenuItems.forEach((sideMenuItem) => {
        sideMenuItem.class = "nav-link;";
        if (sideMenuItem.name == this.activeComponentName) {
          sideMenuItem.class = "nav-link active";
        }
      });
    },
  },
  methods: {
    menuOptionSwitch: function (name) {
      this.$parent.setActiveComponent(name);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

#side-menu-div {
  width: 20%;
  float: left;
  padding-top: 4%;
}
.a {
  font-size: 16pt;
  font-family: "Raleway", sans-serif;
}
.nav-link {
  padding: 0.4rem;
  color: gray;
}

.nav-link:hover {
  color: black;
  background-color: lightgray;
}

.nav-link.active {
  color: black;
  background-color: #26fed5;
}
</style>
