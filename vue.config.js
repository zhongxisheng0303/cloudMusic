const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/',
    // 不需要map文件
    productionSourceMap: false,
    // 配置路径
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('router', resolve('src/router'))
            .set('view', resolve('src/view'))
            .set('api', resolve('src/api'))
            .set('components', resolve('src/components'))
            .set('store', resolve('src/store'))
            .set('assets', resolve('src/assets'))
    }
}