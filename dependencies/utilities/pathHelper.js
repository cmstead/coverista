function pathHelper(
    path,
    vscode
) {
    'use strict';

    function getFilePath() {
        const activeEditor = vscode.window.activeTextEditor;

        return activeEditor._documentData._uri.fsPath;
    }

    function getFilePathTokens(filePath) {
        return filePath.split(path.sep);
    }

    function getFolderPathTokens(filePath) {
        const filePathTokens = getFilePathTokens(filePath);

        return filePathTokens.slice(0, filePathTokens.length - 1);
    }

    function getActiveTextEditorFolderPath() {
        const filePath = getFilePath();
        const folderPathTokens = getFolderPathTokens(filePath);

        return folderPathTokens.join(path.sep);
    }

    return {
        getActiveTextEditorFolderPath: getActiveTextEditorFolderPath
    };
}

module.exports = pathHelper;