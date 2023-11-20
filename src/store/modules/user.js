import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken, setUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'
import user from '@/../mock/user'

const getDefaultState = () => {
  return {
    token: getToken(),
    userName: '',
    userId: '',
    token: ''
  }
}

const state = getDefaultState()

// 包含了一系列用于修改状态的函数。这些函数被称为 "mutations"，通常用于同步修改状态。
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, userName) => {
    state.userName = userName
  },
  SET_USERID: (state,userId) => {
    state.userId = userId
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    // console.log(userInfo)
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: username.trim(), pwd: password }).then(response => {
        const { success, data } = response
        console.log(data)
        console.log(response)
        if(success){
          commit('SET_TOKEN', data.token)
          commit('SET_USERNAME', data.userName)
          commit('SET_USERID', data.userId)
          setToken(data.token)
          setUserInfo(data)
        }
        
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response

  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }

  //       const { name, avatar, userId } = data

  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       commit('SET_USERID', userId)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  register({ commit },userRegisterInfo) {
    const {username, password, ssn, email, phone } = userRegisterInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password, ssn: ssn, email: email, phone: phone}).then(response => {
        const {data} = response
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

