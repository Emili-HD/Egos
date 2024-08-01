<template>
  <section class="accordion" v-for="competencias in data.listado_competencias" :key="competencias.id">
    <div class="heading accordion__heading">
      <h2 class="accordion__heading-title xl:text-center [&>span]:block [&>span]:text-clamp-xl [&>span]:mb-0" v-html="competencias.titulo_seccion"></h2>
      <div v-if="competencias.descripcion_seccion" v-html="competencias.descripcion_seccion"></div>
    </div>
    <div class="list accordion__list">
      <div class="accordion__list--item" v-for="listado in competencias.seccion_competencias" :key="listado.id">
        <div class="accordion__list--item-title [&>*]:font-normal [&>*]:m-0">
          <div v-html="listado.titulo"></div>
          <svg viewbox="0 0 24 24">
            <path class="iconV" d="M 12,0 V 24" />
            <path class="iconH" d="M 0,12 H 24" />
          </svg>
        </div>
        <div class="accordion__list--item-descripcion" v-html="listado.descripcion"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { $gsap: gsap } = useNuxtApp();

// Props
const props = defineProps({
  data: {
    type: Object
  }
})

// Métodos
const initAccordion = () => {
   const groups = gsap.utils.toArray(".accordion__list--item");
   const animations = [];

   groups.forEach((group, index) => {
      const title = group.querySelector('.accordion__list--item-title');
      const description = group.querySelector('.accordion__list--item-descripcion');
      const iconV = group.querySelector('.iconV');
      const iconH = group.querySelector('.iconH');

      // Establece el estado inicial de manera explícita
      gsap.set(description, { autoAlpha: 0, height: 0, marginTop: 0, marginBottom: 0 });
      gsap.set([iconV, iconH], { rotate: 0, transformOrigin: '50% 50%' });

      // Usa fromTo para definir explícitamente los estados inicial y final
      const tl = gsap.timeline({ paused: true, reversed: true })
         .fromTo(description, 
            { autoAlpha: 0, height: 0, marginTop: 0, marginBottom: 0 }, 
            { duration: 0.2, autoAlpha: 1, height: 'auto', marginTop: '2rem', marginBottom: '2rem' }, 0)
         .fromTo([iconV, iconH], 
            { rotate: 0, transformOrigin: '50% 50%' },
            { duration: 0.25, rotate: 45, stagger: 0.05, transformOrigin: '50% 50%' }, '<');

      animations[index] = tl;

      title.addEventListener('click', () => {
         if (tl.reversed()) {
            animations.forEach((anim) => {
              if (anim !== tl) anim.reverse().then(() => anim.pause());
            });
            tl.play();
         } else {
            tl.reverse();
         }
      });
   });
};

onMounted(initAccordion)

</script>

<style lang="scss" scoped>
  // estilo vacío
</style>
