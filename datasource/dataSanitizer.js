export function sanitize(data) {
  delete data["accepted"];
  delete data["id"];
  delete data["isAdvisor"];
  delete data["__typename"];

  if (data["financialAdvisor"]) {
    delete data["financialAdvisor"]["__typename"];
    if (Object.keys(data["financialAdvisor"]).length === 0) {
      delete data["financialAdvisor"];
    }
  }
  for (var item in data) {
    if (data[item] == null) {
      delete data[item];
    } else if (data[item] == undefined) {
      delete data[item];
    } else if (["phones", "advisors", "investorExperiences"].includes(item)) {
      if (!data[item].length) {
        delete data[item];
      }
    } else if (Array.isArray(data[item])) {
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
        } else if (
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
        } else if (item == "personalPrivateSecurities") {
          if (element["bank"] != "") {
            sanitizedItem.push(element);
          }
        } else sanitizedItem.push(element);
      });
      if (sanitizedItem.length) {
        data[item] = sanitizedItem;
      }
    }
  }
  return data;
}
