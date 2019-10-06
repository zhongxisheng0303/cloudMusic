import Vue from 'vue'
import App from '@/App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入全局样式
import 'assets/css/reset.css'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)

// 导入路由
import router from 'router/router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载路由
  router,
}).$mount('#app')
