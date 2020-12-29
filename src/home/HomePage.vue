<template>
  <div>
    <NavBar />
    <h1>Bem vindo!</h1>
    <p>Agora você faz parte do LLine</p>
    <Quiz />
  </div>
</template>

<script>
import NavBar from "../navbar/NavBar";
import Quiz from "../quiz/Quiz";

export default {
  computed: {},
  components: { NavBar, Quiz },
  created() {},
  methods: {},
};
</script>