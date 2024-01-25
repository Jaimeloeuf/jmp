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

export class Search {
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
    //
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
   * 1. Search for start positions
   *        clear previous search results and labels? SMth like zero char
   *         this is to deal with backspace to clear search
   * 2. Generate labels
   * 3. Show labels
   */
  oneCharacter(firstChar: string) {
    //
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
