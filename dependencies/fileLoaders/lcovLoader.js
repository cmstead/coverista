function lcovLoader(
    activeEditorHelper,
    fileFinderFactory,
    fileLoader,
    pathHelper
) {
    'use strict';

    function buildFilePathWithCoveragePath(coveragePath) {
        return function (folderPath) {
            return pathHelper.unixSafePathJoin([folderPath, coveragePath, 'lcov.info'])
        }
    }

    function getLcovPath(coverageDirectory) {
        const folderPath = activeEditorHelper.getActiveTextEditorFolderPath();

        const buildFilePath = buildFilePathWithCoveragePath(coverageDirectory);
        const fileFinder = fileFinderFactory(buildFilePath);

        return fileFinder.findNearestMatchingFile(folderPath);
    }

    function getLcovPaths(coverageDirectories) {
        return coverageDirectories.map(getLcovPath);
    }

    function loadLcovFile(filePath, callback) {
        if (filePath === null) {
            callback(null, null);
        } else {
            fileLoader.loadLcovFile(filePath, callback);
        }
    }

    function loadLcovFiles(filePaths, callback) {
        let lcovFileContents = [];

        function loadAllFiles(remainingPaths) {
            function storeFileContentAndLoadNext(error, data) {
                if(Boolean(error)) {
                    callback(error, null);
                } else {
                    lcovFileContents.push(data);

                    loadAllFiles(remainingPaths.slice(1));    
                }
            }

            if (remainingPaths.length === 0) {
                callback(null, lcovFileContents);
            } else {
                loadLcovFile(remainingPaths[0], storeFileContentAndLoadNext);
            }
        }

        loadAllFiles(filePaths);
    }

    return {
        getLcovPath: getLcovPath,
        getLcovPaths: getLcovPaths,
        loadLcovFile: loadLcovFile,
        loadLcovFiles: loadLcovFiles
    };
}

module.exports = lcovLoader;