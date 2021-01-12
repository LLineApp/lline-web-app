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
          <img v-show="status.registering" src="REGISTERING" />
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
import { REGISTERING } from "../constants/base64";

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
