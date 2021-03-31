export function formatNumericField(value) {
    const numberFormat = new Intl.NumberFormat("pt-BR", {
      minimumIntegerDigits: 1,
      minimumFractionDigits: 2,
    });
    return numberFormat.format(value);
  }