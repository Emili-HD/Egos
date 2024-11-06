<template>
   <div class="hero__intro w-full md:w-2/3 flex flex-col lg:flex-row">
      <div class="header__landing-content text-nude-8 text-center p-5 md:px-24 w-full flex flex-col justify-end items-center h-full"
         :style="`background: linear-gradient(to bottom, rgba(28, 44, 68, 0) 10%, rgba(12, 20, 32, 0.75) 80%), url('${data.featured_image_data.url}'); background-size: cover; background-position: center;`">
         <h1 class="header__landing-content-title pb-40 [&>span]:span-gradient [&>span]:border-b-[1px] [&>span]:border-b-white/20 [&>span]:block" v-html="data.title.rendered"></h1>
         <div class="flex flex-col items-center gap-4 w-full">
            <ElementsButton  v-if="data.acf && data.acf.quiz_multiple && data.acf.quiz_multiple.multiple_forms " class="gold text-clamp-sm uppercase text-center w-fit" href="#presupuesto">
               Calcula tu presupuesto
            </ElementsButton>
            <div v-if="data.acf && data.acf.precio" class="precio flex flex-col items-center w-full">
               <p v-if="data.acf.opciones_precio === 'mes'" class="h3 [&>span]:span-gradient">desde <span>{{ data.acf.precio }}€/mes</span></p>
               <p v-else-if="data.acf.opciones_precio === 'dia'" class="h3 [&>span]:span-gradient">desde <span>{{ data.acf.precio }}€/día</span></p>
               <p v-else-if="data.acf.opciones_precio === 'desde'" class="h3 [&>span]:span-gradient">desde <span>{{ data.acf.precio }}€</span></p>
               <p v-else class="h3 [&>span]:span-gradient">desde <span>{{ data.acf.precio }}€/mes</span></p>
            </div>
            <ElementsCountDown class="x2 max-w-lg m-0" :data="data.acf" />
         </div>
      </div>
      <div id="formulario" class="hero__form [.blackfriday_&]:bg-blackfriday [html:not(.blackfriday)_&]:bg-blue-1 p-4 w-full h-full lg:w-1/3 flex flex-col justify-around">
               <FormsEsteticaForm :identificador="'formulario'" :portalId="String(data.acf.form[0].portalid)" :formId="data.acf.form[0].formid" :name="data.title.rendered" />
         </div>
   </div>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo
const cabecera = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})

</script>

<style lang="scss" scoped>
.hero__intro {
    width: 100%;
    @media (min-width: 1025px) {
        height: 900px;
    }
    @media (min-width: 1440px) {
        height: 1100px;
    }
    @media (max-width: 1024px) {
        height: 768px;
    }
    @media (max-width: 768px) {
        height: 1024px;
    }
    @media (max-width: 560px) {
        height: 1200px;
    }
}
</style>
