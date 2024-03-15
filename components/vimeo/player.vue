<template>
  <div class="relative overflow-hidden size-full rounded-xl" v-if="videoId">
    <iframe
      :src="`${videoId}?autoplay=0&loop=1`"
      class="absolute top-0 left-0 w-full h-full"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
defineProps({
  videoId: {
    type: String,
    required: true,
  },
});
</script>
