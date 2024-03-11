<template>
   <section class="promociones pt-48 pb-20 px-24 mb-0" ref="promociones">
      <div class="promociones__header pt-5 pt-xs-12">
         <h2>{{ data.promocion.titulo }}</h2>
         <ElementsDivider />
      </div>
      <div class="promociones__list">
         <div class="promociones__list-item p-8" v-for="item in data.promocion.elementos_lista">
            <svg width="24" height="24" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M11.0213 38C7.32242 32.0977 3.66121 26.2526 0 20.4093C0.0196399 20.3929 0.0392799 20.3749 0.0572831 20.3585C3.69558 24.2104 7.33388 28.0623 11.0033 31.947C20 21.2756 28.9673 10.6386 37.9345 0C37.9558 0.0163772 37.9787 0.0343921 38 0.0507693C29.0196 12.6825 20.0409 25.3126 11.0213 38Z"
                  fill="#C0B5A3" />
            </svg>

            <p v-html="item.elem"></p>
         </div>
      </div>
      <div class="promociones__featured pt-12">
         <p class="h5">{{ data.promocion.destacado }}</p>
      </div>
   </section>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const destpromocionesacado = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})
</script>

<style lang="scss" scoped>
:deep(.divider) {
   .sLogo {
      fill: var(--nude-8);
   }

   &::after {
      background-color: var(--nude-8);
   }

}

.promociones {
   min-height: var(--full-height);
   background-color: var(--blue-1);
   color: var(--nude-8);
   display: flex;
   flex-direction: column;
   align-items: center;

   &__header {
      width: 80%;
      text-align: center;

      @media (max-width: 767px) {
         width: 100%;

         h2 {
            font-size: calc(var(--font-size) * 2.3);
         }
      }
   }

   &__list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;

      @media (max-width: 767px) {
         grid-template-columns: 1fr;
         grid-auto-rows: 10lvh;
      }

      &-item {
         background-color: var(--blue-2);
         border-radius: var(--radius-s);
         display: flex;
         flex-direction: row;
         justify-content: flex-start;
         align-items: center;
         gap: 1.5rem;

         svg {
            min-width: 24px;
            min-height: 24px;
         }

         p {
            margin-bottom: 0;
         }
      }

   }
   
   &__featured {
      text-align: center;
      p {
         font-size: calc(var(--font-size) * 1.4);
      }
   }
}
</style>
