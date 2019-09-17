// 导入vue
import Vue from 'vue'
// 导入vue-router
import VueRouter from 'vue-router'
// use路由
Vue.use(VueRouter)

// 导入组件
import index from 'view/index/index.vue'

// 路由规则
const routes = [
    {
        path: '/',
        redirect: '/index', // 重定向
    },
    {
        path: '/index',
        component: index
    }
] 

// 实例路由
const router = new VueRouter({
    routes,
})

// 暴露路由
export default router