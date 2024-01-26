import * as vscode from "vscode";

import { SearchSession } from "./SearchSession";
import { getVisibleLines } from "./utils";

export function jumpCommand() {
  vscode.window.setStatusBarMessage("JMP: waiting for input", 3000);

  const editor = vscode.window.activeTextEditor;
  if (editor === undefined) {
    vscode.window.setStatusBarMessage("JMP: No active text editor", 3000);
    return;
  }

  const visibleLines = getVisibleLines(editor);

  const searchSession = new SearchSession(editor, visibleLines);

  /**
   * Create a new InputBox to handle user input and show them what they typed
   * instead of doing dynamic key logging as this should be more performant.
   */
  const inputBox = vscode.window.createInputBox();

  inputBox.onDidChangeValue((searchString) => {
    if (searchString.length === 0) {
      searchSession.zeroCharacter();
    } else if (searchString.length === 1) {
      searchSession.oneCharacter(searchString);
    } else if (searchString.length === 2) {
      // Close input box if the target is found
      if (searchSession.twoCharacter(searchString)) {
        inputBox.dispose();
      }
    } else if (searchString.length > 2) {
      // Close input box once the target is found
      if (searchSession.findLabel(searchString)) {
        inputBox.dispose();
      }
    }
  });

  /**
   * If user removes the inputBox themselves with escape key, remove all
   * existing decorations and dispose the input box to clean up.
   */
  inputBox.onDidHide(() => {
    searchSession.removeAllDecorations();
    inputBox.dispose();
  });

  // Only show input box after everything is configured.
  inputBox.show();
}
