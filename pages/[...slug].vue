<template>
  <main class="page site-main grid grid-cols-[repeat(16,_minmax(0,_1fr))]" v-if="pages">
      <PageHeading :data="pages" />
      <PageCatRelacionadas  :data="pages.acf" />
      <FormsPiceCita :titulo="`¿No encuentras tu cirugía?`" :portalId="String(pages.acf.formulario.portalid)" :formId="pages.acf.formulario.formid" />
      <section class="quote font-base text-balance normal-case font-semibold leading-5 py-40 w-full col-[1_/_span_16] grid grid-cols-subgrid">
          <ElementsReveal :titulo="pages.acf.hero.texto_imagen" tag="p" />
      </section>
      <PageRecomendaciones :data="pages.acf" />
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getSinglePageBySlug } from '@/composables/useApi'
import { useRoute } from 'vue-router';

const pages = ref(null)
const route = useRoute();

const loadPage = async (slug) => {
  slug = route.params.slug;
    try {
      const pageResponse = await getSinglePageBySlug(slug);
      if (pageResponse.data && pageResponse.data.length > 0) {
        pages.value = pageResponse.data[0];
      } else {
        console.error('No se encontraron datos para el slug proporcionado.');
      }
    } catch (error) {
      console.error(error);
    } 
};

await loadPage()

</script>


