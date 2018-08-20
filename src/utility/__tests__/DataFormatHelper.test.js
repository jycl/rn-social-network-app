import { formatDataForGrid, getInitialsFromName } from "../DataFormatHelper";

describe("DataFormatHelper class tests ", () => {
  it("formatDataForGrid tests", () => {
    const testData = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
    const numColumns = 3;
    const resultData = formatDataForGrid(testData, numColumns);
    expect(resultData).toHaveLength(6); //add two objects for empty elements on last row
    expect(resultData[resultData.length - 1]).toEqual({}); //default element is empty object
  });

  it("getInitialsFromName tests", () => {
    const testName1 = "John Doe";
    const testName2 = "Lara Croft";
    const testName3 = "Dr. Suess";
    expect(getInitialsFromName(testName1)).toHaveLength(2);
    expect(getInitialsFromName(testName2)).toHaveLength(2);
    const initialForName3 = getInitialsFromName(testName3);
    expect(initialForName3).toHaveLength(1);
    expect(initialForName3).toBe("S");
  });
});
