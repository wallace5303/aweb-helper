'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.v1.box.index);

  // html
  // router.get('/html/v1/login', controller.v1.entry.loginHtml);
  // router.get('/html/v1/register', controller.v1.entry.registerHtml);
  // router.get('/html/v1/home', controller.v1.box.homeHtml);
  // router.get('/html/v1/chat', controller.v1.box.chatHtml);
  // router.get('/html/v1/friend', controller.v1.box.friendHtml);
  // router.get('/html/v1/manage/site', controller.v1.box.manageSiteHtml);

  // api
  router.post('/api/v1/login', controller.v1.entry.login);
  router.post('/api/v1/register', controller.v1.entry.register);
  router.post('/api/v1/outApi', controller.v1.box.outApi);
  router.get('/api/v1/box/webSites', controller.v1.box.webSites);
  // router.post('/api/v1/box/init', controller.v1.box.menuInit);
  // router.post('/api/v1/box/sendMessage', controller.v1.box.sendMessage);
  // router.post('/api/v1/box/addsite', controller.v1.box.addSite);

  // 引入其他路由
  require('./user')(app);
};
