<template>
  <div class="single-box">
    <ul class="single-list" v-if="searchCode == 1">
      <li class="list" v-for="(item,index) in searchData" :key="index">
        <div class="list-icon" title="播放" @click.stop="playSingle(item)"></div>
        <div class="list-song">
          <a href="JavaScript:;" :title="item.alias[0]">{{ item.name }}</a>
          <span> - {{ item.alias[0] }}</span>
        </div>
        <div class="list-to"></div>
        <div class="list-name">
          <a href="javaScript;:">{{ item.artists[0].name }}</a>
        </div>
        <div class="list-zhuan">
          <a href="javaScript:;" :title="'《'+item.name+'》'">《{{ item.name }}》</a>
        </div>
        <div class="list-time">
          {{ item.duration / 1000 | transTime }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearch, getSongDetail } from '../../../api/axios'
export default {
  porps: ["searchData","searchId"],
  name: "single",
  data() {
    return {
      search: '',
      searchData: [],
      songCount: null, // 总条数
    }
  },
  watch: { // 监听器
    searchContent(to,form){// 监听搜索关键字是否变化
      if(to != form){
        this.search = to
        this.getSearchData()
      }
    }
  },
  methods: {
    getSearchData() { // 获取搜索数据
      getSearch(this.search,1,0).then( res => {
          if(res.data.code === 200){
            this.searchData = res.data.result.songs
            this.songCount = res.data.result.songCount
            this.$emit('listNumber',this.songCount)
          }
      })
    },
    playSingle(item) { // 播放单曲
      getSongDetail(item.id).then( res => {
        if(res.data.code === 200){
          this.$store.dispatch('getMuisc',{
            data: res.data.songs[0],
            index: 1
          })
          setTimeout(() => {
            localStorage.setItem('songData',JSON.stringify(this.songList))
          },1000)
        }
      })
    }
  },
  created() {
    this.search = this.searchContent
    this.getSearchData()
  },
  filters: {
    transTime(time) { // 时间格式化
      let minute = parseInt(time / 60)
      minute = minute < 10 ? "0" + minute : minute
      let sec = parseInt(time % 60)
      sec = sec < 10 ? "0" + sec : sec
      return minute + ":" + sec
    },
  },
  computed: { // 计算属性
    searchContent() { // 搜索关键字是否变化
      return this.$attrs.searchData
    },
    searchCode() { // 关键id的变化
      return this.$attrs.searchId
    },
    songList() {
      return this.$store.state.muiscList
    }
  },
};
</script>

<style lang="less" scoped>
.single-box {
  margin-top: 20px;
  .list {
    display: flex;
    box-sizing: border-box;
    border: 1px solid transparent;
    padding: 10px 10px 8px 18px;
  }
  .list:nth-child(2n){
    background-color: #f7f7f7;
  }
  .list-icon{
    width: 17px;
    height: 17px;
    margin-right: 5px;
    cursor: pointer;
    background: url('../../../assets/images/013.png') no-repeat 0px -103px;
  }
  .list-song,.list-name,.list-zhuan{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 10px;
    color: #333;
  }
  .list-song{
    width: 370px;
    height: 23px;
    span{
      color: #aeaeae;
    }
  }
  .list-to{
    width: 96px;
    height: 16px;
    margin-right: 10px;
  }
  .list-name{
    width: 131px;
    height: 16px;
  }
  .list-zhuan{
    width: 157px;
    height: 16px;
  }
  .list-time{
    width: 30px;
    height: 16px;
  }
  .list:hover{
    border: 1px solid #e1e1e1;
    background-color: #f2f2f2;
  }
  a:hover{
    text-decoration: underline;
  }
}
</style>