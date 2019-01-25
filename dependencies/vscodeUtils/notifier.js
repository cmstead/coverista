function notifier(vscode) {
    'use strict';
    
    function info(message) {
        vscode.window.showInformationMessage(message);
    }

    return {
        info: info
    };
}

module.exports = notifier;