<template>
   <section class="promociones [.blackfriday_&]:bg-black [html:not(.blackfriday)_&]bg-blue-1 nude-8 flex flex-col items-center min-h-full pt-32 xl:pt-48 pb-12 xl:pb-20 px-8 xl:px-24 mb-0 " ref="promociones">
      <div class="promociones__header pt-20 w-full xl:w-4/5 text-center">
         <h2 class="!text-4xl xl:!text-5xl text-nude-8">{{ data.promocion.titulo }}</h2>
         <ElementsDivider />
      </div>
      <div class="promociones__list grid grid-cols-1 xl:grid-cols-3 gap-4 auto-rows-[minmax(0,_10lvh)] xl:auto-rows-[minmax(0,_1fr)]">
         <div class="promociones__list-item [.blackfriday_&]:bg-gray-900 [html:not(.blackfriday)_&]bg-blue-2 rounded-2xl p-8 flex flex-row justify-start items-center gap-6" v-for="item in data.promocion.elementos_lista">
            <svg class="min-w-6 min-h-6" width="24" height="24" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M11.0213 38C7.32242 32.0977 3.66121 26.2526 0 20.4093C0.0196399 20.3929 0.0392799 20.3749 0.0572831 20.3585C3.69558 24.2104 7.33388 28.0623 11.0033 31.947C20 21.2756 28.9673 10.6386 37.9345 0C37.9558 0.0163772 37.9787 0.0343921 38 0.0507693C29.0196 12.6825 20.0409 25.3126 11.0213 38Z"
                  fill="#C0B5A3" />
            </svg>

            <p class="mb-0 text-nude-8" v-html="item.elem"></p>
         </div>
      </div>
      <div class="promociones__featured pt-12 text-center">
         <p class="h5 !text-3xl text-balance text-nude-8">{{ data.promocion.destacado }}</p>
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
      @apply fill-nude-8 after:bg-nude-8;
   }
}
</style>
