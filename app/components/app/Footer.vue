<template>
    <div v-if="footerMenuError || socialMenuError || legalMenuError || trabajaMenuError">
      Error al cargar los menús.
    </div>
   <footer v-else class="footer" >
      <div class="footer__inner">
         <div class="footer-logo">
            <img loading="lazy" src="~/assets/images/1-navigation/logo-egos.svg" alt="" width="263" height="202" />
            <div class="text-black absolute w-fit -bottom-6 left-0 right-0 m-auto px-4 font-semibold text-lg text-center bg-gold-2 uppercase rounded-md">Black Days</div>
         </div>
         <UiMenu :data="trabajaMenuData.items" class="menu-trabaja"/>
         <div class="message-footer xl:border-x-1 border-y-0 xl:border-solid border-nude-1/25">
            <div id="block-16" class="footer__block">
               <p class="text-clamp-5xl text-center text-nude-8 font-lora mb-0">Hazlo por ti</p>
               <address class="text-center text-nude-8 flex justify-center gap-8"><a href="tel:+34616987740" class="not-italic">+34 616 98 77 40</a> <a href="mailto:info@clinicaegos.com" class="not-italic">info@clinicaegos.com</a></address>
            </div>
         </div>
         <UiMenu :data="footerMenuData.items" class="menu-footer"/>
         <div class="grid grid-rows-[repeat(2,_min-content)] col-span-full max-lg:divide-y divide-white/25">
            <UiMenu :data="socialMenuData.items" class="menu-social [&>ul]:!flex-row" :isExternal="true"/>
            <UiMenu :data="clinicasMenuData.items" class="menu-clinicas uppercase"/>
            <UiMenu :data="legalMenuData.items" class="menu-legal [&_ul_li]:text-xs [&_ul_li]:tracking-wide opacity-60"/>
         </div>
      </div>
   </footer>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app'
import { getMenu } from '@/composables/useApi'

// Uso de useAsyncData para cargar los menús de manera asincrónica
// Función reutilizable para cargar menús con manejo de errores
const fetchMenuData = async (key, menuName) => {
  return await useAsyncData(key, async () => {
    try {
      const response = await getMenu(menuName);
      return response || {}; // Retornar un objeto vacío si la respuesta es nula
    } catch (error) {
      console.error(`Error fetching ${menuName} menu:`, error);
      return {}; // En caso de error, retornar un objeto vacío
    }
  });
};

// Utilización de la función reutilizable para diferentes menús
const { data: footerMenuData, error: footerMenuError } = await fetchMenuData('menu-footer', 'menu-footer');
const { data: socialMenuData, error: socialMenuError } = await fetchMenuData('social-menu', 'social');
const { data: legalMenuData, error: legalMenuError } = await fetchMenuData('textos-legales', 'textos-legales');
const { data: trabajaMenuData, error: trabajaMenuError } = await fetchMenuData('trabaja-menu', 'trabaja');
const { data: clinicasMenuData, error: clinicasMenuError } = await fetchMenuData('clinicas-menu', 'clinicas');


</script>

<style lang="scss" scoped>
.footer {
   @apply bg-blue-1 px-12 xl:px-24 pt-24 pb-6 flex flex-col justify-center items-center z-[999];

   .blackfriday:not(.estetica) & {
      @apply bg-dark-1;
   }

   &__inner {
      @apply grid grid-cols-3 auto-rows-auto xl:auto-rows-fr items-center gap-4 w-full gap-y-4 xl:gap-y-8 gap-x-4 xl:gap-x-8;
   }

   &-logo {
      @apply col-span-3 h-[20vh] flex flex-row justify-center mb-12;
   }
}

.message-footer {
   @apply flex flex-col col-span-3 xl:col-span-1 justify-center items-center;

   &::before {
      @apply content-[''] absolute w-[1px] h-full bg-nude-8/20 -left-12;
   }

   &::after {
      @apply content-[''] absolute w-[1px] h-full bg-nude-8/20 -right-12;
   }                          
}

@media (min-width: 820px) and (max-width: 1180px) {
   .is-tablet {
      .footer {
         @apply pb-24;
      }
      
      .message-footer {
         @apply col-span-1;
      }
   }
}
</style>
