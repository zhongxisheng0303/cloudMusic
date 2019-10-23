<template>
  <!-- 播放器 -->
  <div class="muisc">
    <div class="my-muisc" ref="muisc" @mouseover="remove && shiftIn()" @mouseout="remove && shiftOut()">
      <div class="box">
        <!-- 音频 -->
        <audio
          :src="songUrl"
          ref="audio"
          autoplay
          @ended="playOver"
          @loadedmetadata="songTime"
          @timeupdate="timeupdate"
          :loop="single"
        ></audio>
        <!-- 音频控件 -->
        <div class="control">
          <a href="JavaScript:;" class="up" title="上一首" @click.stop="upSong">上一首</a>
          <a href="JavaScript:;" class="stop" ref="stop" title="暂停/播放" @click.stop="stop">暂停/播放</a>
          <a href="JavaScript:;" class="up" title="下一首" @click.stop="playOver">下一首</a>
        </div>
        <!-- 歌曲封面 -->
        <div class="img">
          <img v-if="songImg" :src="songImg" alt />
          <img v-else src="../assets/images/1.jpg" alt />
          <a href="JavaScript:;" class="details"></a>
        </div>
        <!-- 歌曲 -->
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
        <!-- 分享/收藏 -->
        <div class="mutual">
          <a href="JavaScript:;" class="collect" title="收藏"></a>
          <a href="JavaScript:;" class="share" title="分享"></a>
        </div>
        <!-- 播放列表/音频控件 -->
        <div class="list">
          <div class="volume" v-show="showVolume">
                <a href="JavaScript:;" class="add" @click.stop="addVolume">+</a>
                <div class="tiao" ref="tiao">
                    <span class="my-dian" ref="myDian"></span>
                </div>
                <a href="JavaScript:;" class="minus" @click.stop="minusVolume">-</a>
          </div>
          <a href="JavaScript:;" class="v" title="音量" @click.stop="getVolume"></a>
          <a href="JavaScript:;" class="x" ref="order" :title="title" @click.stop="orderSong"></a>
          <span class="song-list">
            <a href="javascript:;" class="my-list" title="播放列表" @click.stop="showSongList">{{ number ? number : '0' }}</a>
          </span>
        </div>
      </div>
      <!-- 锁定 -->
      <div class="lock">
        <a href="javaScript:;" class="my-lock" ref="lock" @click.stop="lockPlay"></a>
      </div>
      <!-- 播放列表 -->
      <div class="playList" v-show="playList">
        <div class="listPlay">
          <div class="left">
            <h4>播放列表&nbsp;( {{ number ? number : '0' }} )</h4>
            <div class="my-right">
              <a href="JavaScript:;"><i class="sc"></i>收藏全部</a>
              <span class="xian">│</span>
              <a href="JavaScript:;"><i class="qc"></i>清除</a>
            </div>
          </div>
          <div class="right">
            {{ songName }}
            <a href="JavaScript:;" class="close" @click.stop="playList = false"></a>
          </div>
        </div>
        <div class="listPlay">
          <div class="wrapper">
            <ul class="ul-list">
              <li v-for="(item,index) in songList" :key="index">
                <span class="songName">{{ item.name }}</span>
                <span class="songSinger">{{ item.ar[0].name }}</span>
                <span class="songTime">{{ item.dt / 1000 | filterTime }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongUrl } from "../api/axios";
