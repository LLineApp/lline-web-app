<template>
  <div class="container">
    <p>Formulário de dados</p>
    <Intro
      v-if="!this.quizData.accepted"
      v-on:didAccept="quizData.accepted = true"
      v-on:didNotAccept="quizData.accepted = false"
    ></Intro>
    <Email
      v-else-if="this.quizData.email == ''"
      v-on:done="setQuizData(quizData)"
      v-on:stopped="quizData.email = ''"
    >
    </Email>
  </div>
</template>


<script>
import Email from "../quiz/Email";
import Intro from "../quiz/Intro";

export default {
  data() {
    return {
      quizData: {
        accepted: false,
        email: "",
      },
    };
  },
  components: { Intro, Email },
  computed: {
    setQuizData(quizData) {
      this.quizData = quizData;
    },
  },
};
</script> 