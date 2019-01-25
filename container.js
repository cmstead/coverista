'use strict'

const path = require('path');

var config = {
    cwd: path.join(__dirname, 'dependencies'),
    modulePaths: [
        '**/*.js'
    ],
    allowOverride: false,
    eagerLoad: false,
    errorOnModuleDNE: false
};

module.exports = require('dject').new(config);