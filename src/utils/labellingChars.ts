export function getLabellingChars() {
  // @todo Use a config to determine this and let users set this themselves
  // const labellingChars = "fjeirudkoa";

  /**
   * Extended set with more than 10 characters, which means the
   * `labeallingCharTable` needs to be used because when using `Number.toString`
   * with a radix of more than 10, alphabets will be returned, which cannot be
   * used to index the `labellingChars` string as an array directly, which is
   * why it needs to be converted to a key->value mapper first.
   */
  const labellingChars = "fjeirudkpsloagh";

  /**
   * Pre-compute number of available labelling characters so that this doesn't
   * need to be read over and over again when generating labels.
   */
  const numOfAvailableLabellingChars = labellingChars.length;

  /**
   * Build this index to labellingChar key->value mapper dynamically using the
   * `labellingChars` string.
   */
  const labellingCharTable: Record<string, string> = {};
  for (let i = 0; i < numOfAvailableLabellingChars; i++) {
    const key = i.toString(numOfAvailableLabellingChars);
    labellingCharTable[key] = labellingChars[i];
  }

  return { labellingChars, numOfAvailableLabellingChars, labellingCharTable };
}
