<template>
    <div class="list__item-cirugia-title pb-0" v-if="category">
        <nuxt-link :to="processedLink">
                <p><strong>{{ category.title.rendered }}:</strong> <span v-html="category.acf.descripcion_cirugias_home"></span></p>
        </nuxt-link>
    </div>
    <div v-else>
        <p>Cargando categoría...</p>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getSingleTratamientoById } from '@/composables/useApi';

// Definir props
const props = defineProps({
  categoryId: {
    type: Number,
    required: true
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

loadCategory();
</script>
