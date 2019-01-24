function pathHelper(
    functionUtils,
    path
) {
    'use strict';

    function tokenizePath(filePath) {
        return filePath.split(path.sep);
    }

    function stripLastToken(filePathTokens) {
        return filePathTokens.slice(0, filePathTokens.length - 1);
    }

    function unixSafePathJoin(pathTokens) {
        return Array.prototype.join.call(pathTokens, path.sep);
    }

    const stripLastPathElement = (filePath) =>
        functionUtils.foldCompose(
            tokenizePath,
            stripLastToken,
            unixSafePathJoin
        )(filePath);

    return {
        stripLastPathElement: stripLastPathElement,
        stripLastToken: stripLastToken,
        tokenizePath: tokenizePath,
        unixSafePathJoin: unixSafePathJoin
    };
}

module.exports = pathHelper;