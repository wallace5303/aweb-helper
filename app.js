/**
 *  全局定义
 * @param app
 */
'use strict';
global.CODE = require('./app/const/statusCode');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const utils = require('./app/utils/utils');

class AppBootHook {
  constructor(app) {
    this.app = app;
    global.OS_PLATFORM = process.platform;
    global.IS_WIN = /^win/.test(process.platform);
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have been loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    // 数据库
    const file = './storage/db.json';
    // utils.chmodPath(file);
    const adapter = new FileSync(file);
    const db = lowdb(adapter);
    if (!db.has('kv').value()) {
      db.set('kv', {}).write();
    }
    if (!db.has('feed').value()) {
      db.set('feed', []).write();
    }
    if (!db.has('feed_action').value()) {
      db.set('feed_action', []).write();
    }
    if (!db.has('user_web_site').value()) {
      db.set('user_web_site', []).write();
    }
    if (!db.has('user_web_type').value()) {
      db.set('user_web_type', []).write();
    }
    if (!db.has('test').value()) {
      db.set('test', []).write();
    }
  }

  async serverDidReady() {
    // Server is listening.
    const storageFile = './storage';
    utils.chmodPath(storageFile, '777');
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook;
