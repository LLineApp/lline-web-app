<template>
  <div>
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

    <label for="birthDate">Data de nascimento</label>
    <input
      type="date"
      v-model="profileData.birthDate"
      v-validate="'required'"
      name="birthDate"
      class="form-control"
      formatter="formatDate"
      :class="{ 'is-invalid': submitted && errors.has('birthDate') }"
    />
    <div v-if="submitted && errors.has('birthDate')" class="invalid-feedback">
      {{ errors.first("birthDate") }}
    </div>
    <label for="phoneInput"
      >Informe aqui todos os seus números de telefone com DDD, um por um</label
    >
    <input
      type="text"
      v-model="phoneInput"
      v-on:keyup.enter="addPhone()"
      name="phoneInput"
      class="form-control"
    />
    <button class="btn btn-info" v-on:click="addPhone()">Adicionar</button>

    <b-form-group
      label="Informe qual é o seu telefone preferencial"
      v-slot="{ ariaDescribedby }"
    >
      <b-form-radio-group
        id="phone-radio-slots"
        v-model="profileData.preferredPhone"
        :options="profileData.phones"
        :aria-describedby="ariaDescribedby"
        name="radio-options-slots"
      >
      </b-form-radio-group>
    </b-form-group>

    <br />
    <input
      type="checkbox"
      v-model="profileData.requestBrokerStatus"
      name="requestBrokerStatus"
      class="form-check-input"
    />
    <label for="requestBrokerStatus">Solicitar status de Assessor</label>
    <br />
    <button
      class="btn btn-primary"
      v-if="showButtons"
      v-on:click="$emit('done', profileData)"
    >
      Cadastrar
    </button>
    <img
      v-show="status.registering"
      src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
    />
    <button
      class="btn btn-secondary"
      v-if="showButtons"
      v-on:click="$emit('stop')"
    >
      Parar
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { InMemoryCache } from "apollo-cache-inmemory";
import { parsePhoneNumber } from "libphonenumber-js";

export default {
  name: "email",
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        fullName: "",
        email: "",
        birthDate: null,
        phones: [],
        preferredPhone: "",
        requestBrokerStatus: false,
      },
      submitted: false,
      phoneInput: "",
    };
  },
  created() {
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
    }
  },
  computed: {
    ...mapState("account", ["status"]),
    formatDate(value) {
      return moment(value).format("DD/MM/YYYY");
    },
  },
  methods: {
    addPhone() {
      this.phoneInput = this.phoneInput.replace(/\D+/g, "");
      if (this.phoneInput) {
        const phoneParsed = parsePhoneNumber(this.phoneInput, "BR");
        this.profileData.phones.push(phoneParsed.formatNational());
        this.phoneInput = "";
      }
    },
  },
};
</script>
