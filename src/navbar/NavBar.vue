<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="topnav" id="myTopnav">
      <a href="#" class="active">Home</a>
      <a href="#">Link</a>
      <a href="#">Link</a>
      <div id="user-name-div" class="dropdown">
        <button id="user-name-btn" class="dropbtn">
          {{ userFirstName }}
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-content">
          <a href="#link1">Profile</a>
          <a href="/login">Sair <i class="fa fa-sign-out"></i></a>
        </div>
      </div>
      <a id="dropdown" href="javascript:void(0);" class="icon" @click="myFunction()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userFirstName: "",
      canShow: true,
    };
  },
  computed: {},
  mounted() {
    this.userFirstName = "Usuário";
    this.canShow = localStorage.getItem("user");
  },
  created() {},
  methods: {
    myFunction: function () {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className = "topnav responsive";
      } else {
        x.className = "topnav";
      }
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
  background-color: turquoise;
  color: black;
}

#dropdown:hover{
  background-color: black;
  color: turquoise;
}

.topnav .icon {
  display: none;
}

/*Drop down shit*/

.dropdown {
  float: right;
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
}

.dropdown:hover .dropdown-content {
  display: block;
  position: fixed;
}

@media screen and (max-width: 600px) {
  #user-name-div,
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a:first-child{
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
  
  .topnav.responsive a, .topnav.responsive #user-name-div {
    float: none;
    display: block;
    text-align: center;
  }

  .topnav.responsive #user-name-btn, .topnav.responsive .dropdown-content{
    width: 100%;
  }
  #dropdown{
    position: absolute;
    right: 0;
    color: black;
  }
}
</style>