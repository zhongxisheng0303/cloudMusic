// 导入vue
import Vue from 'vue'
// 导入vue-router
import Vuex from 'vuex'
// use路由
Vue.use(Vuex)

let songList = JSON.parse(localStorage.getItem('songData'))
const store = new Vuex.Store({
    state: {
      muiscList: songList ? songList : [],
      index: 0,
    },
    mutations: {
     getMuisc(state,data) {
        if(data.index == 0){
          state.muiscList = data.data
          state.index = data.index
        } else if(data.index == 1){
          state.muiscList.push(data.data)
          state.index = data.index
        }
     }
    },
    actions: {
      getMuisc(a,data) {
        a.commit('getMuisc',data)
      }
    }
})

export default store