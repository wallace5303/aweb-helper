import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '我的',
  'menu.feed': '动态',
  'menu.web': '我的',
  'menu.privateweb': '隐私空间',
  'menu.allweb': '推荐站点',
  'menu.manage': '管理',
  'menu.managewebsite': '管理网址',
  'menu.managewebtype': '管理分类',
  'menu.settings': '设置',
  'menu.homeWeb': '我的',
  'menu.homeFind': '发现',
  'menu.homeAwesome': '精选',
  'menu.homePrivateweb': '隐私',
  'menu.homeManageWebSite': '编辑',
  'menu.homeManageWebType': '分类',
  'menu.homeFeed': '动态'
}

export default {
  ...components,
  ...locale
}
