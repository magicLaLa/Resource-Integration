import * as types from '../type'
import { login, getInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    // 头像
    avatar: '',
    roles: []
  },
  mutations: {
    [types.SET_TOKEN] (state, token) {
      state.token = token
    },
    [types.SET_NAME] (state, name) {
      state.name = name
    },
    [types.SET_AVATAR] (state, avatar) {
      state.avatar = avatar
    },
    [types.SET_ROLES] (state, roles) {
      state.roles = roles
    }
  },
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const userName = userInfo.username
      return new Promise(async (resolve, reject) => {
        try {
          let loginData = await login(userName, userInfo.password)
          const data = loginData.rspBody
          setToken(data.token)
          commit(types.SET_TOKEN, data.token)
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    },
    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          let getInfoData = await getInfo(state.token)
          const data = getInfoData.rspBody
          if (data.roles && data.roles.length > 0) {
            commit(types.SET_ROLES, data.roles)
          } else {
            this.$message.error({
              message: 'getInfo: roles must be a non-null array !',
              type: 'warning'
            })
          }
          commit(types.SET_NAME, data.name)
          commit(types.SET_AVATAR, data.avatar)
          resolve(getInfo)
        } catch (err) {
          reject(err)
        }
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        try {
          await logout(state.token)
          commit(types.SET_TOKEN, '')
          commit(types.SET_ROLES, [])
          removeToken()
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    },
    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit(types.SET_TOKEN, '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
