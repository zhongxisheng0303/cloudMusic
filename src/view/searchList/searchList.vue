<template>
    <div class="box">
        <div class="search-list">
            <!-- 搜索框 -->
            <div class="search">
                <input type="text" v-model="searchData">
                <a href="javaScript:;" class="search-btn"></a>
            </div>
            <!-- 说明 -->
            <div class="explain">
                搜索“{{ search }}”，找到 <span style="color:#c20c0c">{{ number != '' ? number : '0' }}</span> 首单曲
            </div>
            <!-- 选项 -->
            <div class="option">
                <ul>
                    <li v-for="(item,index) in tabData" :key="index">
                        <a href="javaScript:;" ref="tab" :class="id == 1 && index == 0? 'tabClass' : ''" @click.stop="optioNtab(index,item.id)">{{ item.name }}</a>
                    </li>
                </ul>
            </div>
            <!-- 单曲 -->
            <single :searchData="search" :searchId="id" @listNumber="listNumber"></single>
        </div>
    </div>
</template>

<script>
import single from './components/single'
export default {
  name: "searchList",
  data() {
    return {
        tabData:[
            {
                name: '单曲',
                id: 1,
            },
            {
                name: '歌手',
                id: 100,
            },
            {
                name: '专辑',
                id: 10,
            },
            {
                name: '视频',
                id: 1014,
            },
            {
                name: '歌词',
                id: 1006,
            },
            {
                name: '歌单',
                id: 1000,
            },
            {
                name: '主播电台',
                id: 1009,
            },
            {
                name: '用户',
                id: 1002,
            }
        ], // tab数据
        search: '',
        searchData: '',
        number: '',
        id: 1,
    }
  },
  components: { // 注册组件
    single,
  },
  watch: {
      $route(to,form){
          if(to.query.search != form.query.search){
            this.search = to.query.search
            this.searchData = to.query.search
          }
      }
  },
  methods: {
      optioNtab(index,id) { // tab栏
        let list = this.$refs.tab
        for(let i = 0; i < list.length; i++){
            list[i].classList.remove('tabClass')
        }
        list[index].classList.add('tabClass')
        this.id = id
        sessionStorage.setItem('index',index)
        sessionStorage.setItem('code',id)
      },
      listNumber(number) { // 总数歌曲
        this.number = number
      }
  },
  created() {
      this.search = this.$route.query.search
      this.searchData = this.$route.query.search
      this.$nextTick(() => {
        let list = this.$refs.tab
        let index = sessionStorage.getItem('index',index)
        let code = sessionStorage.getItem('code',code)
        if(index != undefined){
            for(let i = 0; i < list.length; i++){
                list[i].classList.remove('tabClass')
            }
            list[index].classList.add('tabClass')
            this.id = code
        }
      })
  },
};
</script>

<style lang="less" scoped>
.box{
    width: 982px;
    margin: 0 auto;
    background-color: #fff;
}
.search-list{
    padding: 40px;
}
.search{
    width: 420px;
    height: 40px;
    background: url('../../assets/images/012.png') no-repeat 0px 0px;
    margin: 0 auto;
    input{
        width: 320px;
        margin: 12px 0 0 20px;
    }
    .search-btn{
        width: 50px;
        height: 40px;
        float: right;
    }
    .search-btn:hover{
        background-color: rgba(255, 255, 255, .2)
    }
}
.explain{
    margin: 28px 0 17px;
    color: #999;
}
.option{
    height: 39px;
    border: 1px solid #ccc;
    border-top-width: 2px;
    box-sizing: border-box;
    background-color: #f8f8f8;
    li{
        width: 112px;
        height: 39px;
        float: left;
        position: relative;
        a{
            width: 112px;
            height: 39px;
            position: absolute;
            left: 0px;
            top: -2px;
            box-sizing: border-box;
            border-top: 2px solid transparent;
            line-height: 37px;
            text-align: center;
        }
        .tabClass{
            border-top-color: #d13030;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            background-color: #fff;
        }
        a:hover{
            border-top-color: #d13030;
        }
    }
}
</style>