// import { loginByUsername, logout, getUserInfo } from '@/api/login'
// import { getUserInfo } from '@/api/auth-permissions'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { getGravatarUrl } from '@/utils/avatar'

const user = {
  state: {
    token: getToken(),
    email: '',
    innings: 0,
    avatar: 'https://image.flaticon.com/icons/svg/702/702023.svg',
    roles: [],
    name: '',
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_INNINGS: (state, innings) => {
      state.innings = innings
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    gotAccessToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      })
    },

    // Get user information
    // GetUserInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getUserInfo(getToken()).then(response => {
    //       console.log('this is action getuserinfo')
    //       console.log(response)
    //       if (!response.data) {
    //         reject('error')
    //       }
    //       commit('SET_NAME', response.data.name)
    //       commit('SET_INNINGS', response.data.innings)
    //
    //       // commit('SET_AVATAR', getGravatarUrl(response.data.email))
    //       // if (response.data.role === 'owner') {
    //       //   commit('SET_ROLES', [response.data.role])
    //       //   resolve(response)
    //       // } else if (response.data.role.list_permit) {
    //       //   commit('SET_ROLES', response.data.role.list_permit)
    //       //   resolve(response)
    //       // } else {
    //       //   reject('Lỗi xác thực quyền người dùng')
    //       // }
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // Third-party verification login
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // Sign out
    LogOut({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      window.location.href = process.env.SSO_URL + '/logout?service=' + process.env.APP_URL + '&gateway=true'
    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
