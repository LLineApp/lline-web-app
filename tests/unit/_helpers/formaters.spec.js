import { formatNumericField, formatIntField } from "@/_helpers/formaters";

describe("formatNumericField", () => {
  test("when value is an integer", () => {
    expect(formatNumericField(2)).toBe(2.00);
  });
  test("when value is numeric", () => {
    expect(formatNumericField(10.1)).toBe(10.10);
  });
  test("when value is a text integer", () => {
    expect(formatNumericField("8")).toBe(8.00);
  });
  test("when value is a text numeric", () => {
    expect(formatNumericField("110.55")).toBe(110.55);
  });
  test("when value is negative", () => {
    expect(formatNumericField(-825)).toBe(-825.00);
  });
  test("when value is not a number", () => {
    expect(formatNumericField("ABC")).toBe(0.00);
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
});
