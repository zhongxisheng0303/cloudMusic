<template>
  <div id="app">
    <!-- 头部导航栏 -->
    <homeNav></homeNav>
    <!-- 出口 -->
    <router-view></router-view>
    <!-- 页脚 -->
    <homeFooter></homeFooter>
    <!-- 播放器 -->
    <div class="muisc">
      <div class="my-muisc" ref="muisc" @mouseover="shiftIn" @mouseout="shiftOut">
        <div class="box">
          <audio :src="songUrl" ref="audio" autoplay @ended="playOver" @loadedmetadata="songTime" @timeupdate="timeupdate"></audio>
          <div class="control">
            <a href="JavaScript:;" class="up" title="上一首" @click.stop="upSong">上一首</a>
            <a href="JavaScript:;" class="stop" ref="stop" title="暂停/播放" @click.stop="stop">暂停/播放</a>
            <a href="JavaScript:;" class="up" title="下一首" @click.stop="playOver">下一首</a>
          </div>
          <div class="img">
            <img v-if="songImg" :src="songImg" alt="">
            <img v-else src="./assets/images/1.jpg" alt="">
            <a href="JavaScript:;" class="details"></a>
          </div>
          <div class="play">
            <!-- 歌名/歌手 -->
            <div class="name">
              <span style="color:#e8e8e8;margin-right:10px;">{{ songName }}</span>
              <span style="color:#9b9b9b;">{{ songSinger }}</span>
            </div>
            <!-- 进度条 -->
            <div class="plan">
              <div class="my-plan" ref="plan" @click.stop="alterPlace">
                <div class="pb" ref="pb">
                  <span ref="dian"></span>
                </div>
              </div>
              <span class="time">
                <span>{{time != '' ? time : '00:00'}}</span> /
                <span>{{ totalTime != '' ? totalTime : '00:00' }}</span>
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeNav from 'components/homeNav.vue'
import homeFooter from 'components/homeFooter.vue'
import {getSongUrl} from './api/axios'
export default {
  name: "app",
  // 注册组件
  components:{
    homeNav,
    homeFooter,
  },
  data() {
    return {
      songUrl: '',
      songImg: '',
      songId: '',
      index: 0,
      songName: '',
      songSinger: '',
      totalTime: '',
      time: '',
    }
  },
  watch: { // 监听器
    songList(to,from) { // 监听歌单是否改变
      let toId = to[0].id
      let fromId = from[0] ? from[0].id : 0
      if(toId != fromId){
        this.stop()
        // 重新赋值
        this.songId = to[0].id
        // 下标重置
        this.index = 0
        // 重新获取
        this.getUrl()
      }
    },
    index(to,from) { // 监听下标是否改变
      if(to != from){
        if(to >= this.songList.lengrh - 1){
          this.stop()
          // 重新赋值
          this.songId = this.songList[0].id
          // 重新获取
          this.getUrl()
        } else if(to < 0){
          this.stop()
          // 重新赋值
          this.songId = this.songList[this.songList.length - 1].id
          this.index = this.songList.length - 1
          // 重新获取
          this.getUrl()
        } else {
          this.stop()
          // 重新赋值
          this.songId = this.songList[this.index].id
          // 重新获取
          this.getUrl()
        }
      }
    }
  },
  methods: {
    shiftIn() {
      this.$refs.muisc.style.top = '-50px'
    },
    shiftOut() {
      this.$refs.muisc.style.top = '-3px'
    },
    getUrl() { // 获取歌曲地址
      getSongUrl(this.songId).then( res => {
        if(res.data.code === 200){
          this.$refs.stop.style.backgroundPosition = '-2px -165px'
          this.songUrl = res.data.data[0].url
          this.songImg = this.songList[this.index].al.picUrl
          this.songName = this.songList[this.index].name
          this.songSinger = this.songList[this.index].ar[0].name
        }
      })
    },
    playOver() { // 播放结束下一首/点击下一首
      if(this.index >= this.songList.length - 1){
        this.index = 0
      } else if(this.songUrl != ''){
        this.index++
      }
    },
    upSong() { // 上一首
      if(this.songUrl != ''){
        this.index--
      }
    },
    stop() { // 暂停/播放
      let audio = this.$refs.audio
      if(this.songUrl != ''){
        if(audio.paused){
          audio.play()
          this.$refs.stop.style.backgroundPosition = '-2px -165px'
        } else {
          audio.pause()
          this.$refs.stop.style.backgroundPosition = '-2px -204px'
        }
      }
    },
    songTime(e) { // 歌曲时长
      this.totalTime = this.transTime(e.target.duration)
    },
    transTime(time) { // 时间格式化
      let minute = parseInt(time / 60)
      minute = minute < 10 ? '0' + minute : minute
      let sec = parseInt(time % 60)
      sec = sec < 10 ? '0' + sec : sec
      return minute + ':' + sec
    },
    timeupdate() { // 播放位置改变时
      let audio = this.$refs.audio
      this.$refs.pb.style.width = (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100 + '%'
      this.time = this.transTime(audio.currentTime)
    },
    alterPlace(e) { // 点击改变进度条位置
    if(e.target == this.$refs.dian) return
      if(this.songUrl != ''){
        let audio = this.$refs.audio
        let planWidth = this.$refs.plan.offsetWidth
        let rate = e.offsetX / planWidth
        audio.currentTime = audio.duration * rate
        this.timeupdate()
      }     
    },
  },
  computed: {
    songList() { // 获取vuex的歌曲列表
      return this.$store.state.muiscList
    }
  },
};
</script>

<style lang="less" scoped>
.muisc{
  width: 100%;
  height: 0;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  .my-muisc{
    width: 100%;
    height: 53px;
    background-color: #2a2a2a;
    position: absolute;
    left: 0;
    top: -3px;
    transition: all .5s;
  }
  .box{
    width: 982px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    // background-color: pink;
    .control{
      width: 125px;
      height: 50px;
      display: flex;
      align-items: center
    }
    a{
      display: block;
      text-indent: -999999em
    }
    .stop{
      width: 33px;
      height: 36px;
      margin: 0 10px;
      background: url('./assets/images/008.png');
      background-position: -2px -204px
    }
    .up{
      width: 26px;
      height: 27px;
      background: url('./assets/images/008.png');
      background-position: 0px -130px;
    }
    .control a:nth-child(3){
      background-position: -82px -130px;
    }
    .img{
      width: 34px;
      height: 34px;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        border-radius: 2px;
      }
      .details{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url('./assets/images/004.png') -316px -330px
      }
    }
    .play{
      width: 608px;
      height: 37px;
      margin-left: 18px;
      position: relative;
    }
    .name{
      margin-bottom: 8px;
    }
    .my-plan{
      width: 493px;
      height: 9px;
      float: left;
      background: url('./assets/images/010.png') 0px -30px;
      .pb{
        width: 0px;
        height: 9px;
        position: relative;
        background: url('./assets/images/010.png') 0px -66px;
        span{
          width: 22px;
          height: 24px;
          position: absolute;
          top: -4px;
          right: -10px;
          background: url('./assets/images/003.png') -2px -283px; 
        }
      }
    }
    .time{
      font-size: 12px;
      position: absolute;
      right: 27px;
      top: 19px;
      color: #a1a1a1;
      .time span:last-child{
        color: #797979;
      }
    }
  }
}
</style>
