'use strict';

const BaseController = require('../base');

class HomeController extends BaseController {

  async index() {
    const { app, ctx, service } = this;

    const data = {

    };

    await ctx.render('indexlayui.ejs', data);
  }
  
}

module.exports = HomeController;
