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
    activeComponentName: function() {
      this.sideMenuItems.forEach((sideMenuItem) => {
        sideMenuItem.style = "font-weight: normal;";
        if (sideMenuItem.name == this.activeComponentName) {
          sideMenuItem.style = "font-weight: bold; color: red";
        }
      });
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
#main {
  width: 100%;
  padding-inline: 5%;
}
#side-menu-div {
  width: 30%;
  float: left;
  padding-top: 4%;
}
#dados-div {
  width: 100%;
  float: right;
}
#welcome-div {
  width: 100%;
  float: right;
}
.a.active {
  background-color: #26fed5;
  color: black;
}
.a {
  font-size: 16pt;
  font-family: "Raleway", sans-serif;
}
.a.disabled {
  color: #26fed5;
}
#welcome-h1,
#welcome-p {
  font-family: "Raleway", sans-serif;
  text-align: center;
  padding-top: 2%;
  color: black;
}
#welcome-h1 {
  font-size: 60pt;
}
#welcome-p {
  font-size: 30pt;
  padding-bottom: 2%;
}
</style>
