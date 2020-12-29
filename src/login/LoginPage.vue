<template>
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <h2>Bem vindo ao LLine</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Informe o seu CPF</label>
          <input
            type="text"
            v-model="username"
            name="username"
            class="form-control"
            :class="{ 'is-invalid': submitted && !username }"
          />
          <div v-show="submitted && !username" class="invalid-feedback">
            Um nome de usuário é requerido
          </div>
        </div>
        <div class="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            v-model="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !password }"
          />
          <div v-show="submitted && !password" class="invalid-feedback">
            Uma senha é requerida
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="status.loggingIn">
            Entrar
          </button>
          <img
            v-show="status.loggingIn"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          />
          <router-link to="/register" class="btn btn-link"
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
      username: '',
      password: '',
      submitted: false,
    };
  },
  apollo: {},
  computed: {
    ...mapState('account', ['status']),
  },
  created() {
    this.logout();
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        const { result } = this.$apollo
          .mutate({
            mutation: TOKEN_AUTH_MUTATION,
            variables: {
              username,
              password,
            },
          })
          .then((data) => {
            if (data.data.tokenAuth.token) {
              localStorage.setItem('user', JSON.stringify(data.data.tokenAuth));
              this.$router.push('/');
            }
          })
          .catch((error) => {
            const message = error.graphQLErrors[0].message;
            const options = {
              position: 'top-center',
              duration: 4000,
              fullWidth: true,
              closeOnSwipe: true,
            };

            this.$toasted.error(message, options);

            this.username = '';
            this.password = '';
          });
      }
    },
  },
};
</script>