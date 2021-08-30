<template>
  <div>
    <div id="main">
      <h1>Metas:</h1>
      <Chart
        v-bind:lifeLineData="lifeLineData"
        v-if="hasLifeLineData"
        :key="key"
      />
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
      <b-button
        id="success"
        variant="primary"
        v-if="showButtons"
        v-on:click="doDone()"
      >
        Confirmar
      </b-button>
      <b-button
        id="stop"
        variant="secondary"
        v-if="showButtons"
        v-on:click="$emit('stop')"
      >
        Parar
      </b-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { addTarget, getProfile, handleError } from "../../datasource/profile";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "targets",
  props: ["showButtons", "recordedData"],
  data() {
    return {
      page: 15,
      key: 0,
      addingNewTarget: false,
      targets: [
        {
          key: 0,
          incDate: new Date(),
          presentValue: 0.0,
          monthlyInvestment: 0.0,
          suitability: 0,
          yearToStartWithdraw: 0,
          new: false,
        },
      ],
      lifeLineData: {
        masterLine: {
          periods: [],
          amount: [],
        },
      },
    };
  },
  computed: {
    ...mapGetters("profileData", ["profileData"]),
    ...mapGetters("loginData", ["loginData"]),
    hasLifeLineData: function() {
      return this.lifeLineData.masterLine.periods.length > 0;
    },
  },
  created() {
    this.fillTargets();
    this.fillLifeLine();
    this.$emit("setActiveComponent", this.$options.name);
  },
  components: {
    Target: require("../targets/Target").default,
    Chart: require("../home/Chart").default,
  },
  methods: {
    ...mapActions("profileData", ["updateProfileData"]),
    fillTargets() {
      const data = this.$route.params.clientCpf
        ? this.recordedData
        : this.profileData;
      this.targets = [];
      if (!data.targets.length == 0) {
        data.targets.forEach((item, index) => {
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
      }
    },
    fillLifeLine() {
      if (this.$route.params.clientCpf) {
        Vue.set(
          this.lifeLineData,
          "masterLine",
          this.recordedData.lifeLine.masterLine
        );
      } else {
        Vue.set(
          this.lifeLineData,
          "masterLine",
          this.profileData.lifeLine.masterLine
        );
      }
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
      const data = this.$route.params.clientCpf
        ? this.recordedData
        : this.profileData;
      this.targets.forEach((target) => {
        if (target.new) {
          addTarget(
            this.loginData.token,
            data.cpf,
            target.presentValue,
            target.suitability,
            target.monthlyInvestment,
            target.yearToStartWithdraw
          ).then((data) => {
            if (this.$route.params.clientCpf) {
              this.recordedData.targets = [];
              this.recordedData.targets.push(...data.data.addTarget.targets);
              this.$emit("done", this.recordedData);
            } else {
              this.updateProfileData({
                updates: {
                  targets: data.data.addTarget.targets,
                },
              });
            }
            this.$forceUpdate();
            this.fillTargets();
            this.reloadLifeLineData();
            this.addingNewTarget = false;
            this.key += 1;
          });
        }
      });
    },
    abortTarget() {
      this.targets.pop();
      this.addingNewTarget = false;
    },
    doDone() {
      this.$emit("done", { page: this.page });
    },
    reloadLifeLineData() {
      getProfile(this.loginData.token, this.recordedData.cpf)
        .then((data) => {
          if (data.data.getProfile[0]) {
            Vue.set(
              this.lifeLineData,
              "masterLine",
              data.data.getProfile[0].lifeLine.masterLine
            );
            this.$forceUpdate();
            this.key += 1;
          }
        })
        .catch((error) => {
          handleError(error.graphQLErrors[0].message);
        });
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
  padding-inline: 5%;
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
