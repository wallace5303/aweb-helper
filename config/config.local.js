'use strict';
// 本地环境-配置文件

/*
 * 远程调用
 */
exports.outApi = {
  login: 'http://kaka996-php.local.com/api/box/login',
  register: 'http://kaka996-php.local.com/api/box/register',
  allWebSites: 'http://kaka996-php.local.com/api/box/web/allSites',
  webSites: 'http://kaka996-php.local.com/api/box/web/sites',
  messageList: 'http://kaka996-php.local.com/api/box/message/list',
  messageSend: 'http://kaka996-php.local.com/api/box/message/send',
  saveSite: 'http://kaka996-php.local.com/api/box/web/saveSite',
};
exports.logger = {
  dir: './logs/local',
};
