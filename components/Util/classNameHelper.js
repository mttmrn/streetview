export function cn(baseline, listOfPairs = []) {
  let final = "";

  // if no basline then first argument is listOfPairs
  if (Array.isArray(baseline)) {
    listOfPairs = baseline;
    baseline = "";
  }
  final =
    baseline +
    listOfPairs
      .map(function (pair) {
        if (Array.isArray(pair)) {
          return pair[0] ? " " + pair[1] : "";
        }
        return pair ? " " + pair : "";
      })
      .join("");

  return final.trim();
}
