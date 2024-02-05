import { getLabellingChars } from "./labellingChars";

const { numOfAvailableLabellingChars, labellingCharTable } =
  getLabellingChars();

/**
 * Create a new label maker based on the number of search results, where the
 * label generator will use a deterministic/stable algorithm to ensure that all
 * generated labels are unique and deterministic using the same call condition.
 *
 * The algorithm determines what is the next available label using the number of
 * currently used labels. By using the number of used labels as a way to index
 * from the list of available `labellingChars`.
 *
 * E.g. If there is 10 labelling chars available and there are 12 search
 * results, then every single label needs to use 2 characters so that every
 * single label is fully unique from start to end, to prevent situations where
 * there are partial duplicates which makes the label finding algorithm ignore
 * all other labels that can fulfil the input label once the partial match is
 * found. E.g. if there is 2 labels, one is 'f' and the other is 'ff', since
 * these partially match, once user type in the label 'f', it will use the
 * first label as the target label instead of looking through to see 'ff'.
 * By Ensuring that the number of characters in each labels is the same for
 * all labels based on the number of search results, this issue can be
 * avoided.
 *
 * By knowing the total number of search results, we can determine the number
 * of characters every label require in order to be unique, ensuring that the
 * labels used both have a stable order for the same searchString in the same
 * visible lines and always unique.
 */
export function createLabelMaker(totalNumberOfSearchResults: number) {
  // This number is the 'Closest multiple of numOfAvailableLabellingChars to search result'
  const closestMultipleOfAvailableLabellingChars =
    Math.ceil(totalNumberOfSearchResults / numOfAvailableLabellingChars) *
    numOfAvailableLabellingChars;

  // This is the power value of the log rounded up to get number of characters
  // required for each and every label.
  const numberOfCharactersForLabel = Math.ceil(
    Math.log(closestMultipleOfAvailableLabellingChars) /
      Math.log(numOfAvailableLabellingChars)
  );

  console.debug(
    `JMP: Label Maker,`,
    totalNumberOfSearchResults,
    numberOfCharactersForLabel,
    numOfAvailableLabellingChars
  );

  /**
   * Convert the given index into a string of characters (think of it like
   * converting a number to its Hex form) and converting each of the character
   * into an actual labelling character.
   */
  return (index: number) =>
    index
      .toString(numOfAvailableLabellingChars)
      .split("")
      .map((i) => labellingCharTable[i])
      .join("")
      // E.g. if 3 characters required and index is 2, toString only generates
      // a single character instead of 3 characters, which is the same as saying
      // the first 2 characters are "0", which is why we can hardcode the access
      // here to just use the first character in the labelling characters table.
      .padStart(numberOfCharactersForLabel, labellingCharTable["0"]);

  // Alternative indexing `labellingChars` directly only if
  // `numOfAvailableLabellingChars` is 10 or less.
  // return (index: number) =>
  //   index
  //     .toString(numOfAvailableLabellingChars)
  //     .split("")
  //     .map((i) => labellingChars[parseInt(i)])
  //     .join("")
  //     .padStart(numberOfCharactersForLabel, labellingChars[0]);
}
