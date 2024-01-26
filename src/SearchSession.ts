import * as vscode from "vscode";

import { generateLabel, createDecorationWithLabel } from "./utils";

type SearchResult = {
  /**
   * The first 2 character of the search result string.
   */
  firstTwoChar: string;

  /**
   * Assigned label for this `SearchResult`.
   */
  label: string;

  /**
   * Start position of the search result's first character.
   */
  position: vscode.Position;

  /**
   * The decoration type object created for this `SearchResult`.
   * This is tracked so that it can be removed after.
   */
  decoration: vscode.TextEditorDecorationType;
};

export class SearchSession {
  constructor(
    private readonly editor: vscode.TextEditor,
    private readonly visibleLines: Array<vscode.TextLine>
  ) {}

  /**
   * Defaults to no search result right now.
   */
  searchResults: Array<SearchResult> = [];

  /**
   * Removes all decorations of `this.searchResults`. If a decoration is somehow
   * not tracked in this array, then it will not be removed.
   */
  removeAllDecorations() {
    // Remove all the previous search result's decorations
    for (const searchResult of this.searchResults) {
      searchResult.decoration.dispose();
    }
  }

  /**
   * Clean up after a search session by
   * 1. Clearing all label decorations
   * 2. Clearing search results
   */
  private cleanUp() {
    this.removeAllDecorations();
    this.searchResults = [];
  }

  /**
   * If the current search string is nothing.
   *
   * Tasks
   * 1. Clear all label decorations
   * 2. Clear search results
   */
  zeroCharacter() {
    this.cleanUp();
  }

  /**
   * If the current search string in a single character.
   *
   * Tasks
   * 1. Clear past search results and decorations first
   * 2. Search for possible search results and save the results for later
   * 3. Generate labels for each search result
   * 4. Show labels
   */
  oneCharacter(firstChar: string) {
    // Clear decorations and search results first, because this method can run
    // when going from 2 to 1 characters when a user deletes a character, so
    // these must be removed before populating new search results.
    this.removeAllDecorations();
    this.searchResults = [];

    // Loop through every visible line and every character of each line to
    // populate the list of search results.
    for (const line of this.visibleLines) {
      const text = line.text;
      const length = text.length;

      // Loop through the line to find if the search string exists
      // @todo This is quite slow as there's lots of white space to search
      for (let i = 0; i < length - 1; i++)
        // @todo make lowercase configurable
        // @todo this expects search string to always be lowercase right now
        if (firstChar === text[i].toLowerCase()) {
          const label = generateLabel(firstChar);
          const decoration = createDecorationWithLabel(label);
          const position = new vscode.Position(line.lineNumber, i);

          // Set decoration / injected text label after the first 2 character
          this.editor.setDecorations(decoration, [
            { range: new vscode.Range(position, position.translate(0, 2)) },
          ]);

          // Save the search result to filter in the next step
          this.searchResults.push({
            firstTwoChar: `${text[i]}${text[i + 1]}`,
            label,
            position,
            decoration,
          });
        }
    }
  }

  /**
   * If the current search string is 2 characters.
   *
   * Tasks
   * 1. Refine search by filtering out existing search results
   *
   * alert error if there are no search results left after filtering
   */
  twoCharacter(searchString: string) {
    //
  }

  /**
   * If the current search string is more than 2 characters.
   * It is time to look for the label
   *
   * Tasks
   * 1. Refine search by filtering out existing search results
   *
   * alert error if there are no search results left after filtering
   */
  findLabel(searchString: string) {
    //
  }
}
