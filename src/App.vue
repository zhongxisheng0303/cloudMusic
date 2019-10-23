<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <homeNav></homeNav>
    <!-- 出口 -->
    <router-view></router-view>
    <!-- 页脚 -->
    <homeFooter></homeFooter>
    <!-- 播放器 -->
    <player></player>
  </div>
</template>

<script>
import homeNav from 'components/homeNav.vue'
import homeFooter from 'components/homeFooter.vue'
import player from 'components/player.vue'
export default {
  name: "app",
  // 注册组件
  components:{
    homeNav,
    homeFooter,
    player
  },
};
</script>

<style lang="less" scoped>

</style>
