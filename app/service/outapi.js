'use strict';

const BaseService = require('./base');
const _ = require('lodash');

class OutapiService extends BaseService {
  /*
   * api
   */
  async api(body) {
    const res = {
      code: 1000,
      message: 'unknown error',
    };

    try {
      //throw new Error('Sync Error');
      body.data.app = 'box';
      const url = this.app.config.outApi[body.out_url];
      const response = await this.app.curl(url, {
        method: body.method,
        contentType: 'application/json',
        data: body.data,
        dataType: 'json',
        timeout: 15000,
      });
      const result = response.data;
      if (this.app.config.env === 'local') {
        this.app.logger.info('[OutapiService] [api]: info result:%j', result);
      }
      // this.app.logger.info('[OutapiService] [api]: result:%j', result);
      if (result.code !== CODE.SUCCESS) {
        this.app.logger.error('[OutapiService] [api]: res error result:%j', result);
      }
      return result;
    } catch (e) {
      this.app.logger.error('[OutapiService] [api]:  ERROR ', e);
    }

    return res;
  }

  /*
   * beforeDeal
   */
  async beforeDeal(body) {
    let res = {
      next: true,
      async: false,
      message: ''
    };
    switch (body.out_url) {
      case 'dataIncr' :
        res = this.beforeDataIncr(res, body.data);
        break;
    }

    return res;
  }  

  async beforeDataIncr(res, data) {
    const opRes = await this.service.lowdb.getFeedActionLog(data.uid, data.type, data.fid);
    if (opRes) {
      res.next = false;
      res.message = 'beforeDataIncr already cache';
      return res;
    }
    res.async = true;
    this.service.lowdb.setFeedAction(data.uid, data.type, data.fid);

    return res;
  }
}

module.exports = OutapiService;
