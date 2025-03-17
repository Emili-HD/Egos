<template>
   <div v-if="testimoniosError">Error al cargar los testimonios.</div>
   <section v-else class="testimonios grid grid-cols-16 gap-0 xl:gap-4 py-20">
      <div
         class="testimonios__header col-[1/-1] p-8 xl:col-[4_/_span_10] xl:p-0 flex flex-col justify-center items-center h-fit text-left xl:text-center w-full z-10">
         <h2 class="text-clamp-3xl">Antes y después de nuestras cirugías estéticas y medicina en clínica EGOS </h2>
         <p>Cada año, se operan más de 3000 pacientes en Clínica EGOS, para nosotros, vuestra satisfacción es nuestro
            mayor
            logro. Hemos hablado con diferentes pacientes de la clínica para que nos cuenten cómo fue su paso, cómo se
            encuentran ahora y qué han mejorado tras la intervención.</p>
         <ElementsDivider />
      </div>
      <div
         class="testimonios__list max-w-full grid-row-2 col-[1_/_span_16] p-8 xl:px-24 grid grid-cols-4 gap-8 xl:gap-4"
         v-if="testimoniosData">
         <article v-for="testimonio in testimoniosDestacados" :key="testimonio.id"
            class="card rounded-2xl overflow-hidden p-2 !aspect-auto col-[1/-1] sm:col-span-2 xl:col-auto flex flex-col justify-between items-center gap-8 h-full">
            <div v-if="testimonio.acf.vimeo_video" class="video__player rounded-xl w-full overflow-hidden">
               <div class="size-full aspect-[9/16]">
                  <UiVideo :videoId="testimonio.acf.vimeo_video" />
               </div>
            </div>
            <div
               class="testimonios__content p-2 pb-4 text-center h-max flex flex-col justify-between items-center">
               <h3 class="h6 text-clamp-lg min-h-32">{{ testimonio.title.rendered }}</h3>
               <!-- <ElementsButton :to="`/opinion-egos/${testimonio.slug}`" class="blue">Saber más</ElementsButton> -->
               <nuxt-link :to="`/opinion-egos/${testimonio.slug}`"
                  class="pb-1 pt-2 px-6 bg-blue-1 text-nude-8 text-center uppercase rounded-xl hover:bg-blue-6 transition-colors">Saber
                  más</nuxt-link>
            </div>
         </article>
      </div>
      <div class="col-[2/-2] flex justify-center">
         <nuxt-link :to="`/casos-reales/`"
            class="w-fit pb-1 pt-2 px-6 bg-blue-1 text-nude-8 text-center uppercase rounded-xl hover:bg-blue-6 transition-colors">Ver
            todos nuestros casos reales</nuxt-link>
      </div>
   </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useLazyAsyncData } from 'nuxt/app';
import { getTestimonios } from '@/composables/useApi';

// Definir explícitamente los valores de page y perPage
const page = 1;
const perPage = 50;

// UniqueId para la llamada a getTestimonios
const uniqueId = `testimonios-${page}-${perPage}`;

// Inicialización de useLazyAsyncData sin ejecutar la llamada inmediatamente
const { data: testimoniosData, error: testimoniosError, execute } = useLazyAsyncData(uniqueId, () => getTestimonios({ page, perPage }));

// Filtro para testimonios destacados
const testimoniosDestacados = computed(() => {
   if (!testimoniosData.value) return [];

   // Filtrar primero todos los testimonios destacados
   const destacados = testimoniosData.value.filter(testimonio => testimonio.acf?.destacado && testimonio.acf?.destacado?.includes("Destacar"));

   // Si hay más de 4 destacados, retornar solo los últimos 4
   if (destacados.length > 4) {
      return destacados.slice(-4); // Obtiene los últimos 4 elementos
   }

   return destacados; // Si hay 4 o menos, los retorna todos
});

// Función para manejar el evento de scroll y cargar los datos cuando sea apropiado
const handleScroll = () => {
   // Puedes ajustar esta lógica para determinar cuándo quieres cargar los datos,
   // por ejemplo, verificar si el usuario ha hecho scroll más allá de cierto punto.
   const scrollPosition = window.scrollY + window.innerHeight;
   if (scrollPosition > document.body.offsetHeight - 500) {
      execute();
      window.removeEventListener('scroll', handleScroll); // Eliminar el listener después de cargar los datos
   }
};

onMounted(() => {
   window.addEventListener('scroll', handleScroll);
});
</script>



<style lang="scss" scoped>
// empty style
</style>
