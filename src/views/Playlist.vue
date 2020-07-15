<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="coverImgUrl" alt />
      </div>
      <div class="info-wrap">
        <p class="title">{{ title }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="avatarUrl" alt />
          <span class="name">{{ nickname }}</span>
          <span class="time">{{ createTime }} 创建</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="item in tags" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ signature }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
            </tr>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item, index) in tableData" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap" @click="playMusic(item.id)">
                  <img :src="item.al.picUrl" alt />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span v-if="item.mv != 0" @click="toMV(item.mv)" class="iconfont icon-mv"></span>
                  </div>
                  <span>{{ item.subTitle }}</span>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | formatDuration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total + hotComments.length})`" name="2">
        <!-- 热门评论 -->
        <div v-if="hotComments.length != 0" class="comment-wrap">
          <p class="title">
            热门评论
            <span class="number">({{ hotComments.length }})</span>
          </p>
          <div class="comments-wrap" v-for="item in hotComments" :key="item.commentId">
            <div class="item">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div v-if="item.beReplied.length != 0" class="re-content">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | formatTime }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number">({{ total }})</span>
          </p>
          <div v-if="comments.length != 0" class="comments-wrap">
            <div class="item" v-for="item in comments" :key="item.commentId">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div v-if="item.beReplied.length != 0" class="re-content">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | formatTime }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from '@vue/composition-api'
import { playlistDetail, newComments, hotComments } from '@/api/playlist'
import { getSongUrl } from '@/api/discovery'
import moment from 'moment'
export default {
  setup(props, { root }) {
    const state = reactive({
      activeIndex: '1',
      tableData: [],
      title: '',
      avatarUrl: '',
      coverImgUrl: '',
      signature: '',
      nickname: '',
      tags: [],
      createTime: '',
      // 热门评论
      hotComments: [],
      // 普通评论
      comments: [],
      // 分页相关数据
      // 每页数据
      limit: 20,
      // 页码
      page: 1,
      // 总条数
      total: 0
    })

    const toMV = id => {
      root.$router.push(`/mv/${id}`)
    }

    const getData = async () => {
      const res1 = await playlistDetail({ id: root.$route.params.id })
      const res2 = await hotComments({
        id: root.$route.params.id
      })
      const res3 = await newComments({
        id: root.$route.params.id,
        offset: 0
      })

      state.tableData = res1.playlist.tracks
      state.title = res1.playlist.name
      state.avatarUrl = res1.playlist.creator.avatarUrl
      state.coverImgUrl = res1.playlist.coverImgUrl
      state.signature = res1.playlist.creator.signature

      state.nickname = res1.playlist.creator.nickname
      state.tags = res1.playlist.tags
      state.createTime = moment(res1.playlist.createTime).format('YYYY-MM-DD')
      state.hotComments = res2.hotComments
      state.total = res3.total
      state.comments = res3.comments
    }

    // 获取歌曲评论
    const getComments = () => {
      const { id } = root.$route.params
      // 获取歌曲评论
      newComments({
        id,
        offset: (state.page - 1) * 5
      }).then(res => {
        state.total = res.total
        state.comments = res.comments
      })
    }

    onMounted(() => {
      getData()
    })

    // 页码改变
    const handleCurrentChange = val => {
      state.page = val
      getComments()
    }

    const playMusic = async id => {
      const res = await getSongUrl({
        id: id
      })
      root.$store.commit('url/setUrl', res.data[0].url)
    }

    return {
      ...toRefs(state),
      handleCurrentChange,
      getComments,
      toMV,
      playMusic
    }
  }
}
</script>