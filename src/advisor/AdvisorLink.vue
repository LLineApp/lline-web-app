<template>
  <div id="advisor-link-div">
    <p id="link-message">Esse é seu link de assessor</p>
    <div id="ad-div-1">
      <b-form-input readonly id="advisor-link" type="url" />
      <b-button class="fa fa-clipboard fa-lg" id="copy-link"></b-button>
    </div>
    <div id="ad-div-2">
      <b-button id="ok">Ok</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "advisor-link",
};
</script>

<style scoped>
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
</style>