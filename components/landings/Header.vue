<template>
   <div class="hero__intro" :style="`background-image: url(${data.featured_image_data.src})`">
      <header class="header__landing px-12 py-6" ref="cabecera">
         <nuxt-link to="/">
            <img class="header__landing-logo" src="../../assets/images/icons/logo-landings.svg" alt="">
         </nuxt-link>
      </header>
      <div class="header__landing-content px-24 py-16">
         <h1 class="header__landing-content-title" v-html="data.acf.titulo_landing"></h1>
         <div class="precio">
            <p class="h3">desde <span>{{ data.acf.precio }}€/mes</span></p>
            <ElementsButton class="gold pedircita mt-4" href="#hubspotLanding">Más Información</ElementsButton>
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

<style lang="scss">
.hero__intro {
   background-size: cover;
   background-position: center;
   width: 50%;

   @media (max-width: 767px) {
      width: 100%;
      height: 85lvh;
   }

   &::before {
      content: "";
      width: 100%;
      height: 100%;
      opacity: 1;
      background: linear-gradient(180deg, var(--blue-1) 10%, rgba(var(--blue-1-rgb), 0.25) 60%, var(--blue-1) 100%);
      background-blend-mode: multiply;
      mix-blend-mode: multiply;
      position: absolute;
   }
}

.header__landing {
   background-color: var(--blue-1);
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   width: 100%;
   z-index: 10;
   
   @media (max-width: 767px) {
      justify-content: center;
   }
   
   &-logo {
      max-width: 4.1rem;
      height: auto;
      
      @media (max-width: 767px) {
         max-width: 5rem;
      }
   }
   
   &-content {
      align-items: center;
      color: var(--nude-8);
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;
      position: absolute;
      text-align: center;
      top: 0;

      @media (max-width: 767px) {
         height: 90%;
      }

      &-title {
         span {
            border-bottom: 1px solid rgba(var(--nude-8-rgb), 0.5);
            display: block;
         }
         
         @media (max-width: 767px) {
            font-size: calc(var(--font-size) * 2.4);
         }
      }

      span {
         font-weight: 600;
         background: linear-gradient(97deg, #908057 16.69%, #CCB780 24.99%, #9A895E 33.3%);
         background-clip: text;
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
      }
      
      .precio{
         .button {
            display: none;

            @media (max-width: 820px) {
               display: inline;
            }
         }
      } 
   }
}
</style>
