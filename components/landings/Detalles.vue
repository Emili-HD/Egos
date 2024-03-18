<template>
   <section class="detalles pb-12">
      <div class="detalles__header p-12 mb-12">
         <h2 class="h4">{{ data.detalles.avalados }}</h2>
         <NuxtImg loading="lazy" :src="data.detalles.logo_avalados.url" alt="" />
      </div>
      <div class="consejos p-12 xl:py-40 xl:px-20 flex flex-col xl:flex-row justify-center items-center xl:items-start w-full xl:w-1/2 gap-8" ref="detalles">
         <figure class="icon text-center w-[min(14rem,35.3333vw)]" v-for="icons in data.detalles.consejo" :key="icons.id">
            <NuxtImg loading="lazy" class="bg-nude-5 p-7 mb-4 rounded-2xl w-full" :src="icons.icono.url" alt="" />
            <figcaption v-html="icons.texto_icono"></figcaption>
         </figure>
      </div>
      <div class="bg__detalles py-5 px-3">
         <figure class="bg__detalles-img">
            <NuxtImg loading="lazy" :src="data.detalles.imagen_avalados.url" alt="" />
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

}


</style>
