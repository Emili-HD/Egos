<template>
  <header class="header full-width p-12 mb-0 col-[1/-1] lg:col-[1/12] !bg-transparent" :style="`background-image: url(${data.featured_image_data.src});`">
  </header>
  <div class="header__content p-12 bg-nude-6 blue-1 flex flex-col justify-center items-center col-[1/-1] xl:col-[12/17]">
    <h1>{{ data.title.rendered }}</h1>
    <ElementsDivider />
    <div class="answer" v-html="data.content.rendered"></div>
  </div>
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
