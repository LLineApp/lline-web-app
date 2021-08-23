<template>
  <div>
    <NavBar />
    <div id="main">
      <h1>Metas:</h1>

      <p v-if="!addingNewTarget">
        Clique
        <b-button type="button" v-on:click="addNewTarget()" aria-hidden="true"
          ><i class="fa fa-plus"></i
        ></b-button>
        para adicionar uma nova meta
      </p>
      <ul id="targets">
        <li v-for="target in this.targets" :key="target.key">
          <Target
            v-bind:targetData="target"
            v-on:apply="saveTarget()"
            v-on:abort="abortTarget()"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { addTarget } from "../../datasource/profile";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "targets",
  data() {
    return {
      key: 0,
      addingNewTarget: false,
      targets: [
        {
          key: 0,
          incDate: null,
          presentValue: 0.0,
          monthlyInvestment: 0.0,
          suitability: 0,
          yearToStartWithdraw: 0,
          new: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("profileData", ["profileData"]),
    ...mapGetters("loginData", ["loginData"]),
    ...mapGetters("profileData", ["profileData"]),
  },
  created() {
    this.fillTargets();
  },
  components: {
    Target: require("../targets/Target").default,
    NavBar: require("../navbar/NavBar").default,
  },
  methods: {
    ...mapActions("profileData", ["updateProfileData"]),
    fillTargets() {
      this.targets = [];
      this.profileData.targets.forEach((item, index) => {
        const target = {
          key: index,
          incDate: new Date(item.date),
          presentValue: item.presentValue,
          monthlyInvestment: item.monthlyInvestment,
          suitability: item.suitability,
          yearToStartWithdraw: item.yearToStartWithdraw,
          new: false,
        };
        Vue.set(this.targets, index, target);
        this.key += 1;
        this.$forceUpdate();
      });
    },
    addNewTarget() {
      const newKey = this.targets.length;
      const newTarget = {
        key: newKey,
        incDate: new Date(),
        presentValue: 0.0,
        monthlyInvestment: 0.0,
        suitability: 0,
        yearToStartWithdraw: 0,
        new: true,
      };
      this.targets.unshift(newTarget);
      this.addingNewTarget = true;
    },
    saveTarget() {
      this.targets.forEach((target) => {
        if (target.new) {
          addTarget(
            this.loginData.token,
            this.profileData.cpf,
            target.presentValue,
            target.suitability,
            target.monthlyInvestment,
            target.yearToStartWithdraw
          ).then((data) => {
            this.updateProfileData({
              updates: {
                targets: data.data.addTarget.targets,
              },
            });
            this.$forceUpdate();
            this.fillTargets();
            this.addingNewTarget = false;
          });
        }
      });
    },
    abortTarget() {
      this.targets.pop();
      this.addingNewTarget = false;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");
* {
  font-family: "Raleway", sans-serif;
}
p {
  margin-bottom: 0.4%;
}
h1 {
  font-size: 20pt;
}
ul {
  list-style-type: none;
}
#back,
#stop,
#success {
  margin-right: 1%;
  font-size: 17pt;
}
#back,
#stop {
  background-color: gray;
  border-color: gray;
  color: black;
}
#main {
  margin-bottom: 5%;
  padding-inline: 10%;
  padding-top: 3%;
}
button,
#success {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
button:hover,
#back:hover,
#success:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}
#stop:hover {
  color: red;
  background-color: black;
  border-color: black;
}
#success {
  margin-left: 3.5%;
  padding: 2%, 2%;
}
</style>
