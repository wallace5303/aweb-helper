'use strict';

const BaseController = require('../base');

class UserController extends BaseController {
  /*
   * 用户信息
   */
  async info() {
    const self = this;
    const { app, ctx, service } = this;


    self.sendSuccess({}, '');
  }


}

module.exports = UserController;
