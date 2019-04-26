'use strict';

const testContainer = require('../testContainer');
const appContainer = require('../../container');

const { assert } = testContainer.build('chai');

describe('configLoader', function () {

    let appChildContainer;
    let configLoader;
    let activeEditorHelperFake;
    let filesystemHelperFake;

    beforeEach(function () {
        appChildContainer = appContainer.new();

        activeEditorHelperFake = testContainer.build('activeEditorHelperDouble');
        filesystemHelperFake = testContainer.build('filesystemHelperDouble');
        const pathFake = testContainer.build('pathDouble');

        appChildContainer.register(() => activeEditorHelperFake, 'activeEditorHelper');
        appChildContainer.register(() => filesystemHelperFake, 'filesystemHelper');
        appChildContainer.register(() => pathFake, 'path');

        configLoader = appChildContainer.build('configLoader');
    });

    describe('getConfigPath', function () {

        it('returns the path coveristaconfig.json file in same directory', function () {
            const projectPath = '/root/usr/auser/projects/my_project';

            activeEditorHelperFake.getActiveTextEditorFolderPath.callsFake(function () {
                return projectPath;
            });

            filesystemHelperFake.statPath.callsFake(function () {
                return true;
            });

            const expectedPath = projectPath + '/coveristaconfig.json';

            const returnedPath = configLoader.getConfigPath();

            assert.equal(expectedPath, returnedPath);

        });

        it('returns the path coveristaconfig.json file from a parent directory', function () {
            const projectPath = '/root/usr/anotheruser/projects/my_project';
            const coveristaConfigFileName = '/coveristaconfig.json';

            activeEditorHelperFake.getActiveTextEditorFolderPath.callsFake(function () {
                return `${projectPath}/anotherFolder/andAnother`;
            });

            filesystemHelperFake.statPath.callsFake(function (filePath) {
                return filePath === `${projectPath}${coveristaConfigFileName}`;
            });


            const expectedPath = projectPath + coveristaConfigFileName;

            const returnedPath = configLoader.getConfigPath();

            assert.equal(expectedPath, returnedPath);

        });

        it('returns null if coveristaconfig.json cannot be found', function () {
            const projectPath = '/root/usr/anotheruser/projects/my_project';

            activeEditorHelperFake.getActiveTextEditorFolderPath.callsFake(function () {
                return `${projectPath}/anotherFolder/andAnother`;
            });

            filesystemHelperFake.statPath.callsFake(function () {
                return false;
            });


            const expectedPath = null;

            const returnedPath = configLoader.getConfigPath();

            assert.equal(expectedPath, returnedPath);

        });

    });

    describe('loadConfigFile', function () {
        it('loads a coverista configuration from a file path', function () {
            const configContent = {
                coverageDirectories: ['/foo/bar/baz']
            };

            const fileContent = JSON.stringify(configContent);
            const filePath = '/test/my_project/coveristaconfig.json';

            filesystemHelperFake.readTextFile.callsFake(() => fileContent);

            const configResults = configLoader.loadConfigFile(filePath);

            const expectedResult = JSON.stringify(configContent);

            assert.equal(JSON.stringify(configResults), expectedResult);
        });

        it('loads a default coverista configuration when the file path is null', function () {
            const configContent = appChildContainer.build('defaultConfig').getDefaultConfig();

            const filePath = null;

            const configResults = configLoader.loadConfigFile(filePath);

            const expectedResult = JSON.stringify(configContent);

            assert.equal(JSON.stringify(configResults), expectedResult);
        });
    });

});