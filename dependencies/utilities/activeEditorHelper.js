function activeEditorHelper(
    functionUtils,
    pathHelper,
    vscode
) {
    'use strict';

    function getPathIfEditorExists(activeEditor) {
        return Boolean(activeEditor)
            ? activeEditor._documentData._uri.fsPath
            : null;
    }

    function getActiveTextEditor() {
        return vscode.window.activeTextEditor;
    }

    const getFilePathOrNull = () =>
        functionUtils.compose(
            getActiveTextEditor,
            getPathIfEditorExists
        )();

    function getFilePathAction(filePath) {
        return Boolean(filePath)
            ? pathHelper.stripLastPathElement
            : () => null;
    }

    function getActiveTextEditorFolderPath() {
        const filePath = getFilePathOrNull();
        const filePathAction = getFilePathAction(filePath)

        return filePathAction(filePath);
    }

    return {
        getActiveTextEditorFolderPath: getActiveTextEditorFolderPath,
        getFilePath: getFilePathOrNull
    };
}

module.exports = activeEditorHelper;