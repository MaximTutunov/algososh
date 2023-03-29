import { SortArray } from "../utils";
import { Direction, SortingMethods } from "../../../types";

const emptyArray = [];
const emptyArraySteps = [];

const singleElemArrray = [5];
const singleElemSteps = [{ array: [5], current: [], modified: [0] }];

const testArray = [12, 9, 83, 45];
const testStepsAscending = [
  { array: [12, 9, 83, 45], current: [0, 1, 0], modified: [] },
  { array: [12, 9, 83, 45], current: [0, 2, 1], modified: [] },
  { array: [12, 9, 83, 45], current: [0, 3, 1], modified: [] },
  { array: [9, 12, 83, 45], current: [0, 1], modified: [] },
  { array: [9, 12, 83, 45], current: [], modified: [0] },
  { array: [9, 12, 83, 45], current: [1, 2, 1], modified: [0] },
  { array: [9, 12, 83, 45], current: [1, 3, 1], modified: [0] },
  { array: [9, 12, 83, 45], current: [1, 1], modified: [0] },
  { array: [9, 12, 83, 45], current: [], modified: [0, 1] },
  { array: [9, 12, 83, 45], current: [2, 3, 2], modified: [0, 1] },
  { array: [9, 12, 45, 83], current: [2, 3], modified: [0, 1] },
  { array: [9, 12, 45, 83], current: [], modified: [0, 1, 2] },
  { array: [9, 12, 45, 83], current: [3, 3], modified: [0, 1, 2] },
  { array: [9, 12, 45, 83], current: [], modified: [0, 1, 2, 3] },
];

const testStepsDescending = [
  { array: [12, 9, 83, 45], current: [0, 1, 0], modified: [] },
  { array: [12, 9, 83, 45], current: [0, 2, 0], modified: [] },
  { array: [12, 9, 83, 45], current: [0, 3, 2], modified: [] },
  { array: [83, 9, 12, 45], current: [0, 2], modified: [] },
  { array: [83, 9, 12, 45], current: [], modified: [0] },
  { array: [83, 9, 12, 45], current: [1, 2, 1], modified: [0] },
  { array: [83, 9, 12, 45], current: [1, 3, 2], modified: [0] },
  { array: [83, 45, 12, 9], current: [1, 3], modified: [0] },
  { array: [83, 45, 12, 9], current: [], modified: [0, 1] },
  { array: [83, 45, 12, 9], current: [2, 3, 2], modified: [0, 1] },
  { array: [83, 45, 12, 9], current: [2, 2], modified: [0, 1] },
  { array: [83, 45, 12, 9], current: [], modified: [0, 1, 2] },
  { array: [83, 45, 12, 9], current: [3, 3], modified: [0, 1, 2] },
  { array: [83, 45, 12, 9], current: [], modified: [0, 1, 2, 3] },
];

const testStepsBubbleAscending = [
  { array: [12, 9, 83, 45], current: [0, 1], modified: [] },
  { array: [9, 12, 83, 45], current: [0, 1], modified: [] },
  { array: [9, 12, 83, 45], current: [0, 2], modified: [] },
  { array: [9, 12, 83, 45], current: [0, 3], modified: [] },
  { array: [9, 12, 83, 45], current: [], modified: [0] },
  { array: [9, 12, 83, 45], current: [1, 2], modified: [0] },
  { array: [9, 12, 83, 45], current: [1, 3], modified: [0] },
  { array: [9, 12, 83, 45], current: [], modified: [0, 1] },
  { array: [9, 12, 83, 45], current: [2, 3], modified: [0, 1] },
  { array: [9, 12, 45, 83], current: [2, 3], modified: [0, 1] },
  { array: [9, 12, 45, 83], current: [], modified: [0, 1, 2] },
  { array: [9, 12, 45, 83], current: [], modified: [0, 1, 2, 3] },
];

