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

    function getFilePathOrNull() {
        return functionUtils.compose(
            getActiveTextEditor,
            getPathIfEditorExists
        )();
    }

    function getFilePathAction(filePath) {
        return Boolean(filePath)
            ? pathHelper.stripLastPathElement
            : () => null;
    }

    function applyFilePathTransformation(filePath) {
        return filePathTransformation =>
            filePathTransformation(filePath);
    }

    function getFolderPath(filePath) {
        return functionUtils.compose(
            getFilePathAction,
            applyFilePathTransformation(filePath)
        )(filePath);
    }

    function getActiveTextEditorFolderPath() {
        return functionUtils.compose(
            getFilePathOrNull,
            getFolderPath
        )();
    }


    return {
        getActiveTextEditorFolderPath: getActiveTextEditorFolderPath,
        getFilePathOrNull: getFilePathOrNull
    };
}

module.exports = activeEditorHelper;