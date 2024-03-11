<template>
   <div class="social-video-container" v-if="data && data.video_id" data-lenis-prevent>
      <div class="close" @click="close">
         <svg class="close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path
               d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
         </svg>
      </div>
      <iframe :src="`https://www.tiktok.com/embed/${data.video_id}`" height="800" width="400" title="TikTok Video"
         allowfullscreen></iframe>
   </div>
</template>

<script setup>
const props = defineProps({
   data: Object
});

const emit = defineEmits(['close']);

const close = () => {
   emit('close'); // Emitimos el evento 'close' cuando se hace clic en .close
};
</script>

<style lang="scss" scoped>
.social-video-container {
   position: fixed;
   top: 0;
   left: 0;
   width: 100vw;
   height: 100vh;
   background: rgba(var(--blue-1-rgb), 0.8);
   z-index: 999;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}

.close {
   position: absolute;
   top: 3rem;
   right: 3rem;
   cursor: pointer;

   .close-icon {
      width: 4em;
      height: 4em;
      fill: var(--nude-8);
   }
}
</style>
