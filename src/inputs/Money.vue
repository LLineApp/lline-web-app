<template>
  <div>
    <b-form-group id="value-group" :label="label" label-for="value-input">
      <b-form-input
        id="value-input"
        type="number"
        v-model="inputValue"
        step="1"
        placeholder="0,00"
        lazy-formatter
        :formatter="formatNumericField"
        v-on:blur="$emit('apply', field, inputValue)"
      />
    </b-form-group>
  </div>
</template>

<script>
import { formatNumericField } from "../_helpers/formaters";
export default {
  props: ["label", "field", "fieldValue"],
  data() {
    return {
      inputValue: null,
    };
  },
    mounted() {
      if (this.fieldValue) {
        this.inputValue = this.fieldValue;
      }
    },
  methods: {
    formatNumericField(value) {
      return formatNumericField(value);
    },
  },
};
</script>
