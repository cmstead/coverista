function helloWorld(vscode, notifier) {
    'use strict';

    function helloWorldCommand() {
        console.log(vscode.window.activeTextEditor);
        console.log(vscode.workspace);
        notifier.info('Hello World!');
    }

    return {
        name: 'helloWorld',
        command: helloWorldCommand
    };
}

module.exports = helloWorld;