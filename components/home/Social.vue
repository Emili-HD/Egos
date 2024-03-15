<template>
    <section class="social py-40 grid grid-cols-[repeat(16,_minmax(0,_1fr))]" v-if="showPopup" :data="{ video_id: selectedVideoId }" @close="closePopup">
      <SocialPopUp />
      <h2 class="social__title col-[2_/_span_14] text-center">#BellezaSinFiltros: la realidad detrás de la estética</h2>
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
         <SwiperSlide class="text-center bg-white rounded-xl overflow-hidden flex flex-col justify-center items-center" v-for="tt in tiktokData.posts" :key="tt.index" @click="openPopup(tt.video_id)">
            <div class="tiktok-feed-item" :title="tt.description">
               <div class="tiktok-post-hover flex flex-col justify-center items-center absolute w-full h-[37.5rem] bg-[#1c2c44]/50 top-0 left-0 opacity-0 z-10 hover:opacity-100 transition-[opacity]">
                  <svg class="play-icon w-6 h-6 fill-[var(--nude-8)]" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M852.727563 392.447107C956.997809 458.473635 956.941389 565.559517 852.727563 631.55032L281.888889 993.019655C177.618644 1059.046186 93.090909 1016.054114 93.090909 897.137364L93.090909 126.860063C93.090909 7.879206 177.675064-35.013033 281.888889 30.977769L852.727563 392.447107 852.727563 392.447107Z"  />
                  </svg>
               </div>
               <div class="tiktok-play-count-container"></div>
               <div :id="`tiktok-${tt.video_id}`">
                  <NuxtImg loading="lazy" sizes="100vw md:45vw xl:420px" class="object-cover object-center min-h-[37.5rem] w-full" :src="tt.thumbnail_url" alt="" />
               </div>
            </div>
         </SwiperSlide>
      </Swiper>        
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { tiktok } from '@/composables/useApi';


const social = ref(null)
const tiktokData = ref({ posts: [] });
const selectedVideoId = ref('');
const showPopup = ref(false);


// Función para manejar clic en un slide
const openPopup = (videoId) => {
  selectedVideoId.value = videoId;
  showPopup.value = true;
};

// Ejemplo de cómo podrías cerrar el popup, necesitarás implementar esta lógica
const closePopup = () => {
  showPopup.value = false;
};

const socialData = async () => {
  try {
    const tiktokResponse = await tiktok.getTikTok();
    tiktokData.value = { ...tiktokResponse, posts: tiktokResponse.posts.slice(0, 10) };
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  socialData();
});

</script>

