'use strict';
// 本地环境-配置文件

/*
 * 远程调用
 */
exports.outApi = {
  login: 'http://kaka996-php.local.com/api/box/login',
  register: 'http://kaka996-php.local.com/api/box/register',
  userinfo: 'http://kaka996-php.local.com/api/box/user/info',
  allWebSites: 'http://kaka996-php.local.com/api/box/web/allSites',
  mySites: 'http://kaka996-php.local.com/api/box/web/mySites',
  messageList: 'http://kaka996-php.local.com/api/box/message/list',
  messageSend: 'http://kaka996-php.local.com/api/box/message/send',
  saveSite: 'http://kaka996-php.local.com/api/box/web/saveSite',
  feedList: 'http://kaka996-php.local.com/api/box/feed/list',
  feedSend: 'http://kaka996-php.local.com/api/box/feed/send',
  dataIncr: 'http://kaka996-php.local.com/api/box/data/incr',
};
exports.logger = {
  dir: './logs/local',
};
