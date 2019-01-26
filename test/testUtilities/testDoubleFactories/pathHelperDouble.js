function pathHelperDouble(sinon) {
    'use strict';
    
    return {
        stripLastPathElement: sinon.stub(),
        stripLastToken: sinon.stub(),
        tokenizePath: sinon.stub(),
        unixSafePathJoin: sinon.stub()

    };
}

module.exports = pathHelperDouble;