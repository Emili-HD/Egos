<template>
    <div v-if="footerMenuError || socialMenuError || legalMenuError">
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
         <div class="message-footer flex flex-col col-span-3 xl:col-span-1 justify-center items-center xl:border-x-1 border-y-0 xl:border-solid border-nude-1/25
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
         </div>
      </div>
   </footer>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app'
import { getMenu } from '@/composables/useFetch'

// Uso de useAsyncData para cargar los menús de manera asincrónica
const { data: footerMenuData, error: footerMenuError } = await useAsyncData(() => getMenu('menu-footer'));
const { data: socialMenuData, error: socialMenuError } = await useAsyncData(() => getMenu('social'));
const { data: legalMenuData, error: legalMenuError } = await useAsyncData(() => getMenu('textos-legales'));

// Función auxiliar para resolver URLs
const resolveUrl = (slug) => {
   return slug.startsWith('/') ? slug : `/${slug}`;
}
</script>

<style>
@media (min-width: 820px) and (max-width: 1180px) {
   .is-tablet {
      .footer {
         @apply pb-24;
      }
      .menu-footer {
         @apply text-left col-span-1 items-start;
      }
      .message-footer {
         @apply col-span-1;
      }
      .menu-social {
         @apply text-right col-span-1 items-end;
      }
      .menu-legal ul {
         @apply flex-row
      }
   }
}
</style>
