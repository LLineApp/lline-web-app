import { formatNumericField, formatIntField } from "@/_helpers/formaters";

describe("formatNumericField", () => {
  test("when value is an integer", () => {
    expect(formatNumericField(2)).toBe((2.0).toFixed(2));
  });
  test("when value is numeric", () => {
    expect(formatNumericField(10.1)).toBe((10.1).toFixed(2));
  });
  test("when value is a text integer", () => {
    expect(formatNumericField("8")).toBe((8.0).toFixed(2));
  });
  test("when value is a text numeric", () => {
    expect(formatNumericField("110.55")).toBe((110.55).toFixed(2));
  });
  test("when value is a text numeric with four decimals", () => {
    expect(formatNumericField("110.4444")).toBe((110.44).toFixed(2));
  });
  test("when value is negative", () => {
    expect(formatNumericField(-825)).toBe((-825.0).toFixed(2));
  });
  test("when value is only text", () => {
    expect(formatNumericField("ABC")).toBe((0.0).toFixed(2));
  });
  test("when value is a dot", () => {
    expect(formatNumericField(".")).toBe((0.0).toFixed(2));
  });
  test("when value is not a number", () => {
    expect(formatNumericField(NaN)).toBe((0.0).toFixed(2));
  });
  test("when value is empty", () => {
    expect(formatNumericField("")).toBe((0.0).toFixed(2));
  });
  test("when value is true", () => {
    expect(formatNumericField(true)).toBe((0.0).toFixed(2));
  });
  test("when value is false", () => {
    expect(formatNumericField(false)).toBe((0.0).toFixed(2));
  });
  test("when value is an integer must return decimal zero", () => {
    expect(formatNumericField(2).toString()).toBe("2.00");
  });
});

describe("formatIntField", () => {
  test("when value is an integer", () => {
    expect(formatIntField(2)).toBe(2);
  });
  test("when value is negative", () => {
    expect(formatIntField(-5)).toBe(-5);
  });
  test("when value is numeric", () => {
    expect(formatIntField(10.1)).toBe(10);
  });
  test("when value is a text integer", () => {
    expect(formatIntField("8")).toBe(8.0);
  });
  test("when value is a text numeric", () => {
    expect(formatIntField("110.55")).toBe(110);
  });
  test("when value contains text", () => {
    expect(formatIntField("ABC123")).toBe(123);
  });
  test("when value is only text", () => {
    expect(formatIntField("ABC")).toBe(0);
  });
  test("when value is not a number", () => {
    expect(formatIntField(NaN)).toBe(0);
  });
  test("when value is empty", () => {
    expect(formatIntField("")).toBe(0);
  });
  test("when value is true", () => {
    expect(formatIntField(true)).toBe(0);
  });
  test("when value is false", () => {
    expect(formatIntField(false)).toBe(0);
  });
  test("when value is a dot", () => {
    expect(formatIntField(".")).toBe(0);
  });
});
