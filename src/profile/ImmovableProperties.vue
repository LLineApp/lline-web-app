<template>
  <div>
    <p>Bens Imóveis</p>
    <b-button variant="light" v-on:click="addImmovableProperty()"
      ><span aria-hidden="true">&#43;</span></b-button
    >

    <ul id="immovableProperties">
      <li
        v-for="immovableProperty in this.profileData.immovableProperties"
        :key="immovableProperty.key"
      >
        <ImmovableProperty
          v-bind:immovablePropertyData="immovableProperty"
          v-on:apply="applyImmovableProperty"
          v-on:remove="removeImmovableProperty"
        />
      </li>
    </ul>

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
import ImmovableProperty from "../profile/ImmovableProperty";

export default {
  name: "immovableProperties",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        immovableProperties: [
          {
            key: 0,
            description: "",
            value: "",
            rented: false,
            funded: false,
            insuranceValue: null,
            insuranceCompany: "",
          },
        ],
      },
    };
  },
  components: { ImmovableProperty },
  created() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
    }
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    addImmovableProperty() {
      const newKey = this.profileData.immovableProperties.length;
      const newImmovableProperty = {
        key: newKey,
        description: "",
        value: "",
        rented: false,
        funded: false,
        insuranceValue: null,
        insuranceCompany: "",
      };
      this.profileData.immovableProperties.push(newImmovableProperty);
    },
    applyImmovableProperty(immovablePropertyData) {
      for (var i in this.profileData.immovableProperties) {
        if (
          this.profileData.immovableProperties[i].key ==
          immovablePropertyData.key
        ) {
          this.profileData.immovableProperties[i] = immovablePropertyData;
          break;
        }
      }
    },
    removeImmovableProperty(immovablePropertyData) {
      var remainingImmovableProperties = this.profileData.immovableProperties.filter(
        function(value, index, arr) {
          return value != immovablePropertyData;
        }
      );
      this.profileData.immovableProperties = remainingImmovableProperties;
    },
  },
};
</script>
