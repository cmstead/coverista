function activeEditorHelperDouble(sinon) {
    'use strict';
    
    return {
        getActiveTextEditorFolderPath: sinon.stub(),
        getFilePath: sinon.stub()
    };
}

module.exports = activeEditorHelperDouble;