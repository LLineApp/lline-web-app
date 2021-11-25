export function formatNumericField(value) {
  if (value) {
    if (typeof value == "string") {
      value = value.replace(/[^0-9\.]/g, "");
      value = value === "" ? (0.0).toFixed(2) : value;
      value = isNaN(value) ? (0.0).toFixed(2) : value;
      return parseFloat(value).toFixed(2);
    }
    if (typeof value == "number") {
      return parseFloat(value).toFixed(2);
    }
  }
  return (0.0).toFixed(2);
}

export function formatIntField(value) {
  if (value) {
    if (typeof value == "string") {
      value = value.replace(/[^0-9\.]/g, "");
      value = value === "" ? 0 : value;
      value = isNaN(value) ? 0 : value;
      return parseInt(value);
    }
    if (typeof value == "number") {
      return parseInt(value);
    }
  }
  return 0;
}
