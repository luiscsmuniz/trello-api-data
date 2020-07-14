export const sortByCol = (arr, colIndex) => {
  arr.sort(sortFunction);
  function sortFunction(a, b) {
    a = a[colIndex];
    b = b[colIndex];
    return a === b ? 0 : a < b ? -1 : 1;
  }
};
