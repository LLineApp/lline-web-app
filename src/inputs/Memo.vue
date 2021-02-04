<template>
  <div>
    <b-form-group id="memo-group" :label="label" label-for="memo-input">
      <b-form-textarea
        type="text"
        id="memo-input"
        v-model="inputMemo"
        :placeholder="placeholder"
        v-on:blur="$emit('apply', fieldName, inputMemo)"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  props: ["label", "placeholder", "fieldName"],
  data() {
    return {
      inputMemo: null,
    };
  },
};
</script>
