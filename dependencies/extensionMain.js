function extensionMain(
    commandRegistrar,
    __container
) {
    'use strict';

    const namespace = 'cmstead-coverista';

    function activate(context) {
        const register = commandRegistrar.build(context, namespace);

        register(__container.build('helloWorld'));
    }

    function deactivate() { }

    return {
        activate,
        deactivate
    }
}

module.exports = extensionMain;