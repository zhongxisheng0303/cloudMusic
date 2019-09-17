import Vue from 'vue'
import App from '@/App.vue'

// 导入全局样式
import 'assets/css/reset.css'

// 导入路由
import router from 'router/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载路由
  router,
}).$mount('#app')
