<template>
   <section class="detalles pb-12">
      <div class="detalles__header p-12 mb-12">
         <h2 class="h4">{{ data.detalles.avalados }}</h2>
         <img loading="lazy" :src="data.detalles.logo_avalados.url" alt="" />
      </div>
      <div class="consejos py-40 px-20 mb-12" ref="detalles">
         <figure class="icon" v-for="icons in data.detalles.consejo" :key="icons.id">
            <img loading="lazy" :src="icons.icono.url" alt="" />
            <figcaption v-html="icons.texto_icono"></figcaption>
         </figure>
      </div>
      <div class="bg__detalles py-5 px-3">
         <figure class="bg__detalles-img">
            <img loading="lazy" :src="data.detalles.imagen_avalados.url" alt="" />
         </figure>
      </div>
   </section>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const detalles = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style lang="scss" scoped>
.detalles {
   min-height: 100lvh;
   background-color: var(--nude-7);
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   align-content: flex-start;
   align-items: center;
   justify-content: space-between;
   
   &__header {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1.4vw;
      color: var(--nude-8);
      background-color: var(--blue-3);
      width: 100%;
   
      h2 {
         margin-bottom: 0;
      }
   
      @media (max-width: 767px) {
         gap: 4.5vw;
   
         h2 {
            font-size: calc(var(--font-size) * 1.5);
         }
   
         img {
            max-width: 50%;
         }
      }
   }
   
   .bg__detalles {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
   
      &-img {
         width: 80%;
         overflow: hidden;
         height: 40vw;
         border-radius: var(--radius-xl);
   
         img {
            position: absolute;
            object-fit: cover;
            object-position: center;
            height: 100%;
            width: 100%;
         }
      }
   
      @media (max-width: 767px) {
         display: none;
      }
   }
   
   .consejos {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      gap: 2rem;
      width: 50%;
   
      @media (max-width: 767px) {
         flex-direction: column;
         align-items: center;
         width: 100%;
      }
   
      figure.icon {
         text-align: center;
         width: min(14rem, 35.3333vw);
   
         img {
            width: min(12rem, 33.3333vw);
            background-color: var(--nude-5);
            padding: 1.75rem;
            border-radius: var(--radius-m);
         }
   
         @media (max-width: 767px) {
            width: min(14rem, 60vw);
         }
      }
   }
}


</style>
