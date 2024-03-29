<template>
  <ClientOnly >
    <div class="relative overflow-hidden size-full rounded-xl" v-if="videoId">
      <iframe
        :src="iframeSrc"
        :title="titulo"
        class="absolute top-0 left-0 w-full h-full"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </ClientOnly>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
  },
});

const iframeSrc = computed(() => {
  return `${props.videoId}?autoplay=0&loop=1`;
});
</script>