//导入iscroll
import IScroll from "better-scroll";
export default {
  name: "player",
  data() {
    return {
      songUrl: "",
      songImg: "",
      songId: "",
      index: 0,
      songName: "",
      songSinger: "",
      totalTime: "",
      time: "",
      number: "",
      showVolume: false,
      remove: true,
      remove1: true,
      title: '循环',
      single: false,
      random: false,
      playList:false,
    };
  },
  watch: { // 监听器
    songList(to, from) { // 监听歌单是否改变
      let toId = to[0].id;
      let fromId = from[0] ? from[0].id : 0;
      if (toId != fromId) {
        this.stop();
        // 重新赋值
        this.songId = to[0].id;
        // 歌曲数量
        this.number = to.length;
        // 下标重置
        this.index = 0;
        // 重新获取
        this.getUrl();
      }
    },
    index(to, from) { // 监听下标是否改变
      if (to != from) {
        if (to >= this.songList.lengrh - 1) {
          this.stop();
          // 重新赋值
          this.songId = this.songList[0].id;
          // 重新获取
          this.getUrl();
        } else if (to < 0) {
          this.stop();
          // 重新赋值
          this.songId = this.songList[this.songList.length - 1].id;
          this.index = this.songList.length - 1;
          // 重新获取
          this.getUrl();
        } else {
          this.stop();
          // 重新赋值
          this.songId = this.songList[this.index].id;
          // 重新获取
          this.getUrl();
        }
      }
    }
  },
  methods: {
    shiftIn() {
      this.$refs.muisc.style.top = "-47px";
    },
    shiftOut() {
      this.$refs.muisc.style.top = "-5px";
    },
    getUrl() { // 获取歌曲地址
      getSongUrl(this.songId).then(res => {
        if (res.data.code === 200) {
          this.$refs.stop.style.backgroundPosition = "-2px -165px";
          this.songUrl = res.data.data[0].url;
          this.songImg = this.songList[this.index].al.picUrl;
          this.songName = this.songList[this.index].name;
          this.songSinger = this.songList[this.index].ar[0].name;
        }
      });
    },
    playOver() { // 播放结束下一首/点击下一首
      if(this.title == '随机' && this.random){
        this.index = Math.floor(Math.random() * this.songList.length - 1)
      } else if (this.index >= this.songList.length - 1) {
        this.index = 0;
      } else if (this.songUrl != "") {
        this.index++;
      }  
    },
    upSong() { // 上一首
      if(this.title == '随机' && this.random){
        this.index = Math.floor(Math.random() * this.songList.length - 1)
      } else if (this.songUrl != "") {
        this.index--;
      } 
    },
    stop() { // 暂停/播放
      let audio = this.$refs.audio;
      if (this.songUrl != "") {
        if (audio.paused) {
          audio.play();
          this.$refs.stop.style.backgroundPosition = "-2px -165px";
        } else {
          audio.pause();
          this.$refs.stop.style.backgroundPosition = "-2px -204px";
        }
      }
    },
    songTime(e) { // 歌曲时长
      this.totalTime = this.transTime(e.target.duration);
    },
    transTime(time) { // 时间格式化
      let minute = parseInt(time / 60);
      minute = minute < 10 ? "0" + minute : minute;
      let sec = parseInt(time % 60);
      sec = sec < 10 ? "0" + sec : sec;
      return minute + ":" + sec;
    },
    timeupdate() { // 播放位置改变时
      let audio = this.$refs.audio;
      this.$refs.pb.style.width = (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100 + "%";
      this.time = this.transTime(audio.currentTime);
    },
    alterPlace(e) { // 点击改变进度条位置
      if (e.target == this.$refs.dian) return
      if (this.songUrl != "") {
        let audio = this.$refs.audio
        let planWidth = this.$refs.plan.offsetWidth
        let rate = e.offsetX / planWidth
        audio.currentTime = audio.duration * rate
        this.timeupdate();
      }
    },
    getVolume() { // 获取音量
        if(!this.showVolume){
            let audio = this.$refs.audio
            this.$refs.tiao.style.height = audio.volume * 92 + 'px'
            this.showVolume = true
        } else {
          this.showVolume = false
        }
    },
    addVolume() { // 加音量
      let audio = this.$refs.audio
      if(audio.volume < 1) {
        audio.volume += 0.1
        this.$refs.tiao.style.height = audio.volume * 92 + 'px'
      }
    },
    minusVolume() { // 减音量
      let audio = this.$refs.audio
      if(audio.volume >= 0.1) {
        audio.volume -= 0.1
        this.$refs.tiao.style.height = audio.volume * 92 + 'px'
      }
    },
    lockPlay() { // 锁定播放器
      if(this.remove){
        this.remove = false
        this.$refs.lock.style.backgroundPosition = '-101px -382px'
      } else {
        this.remove = true
        this.$refs.lock.style.backgroundPosition = '-80px -382px'
      }
    },
    orderSong() { // 播放的顺序
      if(this.title == '循环'){
        this.title = '单曲循环'
        this.single = true
        this.$refs.order.style.backgroundPosition = '-68px -343px'
      } else if(this.title == '单曲循环'){
        this.title = '随机'
        this.single = false
        this.random = true
        this.$refs.order.style.backgroundPosition = '-68px -248px'
      } else if(this.title == '随机'){
        this.title = '循环'
        this.random = false
        this.$refs.order.style.backgroundPosition = '-5px -343px'
      }
    },
    showSongList() { // 显示播放列表
      if(!this.playList){
        this.playList = true
      } else {
        this.playList = false
      }
    }
  },
  computed: {
    songList() { // 获取vuex的歌曲列表
      return this.$store.state.muiscList;
    }
  },
  filters: {
    filterTime(time) {
      let minute = parseInt(time / 60);
      minute = minute < 10 ? "0" + minute : minute;
      let sec = parseInt(time % 60);
      sec = sec < 10 ? "0" + sec : sec;
      return minute + ":" + sec;
    }
  },
  created() {},
  mounted() { // dom元素挂载完毕
    this.shiftIn()
    setTimeout(this.shiftOut,1000)
  },
  beforeUpdate() { // 数据更新后
    new IScroll(".wrapper",{
      mouseWheel: true, //允许鼠标滚动
      scrollbars:true, //显示滚动条
      bounce:true, //反弹动画
      click:true //允许容器内元素能绑定点击事件
    })
  },
};
</script>

<style lang="less" scoped>
.muisc {
  width: 100%;
  height: 0;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  .my-muisc {
    width: 100%;
    height: 53px;
    background: url("../assets/images/008.png") 0px -5px;
    position: absolute;
    left: 0;
    top: -5px;
    transition: all 0.5s;
  }
  .box {
    width: 982px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    // background-color: pink;
    .control {
      width: 125px;
      height: 50px;
      display: flex;
      align-items: center;
    }
    a {
      display: block;
      text-indent: -999999em;
    }
    .stop {
      width: 33px;
      height: 36px;
      margin: 0 10px;
      background: url("../assets/images/008.png");
      background-position: -2px -204px;
    }
    .up {
      width: 26px;
      height: 27px;
      background: url("../assets/images/008.png");
      background-position: 0px -130px;
    }
    .control a:nth-child(3) {
      background-position: -82px -130px;
    }
    .img {
      width: 34px;
      height: 34px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 2px;
      }
      .details {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: url("../assets/images/004.png") -316px -330px;
      }
    }
    .play {
      width: 608px;
      height: 37px;
      margin-left: 18px;
      position: relative;
    }
    .name {
      margin-bottom: 8px;
    }
    .my-plan {
      width: 493px;
      height: 9px;
      float: left;
      background: url("../assets/images/010.png") 0px -30px;
      .pb {
        width: 0px;
        height: 9px;
        position: relative;
        background: url("../assets/images/010.png") 0px -66px;
        span {
          width: 22px;
          height: 24px;
          position: absolute;
          top: -4px;
          right: -10px;
          background: url("../assets/images/003.png") -2px -283px;
        }
      }
    }
    .time {
      font-size: 12px;
      position: absolute;
      right: 27px;
      top: 19px;
      color: #a1a1a1;
      .time span:last-child {
        color: #797979;
      }
    }
    .mutual {
      width: 60px;
      height: 36px;
      a {
        display: inline-block;
        width: 25px;
        height: 25px;
        background: url("../assets/images/008.png") -89px -162px;
        margin: 5px 5px 0 0;
      }
      .share {
        background-position: -118px -162px;
      }
    }
    .list {
      width: 119px;
      height: 36px;
      padding-left: 15px;
      position: relative;
      .v,
      .x {
        width: 25px;
        height: 25px;
        float: left;
        background: url("../assets/images/008.png") no-repeat -4px -247px;
        margin: 5px 5px 0 0;
      }
      .x {
        background-position: -5px -343px;
      }
      .song-list {
        width: 59px;
        float: left;
        margin-top: 2px;
        .my-list {
          width: 30px;
          height: 25px;
          margin: 5px 5px 0 0;
          color: #666;
          text-indent: 0;
          line-height: 22px;
          padding-left: 29px;
          background: url("../assets/images/008.png") no-repeat -44px -70px;
        }
      }
      .volume{
        width: 32px;
        height: 140px;
        position: absolute;
        top: -146px;
        left: 9px;
        background-color: #292929;
        .tiao{
            width: 4px;
            height: 0px;
            position: absolute;
            bottom: 22px;
            left: 14px;
            background: url("../assets/images/008.png") no-repeat -39px -522px;
        }
        .my-dian{
            width: 18px;
            height: 18px;
            position: absolute;
            top: -8px;
            left: -6px;
            background: url("../assets/images/003.png") no-repeat -41px -250px;
        }
        a{
            color: #fff;
            text-indent: 0;
            display: block;
            text-align: center;
        }
        .minus{
            line-height: 10px;
            position: absolute;
            left: 12px;
            bottom: 3px;
            font-size: 20px;
        }
      }
    }
  }
  .lock{
    width: 52px;
    height: 67px;
    position: absolute;
    top: -14px;
    right: 49px;
    padding-top: 1px;
    background: url("../assets/images/008.png") no-repeat 0px -385px;
    .my-lock{
      width: 18px;
      height: 18px;
      box-sizing: border-box;
      display: block;
      margin: 0 auto;
      background: url("../assets/images/008.png") no-repeat -80px -382px;
    }
  }
  .playList{
    width: 986px;
    height: 301px;
    position: absolute;
    top: -300px;
    left: 459px;
    border-top-left-radius: 3px; 
    border-top-right-radius: 3px; 
    .listPlay{
      width: 986px;
      height: 41px;
      margin-left: 1px;
      background: url('../assets/images/009.png') -1px 0px;
    }
    .listPlay:first-child{
      background-repeat: no-repeat;
    }
    .listPlay:last-child{
      height: 260px;
      background-position: -1015px 0px;
      background-repeat: repeat-y;
    }
    .left{
      width: 555px;
      height: 41px;
      float: left;
      line-height: 41px;
      h4{
        color: #e2e2e2;
        float: left;
        font-size: 14px;
        margin-left: 20px;
      }
      .my-right{
        float: right;
        margin-right: 10px;
        span{
          color: #2c2c2c;
          margin: 0 5px;
        }
        a{
          line-height: 16px;
          display: inline-block;
          color: #ccc;
          i{
            width: 17px;
            height: 16px;
            float: left;
            margin: 1px 5px 0 0;
            background: url('../assets/images/011.png') no-repeat -23px 0px;
          }
        }
        .qc{
          background-position: -51px 0px;
        }
      }
    }
    .right{
      width: 428px;
      height: 41px;
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      text-align: center;
      line-height: 41px;
      font-size: 14px;
      .close{
        width: 16px;
        height: 16px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: url('../assets/images/011.png') no-repeat -204px 0px;
      }
    }
    .wrapper{
      width: 555px;
      height: 260px;
      float: left;
      margin-left: 2px;
      overflow: hidden;
      background-color: rgba(18, 18, 18, .5)
    }
    .ul-list{
      li{
        width: 525px;
        height: 28px;
        padding-left: 30px;
        span{
          float: left;
          height: 28px;
          line-height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .songName{
          width: 350px;
          color: #ccc;
        }
        .songSinger{
          width: 80px;
          color: #9b9b9b;
        }
        .songTime{
          width: 80px;
          color: #666;
        }
      }
    }
  }
}
</style>