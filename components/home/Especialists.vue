<template>
  <section class="nosotros section__hero grid grid-cols-16 col-[1_/_-1]" v-if="pages">
    <header class="home__blog--header col-[3/-3] text-center">
      <h2 class="home__blog--header-title">{{ pages.title.rendered }}</h2>
      <div
        class="home__blog--header-content"
        v-html="pages.content.rendered"
      ></div>
    </header>
    <ElementsDivider class="col-[3/-3]" />
  </section>
  <template v-if="categories.length > 0">
      <section v-for="category in categories" :key="category.id" :class="`equipo ${category.slug}`"
          class="pt-20 pb-20 xl:pt-32 w-screen" :id="`orden-${category.order}`">
          <article class="">
              <ul class="grid grid-cols-4 xl:grid-cols-12 gap-4 lg:gap-8 px-12 lg:px-32">
                  <li v-for="miembro in doctorByCategory(category.id)" :key="miembro.id"
                      class="card !aspect-[4/5] bg-nude-6 rounded-3xl overflow-hidden col-span-4 md:col-span-2 xl:col-span-3">
                      <div class="card__member block relative size-full overflow-hidden">
                          <NuxtImg loading="lazy" v-if="miembro.featured_image_src"
                              :src="miembro.featured_image_src.src"
                              class="card__image absolute w-full object-center object-cover min-h-full overflow-hidden rounded-3xl"
                              :alt="miembro.featured_image_src.alt" />
                          <div
                              class="card__description text-nude-6 bg-gold-3/10 p-4 absolute bottom-0 rounded-3xl size-full z-10 flex flex-col justify-between items-start gap-2">
                              <div>
                                  <h3 class="card__title h6 !mb-0 font-normal">
                                      {{ miembro.title ? miembro.title.rendered : 'No Title' }}
                                  </h3>
                                  <p class="font-normal" v-html="miembro.acf.trayectoria.especialidad"></p>
                              </div>
                              <div class="button__group flex flex-row justify-center items-center gap-2 w-full">
                                  <a v-if="category.form === false" href="#" @click.passive="showMemberPanel(miembro)" class="button border border-solid bg-nude-1 border-nude-1/20 rounded-full py-1 w-full text-center">+ Info</a>
                                  <NuxtLink :to="processedPath(miembro.link)" class="button bg-nude-1 rounded-full py-1 text-blue-1 w-full text-center" v-if="category.form === true">Opiniones</NuxtLink>
                                  <NuxtLink
                                    :to="processedPath(miembro.link)"
                                    class="button bg-gold-3 rounded-full py-1 text-nude-8 w-full text-center"
                                    v-if="category.form === true"
                                    @click="handleAppointmentClick"
                                  >
                                    Pedir Cita
                                  </NuxtLink>
                            </div>
                          </div>
                      </div>
                  </li>
              </ul>
          </article>
          <div class="flex flex-col items-center p-12">
            <NuxtLink class="button px-6 pt-3 pb-2 bg-blue-1 rounded-full text-nude-1 text-center w-fit uppercase leading-none" to="/nuestro-equipo" >Ver todo nuestro equipo</NuxtLink>
          </div>
      </section>
  </template>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { getEspecialidades, getPage, getEquipo } from '@/composables/useFetch';
import { useScrollStore } from '@/stores/scrollStore';
// import BoosterImage from '#booster/components/BoosterImage';

const scrollStore = useScrollStore();

function handleAppointmentClick() {
  scrollStore.setScrollToForm(true); // Navegar a la nueva página
}

// Funciones computadas
const categories = computed(() => {
  const uniqueCategories = [
    ...new Set(doctor.value.flatMap((d) => d.especialidad)),
  ];
  return uniqueCategories.map((categoryId) => {
    const category = especialidades.value.find((cat) => cat.id === categoryId);
    return {
      id: categoryId,
      name: category ? category.name : 'Unknown Category',
      description: category ? category.description : 'Unknown Category',
      slug: category ? category.slug : 'unknown-category',
      form: category ? category.acf.activar_formulario : 'Unknow category',
      order: category ? category.acf.orden : 'Unknow category'
    };
  }).filter(category => category.slug === 'cirugia-estetica'); // Filtra solo la categoría deseada
});

// Obtener datos
const { data: especialidades, error: especialidadesError, pending: especialidadesPending } = await useAsyncData('especialidades', getEspecialidades, {initialCache: false});
const { data: pages, error: paginaError, pending: paginaPending } = await useAsyncData('paginaEspecial', () => getPage(562), {initialCache: false});
const { data: doctor, error: equipoError, pending: equipoPending } = await useAsyncData('equipo', () => getEquipo({ perPage: 4 }), {initialCache: false});

const doctorByCategory = (categoryId) => {
    return doctor.value.filter((d) => d.especialidad.includes(categoryId));
};

const processedPath = (fullUrl) => {
  if (!fullUrl) return ''; // Retorna una cadena vacía si fullUrl no está definido
  const url = new URL(fullUrl);
  return url.pathname; // Devuelve solo la parte de la ruta de la URL
};

</script>


