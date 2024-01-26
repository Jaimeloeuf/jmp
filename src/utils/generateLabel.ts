/**
 * @todo generate base on proximity
 */
const labellingChars = "fjrudkeislwoaqghtyp";

/**
 * Generate a label for the given character search term.
 */
export function generateLabel(character: string) {
  return labellingChars[Math.floor(Math.random() * 18)];
}
