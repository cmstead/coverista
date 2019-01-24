'use strict';

const testContainer = require('../testContainer');
const appContainer = require('../../container');

const { assert } = testContainer.build('chai');

describe('activeEditorHelper', function () {

    let pathFake;
    let vscodeFake;

    let activeEditorHelper;

    beforeEach(function () {
        const appChildContainer = appContainer.new();

        pathFake = testContainer.build('pathDouble');
        vscodeFake = testContainer.build('vscodeDouble');

        appChildContainer.register(() => pathFake, 'path');
        appChildContainer.register(() => vscodeFake, 'vscode');

        activeEditorHelper = appChildContainer.build('activeEditorHelper');
    });

    describe('getActiveTextEditorFolderPath', function () {

        it('returns the folder containing the document in the active text editor if there is an active editor', function () {
            const expectedFolderPath = '/foo/bar/baz';
            const editorFilePath = `${expectedFolderPath}/quux.js`;

            vscodeFake.window.activeTextEditor._documentData._uri.fsPath = editorFilePath;

            const folderPath = activeEditorHelper.getActiveTextEditorFolderPath();
            
            assert.equal(folderPath, expectedFolderPath);
        });

        it('returns null if active text editor does not exist', function () {
            vscodeFake.window.activeTextEditor = undefined;

            const folderPath = activeEditorHelper.getActiveTextEditorFolderPath();
            
            assert.equal(folderPath, null);
        });
    });

});