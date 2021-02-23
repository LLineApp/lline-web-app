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
    <label for="fullname">Nome completo</label>
    <input
      type="text"
      v-model="profileData.fullname"
      v-validate="'required'"
      name="fullname"
      class="form-control"
      :class="{ 'is-invalid': submitted && errors.has('fullname') }"
    />
    <div v-if="submitted && errors.has('fullname')" class="invalid-feedback">
      {{ errors.first("fullname") }}
    </div>

    <label for="birthdate">Data de nascimento</label>
    <input
      type="date"
      v-model="profileData.birthdate"
      v-validate="'required'"
      name="birthdate"
      class="form-control"
      formatter="formatDate"
      :class="{ 'is-invalid': submitted && errors.has('birthdate') }"
    />
    <div v-if="submitted && errors.has('birthdate')" class="invalid-feedback">
      {{ errors.first("birthdate") }}
    </div>
    <label v-if="showButtons" for="phoneInput"
      >Informe aqui todos os seus números de telefone com DDD, um por um</label
    >
    <input
      v-if="showButtons"
      type="text"
      v-model="phoneInput"
      v-on:keyup.enter="addPhone()"
      name="phoneInput"
      class="form-control"
    />
    <button v-if="showButtons" class="btn btn-info" v-on:click="addPhone()">
      Adicionar
    </button>

    <b-form-group :label="phoneListLabel" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="phone-radio-slots"
        v-model="profileData.preferredContact"
        :options="profileData.phones"
        :aria-describedby="ariaDescribedby"
        name="radio-options-slots"
      />
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
  props: ["recordedData", "showButtons"],
  data() {
    return {
      profileData: {
        fullname: "",
        email: "",
        birthdate: null,
        phones: [],
        preferredContact: "",
        requestBrokerStatus: false,
      },
      submitted: false,
      phoneInput: "",
      phoneListLabel: "Telefones",
    };
  },
  mounted() {
    if (this.showButtons) {
      this.phoneListLabel = "Informe qual é o seu telefone preferencial";
    }
    if (this.recordedData) {
      Object.assign(this.profileData, this.recordedData);
      console.log(this.profileData.preferredContact);
      this.$forceUpdate();
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
