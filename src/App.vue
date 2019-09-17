<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <homeNav></homeNav>
    <!-- 出口 -->
    <router-view></router-view>
    <!-- 页脚 -->
    <homeFooter></homeFooter>
  </div>
</template>

<script>
import homeNav from 'components/homeNav.vue'
import homeFooter from 'components/homeFooter.vue'
export default {
  name: "app",
  // 注册组件
  components:{
    homeNav,
    homeFooter,
  }
};
</script>

<style lang="less" scoped>
</style>
