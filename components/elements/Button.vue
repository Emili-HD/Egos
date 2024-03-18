<template>
   <a 
      :class="class"
      class="button [&.light]:text-nude-8
            [&.gold]:text-blue-1 [&.gold]:font-normal [&.gold]:animate-gradient [&.gold]:bg-gold-gradient-text
            [&.gold]:bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running]
            [&.gold]:py-2 [&.gold]:px-4 [&.gold]:rounded-3xl"
      :href="href"
      >
      <slot></slot>
   </a>
</template>

<script setup>
// props
const props = defineProps({
   class: {
      type: String,
   },
   href: {
      type: String,
   }
})

</script>

<style lang="scss" scoped>
// Estilo vacío
</style>
