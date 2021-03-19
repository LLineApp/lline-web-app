<template>
  <div id="main">
    <h1>Bens Imóveis</h1>
    <p>
      Clique
      <b-button
        type="button"
        aria-label="Close"
        v-on:click="addImmovableProperty()"
        aria-hidden="true"
        ><i class="fa fa-plus"></i
      ></b-button>
      para adicionar um novo imóvel
    </p>

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
      id="success"
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Confirmar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
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
  mounted() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      this.$forceUpdate();
    }
    this.$emit("setActiveComponent", this.$options.name);
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
        page: 6,
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

p {
  font-size: 17pt;
}
h1 {
  font-size: 20pt;
}
* {
  font-family: "Raleway", sans-serif;
  font-size: 15pt;
}
#stop,
#success {
  margin-right: 1%;
  font-size: 17pt;
}
#stop {
  background-color: gray;
  border-color: gray;
  color: black;
}
#main {
  margin-bottom: 5%;
}
button,
#success {
  padding: 1%, 2%;
  color: black;
  background-color: #26fed5;
  border-color: #26fed5;
}
button:hover,
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
