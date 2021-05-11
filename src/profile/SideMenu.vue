<template>
  <div id="side-menu-div">
    <ul class="nav flex-column" id="side-menu">
      <li
        class="nav-item"
        v-for="sideMenuItem in this.sideMenuItems"
        :key="sideMenuItem.key"
      >
        <b-link
          class="nav-link"
          :disabled="!navigate"
          :style="sideMenuItem.style"
          v-on:click="$emit('page', sideMenuItem.page)"
          >{{ sideMenuItem.text }}</b-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { SIDE_MENU_ITEMS } from "../constants/arrays";
export default {
  name: "sideMenu",
  props: ["activeComponentName", "navigate"],
  data() {
    return {
      sideMenuItems: SIDE_MENU_ITEMS,
    };
  },
  watch: {
    activeComponentName: function() {
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
.nav-link {
  font-size: 12pt;
  font-family: "Raleway", sans-serif;
}
</style>
