// 导入axios
import axios from 'axios'

// 导入router
// import router from '../router/router'

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

export const songList = () => { // 歌单
    return api.get('personalized',{
        params:{
            limit: 8
        }
    })
}

export const songListDetails = (id) => { // 歌单详情
    return api.get('/playlist/detail',{
        params: {
            id
        }
    })
}

export const getSongUrl = (id) => { // 获取歌曲地址
    return api.get('/song/url',{
        params: {
            id
        }
    })
}