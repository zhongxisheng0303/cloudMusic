// 导入vue
import Vue from 'vue'
// 导入vue-router
import Vuex from 'vuex'
// use路由
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      muiscList: [],
    },
    mutations: {
     getMuisc(state,data) {
         state.muiscList = data
     }
    },
    actions: {
      getMuisc(a,data) {
        a.commit('getMuisc',data)
      }
    }
})

export default store