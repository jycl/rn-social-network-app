export function formatDataForGrid(data, numberOfCol, fillerObj = {}) {
  if (data && data.length) {
    const lastRowNumElements = data.length % numberOfCol; //number of elements in last row
    let formattedData = data.slice(); //make copy of array to avoid mutating/returning original array
    if (lastRowNumElements !== 0) {
      for (let i = lastRowNumElements; i < numberOfCol; i++) {
        formattedData.push(fillerObj);
      }
    }
    return formattedData;
  } else {
    return data;
  }
}
