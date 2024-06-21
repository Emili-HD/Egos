<template>
  <header class="header full-width h-screen sm:h-screen/50 lg:min-h-screen/80 xl:h-screen p-12 mb-0 col-[1/-1] lg:col-[1/10] xl:col-[1/12] !bg-transparent bg-cover bg-center" :style="`background-image: url(${data.featured_image_data.url});`">
  </header>
  <div class="header__content p-12 bg-nude-6 blue-1 flex flex-col justify-center items-center col-[1/-1] lg:col-[10/17] xl:col-[12/17]">
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
