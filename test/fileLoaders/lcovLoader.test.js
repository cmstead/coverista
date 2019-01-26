'use strict';

const testContainer = require('../testContainer');
const appContainer = require('../../container');

const { assert } = testContainer.build('chai');

describe('lcovLoader', function () {

    let appChildContainer;
    let lcovLoader;
    let activeEditorHelperFake;
    let filesystemHelperFake;
    let lcovParseFake;

    beforeEach(function () {
        appChildContainer = appContainer.new();

        activeEditorHelperFake = testContainer.build('activeEditorHelperDouble');
        filesystemHelperFake = testContainer.build('filesystemHelperDouble');
        lcovParseFake = testContainer.build('lcovParseDouble');
        const pathFake = testContainer.build('pathDouble');

        appChildContainer.register(() => activeEditorHelperFake, 'activeEditorHelper');
        appChildContainer.register(() => filesystemHelperFake, 'filesystemHelper');
        appChildContainer.register(() => lcovParseFake, 'lcovParse');
        appChildContainer.register(() => pathFake, 'path');

        lcovLoader = appChildContainer.build('lcovLoader');
    });

    describe('getLcovPath', function () {

        it('returns the path for lcov.info file', function () {
            const projectPath = '/root/usr/auser/projects/my_project/coverage';

            activeEditorHelperFake.getActiveTextEditorFolderPath.callsFake(function () {
                return projectPath;
            });

            filesystemHelperFake.statPath.callsFake(function () {
                return true;
            });

            const expectedPath = projectPath + '/coverage/lcov.info';

            const returnedPath = lcovLoader.getLcovPath('coverage');

            assert.equal(expectedPath, returnedPath);

        });

        it('returns the path for lcov.info file from a parent directory', function () {
            const projectPath = '/root/usr/anotheruser/projects/my_project';
            const coveristaConfigFileName = '/coverage/lcov.info';

            activeEditorHelperFake.getActiveTextEditorFolderPath.callsFake(function () {
                return `${projectPath}/anotherFolder/andAnother`;
            });

            filesystemHelperFake.statPath.callsFake(function (filePath) {
                return filePath === `${projectPath}${coveristaConfigFileName}`;
            });


            const expectedPath = projectPath + coveristaConfigFileName;

            const returnedPath = lcovLoader.getLcovPath('coverage');

            assert.equal(expectedPath, returnedPath);

        });

        it('returns null if .coveristaconfig cannot be found', function () {
            const projectPath = '/root/usr/anotheruser/projects/my_project';

            activeEditorHelperFake.getActiveTextEditorFolderPath.callsFake(function () {
                return `${projectPath}/anotherFolder/andAnother`;
            });

            filesystemHelperFake.statPath.callsFake(function () {
                return false;
            });


            const expectedPath = null;

            const returnedPath = lcovLoader.getLcovPath('coverage');

            assert.equal(expectedPath, returnedPath);

        });

    });

    describe('loadLcovFile', function () {
        it('loads parsed lcov file from a file path', function () {
            const lcovContent = {
                "title": "Test #1",
                "file": "anim-base/anim-base-coverage.js",
                "functions": {},
                "lines": {}
            };

            const filePath = '/test/my_project/coverage/lcov.info';

            lcovParseFake.callsFake((path, callback) => callback(null, lcovContent));

            let lcovResults;
            
            lcovLoader.loadLcovFile(filePath, function (error, data){
                lcovResults = data;
            });

            const expectedResult = JSON.stringify(lcovContent);

            assert.equal(JSON.stringify(lcovResults), expectedResult);
        });

        it('loads null when the file path is null', function () {
            const filePath = null;

            let lcovResults;
            
            lcovLoader.loadLcovFile(filePath, function (error, data){
                lcovResults = data;
            });

            const expectedResult = null;

            assert.equal(lcovResults, expectedResult);
        });
    });

    describe('loadLcovFiles', function () {
        it('loads parsed lcov files from all file paths', function () {
            const lcovContent = {
                "title": "Test #1",
                "file": "anim-base/anim-base-coverage.js",
                "functions": {},
                "lines": {}
            };

            const filePath1 = 'fakePath1';
            const filePath2 = 'fakePath2';

            lcovParseFake.callsFake((path, callback) => callback(null, lcovContent));

            let lcovResults;
            
            lcovLoader.loadLcovFiles([filePath1, filePath2], function (error, data){
                lcovResults = data;
            });

            const expectedResult = JSON.stringify([lcovContent, lcovContent]);

            assert.equal(JSON.stringify(lcovResults), expectedResult);
        });

        it('loads files normally with string path and null when the file path is null', function () {
            const lcovContent = {
                "title": "Test #1",
                "file": "anim-base/anim-base-coverage.js",
                "functions": {},
                "lines": {}
            };

            const filePath1 = 'fakePath1';
            const filePath2 = null;

            lcovParseFake.callsFake((path, callback) => callback(null, lcovContent));

            let lcovResults;
            
            lcovLoader.loadLcovFiles([filePath1, filePath2], function (error, data){
                lcovResults = data;
            });

            const expectedResult = JSON.stringify([lcovContent, null]);

            assert.equal(JSON.stringify(lcovResults), expectedResult);
        });

        it('calls back immediately when an error occurs', function () {
            const filePath1 = 'fakePath1';
            const filePath2 = null;
            const readError = new Error('Oh noes! I failed to read!');

            lcovParseFake.callsFake((path, callback) => callback(readError));

            let lcovResults;
            let lcovError;
            
            lcovLoader.loadLcovFiles([filePath1, filePath2], function (error, data){
                lcovError = error;
                lcovResults = data;
            });

            const expectedResult = null;

            assert.equal(lcovResults, expectedResult);
            assert.equal(lcovError, readError);
        });
    });

});