const testStepsBubbleDescending = [
  { array: [12, 9, 83, 45], current: [0, 1], modified: [] },
  { array: [12, 9, 83, 45], current: [0, 2], modified: [] },
  { array: [83, 9, 12, 45], current: [0, 2], modified: [] },
  { array: [83, 9, 12, 45], current: [0, 3], modified: [] },
  { array: [83, 9, 12, 45], current: [], modified: [0] },
  { array: [83, 9, 12, 45], current: [1, 2], modified: [0] },
  { array: [83, 12, 9, 45], current: [1, 2], modified: [0] },
  { array: [83, 12, 9, 45], current: [1, 3], modified: [0] },
  { array: [83, 45, 9, 12], current: [1, 3], modified: [0] },
  { array: [83, 45, 9, 12], current: [], modified: [0, 1] },
  { array: [83, 45, 9, 12], current: [2, 3], modified: [0, 1] },
  { array: [83, 45, 12, 9], current: [2, 3], modified: [0, 1] },
  { array: [83, 45, 12, 9], current: [], modified: [0, 1, 2] },
  { array: [83, 45, 12, 9], current: [], modified: [0, 1, 2, 3] },
];

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {

  it("пустой массив, сортировка выбором", () => {
    const emptyArr = new SortArray();

    emptyArr.data = emptyArray;
    emptyArr.method = SortingMethods.Selection;
    emptyArr.direction = Direction.Ascending;
    emptyArr.sortArray();
    expect(emptyArr.steps).toEqual(expect.arrayContaining(emptyArraySteps));
  });

  it("пустой массив, сортировка пузырьком", () => {
    const emptyArr = new SortArray();

    emptyArr.data = emptyArray;
    emptyArr.method = SortingMethods.Bubble;
    emptyArr.direction = Direction.Descending;
    emptyArr.sortArray();
    expect(emptyArr.steps).toEqual(expect.arrayContaining(emptyArraySteps));
  });

  it("Массив с одним элементом, сортировка выбором", () => {
    const singleArr = new SortArray();

    singleArr.data = singleElemArrray;
    singleArr.method = SortingMethods.Selection;
    singleArr.direction = Direction.Descending;

    singleArr.sortArray();

    expect(singleArr.steps).toEqual(expect.arrayContaining(singleElemSteps));
  });

  it("Массив с одним элементом, сортировка пузырьком", () => {
    const singleArr = new SortArray();

    singleArr.data = singleElemArrray;
    singleArr.method = SortingMethods.Bubble;
    singleArr.direction = Direction.Descending;

    singleArr.sortArray();

    expect(singleArr.steps).toEqual(expect.arrayContaining(singleElemSteps));
  });

  it("Массив из нескольких элементов, сортировка выбором, по возрастанию", () => {
    const testArrayInstance = new SortArray();

    testArrayInstance.data = testArray;
    testArrayInstance.method = SortingMethods.Selection;
    testArrayInstance.direction = Direction.Ascending;

    testArrayInstance.sortArray();

    expect(testArrayInstance.steps).toEqual(expect.arrayContaining(testStepsAscending));
  });

  it("Массив из нескольких элементов, сортировка выбором, по убыванию", () => {
    const testArrayInstance = new SortArray();

    testArrayInstance.data = testArray;
    testArrayInstance.method = SortingMethods.Selection;
    testArrayInstance.direction = Direction.Descending;

    testArrayInstance.sortArray();

    expect(testArrayInstance.steps).toEqual(expect.arrayContaining(testStepsDescending));
  });

  it("Массив из нескольких элементов, сортировка пузырьком, по возрастанию", () => {
    const testArrayInstance = new SortArray();

    testArrayInstance.data = testArray;
    testArrayInstance.method = SortingMethods.Bubble;
    testArrayInstance.direction = Direction.Ascending;

    testArrayInstance.sortArray();

    expect(testArrayInstance.steps).toEqual(expect.arrayContaining(testStepsBubbleAscending));
  });

  it("Массив из нескольких элементов, сортировка пузырьком, по убыванию", () => {
    const testArrayInstance = new SortArray();

    testArrayInstance.data = testArray;
    testArrayInstance.method = SortingMethods.Bubble;
    testArrayInstance.direction = Direction.Descending;

    testArrayInstance.sortArray();

    expect(testArrayInstance.steps).toEqual(expect.arrayContaining(testStepsBubbleDescending));
  });

});
