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
      <Alert :variant="alert.variant" v-bind:showAlert.sync="alert.show"
        ><p>{{ this.alert.message }}</p>
        <p v-if="alert.errorMessage">{{ this.alert.errorMessage }}</p>
      </Alert>
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
            :disabled="submitted"
          >
            Cadastrar
          </button>
          <img v-show="submitted" :src="registering" />
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
import { mapActions } from "vuex";
import { CREATE_USER } from "../constants/graphql";
import { REGISTERING } from "../constants/base64";

export default {
  data() {
    return {
      user: {
        cpf: "",
        password: "",
      },
      submitted: false,
      registering: REGISTERING,
      alert: {
        show: false,
        variant: "",
        message: "",
        errorMessage: "",
      },
    };
  },
  methods: {
    ...mapActions("advisorData", ["updateAdvisorData"]),
    handleSubmit(e) {
      e.preventDefault();
      this.submitted = true;
      if (this.$route.query.advisor) {
        this.updateAdvisorData({
          updates: {
            link: this.$route.query.advisor,
          },
        });
      }
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
              this.showAlertSuccess(() => {
                this.$router.push("/login");
              });
            })
            .catch((error) => {
              this.showAlertError(error);
              this.submitted = false;
              this.user.cpf = "";
              this.user.password = "";
            });
        }
      });
    },
    showAlertSuccess(callback) {
      this.alert.variant = "success";
      this.alert.message = "O registro foi efetuado com sucesso";
      this.alert.errorMessage = "";
      this.alert.show = true;
      setTimeout(callback, 5000);
    },
    showAlertError(e) {
      this.alert.variant = "warning";
      this.alert.message = "Não foi possível efetuar o registro.";
      this.alert.errorMessage = e.message;
      this.alert.show = true;
    },
  },
  components: {
    Footer: require("../footer/Footer").default,
    Alert: require("../components/Alert").default,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap");

#background,
#background-color-2 {
  position: fixed;
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
