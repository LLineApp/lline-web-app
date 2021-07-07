<template>
  <div id="main">
    <h1>Patrimônio Imobilizado</h1>

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
    <p>
      Clique
      <b-button
        type="button"
        aria-label="Close"
        v-on:click="addImmovableProperty()"
        aria-hidden="true"
        ><i class="fa fa-plus"></i
      ></b-button>
      para adicionar um novo patrimônio
    </p>

    <b-button
      id="success"
      variant="success"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Confirmar
    </b-button>
    <b-button id="back" v-if="showButtons" v-on:click="$emit('back')"
      >Voltar</b-button
    >
    <b-button id="stop" v-if="showButtons" v-on:click="$emit('stop')"
      >Parar</b-button
    >
  </div>
</template>

<script>
import ImmovableProperty from "../profile/ImmovableProperty";

export default {
  name: "immovableProperties",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 7,
        immovableProperties: [
          {
            key: 0,
            description: "",
            value: 0,
            rented: false,
            funded: false,
            insuranceValue: 0,
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
      this.profileData.page = 7;
      this.$forceUpdate();
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  updated() {
    if (!this.showButtons) {
      this.$emit("done", this.profileData);
    }
  },
  methods: {
    addImmovableProperty() {
      const newKey = this.profileData.immovableProperties.length;
      const newImmovableProperty = {
        key: newKey,
        description: "",
        value: 0,
        rented: false,
        funded: false,
        insuranceValue: 0,
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
#back,
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
