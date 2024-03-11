<template>
   <a class="button"
      :class="class"
      :href="href"
      >
      <slot></slot>
   </a>
</template>

<script setup>
import { inject, nextTick } from 'vue';
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
.button {
   // font-size: var(--font-size);
   // border-radius: var(--radius-l);
   // padding: 0.5rem 1.25rem;
   
   &.light {
      color: var(--nude-8);
   }

   &.gold {
      color: var(--blue-1);
      font-weight: 400;
      background: var(--gradient-gold);
      background-position: 0% 50%;
      background-size: 300% 300%;
      animation: gradient 7s ease infinite;
      animation-play-state: paused;

      &:hover {
         animation-play-state: running;
      }
   }

   &.orange {
      color: var(--nude-6);
      background: rgba(var(--orange-2-rgb),1);
   }

   @keyframes gradient {
      0% {
         background-position: 0% 50%;
      }
      50% {
         background-position: 100% 50%;
      }
      100% {
         background-position: 0% 50%;
      }
   }
}
</style>
