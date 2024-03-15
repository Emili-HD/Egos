<template>
   <section class="testimonios grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-0 xl:gap-4 py-20">
      <div class="testimonios__header col-[1/-1] p-8 xl:col-[4_/_span_10] xl:p-0 flex flex-col justify-center items-center min-h[50vh] text-left xl:text-center w-full z-10">
         <h2>Antes y después de nuestras cirugías estéticas y medicina en clínica Egos </h2>
         <p>Cada año, se operan más de 2000 pacientes en Clínica Egos, para nosotros, vuestra satisfacción es nuestro mayor
            logro. Hemos hablado con diferentes pacientes de la clínica para que nos cuenten cómo fue su paso, cómo se
            encuentran ahora y qué han mejorado tras la intervención.</p>
         <ElementsDivider />
      </div>
      <div class="testimonios__list grid-row-2 col-[1_/_span_16] p-8 grid grid-cols-4 gap-8" v-if="testimonios">
         <article v-for="testimonio in testimonios" :key="testimonio.id" class="card rounded-2xl p-2 bg-white !aspect-auto flex flex-col justify-between items-center gap-8 shadow-2xl shadow-[var(--nude-7)]">
            <div v-if="testimonio.acf.vimeo_video" class="video__player rounded-xl w-full overflow-hidden">
               <div class="size-full aspect-[9/16]">
                  <VimeoPlayer :video-id="testimonio.acf.vimeo_video" />
               </div>
            </div>
            <div class="testimonios__content">
               <h3 class="h6">{{ testimonio.title.rendered }}</h3>
               <!-- <nuxt-link to="/" class="button button-reverse">Ver más</nuxt-link> -->
               <!-- <div v-html="testimonio.content.rendered"></div> -->
            </div>
         </article>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTestimonios } from '@/composables/useApi'

// Estados reactivos
const testimonios = ref([]);

// Métodos
const testimoniosData = async () => {
   const response = await getTestimonios();
   testimonios.value = response.data
};

testimoniosData()
</script>

<style lang="scss" scoped>
.testimonios {
   &__header {
      
      
      @media (max-width: 767px) {
         text-align: left;

         h2 {
            font-size: calc(var(--font-size) * 2.5);
         }
      }
      
      @media (max-width: 1024px) and (orientation: portrait) {
         h2 {
            font-size: calc(var(--font-size) * 2.5);
         }
      }
   }
}
</style>
