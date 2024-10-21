<template>
   <NuxtLink :class="class" class="button" :to="to">
      <slot></slot>
   </NuxtLink>
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
   @apply py-2 px-6 w-fit rounded-full;
}
.light {
   @apply text-nude-8;
}

.gold {
   @apply text-white font-normal animate-gradient bg-gold-gradient-text bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running];
}

.blue {
   @apply bg-blue-6 text-nude-8 text-center uppercase hover:bg-blue-2 transition-colors;
}

.gold-light {
   @apply bg-nude-1 text-nude-8 text-center uppercase hover:bg-gold-2 rounded-xl transition-colors;
}

.submit {
   @apply bg-gold-2 text-nude-8 text-center uppercase hover:bg-gold-1 hover:text-blue-1 rounded-xl transition-colors duration-500 block w-full;
}
</style>
