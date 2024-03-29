<template>
   <div v-if="testimoniosPending">Cargando testimonios...</div>
   <div v-else-if="testimoniosError">Error al cargar los testimonios.</div>
   <section v-else class="testimonios grid grid-cols-16 gap-0 xl:gap-4 py-20">
      <div class="testimonios__header col-[1/-1] p-8 xl:col-[4_/_span_10] xl:p-0 flex flex-col justify-center items-center h-fit text-left xl:text-center w-full z-10">
         <h2 class="text-clamp-3xl">Antes y después de nuestras cirugías estéticas y medicina en clínica Egos </h2>
         <p>Cada año, se operan más de 2000 pacientes en Clínica Egos, para nosotros, vuestra satisfacción es nuestro mayor
            logro. Hemos hablado con diferentes pacientes de la clínica para que nos cuenten cómo fue su paso, cómo se
            encuentran ahora y qué han mejorado tras la intervención.</p>
         <ElementsDivider />
      </div>
      <div class="testimonios__list max-w-full grid-row-2 col-[1_/_span_16] p-8 xl:px-24 grid grid-cols-4 gap-8 xl:gap-4" v-if="testimoniosData">
         <article v-for="testimonio in testimoniosData" :key="testimonio.id" class="card rounded-2xl overflow-hidden p-2 bg-white !aspect-auto col-[1/-1] xl:col-auto  flex flex-col justify-between items-center gap-8 shadow-2xl shadow-nude-7">
            <div v-if="testimonio.acf.vimeo_video" class="video__player rounded-xl w-full overflow-hidden">
               <div class="size-full aspect-[9/16]">
                  <VimeoPlayer :videoId="testimonio.acf.vimeo_video" />
               </div>
            </div>
            <div class="testimonios__content p-2 pb-4 text-center font-canela ">
               <h3 class="h6 text-clamp-xl">{{ testimonio.title.rendered }}</h3>
               <!-- <nuxt-link to="/" class="button button-reverse">Ver más</nuxt-link> -->
            </div>
         </article>
      </div>
   </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useLazyAsyncData } from 'nuxt/app';
import { getTestimonios } from '@/composables/useFetch';

// Definir explícitamente los valores de page y perPage
const page = 1;
const perPage = 4;

// UniqueId para la llamada a getTestimonios
const uniqueId = `testimonios-${page}-${perPage}`;

// Inicialización de useLazyAsyncData sin ejecutar la llamada inmediatamente
const { data: testimoniosData, error: testimoniosError, pending: testimoniosPending, execute } = useLazyAsyncData(uniqueId, () => getTestimonios({ page, perPage }));

// Filtro para testimonios destacados
const testimoniosDestacados = computed(() => {
  return testimoniosData.value ? testimoniosData.value.filter(testimonio => testimonio.acf.destacado && testimonio.acf.destacado.includes("Destacar")) : [];
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
