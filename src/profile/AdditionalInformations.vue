<template>
  <div>
    <Memo
      :key=this.profileData.additionalInfo
      label="Informações adicionais"
      fieldName="additionalInfo"
      :text=this.profileData.additionalInfo
      v-on:apply="applyValue"
      placeholder="Mais alguma coisa que a gente precisa saber?"
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
  name: "additionalInformations",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        additionalInfo: "",
      },
    };
  },
  components: { Memo },
  mounted() {
    if(this.recordedData){
      this.profileData.additionalInfo = this.recordedData.additionalInfo;
      this.$forceUpdate();
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
