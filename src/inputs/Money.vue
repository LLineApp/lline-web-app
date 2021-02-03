<template>
  <div>
    <b-form-group id="value-group" :label="label" label-for="value-input">
      <b-form-input
        id="value-input"
        type="number"
        v-model="inputValue"
        step="1"
        placeholder="0.00"
        :formatter="formatNumericField"
        v-on:blur="$emit('apply', field, inputValue)"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: ["label", "field"],
  data() {
    return {
      inputValue: null,
    };
  },
  methods: {
    formatNumericField(value) {
      return parseFloat(value);
    },
  },
};
</script>
