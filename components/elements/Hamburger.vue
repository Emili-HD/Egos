<template>
   <button class="navTrigger" id="navTrigger">
      <svg viewBox="0 0 64 48">
         <path d="M19,15 L45,15 C70,15 58,-2 49.0177126,7 L19,37"></path>
         <path d="M19,24 L45,24 C61.2371586,24 57,49 41,33 L32,24"></path>
         <path d="M45,33 L19,33 C-8,33 6,-2 22,14 L45,37"></path>
      </svg>
   </button>
</template>

<script setup>
import { onMounted } from 'vue';

const toggleMenu = () => {
   const burger = document.getElementById('navTrigger')
   const nav = document.querySelector('.menu-list');
   const links = document.querySelectorAll('.nav-link')

   burger.addEventListener('click', function (e) {
      this.classList.toggle('active');
      nav.classList.toggle('active');
   });

   links.forEach(link => {
      link.addEventListener('click', function (e) {
         burger.classList.remove('active')
         nav.classList.remove('active');
      });
   })
}

onMounted(() => {
   toggleMenu()
})
</script>

<style lang="scss" scoped>
.navTrigger {
   position: absolute;
   top: 50%;
   translate: 50% -50%;
   right: 50%;
   z-index: 1000;
   width: 36px;
   height: 36px;
   background: none;
   border: 0;
   outline: none;
   border: none;
   cursor: pointer;
   -webkit-appearence: none;
   -webkit-tap-highlight-color: transparent;
   display: none;

   @media (max-width: 1200px) {
      display: block;
   }
   
   &:focus {
      outline: none;
   }

   svg {
      width: 64px;
      height: 48px;
      top: -6px;
      left: -14px;
      stroke: var(--blue-1);
      stroke-width: 1px;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
      display: block;
      position: absolute;

      path {
         transition: stroke-dasharray var(--duration, .85s) var(--easing, ease) var(--delay, 0s), stroke-dashoffset var(--duration, .85s) var(--easing, ease) var(--delay, 0s);
         stroke-dasharray: var(--array-1, 26px) var(--array-2, 100px);
         stroke-dashoffset: var(--offset, 126px);
         transform: translateZ(0);

         &:nth-child(2) {
            --duration: .7s;
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
         stroke: var(--blue-1);

         path {
            --offset: 57px;

            &:nth-child(1),
            &:nth-child(3) {
               --delay: .15s;
               --easing: cubic-bezier(.2, .4, .2, 1.1);
            }

            &:nth-child(2) {
               --duration: .4s;
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
