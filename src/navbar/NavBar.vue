<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="topnav" id="main-top-nav">
      <a href="/home" id="home" class="a">Home</a>
      <a href="/profile" id="profileDataSheet" class="a">Profile</a>
      <div id="advisor-div" class="dropdown">
        <button id="advisor-btn" class="dropbtn">
          Acessor
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="#"><i class="fa fa-users"></i> Clientes</a>
          <a href="#"><i class="fa fa-user-plus"></i> Novos Clientes</a>
          <a href="#"
            ><i
              class="fa fa-external-link-square"
              @click="advisorLinkSwitch()"
            ></i>
            Link Acessor</a
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
          <a href="/login"><i class="fa fa-sign-out"></i> Sair</a>
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
    <div id="advisor-link-div" v-if="advisorLink">
      <p id="link-message">Esse é seu link de acessor</p>
      <div id="ad-div-1">
        <b-form-input readonly id="advisor-link" type="url" />
        <b-button class="fa fa-clipboard fa-lg" id="copy-link"></b-button>
      </div>
      <div id="ad-div-2">
        <b-button id="ok" @click="advisorLinkSwitch()">Ok</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userFirstName: "",
      canShow: true,
      advisorLink: true,
    };
  },
  computed: {},

  mounted() {
    this.userFirstName = "Usuário";
    this.canShow = localStorage.getItem("user");
    this.setActive();
    this.advisorLink = false;
  },
  created() {},
  methods: {
    responsiveSwitch: function () {
      var topNavBar = document.getElementById("main-top-nav");
      if (topNavBar.className === "topnav") {
        topNavBar.className = "topnav responsive";
      } else {
        topNavBar.className = "topnav";
      }
    },
    setActive: function () {
      var aElementReference = document.getElementById(
        this.$parent.$options.name
      );
      
      aElementReference.className += " active";
    },
    advisorLinkSwitch: function () {
      this.advisorLink = !this.advisorLink;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

.topnav {
  background-color: black;
  overflow: hidden;
}

.topnav a {
  float: left;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  font-family: "Raleway", sans-serif;
}

.topnav a:hover,
.dropdown:hover .dropbtn,
.topnav a.active {
  background-color: #26fed5;
  color: black;
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

#ad-div-1,
#ad-div-2 {
  width: 100%;
  height: 25%;
}

#advisor-link-div {
  width: 20%;
  height: 20%;
  float: left;
  align-self: center;
  position: absolute;
  z-index: 99;
  background-color: black;
  border-radius: 25px;
  color: white;
}

#link-message {
  width: 100%;
  text-align: center;
  padding-top: 5%;
  font-size: 20px;
  font-family: "Raleway", sans-serif;
}

#advisor-link {
  float: left;
  width: 60%;
  background-color: #26fed5;
  border: 0;
  margin-left: 10%;
  height: 90%;
}

#copy-link {
  float: left;
  margin-inline: 5%;
  color: black;
  background-color: #26fed5;
  border: 0;
  height: 90%;
}

#ok {
  float: left;
  margin-left: 10%;
  margin-top: 3%;
  color: black;
  background-color: #26fed5;

  border: 0;
}

@media screen and (max-width: 600px) {
  #user-name-div,
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
  .topnav.responsive #user-name-div {
    float: none;
    display: block;
    text-align: center;
  }

  .topnav.responsive #user-name-btn,
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
