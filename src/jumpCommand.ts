import * as vscode from "vscode";

import { getVisibleLines } from "./utils";

export function jumpCommand() {
  vscode.window.setStatusBarMessage("JMP: waiting for input");

  const editor = vscode.window.activeTextEditor;
  if (editor === undefined) {
    vscode.window.setStatusBarMessage("JMP: No active text editor", 3000);
    return;
  }

  const visibleLines = getVisibleLines(editor);
}
