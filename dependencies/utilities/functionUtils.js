function functionUtils() {
    'use strict';

    const compose = (initializerFn, receiverFn) =>
        (...args) =>
            receiverFn(initializerFn.apply(null, args));


    const takeNth = index => values => values[index];

    const takeFirst = takeNth(0);
    const applicativeCompose = functionValues => compose.apply(null, functionValues);
    const composeAllFunctions = allFunctions => allFunctions.reduce(compose);

    function chooseCompositionMethod(functionCount) {
        if (functionCount < 2) {
            return takeFirst;
        } else if (functionCount === 2) {
            return applicativeCompose;
        } else {
            return composeAllFunctions;
        }
    }

    const getArrayLength = values => values.length;

    const getCompositionMethod = (functionValues) =>
        compose(
            getArrayLength,
            chooseCompositionMethod
        )(functionValues);

    const composeByMethod = allFunctions =>
        compositionMethod =>
            compositionMethod(allFunctions);

    function foldCompose(...allFunctions) {
        return compose(
            getCompositionMethod,
            composeByMethod(allFunctions)
        )(allFunctions);
    }

    return {
        compose,
        foldCompose
    };
}

module.exports = functionUtils;