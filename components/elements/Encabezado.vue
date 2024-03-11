<template>
  <header class="header p-3 mb-0" :style="`background-image: url(${data.featured_image_data.src});`">
    <div class="header__content p-3">
      <h1>{{ data.title.rendered }}</h1>
      <div class="answer" v-html="data.content.rendered"></div>
    </div>
  </header>
</template>

<script setup>
// Props
const props = defineProps({
  data: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
</style>
