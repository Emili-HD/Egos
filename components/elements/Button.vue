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
.button {
     &.dark {
        @include border($color: rgba(var(--blue-6-rgb), 0.4));
        color: var(--blue-6);
    }

    &.pedircita {
        color: var(--nude-6);
        font-weight: 400;
        letter-spacing: .0313rem;
        background: var(--gradient-blue);
    }

    &-invert,
    &-invert.pedircita {
        background-color: transparent;
        border: 1px solid rgba($nude-8, .15);
        color: var(--nude-6);
    }

    &-blue {
        background-color: var(--blue-6);
        border: 1px solid rgba($nude-8, .15);
        color: var(--nude-6);
        border-radius: var(--radius-m);
    }

}

</style>
