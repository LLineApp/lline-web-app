export function sanitize(data) {
  delete data["accepted"];
  delete data["id"];
  delete data["isAdvisor"];
  delete data["__typename"];

  if (
    data["financialAdvisor"] &&
    Object.keys(data["financialAdvisor"]).length === 0
  ) {
    delete data["financialAdvisor"];
  }

  if (data["cpf"] == "") {
    delete data["cpf"];
  }

  for (var item in data) {
    if (Array.isArray(data[item])) {
      const sanitizedItem = [];
      data[item].forEach((element) => {
        delete element["key"];
        delete element["__typename"];

        if (item == "children") {
          if (element["fullname"] != "") {
            if (element["bithdate"] == null) {
              delete element["bithdate"];
            }
            sanitizedItem.push(element);
          }
        }

        if (item == "phones") {
          sanitizedItem.push(element);
        }

        if (
          [
            "immovableProperties",
            "insurances",
            "investmentPortfolios",
            "fixedIncomeSecurities",
          ].includes(item)
        ) {
          const value = element["value"] == null ? 0 : element["value"];
          if (value > 0) {
            sanitizedItem.push(element);
          }
        }

        if (item == "personalPrivateSecurities") {
          if (element["bank"] != "") {
            sanitizedItem.push(element);
          }
        }
      });
      data[item] = sanitizedItem;
    }
  }
  return data;
}
