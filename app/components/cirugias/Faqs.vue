<template>
  <section v-if="faqsData.faqs" class="faqs grid grid-cols-16 gap-x-0 gap-y-8 xl:gap-4 xl:py-20" id="faqs" >
    <div class="faqs__image row-span-2 col-[2_/_span_14] xl:col-[2_/_span_4] max-lg:pt-12">
		<div class="heading accordion__heading">
			<h2 class="h4 accordion__heading-title text-clamp-3xl [&>span]:block [&>span]:text-clamp-xl [&>span]:mb-0" v-html="faqsData.titulo_faqs"></h2>
		</div>
		<!-- <img 
		  loading="lazy" 
		  class="size-full object-cover" 
		  :src="faqsData.imagen_faqs.url" 
		  :srcset="faqsData.imagen_faqs.srcset" 
		  :alt="faqsData.imagen_faqs.url" 
		  :width="faqsData.imagen_faqs.width" 
		  :height="faqsData.imagen_faqs.height" 
		/> -->
    </div>
    <UiAccordion :data="faqsData.faqs" v-if="faqsData && faqsData.faqs" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { $gsap: gsap } = useNuxtApp();

// Props
const props = defineProps({
  faqsData: {
    type: Object,
    required: true
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

<style lang="scss">
// empty style
</style>
