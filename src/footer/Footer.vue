<template>
  <div>
    <div id="footer">
      <div id="footer-1"></div>
      <div id="footer-2">
        <div id="banner-div">
          <img
            id="banner"
            src="https://res.cloudinary.com/tiagogbt/image/upload/v1622598334/LogoWise_cfmsww.png"
          />
        </div>
        <div id="text-div">
          <p id="banner-text">Todos os direitos reservados LLine 2021</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10%;
  background-color: white;
}
#footer-1 {
  background-color: turquoise;
  height: 7%;
  width: 100%;
}
#footer-2 {
  width: 100%;
  height: 100%;
}
#banner-div, #text-div{
  float: left;
  width: 50% ;
  height: 100%;
}
#banner-div{
  padding-left: 10%;
}
#banner {
  padding-left: 10%;
  height: 100%;
}
#banner-text {
  font-family: "Raleway", sans-serif;
  color: gray;
  font-size: 10pt;
  text-align: center;
  margin: 3%;  
}
</style>