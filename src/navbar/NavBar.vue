<template>
  <div>
    <AdvisorLink v-if="showAdvLink" v-on:ok="advLinkToggle" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="topnav" id="main-top-nav">
      <router-link to="/home" id="home" class="a">Início</router-link>
      <div id="advisor-div" class="dropdown">
        <button
          id="advisor-btn"
          class="dropbtn"
          v-if="userIsAdvisor"
        >
          Assessor
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <router-link to="/new"
            ><i class="fa fa-user-plus"></i> Incluir Novo Cliente</router-link
          >
          <router-link to="/portfolio"
            ><i class="fa fa-users"></i> Carteira de Clientes</router-link
          >
          <router-link to="/prospect"
            ><i class="fa fa-users"></i> Prospectar Novos Clientes</router-link
          >
          <router-link
            to=""
            @click.native="advLinkToggle()"
            ><i class="fa fa-external-link-square"></i> Link
            Assessor</router-link
          >
        </div>
      </div>
      <div id="manager-div" class="dropdown">
        <button
          id="manager-btn"
          class="dropbtn"
          v-if="userIsManager"
        >
          Gerente
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <router-link to="/advisorPortfolio"
            ><i class="fa fa-users"></i> Listar Clientes de um Assessor</router-link>
        </div>
      </div>
      <a
        id="dropdown"
        href="javascript:void(0);"
        class="icon"
        @click="responsiveSwitch()"
      >
        <i class="fa fa-bars"></i>
      </a>
      <div id="user-name-div" class="dropdown">
        <button id="user-name-btn" class="dropbtn">
          {{ userFirstName }}
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <router-link to="/profile"
            ><i class="fa fa-user"></i> Perfil</router-link
          >
          <router-link to="/login"
            ><i class="fa fa-sign-out"></i> Sair</router-link
          >
        </div>
      </div>
      <a
        id="dropdown"
        href="javascript:void(0);"
        class="icon"
        @click="responsiveSwitch()"
      >
        <i class="fa fa-bars"></i>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {
    AdvisorLink: require("../advisor/AdvisorLink").default,
  },
  data() {
    return {
      showAdvLink: false,
    };
  },
  mounted() {
    this.setActive();
  },
  computed: {
    ...mapGetters("profileData", ["profileData"]),
    userFirstName: function() {
      if (this.profileData.fullname) {
        return this.profileData.fullname.split(" ")[0];
      } else {
        return "Usuário";
      }
    },
    userIsAdvisor: function() {
      return this.profileData.isAdvisor & (this.profileData.level != 2);
    },
    userIsManager: function() {
      return this.profileData.level == 2;
    },
  },
  methods: {
    responsiveSwitch: function() {
      var topNavBar = document.getElementById("main-top-nav");
      if (topNavBar.className === "topnav") {
        topNavBar.className = "topnav responsive";
      } else {
        topNavBar.className = "topnav";
      }
    },
    setActive: function() {
      if (this.$parent.$options.name === "portfolio") {
        const aElementReference = document.getElementById("advisor-btn");
        if (aElementReference) {
          aElementReference.id += "-active";
        }
      } else {
        const aElementReference = document.getElementById(
          this.$parent.$options.name
        );
        if (aElementReference) {
          aElementReference.className += " active";
        }
      }
    },
    advLinkToggle: function() {
      this.showAdvLink = !this.showAdvLink;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

.topnav {
  background-color: black;
  overflow: hidden;
  outline: 0;
}

.topnav a {
  float: left;
  color: white;
  text-align: center;
  padding: 13.5px 16px;
  text-decoration: none;
  font-size: 17px;
  font-family: "Raleway", sans-serif;
}

.topnav a:hover,
.dropdown:hover .dropbtn,
#advisor-btn-active,
.topnav a.active {
  background-color: #26fed5;
  color: black;
}

#advisor-btn-active {
  border-color: #26fed5;
}

#dropdown:hover {
  background-color: black;
  color: #26fed5;
}

.topnav .icon {
  display: none;
}

#user-name-div {
  float: right;
}

#advisor-div, 
#manager-div,
#client-div {
  float: left;
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: "Raleway", sans-serif;
  margin: 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: black;
  min-width: 160px;
  box-shadow: 0px 2px 6px 0px black;
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  font-family: "Raleway", sans-serif;
}

.dropdown:hover .dropdown-content {
  display: block;
  position: fixed;
}

@media screen and (max-width: 600px) {
  #user-name-div,
  #advisor-div,
  #manager-div,
  #client-div,
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a:first-child {
    width: 100%;
    text-align: center;
  }
  .topnav a.icon {
    float: right;
    display: block;
  }
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive a.icon {
    position: absolute;
    right: 0;
    top: 0;
  }

  .topnav.responsive a,
  .topnav.responsive #user-name-div,
  .topnav.responsive #advisor-div,
  .topnav.responsive #client-div,
  .topnav.responsive #manager-div {
    float: none;
    display: block;
    text-align: center;
  }

  .topnav.responsive #user-name-btn,
  .topnav.responsive #advisor-btn,
  .topnav.responsive .dropdown-content {
    width: 100%;
  }
  #dropdown {
    position: absolute;
    right: 0;
    color: black;
  }
}
</style>
