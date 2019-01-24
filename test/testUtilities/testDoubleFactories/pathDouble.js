function pathDouble(path) {
    'use strict';

    return {
        sep: '/',
        join: path.join.bind(path)
    };
}

module.exports = pathDouble;