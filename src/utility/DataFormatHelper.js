/**
 * DataFormatHelper file contains functions for formatting the data
 * retrieved from the backend API before passing it into UI components
 * (such as FlatLists) to display.
 */

/**
 * Format data (array) so that when it is passed as datainto a FlatList
 * with the numColumns props, the last row will not be rendered imbalanced
 * due to last row's elements !== numColumns.
 * @param {Array} data
 * @param {number} numberOfCol
 * @param {Object} fillerObj
 */
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

/**
 * Retrieve first two initials from a name (excluding parts of the
 * name that have periods indicating honorifics).
 * @param {String} name full name to extract initials from
 * @return {String} first two initials from name, only returns one if
 *                  name contains one non-honorific word
 */
export function getInitialsFromName(name) {
  if (!name) {
    return name;
  }
  let segments = name.split(" ");
  let initials = "";
  for (let i = 0; i < segments.length; i++) {
    if (!segments[i][0] || segments[i].indexOf(".") > -1) {
      continue;
    }
    initials += segments[i][0];
    if (initials.length >= 2) {
      break;
    }
  }
  return initials;
}
