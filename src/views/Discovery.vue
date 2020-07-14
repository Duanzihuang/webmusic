<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="item in playList" :key="item.id">
          <div class="img-wrap" @click="toPlayList(item.id)">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in newsong" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt />
            <span @click="playMusic(item.id)" class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="item in mv" :key="item.id">
          <div class="img-wrap" @click="toMv(item.id)">
            <img :src="item.picUrl" alt />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.copywriter}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from '@vue/composition-api'
import {
  getBannerList,
  getRecommendlist,
  getNewsong,
  getMv,
  getSongUrl
} from '@/api/discovery'
export default {
  setup(props, { root }) {
    const state = reactive({
      // 轮播图
      banners: [],
      // 歌单
      playList: [],
      // 新歌
      newsong: [],
      // mv
      mv: [],
      // 歌曲url
      songUrl: ''
    })

    const getData = async () => {
      const res1 = await getBannerList()
      const res2 = await getRecommendlist()
      const res3 = await getNewsong()
      const res4 = await getMv()

      state.banners = res1.banners
      state.playList = res2.result
      state.newsong = res3.result
      state.mv = res4.result
    }

    onMounted(() => {
      getData()
    })

    const toPlayList = id => {
      root.$router.push(`/playlist?id=${id}`)
    }

    const playMusic = async id => {
      const res = await getSongUrl({
        id: id
      })
      root.$store.commit('url/setUrl', res.data[0].url)
    }

    const toMv = id => {
      root.$router.push(`/mv?id=${id}`)
    }

    return { ...toRefs(state), toPlayList, toMv, playMusic }
  }
}
</script>