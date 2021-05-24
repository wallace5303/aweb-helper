import storage from 'store'
import { outApi } from '@/api/main'
import { ACCESS_TOKEN, USER_INFO, MPWD, UNLOCK_FLAG, USER_GUEST } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import dataObj from '@/utils/data'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const params = {
          out_url: 'login',
          method: 'POST',
          data: userInfo
        }
        outApi(params).then(response => {
          if (response.code !== 0) {
            resolve(response.message)
            return
          }
          const result = response.data
          storage.set(ACCESS_TOKEN, result.token, 1 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          storage.set(USER_INFO, result.user_info)
          storage.remove(USER_GUEST)
          resolve('ok')
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        let result = dataObj.defaultUser.guest
        function setRole (result) {
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          }

          commit('SET_NAME', { name: result.username, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)
        }
        if (!storage.get(ACCESS_TOKEN) && storage.get(USER_GUEST)) {
          setRole(result)
          resolve(result)
          return
        }
        // console.log('request userinfo')
        const params = {
          out_url: 'userinfo',
          method: 'POST',
          data: {}
        }
        outApi(params).then(response => {
          if (response.code === 0) {
            result = response.data
            result.role = dataObj.defaultUser.guest.role
          }
          setRole(result)
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit }) {
      return new Promise((resolve) => {
        const params = {
          out_url: 'logout',
          method: 'POST',
          data: {}
        }
        outApi(params).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          storage.remove(USER_INFO)
          storage.remove(MPWD)
          storage.remove(UNLOCK_FLAG)
          storage.remove(USER_GUEST)
        })
      })
    },

    // 注册
    Register ({ commit }, info) {
      return new Promise((resolve, reject) => {
        const params = {
          out_url: 'register',
          method: 'POST',
          data: info
        }
        outApi(params).then(response => {
          if (response.code !== 0) {
            resolve(response.message)
            return
          }
          const result = response.data
          storage.set(ACCESS_TOKEN, result.token, 1 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.token)
          storage.set(USER_INFO, result.user_info)
          storage.remove(USER_GUEST)
          resolve('ok')
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
