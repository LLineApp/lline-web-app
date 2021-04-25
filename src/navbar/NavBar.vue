<template>
  <div>
    <AdvisorLink v-if="ShowAdvLink" v-on:ok="AdvLinkToggle" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="topnav" id="main-top-nav">
      <a href="/home" id="home" class="a">Home</a>
      <div id="advisor-div" class="dropdown">
        <button id="advisor-btn" class="dropbtn" v-if="userIsAdvisor">
          Assessor
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="/new"
            ><i class="fa fa-user-plus"></i> Incluir Novo Cliente</a
          >
          <a href="/portfolio"
            ><i class="fa fa-users"></i> Carteira de Clientes</a
          >
          <a href="/prospect"
            ><i class="fa fa-users"></i> Prospectar Novos Clientes</a
          >
          <a href="#" @click="AdvLinkToggle()"
            ><i class="fa fa-external-link-square"></i> Link Assessor</a
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
      <div id="user-name-div" class="dropdown">
        <button id="user-name-btn" class="dropbtn">
          {{ userFirstName }}
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="/profile"><i class="fa fa-user"></i> Perfil</a>
          <a href="#" @click="logout()"><i class="fa fa-sign-out"></i> Sair</a>
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
import AdvisorLink from "../advisor/AdvisorLink";

export default {
  components: { AdvisorLink },
  data() {
    return {
      ShowAdvLink: false,
      userData: {
        fullname: "Usuário",
        isAdvisor: false,
      },
    };
  },
  mounted() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      this.userData = userData;
    }
    this.setActive();
  },
  computed: {
    userFirstName: function() {
      if (this.userData.fullname) {
        return this.userData.fullname.split(" ")[0];
      } else {
        return "Usuário";
      }
    },
    userIsAdvisor: function() {
      return this.userData.isAdvisor;
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
    AdvLinkToggle: function() {
      this.ShowAdvLink = !this.ShowAdvLink;
    },
    logout: function() {
      localStorage.removeItem("user");
      this.$cookies.remove("token");
      this.$cookies.remove("cpf");
      sessionStorage.removeItem("userData");
      sessionStorage.removeItem("profileData");
      sessionStorage.removeItem("lastSearchParams");
      this.$router.push("/login");
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

#advisor-div {
  float: left;
}

#advisor-div {
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
  .topnav.responsive #advisor-div {
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
