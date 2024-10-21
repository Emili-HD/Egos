<template>
    <nuxt-img v-if="data && data.featured_image_data && data.featured_image_data.url" :class="class"
        :src="data.featured_image_data.url"
        :srcset="data.featured_image_data.srcset"
        :width="data.featured_image_data.width"
        :height="data.featured_image_data.height"
        :alt="data.featured_image_data.alt || 'Imagen sin descripción'" />
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  class: String,
  preload: {
    type: Boolean,
    default: false,
  },
});

// Verifica que featured_image_data exista antes de intentar precargar
if (props.preload && props.data.featured_image_data) {
  useHead(() => {
    return {
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: props.data.featured_image_data.url,
          imagesrcset: props.data.featured_image_data.srcset,
        },
      ],
    };
  });
}
</script>

<style lang="scss" scoped>
.cover {
    @apply object-cover w-full min-h-full;
}

.contain {
    @apply object-contain object-top w-full min-h-full;
}

.card__image {
    @apply aspect-square lg:aspect-[4/1] w-full xl:w-[45%] min-w-[22rem] object-cover object-center rounded-2xl overflow-hidden;
}

.scale-effect {
    @apply size-full object-cover object-center group-hover:scale-125 transition-transform duration-1000 ease-out;
}

.hero {
    @apply size-full object-cover object-center absolute inset-0 block;
}
</style>
