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
          <div v-show="submitted && !cpf" class="invalid-feedback">
            Um nome de usuário é requerido
          </div>
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
            Uma senha é requerida
          </div>
        </div>
        <div class="form-group">
          <button
            id="login-button"
            class="btn btn-primary"
            :disabled="status.loggingIn"
          >
            Entrar
          </button>
          <img
            v-show="status.loggingIn"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          />
          <router-link id="register-button" to="/register" class="btn btn-link"
            >Ainda não estou cadastrado</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { TOKEN_AUTH_MUTATION } from "../constants/graphql";
import { InMemoryCache } from "apollo-cache-inmemory";
import { userService } from "../_services/user.service";

export default {
  data() {
    return {
      cpf: "",
      password: "",
      submitted: false,
    };
  },
  apollo: {},
  computed: {
    ...mapState("account", ["status"]),
  },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
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
            if (data.data.tokenAuth.token) {
              localStorage.setItem("user", JSON.stringify(data.data.tokenAuth));
              this.$router.push("/");
            }
          })
          .catch((error) => {
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
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

#background,
#background-color {
  position: absolute;
  width: 100%;
}
#background-black {
  width: 69%;
  position: relative;
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