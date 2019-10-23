import Vue from 'vue'
import App from '@/App.vue'

// 导入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入全局样式
import 'assets/css/reset.css'

// 导入路由
import router from 'router/router'

// 导入vuex
import store from 'store/state'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载路由
  router,
  // 挂载Vuex
  store
}).$mount('#app')
