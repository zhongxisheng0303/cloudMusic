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
    <!-- 歌单 -->
    <div class="mian clearfix">
      <div class="my-mian">
        <div class="recommend">
          <!-- 热门推荐 -->
          <div class="hot">
            <div class="circle"></div>
            <a href="JavaScript:;" class="hot-recommend">热门推荐</a>
            <ul class="list">
              <li>
                <a href="JavaScript:;">华语</a>
                <span>│</span>
              </li>
              <li>
                <a href="JavaScript:;">流行</a>
                <span>│</span>
              </li>
              <li>
                <a href="JavaScript:;">摇滚</a>                
                <span>│</span>
              </li>
              <li>
                <a href="JavaScript:;">民谣</a>       
                <span>│</span>
              </li>
              <li>
                <a href="JavaScript:;">电子</a>                
              </li>
            </ul>
            <a href="JavaScript:;" class="more">更多</a>
          </div>
          <!-- 歌单 -->
          <songList></songList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {banner} from '../../api/axios'
// 导入组件
import songList from './components/songList'
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
    // 注册组件
    components: {
      songList,
    }
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
.mian{
  width: 980px;
  margin: 0 auto;
  background-color: #fff;
  border-left: 1px solid #d3d3d3;
  border-right: 1px solid #d3d3d3;
  .my-mian{
    width: 729px;
    float: left;
    padding: 20px 20px 40px;
    box-sizing: border-box;
    .hot{
      width: 689px;
      height: 33px;
      position: relative;
      display: flex;
      align-items: center;
      border-bottom: 2px solid #c10d0c;
      .circle{
        width: 6px;
        height: 6px;
        border: 4px solid #c10d0c;
        border-radius: 10px;
        margin: 8px;
      }
      .hot-recommend{
        font-size: 16px;
        font-weight: 400;
        margin-right: 15px;
      }
      .list{
        li{
          float: left;
          span{
            color: #d5d5d5;
            margin: 0 8px;
          }
        }
      }
      .more{
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>