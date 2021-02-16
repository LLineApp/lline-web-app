<template>
  <div>
    <Memo
      label="Informações adicionais"
      fieldName="additionalInformations"
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
        additionalInformations: "",
      },
    };
  },
  components: { Memo },
  created() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
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
