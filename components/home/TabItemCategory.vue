<template>
  <div v-if="categoryPending">Cargando categoría...</div>
  <div v-else-if="categoryError">Error al cargar la categoría.</div>
  <div v-else class="list__item-cirugia-title pb-0" v-if="category && category.value && category.value.title">
    <nuxt-link :to="processedLink">
      <p><strong>{{ category.value.title.rendered }}:</strong> <span v-html="category.value.acf.descripcion_cirugias_home"></span></p>
    </nuxt-link>
  </div>
  <div v-else>
    <p>La categoría no está disponible.</p>
  </div>
</template>


<script setup>
import { useAsyncData } from 'nuxt/app';
import { getTratamiento } from '@/composables/useFetch';

const props = defineProps({
  categoryId: Number,
});

const { data: category, error: categoryError, pending: categoryPending } = await useAsyncData(
  () => `category-${props.categoryId}`,
  async () => {
    const result = await getTratamiento({ id: props.categoryId });
    // Verifica o transforma 'result' según sea necesario aquí
    return result;
  }
);

const processedLink = computed(() => {
  if (category.value && category.value.link) {
    try {
      const url = new URL(category.value.link);
      return url.pathname;
    } catch (error) {
      console.error("Error creating URL object:", error);
      // Devuelve una ruta alternativa o maneja el error como consideres adecuado
      return '';
    }
  }
  return '';
});
</script>

