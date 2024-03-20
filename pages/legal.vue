<template>
  <main class="page site-main grid grid-cols-16 w-full" v-if="legal">
    <section class="legal col-[2/-2] xl:col-[5/-5] py-40">
      <div class="content" v-html="legal.content.rendered"></div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getSinglePage } from '@/composables/useApi';

const route = useRoute();
const legal = ref(null);

const pageIds = {
  'aviso-legal': 445,
  'politica-de-cookies': 16119,
  'politica-de-privacidad': 16092,
};

// Obtener datos de la API al crear el componente
const fetchData = async () => {
  try {
    const pageId = pageIds[route.path.substring(1)]; // Elimina el primer carácter '/' y obtiene el ID correspondiente.
    if (pageId) {
      const legalResponse = await getSinglePage(pageId);
      legal.value = legalResponse.data;
    } else {
      console.error('No se encontró un ID de página correspondiente.');
    }
  } catch (error) {
    console.error(error);
  }
};

await fetchData();
</script>

<style lang="scss" scoped>
// Estilos vacíos
</style>
