'use strict';

const BaseService = require('./base');
const _ = require('lodash');
const utils = require('../utils/utils');
const fs = require('fs');
const os = require('os');

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
      code: 0,
      message: '',
      data: null
    };
    switch (body.out_url) {
      case 'dataIncr' :
        res = this.beforeDataIncr(res, body);
        break;
      case 'mySites' :
          res = this.beforeMySites(res, body);
          break;  
    }

    return res;
  }  

  async beforeDataIncr(res, body) {
    const data = body.data;
    const opRes = await this.service.lowdb.getFeedActionLog(data.uid, data.type, data.fid);
    if (opRes) {
      res.next = false;
      res.code = -1000;
      res.message = 'beforeDataIncr already cache';
      return res;
    }
    res.async = true;
    this.service.lowdb.setFeedAction(data.uid, data.type, data.fid);

    return res;
  }

  async beforeMySites(res, body) {
    const key = 'mySites_category_' + body.data.category + '_' + body.data.uid;
    const sitesRes = await this.service.lowdb.getKv(key);
    if (sitesRes) {
      res.next = false;
      res.message = 'already cache';
      res.data = sitesRes;
      return res;
    }

    return res;
  }

  /*
   * afterDeal
   */
  async afterDeal(body, result) {
    switch (body.out_url) {
      case 'mySites' :
        result = this.afterMySites(body, result);
        break;
      case 'saveMySite' :
        result = this.afterSaveMySite(body, result);
        break;
      case 'delMySite' :
        result = this.afterDelMySite(body, result);
        break;
      case 'allWebSites' :
        result = this.afterAllWebSites(body, result);
        break;
      case 'manageUserSite' :
        result = this.afterManageUserSite(body, result);
        break; 
      case 'defaultSites' :
        result = this.afterDefaultSites(body, result);
        break;         
    }

    return result;
  }  

  async afterMySites(body, result) {
    let data = result.data;
    if (_.isObject(data)) {
      for (let i in data) {
        let webArr = data[i].list;
        for (let m in webArr) {
          let one = webArr[m];
          one = this.transLogo(one);
        }
      }
    }
    const key = 'mySites_category_' + body.data.category + '_' + body.data.uid;
    this.service.lowdb.setKv(key, result.data);

    return result;
  }

  async afterSaveMySite(body, result) {
    const key = 'mySites_category_' + body.data.category + '_' + body.data.uid;
    this.service.lowdb.delKv(key);

    return result;
  }

  async afterDelMySite(body, result) {
    const key = 'mySites_category_' + body.data.category + '_' + body.data.uid;
    this.service.lowdb.delKv(key);

    return result;
  }

  async afterManageUserSite(body, result) {
    let data = result.data.list.data;
    if (data.length > 0) {
      for (let i in data) {
        let one = data[i];
        one = this.transLogo(one);
      }
    }

    return result;
  }

  async afterAllWebSites(body, result) {
    let data = result.data.list.data;
    if (data.length > 0) {
      for (let i in data) {
        let one = data[i];
        one = this.transLogo(one);
      }
    }

    return result;
  }

  async afterDefaultSites(body, result) {
    let data = result.data;
    if (_.isObject(data)) {
      for (let i in data) {
        let webArr = data[i].list;
        for (let m in webArr) {
          let one = webArr[m];
          one = this.transLogo(one);
        }
      }
    }

    return result;
  }

  transLogo (webObj) {
    if (webObj.web_logo) {
      // 桌面版的走本地
      if (os.type() !== 'Linux') {
        const file =  './app/public/weblogo/' + webObj.web_logo.logo;
        if (utils.fileExist(file)) {
          webObj.img = './weblogo/' + webObj.web_logo.logo;
        }
      }
    }

    return webObj;
  }
}

module.exports = OutapiService;
