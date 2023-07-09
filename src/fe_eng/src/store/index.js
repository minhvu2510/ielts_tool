import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import asyncRoutes from './modules/asyncRoutes'
import user from './modules/user'
import getters from './getters'
import hide from './modules/hide'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    asyncRoutes,
    hide
  },
  getters
})

export default store
