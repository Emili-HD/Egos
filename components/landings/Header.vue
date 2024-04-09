<template>
   <div class="hero__intro blue-gradient-full bg-cover bg-center w-full md:w-1/2 min-h-screen/85 md:h-screen" :style="`background-image: url(${data.featured_image_data.src})`">
      <header class="header__landing px-12 py-6 bg-blue-1 flex justify-center md:justify-start w-full z-10" ref="cabecera">
         <nuxt-link to="/">
            <img class="header__landing-logo max-w-20 md:max-w-16" src="/assets/images/icons/logo-landings.svg" alt=""  width="133" height="100" />
         </nuxt-link>
      </header>
      <div class="header__landing-content text-nude-8 text-center p-5 md:px-24 w-full flex flex-col justify-around items-center h-screen/70 md:h-full">
         <h1 class="header__landing-content-title [&>span]:span-gradient [&>span]:border-b-[1px] [&>span]:border-b-white/20 [&>span]:block" v-html="data.acf.titulo_landing"></h1>
         <div class="precio flex flex-col items-center">
            <p class="h3 [&>span]:span-gradient">desde <span>{{ data.acf.precio }}€/mes</span></p>
            <ElementsButton class="gold md:hidden text-center flex flex-col justify-center items-center border-none rounded-xl py-3 px-6 uppercase h-full z-2 w-fit h-fit" href="#hubspotLanding" @click.passive="handleClick">Más Información</ElementsButton>
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

function handleClick() {
  const { $lenis: lenis } = useNuxtApp();
//   console.log('lenis on click', lenis);
  lenis.scrollTo('#hubspotLanding', {offset: -20});
}
</script>

<style lang="scss">
// empty style
</style>
