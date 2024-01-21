import * as vscode from "vscode";

import { jumpCommand } from "./jumpCommand";

/**
 * This is called when the extension is activated. The extension is activated
 * the very first time the command is executed.
 */
export function activate(context: vscode.ExtensionContext) {
  console.debug("JMP: Activated");

  // The commandID parameter must match the command field in package.json
  const commandDisposable = vscode.commands.registerCommand(
    "jmp.jump",
    jumpCommand
  );

  context.subscriptions.push(commandDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
