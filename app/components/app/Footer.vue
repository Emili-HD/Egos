<template>
    <div v-if="footerMenuError || socialMenuError || legalMenuError || trabajaMenuError">
      Error al cargar los menús.
    </div>
   <footer v-else class="footer" >
      <div class="footer__inner">
         <div class="footer-logo mr-auto max-lg:w-full">
            <div class="mb-8">
               <img loading="lazy" src="~/assets/images/1-navigation/logo-egos.svg" alt="" width="263" height="202" class="max-lg:w-48">
               <!-- <div class="text-black absolute w-fit -bottom-6 left-0 px-4 font-semibold lg:text-lg bg-gold-2 uppercase rounded-md">Black Days</div> -->
            </div>
            <div class="message-footer xl:border-x-1 border-y-0 xl:border-solid border-nude-1/25">
               <div id="block-16" class="footer__block">
                  <p class="text-clamp-5xl text-nude-8 font-lora mb-0">Hazlo por ti</p>
                  <address class="text-nude-8 flex justify-center gap-8"><a href="tel:+34616987740" class="not-italic">+34 616 98 77 40</a> <a href="mailto:info@clinicaegos.com" class="not-italic">info@clinicaegos.com</a></address>
               </div>
            </div>
         </div>
         <UiMenu :data="trabajaMenuData.items" titulo="Conoce Egos" class="menu-trabaja"/>
         <UiMenu :data="footerMenuData.items" titulo="Experiencias y Prensa" class="menu-footer"/>
         <UiMenu :data="clinicasMenuData.items" titulo="Nuestras clínicas" class="menu-clinicas uppercase"/>
         <div class="max-lg:divide-y divide-white/25 w-full">
            <ElementsPremios />
            <UiMenu :data="socialMenuData.items" class="menu-social [&>ul]:!flex-row" :isExternal="true"/>
            <UiMenu :data="legalMenuData.items" class="menu-legal [&_ul_li]:text-clamp-2xs [&_ul_li]:tracking-wide opacity-60"/>
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
   @apply bg-blue-1 px-8 xl:px-24 pt-24 pb-6 flex flex-col justify-center items-center z-[999];

   .blackfriday:not(.estetica) & {
      @apply bg-dark-1;
   }

   &__inner {
      @apply flex flex-wrap auto-rows-auto xl:auto-rows-fr gap-x-vh/15 gap-y-vh/10 lg:gap-y-vh/15 w-full;
   }

   &-logo {
      @apply col-span-1 flex flex-col justify-center max-lg:items-center lg:mb-12;
   }
}

.message-footer {
   @apply flex flex-col justify-start items-start max-lg:text-center;                        
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
