<template>
  <header class="header p-3 mb-0 overflow-hidden">
    <UiImage :data="data" class="hero" :preload="true" />
    <div class="header__content p-3 text-white text-center w-full mb-20 ">
      <h1 class="!font-medium">{{ data.title.rendered }}</h1>
      <div class="answer" v-html="data.content.rendered"></div>
    </div>
  </header>
</template>

<script setup>

const props = defineProps({
  data: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
</style>
