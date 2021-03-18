<template>
  <div id="main">
    <h1>Sobre seus filhos:</h1>
    <p>
      Clique
      <b-button type="button" v-on:click="addChild()" aria-hidden="true"
        ><i class="fa fa-plus"></i
      ></b-button>
      para adicionar mais um(a) filho(a)
    </p>

    <ul id="children">
      <li v-for="child in this.profileData.children" :key="child.key">
        <Child
          v-bind:childData="child"
          v-on:apply="applyChild"
          v-on:remove="removeChild"
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
import Child from "../profile/Child";

export default {
  name: "children",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
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
  mounted(){
    if(this.recordedData && this.recordedData.children){
      Object.assign(this.profileData.children, this.recordedData.children);
      this.$forceUpdate();
    }
    this.$emit("setActiveComponent", this.$options.name);
  },
  computed: {
    ...mapState("account", ["status"]),
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
      var remainingChildren = this.profileData.children.filter(function (
        value
      ) {
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
