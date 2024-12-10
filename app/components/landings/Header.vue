<template>
   <div class="hero__intro bg-cover bg-center w-full md:w-1/2 h-vh/90 md:h-vh overflow-hidden">
      <div class="blue-gradient-full size-full absolute z-0">
         <UiImage :data="data" class="h-vh/90 xl:h-vh object-cover object-center absolute" :preload="true" />
      </div>
      <header class="header__landing relative px-12 py-6 [.blackfriday_&]:bg-black [html:not(.blackfriday)_&]:bg-blue-1 flex justify-center md:justify-start w-full z-[999]" ref="cabecera">
         <nuxt-link to="/">
            <img class="header__landing-logo max-w-20 md:max-w-16" src="/assets/images/icons/logo-landings.svg" alt=""  width="133" height="100" />
            <div class="text-black absolute w-[calc(100%+2rem)] -bottom-6 -left-4 font-semibold text-xs text-center bg-gold-1 uppercase rounded-md">Black Days</div>
         </nuxt-link>
      </header>
      <div class="header__landing-content text-nude-8 text-center p-5 md:p-24 pb-24 size-full flex flex-col justify-end items-center">
         <h1 class="header__landing-content-title text-clamp-4xl [&>span]:span-gradient [&>span]:border-b-[1px] [&>span]:border-b-white/20 [&>span]:block" v-html="data.acf.titulo_landing"></h1>
         <div class="flex flex-col items-center gap-4 w-full">
            <!-- <ElementsPlazas v-if="data.acf.plazas?.numero_plazas" :data="data.acf.plazas" /> -->
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
.blue-gradient-full::before {
   z-index: 1;
}

.header__landing {
   @apply absolute top-0;
}
</style>
