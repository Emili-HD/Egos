<template>
   <component :class="class" class="button" :is="to ? 'nuxt-link' : href ? 'a' : 'button'" :to="to" :href="href"
      @click="$emit('click')">
      <slot></slot>
   </component>
</template>

<script setup>
// props
const props = defineProps({
   class: {
      type: String,
   },
   to: {
      type: String,
      default: null
   },
   href: {
      type: String,
   }
})

</script>

<style scoped>
.button {
   @apply text-clamp-xs uppercase text-center;   
}

.light {
   @apply text-nude-8;
}

.gold {
   @apply text-white font-normal animate-gradient bg-gold-gradient-text bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running] pt-3 pb-2 px-4 rounded-full;
}

.blue {
   @apply w-fit pb-1 pt-2 px-6 bg-blue-1 text-nude-8 text-center uppercase rounded-3xl hover:bg-blue-6 transition-colors;
}
</style>
