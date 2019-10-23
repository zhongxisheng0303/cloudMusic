<template>
  <ul class="songList">
      <li v-for="(item,index) in songList" :key="index">
        <div class="song-box">
            <img class="song-img" :src="item.picUrl">
            <a href="JavaScript:;" class="details" :title="item.name"></a>
            <div class="song">
                <span class="song-i"></span>
                <span class="song-measure">{{ parseInt(item.playCount / 10000) }}万</span>
                <a href="JavaScript:;" class="play" @click.stop="getSongListDetails(item.id)"></a>
            </div>
        </div>
        <p class="song-title">{{ item.name }}</p>
      </li>
  </ul>
</template>

<script>
import {songList, songListDetails} from '../../../api/axios'
export default {
    name: 'songList',
    data() {
        return{
            songList: [], // 推荐歌单列表
        }
    },
    methods: {
        getSongList() { // 获取歌单
            songList().then( res => {
                if(res.data.code === 200){
                    this.songList = res.data.result
                }
            })
        },
        getSongListDetails(id) { // 获取歌单的歌曲
            songListDetails(id).then( res => {
                if(res.data.code === 200){ // 将歌曲列表添加到vuex
                    this.$store.dispatch('getMuisc',res.data.playlist.tracks)
                }
            })
        }
    },
    created() {
        this.getSongList()
    },
}
</script>

<style lang="less">
.songList{
    margin-top: 20px;
    li{
        float: left;
        width: 161px;
        height: 234px;
        padding-left: 11px;
        .song-box{
            width: 140px;
            height: 140px;
            position: relative;
            .song-img{
                width: 100%;
                height: 100%;
            }
            .details{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: url('../../../assets/images/004.png')
            }
            .song{
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 27px;
                background: url('../../../assets/images/004.png') 0 -536px;
                display: flex;
                align-items: center;
                .song-i{
                    width: 16px;
                    height: 11px;
                    margin: 0 5px 0 10px;
                    background: url('../../../assets/images/003.png') -0px -24px;
                }
                .song-measure{
                    color: #ccc;
                }
                .play{
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: url('../../../assets/images/003.png') -0px -60px;
                }
            }
        }
        .song-title{
            width: 140px;
            margin-top: 8px;
            font-size: 14px;
        }
    }
}
</style>