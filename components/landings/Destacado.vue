<template>
   <div class="destacado" ref="destacado">
      <img class="icon-star" src="/images/icons/rounded-star.svg" alt="">
      <div class="destacado__header py-16 px-12">
         <h4 class="h3" v-html="data.destacado.texto_destacado"></h4>
      </div>
      <div class="destacado__image" :style="`background-image: url(${data.destacado.imagen_destacado.url})`"></div>
   </div>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const destacado = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style lang="scss" scoped>
.icon-star {
   position: absolute;
   left: 50%;
   top: 0;
   translate: -50% -50%;
   width: 3.75rem;
   aspect-ratio: 1;
   z-index: 10;
}

.destacado {
   background-color: var(--nude-1);
   width: 66.6666vw;
   left: 50%;
   translate: -50% 50%;
   border-radius: var(--radius-m);
   display: flex;
   flex-direction: row;
   align-items: stretch;
   z-index: 10;
   // overflow: hidden;

   @media (max-width: 767px) {
      width: 85vw;
      text-align: center;
   }
   
   &__header {
      width: 50%;
      
      @media (max-width: 767px) {
         width: 100%;
      }
   }

   &__image {
      border-radius: var(--radius-m);
      width: 50%;

      @media (max-width: 767px) {
         display: none;
      }
   }

   h4 {
      margin: 0;

      @media (max-width: 767px) {
         font-size: calc(var(--font-size) * 1.6);
      }
   }
}
</style>
