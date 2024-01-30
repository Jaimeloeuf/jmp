import * as vscode from "vscode";

/**
 * An editor can have multiple visible ranges, so combine all visible lines of
 * texts into a single array of text lines.
 */
export function getVisibleLines(editor: vscode.TextEditor) {
  const lines: Array<vscode.TextLine> = [];

  for (const range of editor.visibleRanges) {
    /**
     * For some reason it always leaves out a line and treats it as not visible,
     * so this just adds 1 to ensure all visible area is included.
     */
    const lastLine = range.end.line + 1;

    for (let lineNumber = range.start.line; lineNumber < lastLine; lineNumber++)
      lines.push(editor.document.lineAt(lineNumber));
  }

  return lines;
}
