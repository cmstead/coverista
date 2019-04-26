function extensionMain(
    commandRegistrar,
    __container
) {
    'use strict';

    const namespace = 'cmstead-coverista';

    function activate(context) {
        const register = commandRegistrar.build(context, namespace);

        register(__container.build('showCoverage'));
        // register(__container.build('hide'));
    }

    function deactivate() { }

    return {
        activate,
        deactivate
    }
}

module.exports = extensionMain;