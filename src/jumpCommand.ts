import * as vscode from "vscode";

import { Search } from "./Search";
import { getVisibleLines } from "./utils";

export function jumpCommand() {
  vscode.window.setStatusBarMessage("JMP: waiting for input", 3000);

  const editor = vscode.window.activeTextEditor;
  if (editor === undefined) {
    vscode.window.setStatusBarMessage("JMP: No active text editor", 3000);
    return;
  }

  const visibleLines = getVisibleLines(editor);

  const search = new Search(editor, visibleLines);

  /**
   * Create a new InputBox to handle user input and show them what they typed
   * instead of doing dynamic key logging as this should be more performant.
   */
  const inputBox = vscode.window.createInputBox();

  inputBox.onDidChangeValue((searchString) => {
    if (searchString.length === 0) {
      search.zeroCharacter();
    } else if (searchString.length === 1) {
      search.oneCharacter(searchString);
    } else if (searchString.length === 2) {
      search.twoCharacter(searchString);
    } else if (searchString.length > 2) {
      //
    }
  });

  /**
   * If user removes the inputBox themselves with escape key, remove all
   * existing decorations and dispose the input box to clean up.
   */
  inputBox.onDidHide(() => {
    search.removeAllDecorations();
    inputBox.dispose();
  });

  // Only show input box after everything is configured.
  inputBox.show();
}
