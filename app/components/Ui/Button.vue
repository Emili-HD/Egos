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

.new {
   @apply bg-blue-1 text-nude-8 text-left uppercase hover:bg-blue-1/20 hover:text-blue-1 rounded-xl transition-colors flex items-center gap-2 p-4 pl-10 hover:before:bg-orange-700 hover:after:border-orange-700;
   &::before {
      @apply content-[''] size-3 rounded-full bg-orange-300 block absolute left-4;
   }
   &::after {
      @apply content-[''] size-5 rounded-full border border-orange-300 block absolute left-3;
   }
}


.submit {
   @apply bg-gold-2 text-nude-8 text-center uppercase hover:bg-gold-1 hover:text-blue-1 rounded-xl transition-colors duration-500 block w-full;
}
</style>
