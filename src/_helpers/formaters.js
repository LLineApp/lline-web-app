export function formatNumericField(value) {
    return parseFloat(value);
  };

  export function formatIntField(value) {
      if (value) {
        value = value.replace(/\D/g, "");
        value = isNaN(value) ? 0 : value;
        return parseInt(value);
      }
    };