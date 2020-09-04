'use strict';

const { app } = require('electron');

exports = module.exports;

exports.reload = function () {
    global.MAIN_WINDOW.reload();
}