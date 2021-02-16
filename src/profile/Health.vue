<template>
  <div>
    <Memo
      label="Me fale sobre a sua saúde"
      fieldName="health"
      :text="profileData.health"
      v-on:apply="applyValue"
      placeholder="Informe aqui se você tem alguma doença seja ela crônica ou não, sequelas de acidentes, acidentes cardíacos ou neurológicos (como AVC ou infarto), debilidades motoras ou sensitivas (como problemas de fala, visão ou audição)"
    />
    <b-button
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Cadastrar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button v-if="showButtons" v-on:click="$emit('stop')">Parar</b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";
import Memo from "../inputs/Memo";

export default {
  name: "health",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        health: "",
      },
    };
  },
  components: { Memo },
  created() {
    if (this.recordedData.health) {
      this.profileData.health = this.recordedData.health;
    }
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    applyValue(property, value) {
      this.profileData[property] = value;
    },
  },
};
</script>
