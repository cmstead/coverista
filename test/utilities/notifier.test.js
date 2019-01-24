'use strict';

const testContainer = require('../testContainer');
const appContainer = require('../../container');

const { assert } = testContainer.build('chai');

describe('notifier', function () {

    let vscodeFake;
    let notifier;

    beforeEach(function () {
        const appChildContainer = appContainer.new();

        vscodeFake = testContainer.build('vscodeDouble');

        appChildContainer.register(() => vscodeFake, 'vscode');

        notifier = appChildContainer.build('notifier');
    });

    describe('info', function () {

        it('displays an information message to the user', function () {
            const originalNotificationMessage = 'This is my test message';

            notifier.info(originalNotificationMessage);

            const informationMessageArgument = vscodeFake.window.showInformationMessage.args[0][0];

            assert.equal(informationMessageArgument, originalNotificationMessage);
        });

    });
});