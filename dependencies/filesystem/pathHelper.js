function pathHelper(
    functionUtils,
    path
) {
    'use strict';

    const separatorPattern = /[\/\\]/;

    function tokenizePath(filePath) {
        return filePath.split(separatorPattern);
    }
    
    function stripLastToken(filePathTokens) {
        return filePathTokens.slice(0, filePathTokens.length - 1);
    }

    function unixSafePathJoin(pathTokens) {
        return pathTokens.join(path.sep);
    }

    const stripLastPathElement = (filePath) =>{
        return functionUtils.foldCompose(
            tokenizePath,
            stripLastToken,
            unixSafePathJoin
        )(filePath);
    }

    return {
        stripLastPathElement: stripLastPathElement,
        stripLastToken: stripLastToken,
        tokenizePath: tokenizePath,
        unixSafePathJoin: unixSafePathJoin
    };
}

module.exports = pathHelper;