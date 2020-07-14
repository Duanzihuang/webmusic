<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: area == '全部' }" @click="area = '全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '内地' }" @click="area = '内地'">内地</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '港台' }" @click="area = '港台'">港台</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '欧美' }" @click="area = '欧美'">欧美</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '日本' }" @click="area = '日本'">日本</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: area == '韩国' }" @click="area = '韩国'">韩国</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: type == '全部' }" @click="type = '全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '官方版' }" @click="type = '官方版'">官方版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '原声' }" @click="type = '原声'">原声</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '现场版' }" @click="type = '现场版'">现场版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: type == '网易出品' }" @click="type = '网易出品'">网易出品</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{ active: order == '上升最快' }" @click="order = '上升最快'">上升最快</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: order == '最热' }" @click="order = '最热'">最热</span>
          </li>
          <li class="tab">
            <span class="title" :class="{ active: order == '最新' }" @click="order = '最新'">最新</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div v-for="item in mvList" :key="item.id" class="item" @click="toMv(item.id)">
          <div class="img-wrap">
            <img :src="item.cover" alt />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount | formatCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artisetName }}</div>
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
    </div>
  </div>
</template>

<script>
import { allMvs } from '@/api/mvs'
import { reactive, toRefs, onMounted, watch } from '@vue/composition-api'
export default {
  setup(props, { root }) {
    const state = reactive({
      area: '全部',
      type: '全部',
      order: '上升最快',
      // 每页数据
      limit: 12,
      // 页码
      page: 1,
      // 总条数
      total: 0,
      // mv列表数据
      mvList: []
    })

    // 页码改变
    const handleCurrentChange = val => {
      state.page = val
      getData()
    }
    const getData = () => {
      const { area, type, order } = state
      allMvs({
        area,
        type,
        order,
        offset: (state.page - 1) * state.limit
      }).then(res => {
        // window.console.log(res)
        state.mvList = res.data
        if (res.count) {
          state.total = res.count
        }
      })
    }

    onMounted(() => {
      getData()
    })

    const toMv = id => {
      root.$router.push(`/mv/${id}`)
    }

    watch(
      () => {
        return [state.area, state.type, state.order]
      },
      () => {
        state.page = 1
        getData()
      }
    )

    return { ...toRefs(state), handleCurrentChange, toMv }
  }
}
</script>