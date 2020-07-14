<template>
  <div>
    Hello World
    <br />
    <button @click="sendValueToParent">传递值给父组件</button>
  </div>
</template>

<script>
export default {
  // props: {
  //     msg: String
  // },
  props: ['msg'],
  setup(props, { emit }) {
    console.log('父组件传递过来的值', props.msg)

    const sendValueToParent = () => {
      //   emit('sendValue', 111)
      emit('sendValue', { name: '段子黄', age: 31 })
    }

    return { sendValueToParent }
  }
}
</script>