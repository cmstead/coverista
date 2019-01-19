function helloWorld(notifier) {
    'use strict';

    function helloWorldCommand() {
        notifier.info('Hello World!');
    }

    return {
        name: 'helloWorld',
        command: helloWorldCommand
    };
}

module.exports = helloWorld;