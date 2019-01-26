function fileFinderFactory(
    filesystemHelper,
    pathHelper
) {
    'use strict';
    
    return function (pathBuilder) {
        function getParentPath(folderPath) {
            return pathHelper.stripLastPathElement(folderPath);
        }
    
        function findInNextPath(folderPath) {
            const parentFolder = getParentPath(folderPath);
            const parentFolderIsEmpty = parentFolder !== '';
    
            return parentFolderIsEmpty ? findNearestMatchingFile(parentFolder) : null;
        }
    
        function findNearestMatchingFile(folderPath) {
            const fileTestPath = pathBuilder(folderPath);
            const configWasFound = filesystemHelper.statPath(fileTestPath);
    
            return configWasFound ? fileTestPath : findInNextPath(folderPath);
        }
        
        return {
            findNearestMatchingFile: findNearestMatchingFile
        }
    };
}

module.exports = fileFinderFactory;