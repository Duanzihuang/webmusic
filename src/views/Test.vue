<template>
  <div>
    推荐歌单---{{title}}---{{msg}}
    <input v-model="keyword"/>
    <HelloWorld msg="you are a bad man" @sendValue="getChildValue" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import { reactive, ref, watch } from '@vue/composition-api'
export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      title: '我是个好人'
    }
  },
  beforeCreate() {
    // console.log('---beforeCreate---')
  },
  created() {
    // console.log('---created---')
  },
  setup() {
    // console.log('---setup---', context)
    const state = reactive({
      msg: '你是个坏蛋'
    })

    const getChildValue = data => {
      console.log(`来自子组件的数据`, data)
    }

    const keyword = ref("")

    const printKeyword = val => {
      // console.log(val)
      return setTimeout(() => {
        console.log(val)
      },1000)
    }

    watch(keyword, (newValue,oldValue,onCleanup) => {
      const timerId = printKeyword(newValue,oldValue)

      onCleanup(() => clearTimeout(timerId))
    })

    return { ...state, keyword, getChildValue }
  }
}
</script>