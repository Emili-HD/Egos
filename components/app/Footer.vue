<template>
   <div v-if="footerMenuPending || socialMenuPending || legalMenuPending">
      Cargando menús...
    </div>
    <div v-else-if="footerMenuError || socialMenuError || legalMenuError">
      Error al cargar los menús.
    </div>
   <footer v-else class="footer bg-blue-1 px-12 xl:px-24 pt-24 pb-6 flex flex-col justify-center items-center z-[999]">
      <div class="footer__inner grid grid-cols-3 auto-rows-auto xl:auto-rows-fr items-center gap-4 w-full gap-y-4 xl:gap-y-8 gap-x-4 xl:gap-x-8">
         <div class="footer-logo col-span-3 h-[20vh] flex flex-row justify-center ">
            <img loading="lazy" src="~/assets/images/1-navigation/logo-egos.svg" alt="" width="263" height="202" />
         </div>
         <div class="menu-footer col-span-3 xl:col-span-1 flex flex-col justify-center items-center xl:items-start text-center xl:text-left">
            <ul class="list-none !mb-0 flex flex-col gap-2">
               <li v-for="item in footerMenuData.items" :key="item.ID">
                  <nuxt-link :to="resolveUrl(item.slug)">
                     <span class="text-nude-8 uppercase">{{ item.title }}</span>
                  </nuxt-link>
               </li>
            </ul>
         </div>
         <div class="flex flex-col col-span-3 xl:col-span-1 justify-center items-center xl:border-x-1 border-y-0 xl:border-solid border-nude-1/25
                     before:content-[''] before:absolute before:w-[1px] before:h-full before:bg-nude-8/20 before:-left-12
                     after:content-[''] after:absolute after:w-[1px] after:h-full after:bg-nude-8/20 after:-right-12">
            <div id="block-16" class="footer__block">
               <h2 class="text-center text-nude-8">Hazlo por ti</h2>
               <p class="text-center text-nude-8"><a href="mailto:info@clinicaegos.com">info@clinicaegos.com</a></p>
            </div>
         </div>
         <div class="menu-social col-span-3 xl:col-span-1 flex flex-col justify-center items-center xl:items-end text-center xl:text-right">
            <ul class="list-none !mb-0 flex flex-col gap-2">
               <li v-for="item in socialMenuData.items" :key="item.ID">
                  <a :href="item.url" target="_blank">
                     <span class="text-nude-8 uppercase">{{ item.post_title }}</span>
                  </a>
               </li>
            </ul>
         </div>
         <div class="menu-legal col-span-3 py-4 self-start">
            <ul class="list-none !mb-0 flex flex-col xl:flex-row justify-center items-center gap-8 w-full">
               <li v-for="item in legalMenuData.items" :key="item.ID">
                  <nuxt-link :to="resolveUrl(item.slug)">
                     <span class="text-nude-8">{{ item.title }}</span>
                  </nuxt-link>
               </li>
            </ul>
            <!-- Inicio de fragmento de código de HubSpot -->
            <!-- <button type="button" id="hs_show_banner_button" class="bg-gold-2 fixed bottom-8 left-8 z-[1000] size-12 flex items-center justify-center rounded-full hover:bg-gold-1 transition-all"
            @click="showCookieBanner" title="Configuración de las cookies"> 
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#1c2c44" fill="none">
                  <path d="M12.0579 22C16.9725 22 21.0638 18.4937 21.9416 13.8586C22.1996 12.4967 21.5931 12.5686 20.3101 12.3438C19.3996 12.1844 18.5498 11.5667 18.2333 10.588C18.0178 9.9216 17.9376 9.89475 17.2352 9.86554C15.7861 9.80529 14.625 8.2689 15.2032 7.02602C15.419 6.56236 15.412 6.50892 15.0078 6.19448C14.3005 5.6443 13.9706 4.6166 14.0978 3.62604C14.2347 2.5591 14.3147 2.1747 13.1854 2.05455C7.45657 1.44501 2 6.0196 2 11.9948C2 17.5205 6.50308 22 12.0579 22Z" stroke="currentColor" stroke-width="1.5" />
                  <path d="M11.0078 12L10.9988 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M6.00781 10L5.99883 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M12.0078 18L11.9988 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 6L9 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M17 14L16 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M7 15L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
               </svg>
            </button> -->
         </div>
      </div>
   </footer>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app'
import { getMenu } from '@/composables/useFetch'

// Uso de useAsyncData para cargar los menús de manera asincrónica
const { data: footerMenuData, error: footerMenuError, pending: footerMenuPending } = await useAsyncData(() => getMenu('menu-footer'));
const { data: socialMenuData, error: socialMenuError, pending: socialMenuPending } = await useAsyncData(() => getMenu('social'));
const { data: legalMenuData, error: legalMenuError, pending: legalMenuPending } = await useAsyncData(() => getMenu('textos-legales'));

// Función auxiliar para resolver URLs
const resolveUrl = (slug) => {
   return slug.startsWith('/') ? slug : `/${slug}`;
}

// const showCookieBanner = () => {
//    var _hsp = window._hsp = window._hsp || [];
//    _hsp.push(['showBanner']);
// };
</script>
