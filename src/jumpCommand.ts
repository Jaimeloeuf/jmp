import * as vscode from "vscode";

export function jumpCommand() {
  vscode.window.setStatusBarMessage("JMP: waiting for input");
}
