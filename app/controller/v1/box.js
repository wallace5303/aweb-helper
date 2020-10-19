'use strict';

const BaseController = require('../base');
const _ = require('lodash');
const moment = require('moment');

class BoxController extends BaseController {
  /*
   * index
   */
  async index() {
    const { app, ctx, service } = this;
    console.log('env:', app.config.env);
    const data = {
        user: null
    };

    await ctx.render('index.ejs', data);
  }

  /*
   * outApi
   */
  async outApi() {
    const self = this;
    const { app, ctx, service } = this;
    const body = ctx.request.body;
    console.log("out_api body:", body);
    let result = {
      "succ":true,
      "code":0,
      "message":"",
      "data":[],
      "timestamp":0
    }
    const beforeDealRes = await service.outapi.beforeDeal(body);
    if (!beforeDealRes.next) {
      // console.log("beforeDealRes:", beforeDealRes);
      result.message = beforeDealRes.message;
      result.code = beforeDealRes.code;
      result.data = beforeDealRes.data;
      self.sendData(result);
      return
    }

    const params = {
      out_url: body.out_url,
      method: body.method,
      data: body.data,
    };
    // 如果可以异步
    if (beforeDealRes.async) {
      service.outapi.api(params);
    } else {
      result = await service.outapi.api(params);
    }
    result = await service.outapi.afterDeal(body, result);
    
    self.sendData(result);
  }

  /*
   * webSites
   */
  async webSites() {
    const self = this;
    const { app, ctx, service } = this;
    const query = ctx.query;

    const params = {
      out_url: 'webSites',
      method: 'GET',
      data: query,
    };
    const data = await service.outapi.api(params);
    self.sendData(data);
  }

  /*
   * 登录页数据
   */
  async stat() {
    const self = this;
    const { app, ctx, service } = this;
    const query = ctx.request.query;
    const uid = query.uid ? Number(query.uid) : 0;

    const data = {
      date: moment().format('X'),
    };

    self.sendSuccess(data, 'ok');
  }

  /*
   * 错误上报
   */
  async errorReport() {
    const { app, ctx, service } = this;
    const body = ctx.request.body;
    const uid = body.uid;
    let environment = body.environment;
    let content = body.content;
    if (_.isObject(environment)) {
      environment = JSON.stringify(environment);
    }
    if (_.isObject(content)) {
      content = JSON.stringify(content);
    }

    service.report.errorCollect(uid, environment, content);

    this.sendSuccess({}, 'ok');
  }

  /*
   * 系统信息
   */
  async sysInfo() {
    const { app, ctx, service } = this;

    const data = {
      date: moment().format('X'),
    };

    this.sendSuccess(data, 'ok');
  }  

}

module.exports = BoxController;
