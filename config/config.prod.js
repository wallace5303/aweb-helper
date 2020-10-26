'use strict';
// 本地环境-配置文件

/*
 * 远程调用
 */
exports.outApi = {
  login: 'http://www.kaka996.com/api/box/login',
  register: 'http://www.kaka996.com/api/box/register',
  logout: 'http://www.kaka996.com/api/box/logout',
  userinfo: 'http://www.kaka996.com/api/box/user/info',
  saveUser: 'http://www.kaka996.com/api/box/user/save',
  allWebSites: 'http://www.kaka996.com/api/box/web/allSites',
  mySites: 'http://www.kaka996.com/api/box/web/mySites',
  messageList: 'http://www.kaka996.com/api/box/message/list',
  messageSend: 'http://www.kaka996.com/api/box/message/send',
  saveMySite: 'http://www.kaka996.com/api/box/web/saveMySite',
  myTypes: 'http://www.kaka996.com/api/box/web/myTypes',
  myTypesSave: 'http://www.kaka996.com/api/box/web/myTypesSave',
  myTypesDel: 'http://www.kaka996.com/api/box/web/myTypesDel',
  feedList: 'http://www.kaka996.com/api/box/feed/list',
  feedSend: 'http://www.kaka996.com/api/box/feed/send',
  dataIncr: 'http://www.kaka996.com/api/box/data/incr',
  manageUserSite: 'http://www.kaka996.com/api/box/manage/userSite',
  delMySite: 'http://www.kaka996.com/api/box/web/delMySite',
};
exports.logger = {
  dir: './logs/prod',
};

