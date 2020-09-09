'use strict';

const BaseController = require('../base');
const _ = require('lodash');

class LoginController extends BaseController {
    
  /*
   * 注册html
   */
  async registerHtml() {
    const { ctx } = this;

    const data = {};
    await ctx.render('box/register.ejs', data);
  }

  /*
   * 登录html
   */
  async loginHtml() {
    const { ctx } = this;

    const data = {};
    await ctx.render('box/login.ejs', data);
  }

  /*
   * 注册
   */
  async register() {
    const self = this;
    const { app, ctx, service } = this;
    const body = ctx.request.body;

    const params = {
      out_url: 'register',
      method: 'POST',
      data: body,
    };
    const userRes = await service.outapi.api(params);
    self.sendData(userRes);
  }

  /*
   * 登录
   */
  async login() {
    const self = this;
    const { app, ctx, service } = this;
    const body = ctx.request.body;

    const params = {
      out_url: 'login',
      method: 'POST',
      data: body,
    };
    const data = await service.outapi.api(params);
    self.sendData(data);
  }


}

module.exports = LoginController;
