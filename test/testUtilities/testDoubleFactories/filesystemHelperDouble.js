function filesystemHelperDouble(sinon) {
    'use strict';
    
    return {
        readTextFile: sinon.stub(),
        statPath: sinon.stub()
    };
}

module.exports = filesystemHelperDouble;