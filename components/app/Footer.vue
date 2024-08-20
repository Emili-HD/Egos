<template>
    <div v-if="footerMenuError || socialMenuError || legalMenuError">
      Error al cargar los menús.
    </div>
   <footer v-else class="footer" >
      <div class="footer__inner">
         <div class="footer-logo">
            <img loading="lazy" src="~/assets/images/1-navigation/logo-egos.svg" alt="" width="263" height="202" />
         </div>
         <UiMenu :data="footerMenuData.items" class="menu-footer"/>
         <div class="message-footer xl:border-x-1 border-y-0 xl:border-solid border-nude-1/25">
            <div id="block-16" class="footer__block">
               <p class="text-clamp-5xl text-center text-nude-8 font-lora mb-0">Hazlo por ti</p>
               <p class="text-center text-nude-8"><a href="mailto:info@clinicaegos.com">info@clinicaegos.com</a></p>
            </div>
         </div>
         <UiMenu :data="socialMenuData.items" class="menu-social" :isExternal="true"/>
         <UiMenu :data="legalMenuData.items" class="menu-legal"/>
      </div>
   </footer>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app'
import { getMenu } from '@/composables/useApi'

// Uso de useAsyncData para cargar los menús de manera asincrónica
const { data: footerMenuData, error: footerMenuError } = await useAsyncData(
  'menu-footer',
  async () => {
    try {
      const response = await getMenu('menu-footer');
      return response || {}; // Asegurarse de que siempre se retorne un objeto
    } catch (error) {
      console.error('Error fetching footer menu:', error);
      return {}; // En caso de error, retornar un objeto vacío
    }
  }
);
const { data: socialMenuData, error: socialMenuError } = await useAsyncData(
  'social-menu',
  async () => {
    try {
      const response = await getMenu('social');
      return response || {}; // Asegurarse de que siempre se retorne un objeto
    } catch (error) {
      console.error('Error fetching social menu:', error);
      return {}; // En caso de error, retornar un objeto vacío
    }
  }
);
const { data: legalMenuData, error: legalMenuError } = await useAsyncData(
  'textos-legales',
  async () => {
    try {
      const response = await getMenu('textos-legales');
      return response || {}; // Asegurarse de que siempre se retorne un objeto
    } catch (error) {
      console.error('Error fetching legal menu:', error);
      return {}; // En caso de error, retornar un objeto vacío
    }
  }
);

</script>

<style lang="scss" scoped>
.footer {
   @apply bg-blue-1 px-12 xl:px-24 pt-24 pb-6 flex flex-col justify-center items-center z-[999];

   &__inner {
      @apply grid grid-cols-3 auto-rows-auto xl:auto-rows-fr items-center gap-4 w-full gap-y-4 xl:gap-y-8 gap-x-4 xl:gap-x-8;
   }

   &-logo {
      @apply col-span-3 h-[20vh] flex flex-row justify-center;
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
