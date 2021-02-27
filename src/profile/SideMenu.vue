<template>
  <div id="side-menu-div">
    <ul class="nav flex-column" id="side-menu">
      <li
        class="nav-item"
        v-for="sideMenuItem in this.sideMenuItems"
        :key="sideMenuItem.key"
      >
        <a class="nav-link disabled" :style="sideMenuItem.style" href="#">{{
          sideMenuItem.text
        }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sideMenu",
  props: ["activeComponentName"],
  data() {
    return {
      sideMenuItems: [
        { text: "Dados Pessoais", name: "email", style: "" },
        { text: "Parentesco", name: "parents", style: "" },
        { text: "Matrimonial", name: "marital", style: "" },
        { text: "Filhos", name: "children", style: "" },
        {
          text: "Situação Profisional",
          name: "professionalSituation",
          style: "",
        },
        { text: "Bens Imóveis", name: "immovableProperties", style: "" },
        { text: "Saúde", name: "health", style: "" },
        { text: "Situação Financeira", name: "financialSituation", style: "" },
        {
          text: "Experiência em Investimentos",
          name: "investorExperiences",
          style: "",
        },
        { text: "Seguros", name: "insurances", style: "" },
        {
          text: "Seguros Pessoais",
          name: "personalPrivateSecurities",
          style: "",
        },
        { text: "Planos e Projetos", name: "plansAndProjects", style: "" },
        {
          text: "Carteira de Investimentos",
          name: "investmentPortfolios",
          style: "",
        },
        {
          text: "Títulos de Renda Fixa",
          name: "fixedIncomeSecurities",
          style: "",
        },
        { text: "Conhecimentos", name: "knowledge", style: "" },
        {
          text: "Informações Adicionais",
          name: "additionalInformations",
          style: "",
        },
        { text: "Assessor Financeiro", name: "financialAdvisor", style: "" },
      ],
    };
  },
  watch: {
    activeComponentName: function () {
      this.sideMenuItems.forEach((sideMenuItem) => {
        sideMenuItem.style = "font-weight: normal;";
        if (sideMenuItem.name == this.activeComponentName) {
          sideMenuItem.style = "font-weight: bold; color: #26fed5";
        }
      });
    },
  },
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
}
</style>
