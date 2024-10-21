<template>
   <Teleport to="body">
      <div
         class="social-video-container fixed top-0 left-0 w-[100vw] h-[100vh] z-[999] flex flex-col justify-center items-center"
         v-if="data && data.video_id" data-lenis-prevent>
         <div class="close absolute top-16 sm:top-20 right-4 sm:right-12 cursor-pointer z-10" @click="close">
            <img src="../../assets/images/icons/close-icon.svg" alt="" width="48" height="48" />
         </div>
         <iframe class="max-w-screen/90" :src="`https://www.tiktok.com/embed/${data.video_id}`" height="640" width="320" title="TikTok Video"
            allowfullscreen allow="accelerometer"></iframe>
      </div>
   </Teleport>
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
   @apply bg-blue-1/80;
}
</style>
