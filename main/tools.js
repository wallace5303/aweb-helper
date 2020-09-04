'use strict';

const path = require('path');
const {app } = require('electron');

exports = module.exports;

exports.getPath = function (dir, file) {
    var filePath = '';
    if (!dir) {
        dir = app.getAppPath();
    }
    filePath = path.join(dir, file);
    GLOGGER.info('dir:', dir);
    GLOGGER.info('file:', file);
    return filePath;
}