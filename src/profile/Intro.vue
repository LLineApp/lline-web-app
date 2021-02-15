<template>
  <div>
    <p>
      Olá. Parece que você acabou de se inscrever, e eu não tenho muitas
      informações a seu respeito. Para que possamos dar continuidade ao
      processo, será necessário eu fazer algumas perguntas. As informações
      obtidas aqui são de sigilo absoluto, e você pode interromper o
      preenchimento a hora que quiser, e continuar mais tarde se assim precisar
      <b>Mais tarde precisaremos melhorar esse texto</b>
      <br />
      <button class="btn btn-primary" v-on:click="$emit('didAccept')">
        OK, vamos começar
      </button>
      <button class="btn btn-secondary" v-on:click="$emit('didNotAccept')">
        Não quero
      </button>
    </p>
  </div>
</template>

<script>
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  data() {
    return {
      profileData: {
        accepted: false,
      },
    };
  },
  methods: {
    handleAccept(e) {
      this.profileData.accepted = true;
    },
    handleDontAccept(e) {
      this.profileData.accepted = false;
    },
  },
};
</script> 