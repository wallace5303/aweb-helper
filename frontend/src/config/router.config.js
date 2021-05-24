// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/home',
    children: [
      // home
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/single/BaseManage'),
        meta: { title: 'menu.home', keepAlive: true, icon: 'user' },
        redirect: '/homeWeb',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/homeWeb',
            name: 'homeWeb',
            component: () => import('@/views/home/single/Web'),
            meta: { title: 'menu.homeWeb' }
          },
          {
            path: '/homeFind',
            name: 'homeFind',
            component: () => import('@/views/home/single/WebFind'),
            meta: { title: 'menu.homeFind' }
          },
          {
            path: '/homeAwesome',
            name: 'homeAwesome',
            component: () => import('@/views/home/single/Awesome'),
            meta: { title: 'menu.homeAwesome' }
          },
          {
            path: '/homePrivateweb',
            name: 'homePrivateweb',
            component: () => import('@/views/home/single/PrivateWeb'),
            meta: { title: 'menu.homePrivateweb' }
          },
          {
            path: '/homeManageWebSite',
            name: 'homeManageWebSite',
            component: () => import('@/views/home/single/WebSiteManage'),
            meta: { title: 'menu.homeManageWebSite' }
          },
          {
            path: '/homeManageWebType',
            name: 'homeManageWebType',
            component: () => import('@/views/home/single/WebTypeManage'),
            meta: { title: 'menu.homeManageWebType' }
          },
          {
            path: '/homeFeed',
            name: 'homeFeed',
            component: () => import('@/views/home/single/Feed'),
            meta: { title: 'menu.homeFeed' }
          }
        ]
      },
      // feed
      // {
      //   path: '/feed',
      //   name: 'feed',
      //   component: () => import('@/views/home/single/Feed'),
      //   meta: { title: 'menu.feed', keepAlive: true, icon: 'fire' }
      // },
      // web
      // {
      //   path: '/web',
      //   name: 'web',
      //   component: () => import('@/views/home/single/Web'),
      //   meta: { title: 'menu.web', keepAlive: true, icon: 'user' }
      // },
      // {
      //   path: '/privateweb',
      //   name: 'privateweb',
      //   component: () => import('@/views/home/single/PrivateWeb'),
      //   meta: { title: 'menu.privateweb', keepAlive: true, icon: 'lock' }
      // },
      // all web
      // {
      //   path: '/allweb',
      //   name: 'allweb',
      //   component: () => import('@/views/home/single/AllWeb'),
      //   meta: { title: 'menu.allweb', keepAlive: true, icon: 'appstore' }
      // },
      // {
      //   path: '/manage',
      //   name: 'manage',
      //   component: () => import('@/views/home/single/BaseManage'),
      //   redirect: '/manageWebSite',
      //   meta: { title: 'menu.manage', keepAlive: true, icon: 'tool' },
      //   hideChildrenInMenu: true,
      //   children: [
      //     {
      //       path: '/manageWebSite',
      //       name: 'manageWebSite',
      //       component: () => import('@/views/home/single/WebSiteManage'),
      //       meta: { title: 'menu.managewebsite' }
      //     },
      //     {
      //       path: '/manageWebType',
      //       name: 'manageWebType',
      //       component: () => import('@/views/home/single/WebTypeManage'),
      //       meta: { title: 'menu.managewebtype' }
      //     }
      //   ]
      // },
      // setting
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/settings/Index'),
        meta: { title: 'menu.settings', hideHeader: true, icon: 'setting' },
        redirect: '/settingsSecurity',
        hideChildrenInMenu: true,
        children: [
          {
            path: '/settingsSecurity',
            name: 'SecuritySettings',
            component: () => import('@/views/settings/Security'),
            meta: { title: '安全设置', hidden: true, keepAlive: true }
          }
          // {
          //   path: '/settingsUser',
          //   name: 'UserCenterSettings',
          //   component: () => import('@/views/settings/UserCenter'),
          //   meta: { title: '个人信息', hidden: true, keepAlive: true }
          // }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
  }

]
