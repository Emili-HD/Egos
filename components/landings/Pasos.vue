<template>
   <section class="pasos px-24 py-20" ref="pasos">
      <h2 class="pasos__title">{{ data.pasos.titulo }}</h2>
      <ElementsDivider />
      <div class="pasos__list py-8 mb-8">
         <div class="pasos__list-items p-12" v-for="items in data.pasos.listado_pasos">
            <div class="pasos__list-items-image">
               <NuxtImg loading="lazy" :src="items.icono.url" :alt="items.icono.alt" />
            </div>
            <div class="pasos__list-items-content">
               <p v-html="items.texto_icono"></p>
            </div>
         </div>
      </div>
      <div class="pasos__destacado p-12">
         <h3 class="h5 mb-0" v-html="data.pasos.mensaje_destacado"></h3>
      </div>
   </section>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const pasos = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style lang="scss" scoped>
.pasos {
   background-color: var(--nude-8);
   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   align-items: center;

   &__title {
      text-align: center;
      margin-bottom: 0;

      @media (max-width: 767px) {
         font-size: calc(var(--font-size) * 2.4);
      }
   }

   &__list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;

      @media (max-width: 767px) {
         grid-template-columns: 1fr;
      }

      &-items {
         background-color: var(--nude-4);
         border-radius: var(--radius-s);
         display: flex;
         flex-direction: column;
         justify-content: flex-start;
         align-items: center;
         gap: 1.5rem;

         @media (max-width: 767px) {
            flex-direction: row;
         }
         
         &-image {
            width: 4.6875rem;
            
            img {
               min-width: 4.6875rem;
            }
         }
         
         &-content {
            p {
               margin-bottom: 0;
               text-align: center;
               
               @media (max-width: 767px) {
                  text-align: left;
               }
            }
         }
      }
   }

   &__destacado {
      background-color: var(--blue-1);
      border-radius: var(--radius-s);
      color: var(--nude-8);
      text-align: center;
      width: 50%;
      
      h3 {margin-bottom: 0;}

      @media (max-width: 767px) {
         width: 100%;

         h3 {font-size: calc(var(--font-size) * 1.1);}
      }
   }
}
</style>
