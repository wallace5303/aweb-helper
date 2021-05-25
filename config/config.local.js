'use strict';
// 本地环境-配置文件
const storageDir = require('../electron/storage').getStorageDir();

/*
 * 远程调用
 */
exports.outApi = {
  login: 'http://kaka996-php.local.com/api/box/login',
  register: 'http://kaka996-php.local.com/api/box/register',
  logout: 'http://kaka996-php.local.com/api/box/logout',
  userinfo: 'http://kaka996-php.local.com/api/box/user/info',
  saveUser: 'http://kaka996-php.local.com/api/box/user/save',
  allWebSites: 'http://kaka996-php.local.com/api/box/web/allSites',
  mySites: 'http://kaka996-php.local.com/api/box/web/mySites',
  defaultSites: 'http://kaka996-php.local.com/api/box/web/defaultSites',
  messageList: 'http://kaka996-php.local.com/api/box/message/list',
  messageSend: 'http://kaka996-php.local.com/api/box/message/send',
  saveMySite: 'http://kaka996-php.local.com/api/box/web/saveMySite',
  myTypes: 'http://kaka996-php.local.com/api/box/web/myTypes',
  myTypesSave: 'http://kaka996-php.local.com/api/box/web/myTypesSave',
  myTypesDel: 'http://kaka996-php.local.com/api/box/web/myTypesDel',
  feedList: 'http://kaka996-php.local.com/api/box/feed/list',
  feedSend: 'http://kaka996-php.local.com/api/box/feed/send',
  dataIncr: 'http://kaka996-php.local.com/api/box/data/incr',
  manageUserSite: 'http://kaka996-php.local.com/api/box/manage/userSite',
  delMySite: 'http://kaka996-php.local.com/api/box/web/delMySite',
  webFind: 'http://kaka996-php.local.com/api/box/web/find',
  saveAllWeb: 'http://kaka996-php.local.com/api/box/web/saveAllWeb',
  searchAllWeb: 'http://kaka996-php.local.com/api/box/web/searchAllWeb',
  hotSearchTags: 'http://kaka996-php.local.com/api/box/web/hotSearchTags',
  todayRecommend: 'http://kaka996-php.local.com/api/box/web/todayRecommend',
};
exports.logger = {
  dir: storageDir + 'logs/local',
};
