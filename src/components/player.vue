<template>
  <!-- 播放器 -->
  <div class="muisc">
    <div class="my-muisc" ref="muisc" @mouseover="remove && shiftIn()" @mouseout="remove && shiftOut()">
      <div class="box">
        <!-- 音频 -->
        <audio
          :src="songUrl"
          ref="audio"
          :autoplay="autoStart"
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
              <div class="hc" ref="hc"></div>
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
            <span>{{ songName }}</span>
            <a href="JavaScript:;" class="close" @click.stop="playList = false"></a>
          </div>
        </div>
        <div class="listPlay">
          <!-- 歌曲列表 -->
          <div class="wrapper" ref="wrapper">
            <ul class="ul-list">
              <li v-for="(item,index1) in songList" :key="index1" ref="list" @click.stop="selectPlay(item,index1)" @mouseover="enterTntoItme(index1)" @mouseout="leaveItme(index1)">
                <i class="play-icon">
                  <div class="icon" v-if="index == index1"></div>
                </i>
                <span class="songName" :style="{'color': (index == index1 ? '#fff' : '')}">{{ item.name }}</span>
                <span class="goNeng hidden">
                  <i class="icon1" title="收藏"></i>
                  <i class="icon2" title="转发"></i>
                  <i class="icon3" title="下载"></i>
                  <i class="icon4" title="删除"></i>
                </span>
                <span class="songSinger" :style="{'color': (index == index1 ? '#fff' : '')}">{{ item.ar[0].name }}</span>
                <span class="songTime" :style="{'color': (index == index1 ? '#fff' : '')}">{{ item.dt / 1000 | filterTime }}</span>
              </li>
            </ul>
          </div>
          <!-- 歌词列表 -->
          <div class="song-lyric" ref="songLyric">
            <ul class="lyric-list">
              <li class="lyric" ref="lyric" v-for="(item,index) in lyric" :key="index">
                {{ item.split('。')[1] }}
                <br/>
                <span v-if="showTranslate">
                  {{ item.split('。')[2] }}&nbsp;
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongUrl, getLyric } from "../api/axios";
let lineNo = 0; //当前行
let C_pos = 2;
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
      lyric: [], // 歌词
      showVolume: false, // 是否显示音量
      remove: true, // 是否移除移入和移出事件
      title: '循环', // 播放顺序
      single: false, // 单曲循环
      random: false, // 随机播放
      playList:false, // 是否显示播放列表
      autoStart: false, // 自动播放
      add_index: null, // 是否是上一首还是下一首
      stopTime: null, // 定时器的变量
      showTranslate: false, // 是否翻译
    };
  },
  watch: { // 监听器
    songList(to) { // 监听歌单是否改变
      let audio = this.$refs.audio
      audio.pause()
      this.$refs.stop.style.backgroundPosition = "-2px -204px";
      this.songId = to[0].id // 重新赋值
      this.number = to.length // 歌曲数量
      this.index = 0 // 下标重置
      this.playList = false // 隐藏播放列表
      this.getUrl() // 重新获取歌曲
    }
  },
  methods: {
    shiftIn() {
      this.$refs.muisc.style.top = "-47px"
      clearTimeout(this.stopTime) // 停止定时器
    },
    shiftOut() {
      this.$refs.muisc.style.top = "-5px"
    },
    lyricHeight() { // 高亮当前的歌词
      const list = this.$refs.lyric //歌词数组
      const songLyric = this.$refs.songLyric
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove("high") //去掉高亮
      }
      list[lineNo].classList.add("high");//高亮显示当前行   
       // 滚动歌词
      if (lineNo > C_pos) {
        songLyric.scrollTo(0,(lineNo - 2) * list[lineNo].offsetHeight)
      }
    },
    getTime() { // 处理时间
      let arr = [];
      for (let i = 0; i < this.lyric.length; i++) {
        arr.push(this.lyric[i].split("。")[0]);
      }
      return arr;
    },
    getUrl() { // 获取歌曲地址
      this.autoStart = true
      let audio = this.$refs.audio
      this.$refs.songLyric.scrollTo(0,0)
      lineNo = 0
      audio.currentTime = 0
      getSongUrl(this.songId).then(res => {
        if (res.data.code === 200) {
          audio.play()
          if(res.data.data[0].code === 404){ // 判断是否有歌曲
            if(this.add_index == 1){ // 判断是否是上一首
              this.index++
              this.songId = this.songList[this.index].id
              this.getUrl() // 重新获取歌曲
              this.getSongLyric(this.songId) // 重新获取歌词
            } else if(this.add_index == 2){ // 判断是否是下一首
              this.index--
              this.songId = this.songList[this.index].id
              this.getUrl() // 重新获取歌曲
              this.getSongLyric(this.songId) // 重新获取歌词
            } else {
              this.index++
              this.songId = this.songList[this.index].id
              this.getUrl() // 重新获取歌曲
              this.getSongLyric(this.songId) // 重新获取歌词
            }
          } else { // 正常流程
            this.highlight()
            this.getSongLyric(this.songId) // 重新获取歌词
            this.$refs.stop.style.backgroundPosition = "-2px -165px"
            this.songUrl = res.data.data[0].url
            this.songImg = this.songList[this.index].al.picUrl
            this.songName = this.songList[this.index].name
            this.songSinger = this.songList[this.index].ar[0].name
            localStorage.setItem('index',this.index)
          }
        }
      });
    },
    getSongLyric(id) { // 获取歌词
      getLyric(id).then( res => {
        if(res.data.code === 200){
          if(res.data.nolyric){
            this.lyric = []
          } else {
            this.showTranslate = false
            let songLyric = []
            let songTime = []
            const regular = /\[\d{2}:\d{2}.\d{1,3}]/g // 时间正则
            let lrc = res.data.lrc.lyric.split('\n') // 截取歌词
            while(!regular.test(lrc[0])){ // 去掉不包含时间的歌词
              lrc = lrc.splice(1)
            }
            lrc[lrc.length - 1].length === 0 && lrc.pop() // 删除最后一个空歌词
            lrc.forEach(value => { // 循环歌词
              let time = value.match(regular) // 提取时间
              let lyric = value.replace(regular,"") // 提取歌词
              for(let i = 0; i < time.length; i++){
                const sec = time[i].slice(1,-1).split(":") // 去掉中括号,从 : 开始截取
                songTime.push((parseInt(sec[0]) * 60) + parseFloat(sec[1]))
                songLyric.push( // 将最终的结果添加到歌词数组
                  (parseInt(sec[0]) * 60) + parseFloat(sec[1]) + "。" + lyric
                )
              }
            })
            if(res.data.tlyric.lyric){ // 判断是否要翻译歌词
              this.showTranslate = true
              let tlrc = res.data.tlyric.lyric.split('\n') // 截取翻译歌词
              while(!regular.test(tlrc[0])){ // 去掉不包含时间的歌词
                tlrc = tlrc.splice(1)
              }
              tlrc[tlrc.length - 1].length === 0 && tlrc.pop() // 删除最后一个空歌词
              let lyricTime = []
              let lyric = []
              tlrc.forEach(value => { // 循环歌词
                let time = value.match(regular) // 提取时间
                lyric.push(value.replace(regular,"")) // 提取歌词
                for(let i = 0; i < time.length; i++){
                  const sec = time[i].slice(1,-1).split(":") // 去掉中括号,从 : 开始截取
                  lyricTime.push((parseInt(sec[0]) * 60) + parseFloat(sec[1]))
                }
              })
              for(let i = 0; i < songTime.length; i++){ // 循环对比时间拼接翻译
                for(let j = 0; j < lyricTime.length; j++){
                  if(songTime[i] == lyricTime[j]){
                    songLyric[i] = songLyric[i]  +  '。' + lyric[j]
                  }
                }
              }
            }
            this.lyric = songLyric
          }
        }
      })
    },
    playOver() { // 播放结束下一首/点击下一首
      this.add_index = 1
      this.$refs.songLyric.scrollTo(0,0)
      if(this.title == '随机' && this.random){ // 随机播放
        this.index = Math.floor(Math.random() * this.songList.length - 1)
        this.stop()
        this.songId = this.songList[this.index].id
        this.getUrl()
      } else if (this.index >= this.songList.length - 1) { // 最后一首切换到第一首
        this.index = 0
        this.stop()
        this.songId = this.songList[0].id
        this.getUrl()
      } else if (this.songUrl != "" ){ // 正常循环
        this.index++
        this.stop()
        this.songId = this.songList[this.index].id
        this.getUrl()
      }
    },
    upSong() { // 上一首
      this.add_index = 2
      if(this.title == '随机' && this.random){ // 随机播放
        this.index = Math.floor(Math.random() * this.songList.length - 1)
        this.stop()
        this.songId = this.songList[this.index].id
        this.getUrl()
      } else if(this.index <= 0){ // 第一首切换到最后一首
        this.index = this.songList.length - 1
        this.stop()
        this.songId = this.songList[this.index].id
        this.getUrl()
      } else if (this.songUrl != "") { // 正常循环
        this.index--
        this.stop()
        this.songId = this.songList[this.index].id
        this.getUrl()
      } 
    },
    stop() { // 暂停/播放
      let audio = this.$refs.audio
      if (this.songUrl != "") {
        if (audio.paused) {
          audio.play()
          this.$refs.stop.style.backgroundPosition = "-2px -165px";
          this.highlight()
        } else {
          audio.pause()
          this.$refs.stop.style.backgroundPosition = "-2px -204px";
        }
      }
    },
    songTime(e) { // 歌曲时长
      this.totalTime = this.transTime(e.target.duration)
    },
    transTime(time) { // 时间格式化
      let minute = parseInt(time / 60)
      minute = minute < 10 ? "0" + minute : minute
      let sec = parseInt(time % 60)
      sec = sec < 10 ? "0" + sec : sec
      return minute + ":" + sec
    },
    timeupdate() { // 播放位置改变时
      let audio = this.$refs.audio
      this.$refs.pb.style.width = (Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100 + "%"
      this.time = this.transTime(audio.currentTime)
      for(let i = 0; i < this.getTime().length; i++){ // 循环时间
        if(this.getTime()[i] <= audio.currentTime){
          lineNo = i
        }
      }
      if (parseFloat(this.getTime()[lineNo]) <= audio.currentTime) { //歌词时间小于等于进度条的时间
        this.lyricHeight(); //高亮当前行
        lineNo++;
      }
      setTimeout(() => { // 缓存时间
        this.$refs.hc.style.width = (Math.floor(audio.buffered.end(audio.buffered.length - 1)) / Math.floor(audio.duration)) * 100 + '%'
      },500)
    },
    alterPlace(e) { // 点击改变进度条位置
      if (e.target == this.$refs.dian) return
      if (this.songUrl != "") {
        let audio = this.$refs.audio
        let planWidth = this.$refs.plan.offsetWidth
        let rate = e.offsetX / planWidth
        audio.currentTime = audio.duration * rate
        this.timeupdate()
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
        setTimeout(this.highlight,100)
      } else {
        this.playList = false
      }
    },
    highlight() { // 高亮
      const list = this.$refs.list
      const box = this.$refs.wrapper
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove("setColor"); //去掉高亮
      }
      list[this.index].classList.add("setColor");//高亮显示当前行
      let visible = (box.scrollTop + box.offsetHeight) - 8
      if(list[this.index].offsetTop >= visible){
        box.scrollTo(0,list[this.index].offsetTop - (list[this.index].offsetHeight * 8))
      } else if(box.scrollTop > list[this.index].offsetTop){
        box.scrollTo(0,list[this.index].offsetTop)
      }
    },
    selectPlay(item,index) { // 选择播放歌曲
      this.index = index
      this.stop()
      this.songId = this.songList[index].id
      this.getUrl()
    },
    enterTntoItme(index){ // 歌曲移入高亮
      let list = this.$refs.list
      list[index].style.backgroundColor = '#000'
      list[index].childNodes[1].classList.add('list_color')
      list[index].childNodes[2].classList.remove('hidden')
      list[index].childNodes[3].classList.add('list_color')
      list[index].childNodes[4].classList.add('list_color')
    },
    leaveItme(index) { // 歌曲移除删除高亮
      let list = this.$refs.list
      list[index].style.backgroundColor = ''
      list[index].childNodes[1].classList.remove('list_color')
      list[index].childNodes[2].classList.add('hidden')
      list[index].childNodes[3].classList.remove('list_color')
      list[index].childNodes[4].classList.remove('list_color')
    }
  },
  computed: {
    songList() { // 获取vuex的歌曲列表
      return this.$store.state.muiscList;
    }
  },
  filters: {
    filterTime(time) { // 分钟过滤
      let minute = parseInt(time / 60);
      minute = minute < 10 ? "0" + minute : minute;
      let sec = parseInt(time % 60);
      sec = sec < 10 ? "0" + sec : sec;
      return minute + ":" + sec;
    }
  },
  created() {
    if(JSON.parse(localStorage.getItem('songData'))){  // 获取本地存储的歌单
      this.number = this.songList.length
      this.index = parseInt(localStorage.getItem('index'))
      getSongUrl(this.songList[this.index].id).then(res => {
        if (res.data.code === 200) {
          this.getSongLyric(this.songList[this.index].id)
          this.autoStart = false
          this.songUrl = res.data.data[0].url
          this.songImg = this.songList[this.index].al.picUrl
          this.songName = this.songList[this.index].name
          this.songSinger = this.songList[this.index].ar[0].name
        }
      });
    }
  },
  mounted() { // dom元素挂载完毕
    this.shiftIn()
    this.stopTime = setTimeout(this.shiftOut,1000)
  }
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
      position: relative;
      background: url("../assets/images/010.png") 0px 0px;
      .pb {
        width: 0px;
        height: 9px;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 2;
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
      .hc {
        width: 0px;
        height: 9px;
        position: absolute;
        top: 0px;
        left: 0px;
        border-radius: 5px;
        background: url("../assets/images/010.png") 0px -30px;
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
        z-index: 2;
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
      span{
        width: 350px;
        height: 41px;
        display: block;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
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
      overflow: scroll;
      overflow-x: hidden;
      background-color: rgba(18, 18, 18, .4)
    }
    .wrapper::-webkit-scrollbar {
      width: 6px;
      background-color: #120e0d
    }
    .wrapper::-webkit-scrollbar-thumb{  
      border-radius: 10px; 
      background-color: #484443;  
    }
    .ul-list{
      position: relative;
      li{
        width: 549px;
        height: 28px;
        cursor: pointer;
        span{
          float: left;
          height: 28px;
          line-height: 28px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .play-icon{
          float: left;
          width: 18px;
          height: 28px;
          margin-right: 5px;
        }
        .icon{
          width: 10px;
          height: 13px;
          margin: 0 auto;
          margin-top: 9px;
          background: url('../assets/images/011.png') no-repeat -181px 0px;
        }
        .list_color{
          color: #fff;
        }
        .hidden{
          visibility: hidden;
        }
      }
      .songName{
        width: 250px;
        color: #ccc;
      }
      .goNeng{
        width: 95px;
        padding-left: 5px;
        i{
          float: left;
          width: 16px;
          height: 16px;
          margin: 7px 0px 0px 5px;
          background: url('../assets/images/011.png') no-repeat -24px 2px;
        }
        .icon2{
          background-position: 2px 2px;
        }
        .icon3{
          background-position: -56px -49px;
        }
        .icon4{
          background-position: -50px 2px;
        }
      }
      .songSinger{
        width: 60px;
        color: #9b9b9b;
        margin-right: 10px;
      }
      .songTime{
        width: 80px;
        color: #666;
        text-align: center;
      }
      .songSinger:hover{
        text-decoration: underline;
      }
      li.setColor{
        background-color: rgba(0, 0, 0, .3)
      }
    }
  }
}
.song-lyric{
  width: 425px;
  height: 260px;
  padding: 20px 0;
  box-sizing: border-box;
  overflow: scroll;
  overflow-x: hidden;
  float: left;
  .lyric-list{
    width: 354px;
    position: relative;
    margin: 0 auto;
    text-align: center;
  }
  .lyric{
      height: auto !important;
      height: 32px;
      min-height: 32px;
      line-height: 32px;
      font-size: 12px;
      color: #989898;
      transition: all .7s;
    }
  .high{
    color: #fff;
    font-size: 14px;
  }
}
.song-lyric::-webkit-scrollbar{
  width: 6px;
  background-color: #120e0d;
}
.song-lyric::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #484443
}
</style>