<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="fullName">Nome completo</label>
        <input
          type="text"
          v-model="user.fullName"
          v-validate="'required'"
          name="fullName"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('fullName') }"
        />
        <div
          v-if="submitted && errors.has('fullName')"
          class="invalid-feedback"
        >
          {{ errors.first("fullName") }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">CPF</label>
        <input
          type="text"
          v-model="user.email"
          v-validate="'required'"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && errors.has('email') }"
        />
        <div
          v-if="submitted && errors.has('email')"
          class="invalid-feedback"
        >
          {{ errors.first("email") }}
        </div>
      </div>
      <div class="form-group">
        <input
          type="checkbox"
          v-model="user.requestBrokerStatus"
          name="requestBrokerStatus"
          class="form-check-input"
        />
        <label for="requestBrokerStatus">Solicitar status de Corretor</label>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="status.registering">
          Cadastrar
        </button>
        <img
          v-show="status.registering"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        fullName: "",
        email: "",
        requestBrokerStatus: false,
      },
      submitted: false,
    };
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then((valid) => {
        if (valid) {
          this.register(this.user);
        }
      });
    },
  },
};
</script> 