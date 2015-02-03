var MAX_SAFE_INT = require('./../properties/max_safe_integer');

module.exports = Number.isInteger || function(val) {
    'use strict';
    return typeof val === 'number' &&
        val % 1 === 0;
};
