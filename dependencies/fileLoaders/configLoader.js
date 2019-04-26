function configLoader(
    activeEditorHelper,
    fileFinderFactory,
    fileLoader,
    defaultConfig
) {
    'use strict';

    function buildFilePath(folderPath) {
        return `${folderPath}/coveristaconfig.json`;
    }

    const fileFinder = fileFinderFactory(buildFilePath);

    function getConfigPath() {
        const folderPath = activeEditorHelper.getActiveTextEditorFolderPath();

        console.log(folderPath);

        return fileFinder.findNearestMatchingFile(folderPath);
    }

    function loadConfigFile(filePath) {
        return filePath === null
            ? defaultConfig.getDefaultConfig()
            : fileLoader.loadJsonFile(filePath);
    }

    return {
        getConfigPath: getConfigPath,
        loadConfigFile: loadConfigFile
    };
}

module.exports = configLoader;