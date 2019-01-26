function fileLoader(
    filesystemHelper,
    lcovParse
) {
    'use strict';
    
    function loadJsonFile (filePath){
        const jsonContent = filesystemHelper.readTextFile(filePath);

        try{
            return JSON.parse(jsonContent);
        } catch (e) {
            return null;
        }
    }

    function loadLcovFile(filePath, callback) {
        lcovParse(filePath, callback);
    }

    return {
        loadJsonFile: loadJsonFile,
        loadLcovFile: loadLcovFile
    };
}

module.exports = fileLoader;