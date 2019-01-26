function filesystemHelper(
    fs
) {
    'use strict';

    function statPath(filePath) {
        try {
            fs.lstatSync(filePath);
            return true;
        } catch (e) {
            return false;
        }
    }

    function readTextFile(filePath) {
        return fs.readFileSync(filePath, { encoding: 'utf8' ``});
    }

    return {
        readTextFile: readTextFile,
        statPath: statPath
    };
}

module.exports = filesystemHelper;