<template>
  <div v-if="tiktokError">Error al cargar los videos de TikTok.</div>
    <section v-else class="social py-40 grid grid-cols-[repeat(16,_minmax(0,_1fr))]">
      <SocialPopUp v-if="showPopup" :data="{ video_id: selectedVideoId }" @close="closePopup" />
      <h2 class="social__title col-[2_/_span_14] text-center">#BellezaSinFiltros: la realidad detrás de la estética</h2>
      <ClientOnly >
         <Swiper
            :slidesPerView="3"
            :spaceBetween="30"
            :navigation="true"
            :modules="[SwiperNavigation]"
            class="tiktokSlide w-full max-h-[37.5rem] col-[3_/_span_12]"
            :breakpoints="{
               '@0.00': {
               slidesPerView: 1,
               spaceBetween: 10,
               },
               '@0.75': {
               slidesPerView: 2,
               spaceBetween: 20,
               },
               '@1.00': {
               slidesPerView: 3,
               spaceBetween: 40,
               },
            }"
         >
            <SwiperSlide class="text-center bg-white rounded-xl overflow-hidden flex flex-col justify-center items-center cursor-pointer" v-for="tt in tiktokData.posts" :key="tt.index" @click="openPopup(tt.video_id)">
               <div class="tiktok-feed-item" :title="tt.description">
                  <div class="tiktok-post-hover flex flex-col justify-center items-center absolute w-full h-[37.5rem] bg-blue-1/50 top-0 left-0 opacity-0 z-10 hover:opacity-100 transition-[opacity]">
                     <img class="w-6 h-6 text-white" src="~/assets/images/icons/play-tiktok.svg" alt="Reproducir video" width="24" height="24" />
                  </div>
                  <div class="tiktok-play-count-container"></div>
                  <div :id="`tiktok-${tt.video_id}`">
                     <img
                        class="object-cover object-center max-h-[37.5rem] h-full w-full"
                        :src="tt.thumbnail_url"
                        :alt="tt.description"
                        :placeholder="[300, 211, 60, 5]"
                        sizes="100vw sm:50vw md:422px"
                        loading="lazy"
                        format="avif"
                        width="600"
                        height="422"
                     ></img>
                  </div>
               </div>
            </SwiperSlide>
         </Swiper>
      </ClientOnly>
    </section>
</template>

<script setup>
import { useAsyncData } from 'nuxt/app';
import { getTikTok } from '@/composables/useApi'; // Asegúrate de que esta ruta sea correcta
// import BoosterImage from '#booster/components/BoosterImage';
// import PlayIcon from '~/assets/images/icons/play-tiktok.svg';

// const { $lenis: lenis } = useNuxtApp();
const selectedVideoId = ref('');
const showPopup = ref(false);

// Uso de useAsyncData para cargar datos de TikTok
const { data: tiktokData, error: tiktokError } = await useAsyncData(getTikTok);

// Función para manejar clic en un slide
const openPopup = (videoId) => {
  selectedVideoId.value = videoId;
  showPopup.value = true;
//   lenis.scrollTo('.social', { offset: 0, duration: 0.2 });
//   setTimeout(() => {
//     lenis.stop();
//   }, 200);
};

// Ejemplo de cómo podrías cerrar el popup, necesitarás implementar esta lógica
const closePopup = () => {
  showPopup.value = false;
//   lenis.start();
};
</script>


