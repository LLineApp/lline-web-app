<template>
  <div id="background">
    <div id="advisor-link-div">
      <p id="link-message">Esse é seu link de assessor</p>
      <b-input-group id="ig-adv-link">
        <b-form-input readonly type="url" id="link-input" />
        <b-input-group-append @click="copyLink()">
          <span class="input-group-text"
            ><i class="fa fa-clipboard fa-lg"></i
          ></span>
        </b-input-group-append>
      </b-input-group>
      <b-button @click="$parent.AdvLinkSwitch()" id="ok">Ok</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "advisor-link",
  mounted() {},
  methods: {
    copyLink: function () {},
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
</style>