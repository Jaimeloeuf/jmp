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

  /**
   * Create a new InputBox to handle user input and show them what they typed
   * instead of doing dynamic key logging as this should be more performant.
   */
  const inputBox = vscode.window.createInputBox();

  /**
   * Create a new `SearchSession` with the editor and inputBox so that it can
   * maintain its own internal state and control the editor and inputBox.
   */
  const searchSession = new SearchSession(editor, inputBox, visibleLines);

  /**
   * Use `onSearchStringChange` method to dispatch specific `SearchSession`
   * methods internally everytime user changes their search input.
   */
  inputBox.onDidChangeValue(
    searchSession.onSearchStringChange.bind(searchSession)
  );

  /**
   * If user removes the inputBox themselves with escape key, remove all
   * existing decorations and dispose the input box to clean up.
   */
  inputBox.onDidHide(() => {
    searchSession.removeAllDecorations();
    inputBox.dispose();
  });

  inputBox.prompt =
    "Enter the first 2 characters after the cursor point where you want to jump to followed by the generated labels";

  // Only show input box after everything is configured.
  inputBox.show();
}
