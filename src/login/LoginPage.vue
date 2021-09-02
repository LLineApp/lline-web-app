<template>
  <div>
    <div id="background">
      <img
        id="background-color"
        src="https://res.cloudinary.com/tiagogbt/image/upload/v1610925105/background-color02_lemrbm.png"
        alt=""
      />
      <img
        id="background-black"
        src="https://res.cloudinary.com/tiagogbt/image/upload/v1610924686/background-black_s3jxgd.png"
        alt=""
      />
    </div>
    <div id="div-logo">
      <img
        id="background-logo"
        src="https://res.cloudinary.com/tiagogbt/image/upload/v1610898399/logo_d7p0fy.png"
        alt=""
      />
    </div>
    <div id="data-div">
      <h2 id="welcome-message">Bem vindo ao LLine</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="cpf">Informe o seu CPF</label>
          <input
            id="input-cpf"
            type="text"
            v-model="cpf"
            class="form-control"
            :class="{ 'is-invalid': submitted && !cpf }"
          />
          <div v-show="submitted && !cpf" class="invalid-feedback">Informe seu CPF</div>
        </div>
        <div class="form-group">
          <label htmlFor="password">Senha</label>
          <input
            id="input-password"
            type="password"
            v-model="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !password }"
          />
          <div v-show="submitted && !password" class="invalid-feedback">
            Informe sua Senha
          </div>
        </div>
        <div class="form-group">
          <button id="login-button" class="btn btn-primary" :disabled="submitted">
            Entrar
          </button>
          <img
            v-show="submitted"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          />
          <router-link id="register-button" to="/register" class="btn btn-link"
            >Ainda não estou cadastrado</router-link
          >
        </div>
        <div class="form-group">
          <a :href="passwordResetURI" target="_blank" id="reset-password">
            Esqueci minha senha
          </a>
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { TOKEN_AUTH_MUTATION } from "../constants/graphql";
import { backendURI } from "../_helpers/backend.js";

export default {
  data() {
    return {
      cpf: "",
      password: "",
      submitted: false,
    };
  },
  computed: {
    ...mapGetters("advisorData", ["advisorData"]),
    passwordResetURI() {
      return backendURI("password_reset/");
    },
  },
  mounted() {
    this.resetProfileData();
    localStorage.removeItem("vuex");
  },
  methods: {
    ...mapActions("advisorData", ["updateAdvisorData"]),
    ...mapActions("loginData", ["updateLoginData"]),
    ...mapActions("profileData", ["resetProfileData"]),

    handleSubmit(e) {
      this.submitted = true;
      const { cpf, password } = this;
      if (cpf && password) {
        const { result } = this.$apollo
          .mutate({
            mutation: TOKEN_AUTH_MUTATION,
            variables: {
              cpf,
              password,
            },
          })
          .then((data) => {
            if (!this.advisorData.link && this.$route.query.advisor) {
              this.updateAdvisorData({
                updates: {
                  link: this.$route.query.advisor,
                },
              });
            }
            if (data.data.tokenAuth.token) {
              this.updateLoginData({
                updates: {
                  token: data.data.tokenAuth.token,
                  cpf: cpf,
                },
              });
              this.$router.push("/");
            }
          })
          .catch((error) => {
            this.submitted = false;
            const message = error.graphQLErrors[0].message;
            const options = {
              position: "top-center",
              duration: 4000,
              fullWidth: true,
              closeOnSwipe: true,
            };

            this.$toasted.error(message, options);

            this.cpf = "";
            this.password = "";
          });
      }
    },
  },
  components: {
    Footer: require("../footer/Footer").default,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

#reset-password {
  font-family: "Raleway", sans-serif;
  font-size: 11pt;
  color: white;
}
#background,
#background-color {
  position: fixed;
  width: 100%;
}
#background-black {
  width: 69%;
  position: relative;
  transform: translate(-1px, -1px);
}
#div-logo {
  width: 100%;
  float: left;
  padding-left: 7%;
  padding-top: 7%;
}
#background-logo {
  position: relative;
  width: 23%;
}
#data-div {
  position: relative;
  width: 100%;
  float: left;
  padding: 7%;
  padding-top: 3%;
}
#input-cpf,
#input-password {
  width: 25%;
}
#welcome-message,
#login-button,
label,
#register-button {
  font-family: "Raleway", sans-serif;
  color: white;
}
#welcome-message {
  font-size: 20pt;
}
#login-button {
  font-size: 15pt;
}
label {
  font-size: 10pt;
}
#register-button {
  padding-left: 1%;
  font-size: 11pt;
}
</style>
