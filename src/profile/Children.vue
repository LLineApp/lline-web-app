<template>
  <div id="main">
    <h1>Sobre seus filhos:</h1>

    <ul id="children">
      <li v-for="child in this.profileData.children" :key="child.key">
        <Child
          v-bind:childData="child"
          v-on:apply="applyChild"
          v-on:remove="removeChild"
        />
      </li>
    </ul>
    <p>
      Clique
      <b-button type="button" v-on:click="addChild()" aria-hidden="true"
        ><i class="fa fa-plus"></i
      ></b-button>
      para adicionar mais um(a) filho(a)
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
import Child from "../profile/Child";

export default {
  name: "children",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        page: 5,
        children: [
          {
            key: 0,
            fullname: "",
            birthdate: null,
            occupationTraining: "",
            additionalInfo: "",
          },
        ],
      },
    };
  },
  components: { Child },
  mounted() {
    if (this.recordedData && this.recordedData.children) {
      Object.assign(this.profileData.children, this.recordedData.children);
      this.profileData.page = 5;
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
    addChild() {
      const newKey = this.profileData.children.length;
      const newChild = {
        key: newKey,
        fullname: "",
        birthdate: null,
        occupationTraining: "",
        additionalInfo: "",
      };
      this.profileData.children.push(newChild);
    },
    applyChild(childData) {
      for (var i in this.profileData.children) {
        if (this.profileData.children[i].key == childData.key) {
          this.profileData.children[i] = childData;
          break;
        }
      }
    },
    removeChild(childData) {
      var remainingChildren = this.profileData.children.filter(function(value) {
        return value != childData;
      });
      this.profileData.children = remainingChildren;
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
