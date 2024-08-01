<template>
   <section class="pasos bg-nude-6 px-8 xl:px-24 py-20 flex flex-col justify-start items-center" ref="pasos">
      <h2 class="pasos__title text-center mb-0 text-4xl">{{ data.pasos.titulo }}</h2>
      <ElementsDivider />
      <div class="pasos__list py-8 mb-8 grid grid-cols-1 xl:grid-cols-4 auto-rows-fr gap-4">
         <div class="pasos__list-items p-8 xl:p-12 bg-nude-4 rounded-xl flex flex-row xl:flex-col justify-start items-center gap-6" v-for="(items, index) in data.pasos.listado_pasos" :key="index">
            <div class="absolute text-[240px] -left-4 -top-10 opacity-15 font-bold leading-none">{{ index + 1 }}</div>
            <div class="pasos__list-items-image w-20">
               <img loading="lazy" class="min-w-20" :src="items.icono.url" :alt="items.icono.alt" />
            </div>
            <div class="pasos__list-items-content">
               <p class="!mb-0 text-left xl:text-center" v-html="items.texto_icono"></p>
            </div>
         </div>
      </div>
      <div class="pasos__destacado p-8 xl:p-12 text-nude-8 bg-blue-1 rounded-xl nude-8 text-center w-full xl:w-1/2">
         <h3 class="h5 !text-2xl xl:!text-3xl leading-6 !mb-0" v-html="data.pasos.mensaje_destacado"></h3>
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
   position: relative;
}
</style>
