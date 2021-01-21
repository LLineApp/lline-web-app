<template>
  <div>
    <p>Sobre seus filhos:</p>

    <b-button variant="light" v-on:click="addChild()"
      ><span aria-hidden="true">&#43;</span></b-button
    >

    <ul id="children">
      <li v-for="child in this.profileData.children" :key="child.key">
        <Child
          v-bind:childData="child"
          v-on:apply="applyChild"
          v-on:remove="removeChild"
        />
      </li>
    </ul>

    <b-button variant="success" v-on:click="$emit('done', profileData)">
      Cadastrar
    </b-button>
    <b-img v-show="status.registering" src="REGISTERING" />
    <b-button v-on:click="$emit('stop')">Parar</b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";
import Child from "../profile/Child";

export default {
  data() {
    return {
      profileData: {
        children: [
          {
            key: 0,
            fullName: "",
            birthDate: null,
            occupationTraining: "",
            additionalInfo: "",
          },
        ],
      },
    };
  },
  components: { Child },
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    addChild() {
      const newKey = this.profileData.children.length;
      console.log(newKey);
      const newChild = {
        key: newKey,
        fullName: "",
        birthDate: null,
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
      console.log(JSON.stringify(this.profileData));
    },
    removeChild(childData) {
      var remainingChildren = this.profileData.children.filter(function (
        value,
        index,
        arr
      ) {
        return value != childData;
      });
      this.profileData.children = remainingChildren;

      console.log(JSON.stringify(this.profileData));
    },
  },
};
</script> 