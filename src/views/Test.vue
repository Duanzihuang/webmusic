<template>
  <div>
    推荐歌单---{{title}}---{{msg}}
    <HelloWorld msg="you are a bad man" @sendValue="getChildValue" />
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
import { reactive } from '@vue/composition-api'
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
  setup(props, context) {
    console.log('---setup---', context)
    const state = reactive({
      msg: '你是个坏蛋'
    })

    const getChildValue = data => {
      console.log(`来自子组件的数据`, data)
    }

    return { ...state, getChildValue }
  }
}
</script>