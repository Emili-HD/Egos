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
import SpeedkitVimeo from '#speedkit/components/SpeedkitVimeo';

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
  // Asume que videoId es solo la ID del video. Ajusta según sea necesario.
  // console.log(props.videoId);
  return `${props.videoId}?autoplay=0&loop=1`;
});
</script>


<!-- <template>
  <ClientOnly >
    <div class="relative overflow-hidden size-full rounded-xl">
      <SpeedkitVimeo
        :url="videoId"
        :title="titulo"
        :options="options"
        :posterSizes="posterSizes"
        @playing="onPlaying"
      />
    </div>
  </ClientOnly>
</template>

<script setup>
import SpeedkitVimeo from '#speedkit/components/SpeedkitVimeo';
import { ref } from 'vue';

const props = defineProps({
  videoId: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
  },
});

const options = ref({ controls: false });
const posterSizes = ref({
  default: '100vw',
  md: '50vw',
  xl: '30vw'
});

const onPlaying = () => console.log('Vimeo Player playing!', videoId);
</script> -->

