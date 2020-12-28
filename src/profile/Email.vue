<template>
  <div>
    <label for="fullName">Nome completo</label>
    <input
      type="text"
      v-model="profileData.fullName"
      v-validate="'required'"
      name="fullName"
      class="form-control"
      :class="{ 'is-invalid': submitted && errors.has('fullName') }"
    />
    <div v-if="submitted && errors.has('fullName')" class="invalid-feedback">
      {{ errors.first("fullName") }}
    </div>
    <label for="email">E-mail</label>
    <input
      type="text"
      v-model="profileData.email"
      v-validate="'required'"
      name="email"
      class="form-control"
      :class="{ 'is-invalid': submitted && errors.has('email') }"
    />
    <div v-if="submitted && errors.has('email')" class="invalid-feedback">
      {{ errors.first("email") }}
    </div>
    <input
      type="checkbox"
      v-model="profileData.requestBrokerStatus"
      name="requestBrokerStatus"
      class="form-check-input"
    />
    <label for="requestBrokerStatus">Solicitar status de Assessor</label>
    <br />
    <button class="btn btn-primary" v-on:click="$emit('done', profileData)">
      Cadastrar
    </button>
    <img
      v-show="status.registering"
      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
    />
    <button class="btn btn-secondary" v-on:click="$emit('stop')">Parar</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";

export default {
  data() {
    return {
      profileData: {
        fullName: "",
        email: "",
        requestBrokerStatus: false,
      },
      submitted: false,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
};
</script> 