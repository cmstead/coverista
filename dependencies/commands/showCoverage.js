function showCoverage(
    configLoader,
    lcovLoader,
    notifier,
    vscode
) {
    'use strict';

    function loadConfigData() {
        const configPath = configLoader.getConfigPath();

        try {
            return configLoader.loadConfigFile(configPath);
        } catch (error) {
            return null;
        }
    }

    function processLcovData(error, data) {
        if (error) {
            notifier.info('Unable to load LCOV data: ' + error.message);
        } else {
            notifier.info('Config available in debug console');
            console.log(data);
        }
    }

    function showCoverageCommand() {
        const configData = loadConfigData();

        if (configData === null) {
            notifier.info('Unable to load config object: ' + error.message);
        } else {
            const lcovPaths = lcovLoader.getLcovPaths(configData.coverageDirectories);

            lcovLoader.loadLcovFiles(lcovPaths, processLcovData);
        }
    }

    return {
        name: 'showCoverage',
        command: showCoverageCommand
    };
}

module.exports = showCoverage;