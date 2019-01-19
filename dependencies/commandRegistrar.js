function commandRegistrar(vscode) {
    'use strict';

    function buildCommandRegistrar(context, namespace) {
        const commands = vscode.commands;
        const registerCommand = commands.registerCommand.bind(commands);

        return function ({ name, command }) {
            let disposable = registerCommand(`${namespace}.${name}`, command);

            context.subscriptions.push(disposable);
        }
    }

    return {
        build: buildCommandRegistrar
    };
}

module.exports = commandRegistrar;