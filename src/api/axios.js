// 导入axios
import axios from 'axios'

// 导入router
import router from '../router/router'

// 创建axios,并且设置基地址
const api = axios.create({
    baseURL: 'https://autumnfish.cn/'
})

// 拦截器

// 暴露接口
export const loginPhone = ({user,password}) => { // 手机登录
    return api.post('/login/cellphone',{
        phone: user,
        password: password
    })
}

export const login = ({user,password}) => { // 邮箱登录
    return api.post('/login',{
        email: user,
        password: password
    })
}

export const banner = () => { // 轮播图
    return api.get('banner')
}