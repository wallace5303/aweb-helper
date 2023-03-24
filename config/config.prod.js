'use strict';
// 本地环境-配置文件
const storageDir = require('../electron/storage').getStorageDir();

/*
 * 远程调用
 */
exports.outApi = {
  login: 'http://api.kaka996.com/api/box/login',
  register: 'http://api.kaka996.com/api/box/register',
  logout: 'http://api.kaka996.com/api/box/logout',
  userinfo: 'http://api.kaka996.com/api/box/user/info',
  saveUser: 'http://api.kaka996.com/api/box/user/save',
  allWebSites: 'http://api.kaka996.com/api/box/web/allSites',
  mySites: 'http://api.kaka996.com/api/box/web/mySites',
  defaultSites: 'http://api.kaka996.com/api/box/web/defaultSites',
  messageList: 'http://api.kaka996.com/api/box/message/list',
  messageSend: 'http://api.kaka996.com/api/box/message/send',
  saveMySite: 'http://api.kaka996.com/api/box/web/saveMySite',
  myTypes: 'http://api.kaka996.com/api/box/web/myTypes',
  myTypesSave: 'http://api.kaka996.com/api/box/web/myTypesSave',
  myTypesDel: 'http://api.kaka996.com/api/box/web/myTypesDel',
  feedList: 'http://api.kaka996.com/api/box/feed/list',
  feedSend: 'http://api.kaka996.com/api/box/feed/send',
  dataIncr: 'http://api.kaka996.com/api/box/data/incr',
  manageUserSite: 'http://api.kaka996.com/api/box/manage/userSite',
  delMySite: 'http://api.kaka996.com/api/box/web/delMySite',
  webFind: 'http://api.kaka996.com/api/box/web/find',
  saveAllWeb: 'http://api.kaka996.com/api/box/web/saveAllWeb',
  searchAllWeb: 'http://api.kaka996.com/api/box/web/searchAllWeb',
  hotSearchTags: 'http://api.kaka996.com/api/box/web/hotSearchTags',
  todayRecommend: 'http://api.kaka996.com/api/box/web/todayRecommend',
};
exports.logger = {
  dir: storageDir + 'logs/prod',
};

