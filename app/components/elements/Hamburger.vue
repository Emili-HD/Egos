<template>
  <button type="button" class="navTrigger" id="navTrigger" aria-label="Abrir menú">
    <svg class="size-16 stroke-blue-1 stroke-[1px] fill-none block absolute" viewBox="0 0 64 48">
      <path d="M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37"></path>
      <path d="M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24"></path>
      <path d="M45,33 L19,33 C-8,33 6,-2 22,14 L45,37"></path>
    </svg>
  </button>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// Estado reactivo para controlar la activación del menú
const isActive = ref(false)

const toggleMenu = () => {
  const burger = document.getElementById('navTrigger')
  const nav = document.querySelector('.menu-list')

  // Toggle para burger
  burger.addEventListener('click', () => {
    isActive.value = !isActive.value
    burger.classList.toggle('active', isActive.value)
    nav.classList.toggle('active', isActive.value)
  })
}

onMounted(() => {
  toggleMenu()
})
</script>

<style lang="scss" scoped>
.is-desktop:not(.is-ipad-pro, .is-tablet) .navTrigger {
  @apply hidden;
}

.navTrigger {
  @apply size-16 rounded-xl flex justify-center place-items-center bg-nude-8 xl:hidden;
}

.is-ipad-pro .navTrigger,
.is-tablet .navTrigger,
.is-mobile .navTrigger {
  @apply bg-white absolute z-[1000] right-0 size-16  flex justify-center items-center focus:outline-none border-none outline-none cursor-pointer appearance-none rounded-xl xl:flex;

  svg {
    path {
      transition: stroke-dasharray var(--duration, 0.85s) var(--easing, ease) var(--delay, 0s),
        stroke-dashoffset var(--duration, 0.85s) var(--easing, ease) var(--delay, 0s);
      stroke-dasharray: var(--array-1, 26px) var(--array-2, 100px);
      stroke-dashoffset: var(--offset, 126px);
      transform: translateZ(0);

      &:nth-child(2) {
        --duration: 0.7s;
        --easing: ease-in;
        --offset: 100px;
        --array-2: 74px;
      }

      &:nth-child(3) {
        --offset: 133px;
        --array-2: 107px;
      }
    }
  }

  &.active {
    svg {
      path {
        --offset: 57px;

        &:nth-child(1),
        &:nth-child(3) {
          --delay: 0.15s;
          --easing: cubic-bezier(0.2, 0.4, 0.2, 1.1);
        }

        &:nth-child(2) {
          --duration: 0.4s;
          --offset: 2px;
          --array-1: 1px;
        }

        &:nth-child(3) {
          --offset: 58px;
        }
      }
    }
  }

}
</style>
