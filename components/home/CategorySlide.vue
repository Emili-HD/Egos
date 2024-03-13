<template>
    <div class="card" :class="props.classes" v-if="category">
        <nuxt-link :to="processedLink" class="w-full h-full block">
            <picture>
                <NuxtImg loading="lazy"
                    v-if="category.featured_image_data"
                    :src="category.featured_image_data.src"
                    :alt="category.featured_image_data.alt"
                    :placeholder="[50, 25, 75, 5]"
                    sizes="100vw md:50vw xl:380px"
                />
            </picture>
            <div class="category__title bg-white bg-opacity-80 flex flex-col justify-end items-center gap-4 bottom-2 p-6 absolute w-[calc(100%-1rem)] m-auto left-0 right-0 rounded-xl overflow-hidden">
                <h3 class="h6 text-center uppercase">{{ category.title.rendered }}</h3>
                <div v-html="category.excerpt.rendered"></div>
                <ElementsButton class="py-1 px-6 border border-solid border-[#1c2c44]/25@ text-center uppercase rounded-3xl">Saber más</ElementsButton>
                <!-- <button class="button dark">Saber más</button> -->
            </div>
        </nuxt-link>
    </div>
    <div v-else>
        <p>Cargando categoría...</p>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getSingleTratamientoById } from '@/composables/useApi'

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

// Estado reactivo para la categoría
const category = ref(null);

// Propiedad computada
const processedLink = computed(() => {
  if (category.value && category.value.link) {
    const url = new URL(category.value.link);
    return url.pathname; // Devuelve solo la ruta
  }
  return ''; // Devuelve una ruta vacía si no hay URL
});

// Función para cargar la categoría
const loadCategory = async () => {
  try {
    const categoryResponse = await getSingleTratamientoById(props.categoryId);
    category.value = categoryResponse.data;
  } catch (error) {
    console.error(error);
  }
};

// Ciclo de vida creado
loadCategory();
</script>
