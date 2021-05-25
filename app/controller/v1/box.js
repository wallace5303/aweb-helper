'use strict';

const BaseController = require('../base');
const _ = require('lodash');

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

    const params = {
      out_url: body.out_url,
      method: body.method,
      data: body.data,
    };
    result = await service.outapi.api(params);
    //result = await service.outapi.afterDeal(body, result);
    
    self.sendData(result);
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
      date: '',
    };

    this.sendSuccess(data, 'ok');
  }  

}

module.exports = BoxController;
