<template>
  <div id="target">
    <div id="inc-date">
      {{
        this.targetData.incDate.toLocaleDateString("pt-br", { timeZone: "UTC" })
      }}
      <i id="flag-new" v-if="targetData.new" class="fa fa-flag"> nova meta</i>
    </div>
    <Money
      ref="presentValue"
      :key="targetData.key"
      label="Quanto você deseja investir inicialmente?"
      field="presentValue"
      :fieldValue="targetData.presentValue"
      v-on:apply="applyValue"
      :readonly="!targetData.new"
    />

    <b-form-group
      id="suitability-group"
      label="Perfil de investidor"
      label-for="suitability-select"
    >
      <b-form-select
        id="suitability-select"
        :options="suitabilityList"
        v-model="suitabilityId"
        :disabled="!targetData.new"
      />
    </b-form-group>

    <Money
      label="Quanto você deseja contribuir mensalmente?"
      field="monthlyInvestment"
      :fieldValue="targetData.monthlyInvestment"
      v-on:apply="applyValue"
      :readonly="!targetData.new"
    />

    <b-form-group
      id="yearToStartWithdraw-group"
      label="Em qual ano você deseja começar a sacar os fundos?"
      label-for="yearToStartWithdraw-input"
    >
      <b-form-input
        id="yearToStartWithdraw-input"
        type="number"
        v-model.number="targetData.yearToStartWithdraw"
        step="1"
        min="1"
        max="100"
        no-wheel
        placeholder="0"
        :formatter="formatIntField"
        :readonly="!targetData.new"
      />
    </b-form-group>
    <p v-if="targetData.new">
      Clique
      <b-button type="button" v-on:click="doApply()" aria-hidden="true"
        ><i class="fa fa-check"></i
      ></b-button>
      para confirmar a nova meta ou
      <b-button type="button" v-on:click="doAbort()" aria-hidden="true"
        ><i class="fa fa-times"></i
      ></b-button>
      para cancelar
    </p>
    <b-alert
      id="alert"
      fade
      :show="alert.dismissCountDown"
      dismissible
      variant="success"
      v-on:dismissed="alert.dismissCountDown = 0"
      v-on:dismiss-count-down="alertCountDownChanged"
    >
      Nova meta incluída com sucesso
    </b-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatIntField } from "../_helpers/formaters";
export default {
  name: "target",
  props: ["targetData"],
  data() {
    return {
      alert: {
        dismissSecs: 5,
        dismissCountDown: 0,
      },
      suitabilityList: [],
      suitabilityId: null,
    };
  },
  mounted() {
    if (!this.targetData.new) {
      this.suitabilityId = this.targetData.suitability.id;
    }
    this.paramsData.suitability.map((suitability) => {
      this.suitabilityList.push({
        text: suitability.name,
        value: suitability.id,
      });
    });
  },
  computed: {
    ...mapGetters("paramsData", ["paramsData"]),
  },
  components: {
    Money: require("../inputs/Money").default,
  },
  methods: {
    applyValue(property, value) {
      this.targetData[property] = value;
    },
    alertCountDownChanged(dismissCountDown) {
      this.alert.dismissCountDown = dismissCountDown;
    },
    doApply() {
      this.targetData.suitability = this.suitabilityId;
      this.$emit("apply", this.targetData);
      this.alert.dismissCountDown = this.alert.dismissSecs;
    },
    doAbort() {
      this.$emit("abort", this.targetData);
    },
    formatIntField(value) {
      return formatIntField(value);
    },
  },
};
</script>

<style scoped>
button {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
button:hover {
  color: #26fed5;
  background-color: black;
  border-color: black;
}
#flag-new {
  color: #ff6262;
}
#inc-date {
  padding-bottom: 1.5%;
  font-weight: bold;
  font-size: 18px;
}
#target {
  padding-bottom: 1.5%;
  padding-top: 1%;
  border-bottom: 1px solid black;
}
#alert {
  position: fixed;
  top: 20px;
  width: 60%;
}
</style>
