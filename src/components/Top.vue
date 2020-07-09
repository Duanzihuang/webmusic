<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span @click="$router.replace('/')" class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
        <span @click="$router.go(-1)" class="iconfont icon-arrow-lift"></span>
        <span @click="$router.go(1)" class="iconfont icon-arrow-right"></span>
      </div>
    </div>
    <div class="right-box"></div>
  </div>
</template>

<script>
export default {
  name: 'Top'
}
</script>
