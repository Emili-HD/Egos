<template>
    <section class="social py-40 grid grid-cols-[repeat(16,_minmax(0,_1fr))]">
      <SocialPopUp v-if="showPopup" :data="{ video_id: selectedVideoId }" @close="closePopup" />
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
         <SwiperSlide class="text-center bg-white rounded-xl overflow-hidden flex flex-col justify-center items-center cursor-pointer" v-for="tt in tiktokData.posts" :key="tt.index" @click="openPopup(tt.video_id)">
            <div class="tiktok-feed-item" :title="tt.description">
               <div class="tiktok-post-hover flex flex-col justify-center items-center absolute w-full h-[37.5rem] bg-blue-1/50 top-0 left-0 opacity-0 z-10 hover:opacity-100 transition-[opacity]">
                  <img class="w-6 h-6 text-white" src="~/assets/images/icons/play-tiktok.svg"  width="24" height="24" />
               </div>
               <div class="tiktok-play-count-container"></div>
               <div :id="`tiktok-${tt.video_id}`">
                  <img class="object-cover object-center min-h-[37.5rem] w-full" :src="tt.thumbnail_url" alt=""  width="422" height="750" />
               </div>
            </div>
         </SwiperSlide>
      </Swiper>        
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { tiktok } from '@/composables/useApi';
import PlayIcon from '~/assets/images/icons/play-tiktok.svg'

const { $lenis: lenis } = useNuxtApp();

const social = ref(null)
const tiktokData = ref({ posts: [] });
const selectedVideoId = ref('');
const showPopup = ref(false);


// Función para manejar clic en un slide
const openPopup = (videoId) => {
  selectedVideoId.value = videoId;
  showPopup.value = true;
  lenis.scrollTo('.social', {offset: 0, duration: 0.2})
  setTimeout(() => {
    lenis.stop()
  }, 200);
};

// Ejemplo de cómo podrías cerrar el popup, necesitarás implementar esta lógica
const closePopup = () => {
  showPopup.value = false;
  lenis.start()
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

