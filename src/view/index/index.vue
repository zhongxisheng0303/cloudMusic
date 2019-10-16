<template>
  <div>
    <!-- 轮播图 -->
    <div class="banner-box">
      <el-carousel trigger="click" height="336px">
        <el-carousel-item v-for="(item,index) in bannerData" :key="index">
          <img class="banner" :src="item.imageUrl">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import {banner} from '../../api/axios'
export default {
    name: 'index',
    data() {
      return {
        bannerData: [], // 轮播图
      }
    },
    methods: {
      getBanner() { // 获取轮播图
        banner().then( res => {
          if(res.data.code === 200){
            this.bannerData = res.data.banners
          }
        })
      }
    },
    created() {
      this.getBanner()
    },
}
</script>

<style lang="less" scoped>
  .banner-box{
    width: 982px;
    height: 336px;
    margin: 0 auto;
    .banner{
      width: 982px;
      height: 336px;
    }
  }
</style>