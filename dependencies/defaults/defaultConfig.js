function defaultConfig() {
    'use strict';

    function getDefaultConfig() {
        return {
            coverageDirectories: ['coverage']
        };
    }

    return {
        getDefaultConfig: getDefaultConfig
    };
}

module.exports = defaultConfig;