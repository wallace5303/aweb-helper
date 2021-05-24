'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // home

  router.get('/', controller.v1.box.index);
  // hello
  //router.get('/', controller.v1.home.hello);

  // html
  router.post('/api/v1/outApi', controller.v1.box.outApi);
  router.get('/home', controller.v1.home.index);

  // 引入其他路由
  require('./user')(app);
  require('./example')(app);
  require('./setting')(app);
};
