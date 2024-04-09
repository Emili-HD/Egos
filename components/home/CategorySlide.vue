<template>
  
    <div class="card rounded-3xl overflow-hidden" :class="props.classes" v-if="category">
        <nuxt-link :to="processedLink" class="w-full h-full block" aria-label="Ver detalles de cirugía">
            <picture class="h-[35.625rem] bg-nude-8 block min-h-full" v-if="category.acf && category.acf.imagen_cards && category.acf.imagen_cards.url">
                <NuxtImg loading="lazy"
                    class="size-full object-cover object-center"
                    :src="category.acf.imagen_cards.url"
                    :alt="category.acf.imagen_cards.alt"
                    :placeholder="[50, 25, 75, 5]"
                    sizes="100vw md:50vw xl:380px"
                    width="380"
                    height="570"
                />
            </picture>
            <picture class="h-[35.625rem] bg-nude-8 block min-h-full" v-else-if="category.featured_image_data">
                <NuxtImg loading="lazy"
                    class="size-full object-cover object-center"
                    :src="category.featured_image_data.src"
                    :alt="category.featured_image_data.alt"
                    :placeholder="[50, 25, 75, 5]"
                    sizes="100vw md:50vw xl:380px"
                    width="380"
                    height="570"
                />
            </picture>
            <div class="category__title bg-nude-8/50 backdrop-blur transform-[translateZ(0)] will-change-transform bg-opacity-80 flex flex-col justify-end items-center gap-4 bottom-2 p-6 absolute w-[calc(100%-1rem)] m-auto left-0 right-0 rounded-xl overflow-hidden">
                <h3 class="h6 text-center uppercase text-clamp-sm font-semibold mb-0">{{ category.title.rendered }}</h3>
                <div v-html="category.excerpt.rendered" class="[&>p]:text-sm [&>p]:mb-0 [&>p]:text-center [&>p]:text-balance"></div>
                <div class="py-1 px-6 border border-solid border-blue-1/25 text-center uppercase rounded-3xl">Saber más</div>
            </div>
        </nuxt-link>
    </div>
    <div v-else>
        <p>Cargando categoría...</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { getTratamiento } from '@/composables/useFetch';

// Definir props
const props = defineProps({
  categoryId: {
    type: Number,
    required: true
  },
  classes: {
    type: String,
  }
});

// Propiedad computada
const processedLink = computed(() => {
  if (category.value && category.value.link) {
    const url = new URL(category.value.link);
    return url.pathname; // Devuelve solo la ruta
  }
  return ''; // Devuelve una ruta vacía si no hay URL
});

const { data: category, error, pending } = await useAsyncData(`tratamiento-${props.categoryId}`, () => getTratamiento({ id: props.categoryId }));

</script>
