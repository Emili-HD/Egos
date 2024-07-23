<template>
    <section class="gracias flex flex-col justify-center items-center size-full min-h-screen">
        <header class="text-center h-screen/60 flex flex-col justify-end pb-16">
            <h1 class="mb-4 leading-none">Gracias por contactarnos</h1>
            <h2 class="mb-8 leading-none text-clamp-2xl text-balance">Pronto una asesora se pondrá en contacto contigo</h2>
            <p class="mb-4 leading-none">Estás en buenas manos</p>
        </header>
        <div class="menu-legal col-span-3 py-4 pb-20 self-center">
            <ul class="list-none !mb-0 flex flex-wrap flex-row justify-center items-center gap-4 lg:gap-8 w-screen px-8 lg:px-12">
               <li v-for="item in principalMenuData.items" :key="item.ID" class="aspect-[2/3] w-[47%] lg:w-[calc(100%/7-2rem)]" b>
                  <nuxt-link :to="resolveUrl(item.slug)" class="size-full flex justify-center items-end overflow-hidden rounded-xl  bg-blue-1/30">
                        <img :src="item.acf.icon" class="absolute object-cover object-center size-full aspect-[2/3] mix-blend-hard-light" />
                        <span class="text-nude-8 font-normal">{{ item.title }}</span>
                  </nuxt-link>
               </li>
            </ul>
         </div>
         <img :src="imageData.source_url" alt="" v-if="imageData && imageData.source_url">
    </section>
</template>

<script setup>
import { getMenu } from '@/composables/useFetch'; 

const { data: principalMenuData, error: principalMenuError } = await useAsyncData(() => getMenu('menu-principal'));
const { data: imageData, error: imageError } = await useFetch('https://test.clinicaegos.com/wp-json/wp/v2/media/17406');

// Función auxiliar para resolver URLs
const resolveUrl = (slug) => {
   return slug.startsWith('/') ? slug : `/${slug}`;
}

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ],
})
</script>
