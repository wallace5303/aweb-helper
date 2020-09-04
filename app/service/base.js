'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const moment = require('moment');

class BaseService extends Service {

  /*
   * 列表字段整理
   */
  dealList(list) {
    if (_.isEmpty(list)) {
      return list;
    }
    let tmpObj = null;
    for (let i = 0; i < list.length; i++) {
      tmpObj = list[i];
      if (tmpObj.created_at) {
        tmpObj.created_at = moment(tmpObj.created_at).format(
          'Y-MM-DD HH:mm:ss'
        );
      }
    }

    return list;
  }
}

module.exports = BaseService;
