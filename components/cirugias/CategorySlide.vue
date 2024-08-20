<template>
  <div v-if="pending">Cargando...</div>
  <div v-else-if="error">Error al cargar los datos: {{ error }}</div>
  <div v-else class="card" :class="props.classes">
      <nuxt-link :to="processedLink" class="w-full min-h-full block bg-nude-7 rounded-3xl p-2" aria-label="Ver detalles de cirugía" v-if="category">
          <picture class="group aspect-square block rounded-2xl overflow-hidden mb-2">
              <UiImage :data="category" class="scale-effect" />
          </picture>
          <div class="category__title flex flex-col justify-end items-center gap-2 p-4 relative w-full m-auto">
              <h3 v-if="category.title && category.title.rendered" class="h6 text-center text-clamp-base text-balance font-semibold mb-0 font-lora">{{ category.title.rendered }}</h3>
              <div v-if="category.excerpt && category.excerpt.rendered" v-html="category.excerpt.rendered" class="[&>p]:text-clamp-sm [&>p]:mb-0 [&>p]:text-center [&>p]:font-nunito"></div>
              <div class="button py-1 px-6 border border-solid border-blue-1/25 text-center uppercase rounded-3xl">Saber más</div>
          </div>
      </nuxt-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { getTratamiento } from '@/composables/useApi';


// Definir props
const props = defineProps({
  categoryId: {
    type: Number,
    // required: true
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
