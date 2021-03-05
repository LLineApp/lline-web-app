<template>
  <div>
    <div id="background">
      <img
        id="background-color-2"
        src="https://res.cloudinary.com/tiagogbt/image/upload/v1611189148/background-color03_lnx2ot.png"
        alt=""
      />
      <img
        id="background-black-2"
        src="https://res.cloudinary.com/tiagogbt/image/upload/v1611189017/background-black03_fubn4n.png"
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
      <h2 id="register-message">Cadastro</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="cpf">CPF</label>
          <input
            id="input-cpf"
            type="text"
            v-model="user.cpf"
            v-validate="'required'"
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
            id="input-password"
            type="password"
            v-model="user.password"
            v-validate="{ required: true, min: 6 }"
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
          <button
            id="submit-register-button"
            class="btn btn-primary"
            :disabled="status.registering"
          >
            Cadastrar
          </button>
          <img v-show="status.registering" src="REGISTERING" />
          <router-link id="cancel-button" to="/login" class="btn btn-link"
            >Cancelar</router-link
          >
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { CREATE_USER } from "../constants/graphql";
import { InMemoryCache } from "apollo-cache-inmemory";
import { REGISTERING } from "../constants/base64";
import Footer from "../footer/Footer";

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
  apollo: {
    $client: "authClient",
  },
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
  components: { Footer },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

#background,
#background-color-2 {
  position: absolute;
  width: 100%;
}
#background-black-2 {
  width: 59%;
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
#register-message,
#cancel-button,
label,
#submit-register-button {
  font-family: "Raleway", sans-serif;
  color: white;
}
#register-message {
  font-size: 20pt;
}
#submit-register-button {
  font-size: 15pt;
}
label {
  font-size: 10pt;
}
#cancel-button {
  padding-left: 1%;
  font-size: 11pt;
}
</style>
