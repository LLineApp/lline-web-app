export function formatNumericField(value) {
    const numberFormat = new Intl.NumberFormat("en-US", {
      minimumIntegerDigits: 1,
      minimumFractionDigits: 2,
    });
    return numberFormat.format(value);
  }