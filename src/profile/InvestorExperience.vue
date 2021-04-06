<template>
  <div id="experience">
    <b-form-group content-cols-md>
      <b-row align-v="center">
        <b-col>
          <b-input-group :prepend="kindName" id="kind-name">
            <b-form-input
              id="value-input"
              v-model.number="value"
              type="number"
              step="1"
              no-wheel
              placeholder="0,00"
              debounce="400"
              lazy-formatter
              :formatter="formatNumericField"
            />
          </b-input-group>
        </b-col>
      </b-row>
    </b-form-group>
  </div>
</template>

<script>
import { formatNumericField } from "../_helpers/formaters";

export default {
  name: "investorExperience",
  props: ["investorExperienceData", "kindName"],
  data() {
    return {
      value: null,
    };
  },
  mounted() {
    if (this.investorExperienceData) {
      this.investorExperienceData.forEach((experience) => {
        if (experience.kind == this.kindName) {
          this.value = experience.value;
        }
      });
    }
  },
  watch: {
    value: function() {
      this.$emit("apply", this.kindName, this.value);
    },
  },
  methods: {
    formatNumericField(value) {
      return formatNumericField(value);
    },
  },
};
</script>
<style scoped>
#experience {
  padding-bottom: 1%;
}
.input-group > .input-group-prepend {
  flex: 0 0 24%;
}
.input-group .input-group-text {
  width: 100%;
}
</style>
