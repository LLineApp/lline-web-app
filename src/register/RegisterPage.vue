<template>
  <div class="row">
    <div class="col-sm-6 offset-sm-3">
      <h2>Cadastro</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="cpf">CPF</label>
          <input
            type="text"
            v-model="user.cpf"
            v-validate="'required'"
            name="cpf"
            class="form-control"
            :class="{ 'is-invalid': submitted && errors.has('cpf') }"
          />
          <div v-if="submitted && errors.has('cpf')" class="invalid-feedback">
            {{ errors.first("cpf") }}
          </div>
        </div>
        <div class="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            v-model="user.password"
            v-validate="{ required: true, min: 6 }"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && errors.has('password') }"
          />
          <div
            v-if="submitted && errors.has('password')"
            class="invalid-feedback"
          >
            {{ errors.first("password") }}
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" :disabled="status.registering">
            Cadastrar
          </button>
          <img
            v-show="status.registering"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          />
          <router-link to="/login" class="btn btn-link">Cancelar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { CREATE_USER } from "../constants/graphql";
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  data() {
    return {
      user: {
        cpf: "",
        password: "",
      },
      submitted: false,
    };
  },
  apollo: {},
  computed: {
    ...mapState("account", ["status"]),
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          console.log(CREATE_USER);
          this.$apollo
            .mutate({
              mutation: CREATE_USER,
              variables: {
                cpf: this.user.cpf,
                password: this.user.password,
              },
            })
            .then((data) => {
              console.log(result);
            });
        }
      });
    },
  },
};
</script>
