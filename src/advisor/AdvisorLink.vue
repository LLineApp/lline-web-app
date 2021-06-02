<template>
  <div id="background">
    <div id="advisor-link-div">
      <p id="link-message">Esse é seu link de assessor</p>
      <b-input-group id="ig-adv-link">
        <b-form-input readonly type="url" v-model="this.link" id="link-input" />
        <b-input-group-append v-on:click="copyLink">
          <b-button class="fa fa-clipboard fa-lg" id="copy"></b-button>
        </b-input-group-append>
      </b-input-group>
      <b-button v-on:click="$emit('ok')" id="ok">Ok</b-button>
    </div>
  </div>
</template>

<script>
import { getAdvisorLink } from "../../datasource/profile";
import { mapGetters } from "vuex";

export default {
  name: "advisor-link",
  data() {
    return {
      link: "",
    };
  },
  mounted() {
    getAdvisorLink(this.loginData.token)
      .then((data) => {
        if (data.data.setAdvisorsLink.advisorsLinkData.link) {
          const protocol = window.location.protocol;
          const hostname = window.location.hostname;
          const port =
            hostname == "localhost" ? `:${window.location.port}` : "";
          const link = data.data.setAdvisorsLink.advisorsLinkData.link;
          this.link = `${protocol}//${hostname}${port}/register?advisor=${link}`;
          this.$forceUpdate();
        }
      })
      .catch((error) => {
        const message = error.graphQLErrors[0].message;
        const options = {
          position: "top-center",
          duration: 4000,
          fullWidth: true,
          closeOnSwipe: true,
        };

        this.$toasted.error(message, options);
      });
  },
  computed: {
    ...mapGetters("loginData", ["loginData"]),
  },
  methods: {
    copyLink: function () {
      var copyIcon = document.getElementById("copy");
      copyIcon.id = "copy1";
      navigator.clipboard.writeText(this.link);
    },
  },
};
</script>

<style scoped>
#background {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  z-index: 98;
}

#advisor-link-div {
  width: 40%;
  height: 25%;
  margin-inline: 30%;
  margin-top: 15%;
  float: left;
  align-self: center;
  position: relative;
  z-index: 99;
  background-color: black;
  border-radius: 5px;
  color: white;
}

#link-message {
  width: 100%;
  text-align: center;
  padding-top: 2%;
  font-size: 20px;
  font-family: "Raleway", sans-serif;
}

#ok {
  float: left;
  color: black;
  border-color: black;
  background-color: #26fed5;
  margin-top: 2.5%;
  width: 10%;
  margin-inline: 45%;
}

#ok:hover {
  color: #26fed5;
  background-color: black;
  border-color: #26fed5;
}

#ig-adv-link {
  width: 90%;
  margin-inline: 5%;
}

#link-input {
  width: 80%;
}

#copy {
  color: black;
  background-color: white;
}

#copy:hover {
  color: #26fed5;
}

#copy1 {
  color: black;
  background-color: #26fed5;
}

</style>
