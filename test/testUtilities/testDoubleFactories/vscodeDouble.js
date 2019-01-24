function vscodeDouble(sinon) {
    'use strict';

    const window = {
        showInformationMessage: sinon.stub(),
        activeTextEditor: {
            _documentData: {
                _uri: {
                    fsPath: ''
                }
            }
        }
    };

    return {
        window: window
    };
}

module.exports = vscodeDouble;