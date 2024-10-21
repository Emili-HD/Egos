<template>
    <section class="col-[1/-1]" v-if="categories.length > 0">
        <article v-for="category in categories" :key="category.id" :class="`equipo ${category.slug}`"
            class="pt-16 xl:pb-16 px-4 w-full" :id="`orden-${category.order}`">
            <!-- <article class=""> -->
                <ul class="grid grid-cols-4 xl:grid-cols-12 gap-4 lg:gap-8 lg:px-32">
                    <li v-for="miembro in doctorByCategory(category.id)" :key="miembro.id"
                        class="card !aspect-[4/5] bg-nude-6 rounded-3xl overflow-hidden col-span-4 md:col-span-2 xl:col-span-3 list-none">
                        <div class="card__member block relative size-full overflow-hidden">
                          <UiImage :data="miembro" class="absolute w-full object-center object-cover min-h-full overflow-hidden rounded-3xl" loading="lazy"/>
                            <div
                                class="card__description text-nude-6 bg-gold-3/10 p-4 absolute bottom-0 rounded-3xl size-full z-10 flex flex-col justify-between items-start gap-2">
                                <div>
                                    <h3 class="heading card__title h6 !mb-0 !font-normal">
                                        {{ miembro.title ? miembro.title.rendered : 'No Title' }}
                                    </h3>
                                    <p class="font-normal" v-html="miembro.acf.trayectoria.especialidad"></p>
                                </div>
                                <div class="button__group flex flex-row justify-center items-center gap-2 w-full">
                                    <a v-if="category.form === false" href="#" @click.passive="showMemberPanel(miembro)" class="button border border-solid bg-nude-1 border-nude-1/20 rounded-full py-1 w-full text-center">+ Info</a>
                                    <NuxtLink :to="processedPath(miembro.link)" class="button bg-nude-1 rounded-full py-1 text-blue-1 w-full text-center shadow-lg hover:bg-nude-6 hover:text-gold-3 transition-colors" v-if="category.form === true">Opiniones</NuxtLink>
                                    <NuxtLink
                                      :to="processedPath(miembro.link)"
                                      class="button bg-gold-3 rounded-full py-1 text-nude-8 w-full text-center shadow-lg hover:bg-gold-1 hover:text-blue-1 transition-colors"
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
            <!-- </article> -->
            <div class="flex flex-col items-center p-12">
              <NuxtLink class="button px-6 pt-3 pb-2 bg-blue-1 rounded-full text-nude-8 text-center w-fit uppercase leading-none hover:bg-blue-6 transition-colors" to="/nuestro-equipo" >Ver todo nuestro equipo</NuxtLink>
            </div>
        </article>
    </section>
</template>

<script setup>
import { getEspecialidades, getPage, getEquipo } from '@/composables/useApi'


const props = defineProps({
    data: {
        type: Object,
    }
})

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

const { data: especialidades, error: especialidadesError } = await useAsyncData('especialidades', getEspecialidades, {initialCache: true});
const { data: doctor, error: equipoError } = await useAsyncData('equipo', () => getEquipo({ perPage: 4 }), {initialCache: true});

const doctorByCategory = (categoryId) => {
    return doctor.value.filter((d) => d.especialidad.includes(categoryId));
};

const processedPath = (fullUrl) => {
  if (!fullUrl) return ''; // Retorna una cadena vacía si fullUrl no está definido
  const url = new URL(fullUrl);
  return url.pathname; // Devuelve solo la parte de la ruta de la URL
};

function handleAppointmentClick() {
  scrollStore.setScrollToForm(true); // Navegar a la nueva página
}
</script>

<style lang="scss" scoped>

</style>
