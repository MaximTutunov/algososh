import { ReverseString } from "../utils";

const evenSymbols = "123456";
const evenSymbolsSteps = [
  ["1", "2", "3", "4", "5", "6"],
  ["6", "2", "3", "4", "5", "1"],
  ["6", "5", "3", "4", "2", "1"],
  ["6", "5", "4", "3", "2", "1"],
];

const oddSymbols = "12345";
const oddSymbolsSteps = [
  ["1", "2", "3", "4", "5"],
  ["5", "2", "3", "4", "1"],
  ["5", "4", "3", "2", "1"],
];

const singleSymbol = "a";
const singleSymbolStep = ["a"];

const emptyString = "";
const emptyStringResult = [];

describe("тестирование алгоритма равзорота строки", () => {
  it("с четным количеством символов", () => {
    const evenString = new ReverseString();
    evenString.range = evenSymbols.split("");

    expect(evenString.range).toEqual(
      expect.arrayContaining(evenSymbolsSteps[0])
    );
    evenString.nextStep();
    expect(evenString.range).toEqual(
      expect.arrayContaining(evenSymbolsSteps[1])
    );
    evenString.nextStep();
    expect(evenString.range).toEqual(
      expect.arrayContaining(evenSymbolsSteps[2])
    );
    evenString.nextStep();
    expect(evenString.range).toEqual(
      expect.arrayContaining(evenSymbolsSteps[3])
    );
    evenString.nextStep();
    expect(evenString.isReversed).toBe(true);
  });

  it("с нечетным количеством символов", () => {
    const oddString = new ReverseString();
    oddString.range = oddSymbols.split("");

    expect(oddString.range).toEqual(expect.arrayContaining(oddSymbolsSteps[0]));
    oddString.nextStep();
    expect(oddString.range).toEqual(expect.arrayContaining(oddSymbolsSteps[1]));
    oddString.nextStep();
    expect(oddString.range).toEqual(expect.arrayContaining(oddSymbolsSteps[2]));

    expect(oddString.isReversed).toBe(true);
  });

  it("с одним символом", () => {
    const singleString = new ReverseString();
    singleString.range = singleSymbol.split("");

    expect(singleString.range).toEqual(
      expect.arrayContaining(singleSymbolStep)
    );

    expect(singleString.isReversed).toBe(true);
  });

  it("пустая строка", () => {
    const emptyStringInstance = new ReverseString();
    emptyStringInstance.range = emptyString.split("");

    expect( emptyStringInstance.range).toEqual(
      expect.arrayContaining(emptyStringResult)
    );

    expect(emptyStringInstance.isReversed).toBe(false);
  });
});
