import * as vscode from "vscode";

/**
 * Create decoration using label to show the label right after a position.
 */
export function createDecorationWithLabel(
  label: string
): vscode.TextEditorDecorationType {
  return vscode.window.createTextEditorDecorationType({
    backgroundColor: "var(--vscode-editor-findMatchHighlightBackground)",
    after: {
      contentText: label,
      color: "var(--vscode-editor-background)",
      backgroundColor: "var(--vscode-editor-foreground)",
      fontWeight: "bold",
      border: "2px solid var(--vscode-editor-foreground)",
    },
  });
}
