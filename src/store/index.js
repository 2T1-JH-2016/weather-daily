import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo : {
      id : '',
      uid : '',
      path : '',
    }
  },
  getters: {
    getUserInfo(state){
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo(state,payload){
      state.userInfo.id = payload.id
      state.userInfo.path = payload.path
      state.userInfo.uid = payload.uid //todos : 다르게 가져올 수 잇는지 확인 필요
    }
  },
  actions: {
    setUserInfo : ({commit},payload) =>{
      commit('setUserInfo',payload)
    }
  },
  modules: {
  }
})
