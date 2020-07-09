<template>
  <div id="app">
    <Top />
    <Content />
  </div>
</template>

<script>
import Top from '@/components/Top'
import Content from '@/components/Content'

export default {
  name: 'App',
  components: {
    Top,
    Content
  }
}
</script>

<style lang="scss">
@import './style/base.scss';
</style>
