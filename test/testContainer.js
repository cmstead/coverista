'use strict'

const path = require('path');

var config = {
    cwd: path.join(__dirname, 'testUtilities'),
    modulePaths: [
        '',
        'testDoubleFactories'
    ],
    allowOverride: false,
    eagerLoad: false,
    errorOnModuleDNE: false
};

module.exports = require('dject').new(config);