'use strict';

const testContainer = require('../testContainer');
const appContainer = require('../../container');

const { assert } = testContainer.build('chai');

describe('pathHelper', function () {

    let pathFake;
    let vscodeFake;

    let pathHelper;

    beforeEach(function () {
        const appChildContainer = appContainer.new();

        pathFake = testContainer.build('pathDouble');
        vscodeFake = testContainer.build('vscodeDouble');

        appChildContainer.register(() => pathFake, 'path');
        appChildContainer.register(() => vscodeFake, 'vscode');

        pathHelper = appChildContainer.build('pathHelper');
    });

    describe('getActiveTextEditorFolderPath', function () {

        it('returns the folder containing the document in the active text editor if there is an active editor', function () {
            const expectedFolderPath = '/foo/bar/baz';
            const editorFilePath = `${expectedFolderPath}/quux.js`;

            vscodeFake.window.activeTextEditor._documentData._uri.fsPath = editorFilePath;

            const folderPath = pathHelper.getActiveTextEditorFolderPath();
            
            assert.equal(folderPath, expectedFolderPath);
        });
    });

});