/**
 * @todo generate base on proximity
 */
const labellingChars = "fjrudkeislwoaqghp";

/**
 * Pre-compute number of available labelling characters so that this doesn't
 * need to be read over and over again when generating labels.
 */
const numOfAvailableLabellingChars = labellingChars.length;

/**
 * Generate a label using a deterministic/stable algorithm to ensure that all
 * generated labels are unique and deterministic using the same call condition.
 *
 * The algorithm determines what is the next available label using the number of
 * currently used labels. By using the number of used labels as a way to index
 * from the list of available `labellingChars`.
 */
export function generateLabel(numOfUsedLabels: number) {
  // If there is more labels used than available `labellingChars`, the new label
  // will be a multicharacter label.
  if (numOfUsedLabels > numOfAvailableLabellingChars) {
    const quotient = Math.floor(numOfUsedLabels / numOfAvailableLabellingChars);
    const remainder = numOfUsedLabels % numOfAvailableLabellingChars;

    return "f".repeat(quotient) + labellingChars[remainder];
  }

  return labellingChars[numOfUsedLabels];
}
