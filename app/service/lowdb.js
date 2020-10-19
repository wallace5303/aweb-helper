'use strict';

const BaseService = require('./base');
const _ = require('lodash');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const FileAsync = require('lowdb/adapters/FileAsync');
const LowdbKey = require('./../const/lowdbKey');
const fs = require('fs');

class LowdbService extends BaseService {
  /*
   * fileSyncInstance
   */
  fileSyncInstance(file = null) {
    if (!file) {
      file = './storage/db.json';
    }
    const isDir = fs.existsSync(file);
    if (!isDir) {
      return null;
    }

    const adapter = new FileSync(file);
    const db = lowdb(adapter);

    return db;
  }

  async getFeedActionLog(uid, type, fid) {
    const res = this.fileSyncInstance()
      .get('feed_action')
      .find({ uid: uid, type: type, fid: fid })
      .value();

    return res;
  }

  async setFeedAction(uid, type, fid) {
    const log = {
        uid: uid,
        type: type,
        fid: fid
      };
      const res = this.fileSyncInstance()
        .get('feed_action')
        .push(log)
        .write();
  
      return res;
  }

  async getKv(key) {
    const res = this.fileSyncInstance()
      .get('kv.' + key)
      .value();

    return res;
  }

  async setKv(key, data) {
      const res = this.fileSyncInstance()
        .set('kv.' + key, data)
        .write();
  
      return res;
  }

  async delKv(key) {
    const res = this.fileSyncInstance()
      .unset('kv.' + key)
      .write();

    return res;
  }
}

module.exports = LowdbService;
