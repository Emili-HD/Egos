<template>
  <section v-if="faqsData.faqs" class="faqs grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-x-0 gap-y-8 xl:gap-4 py-20" id="faqs">
    <div class="faqs__image row-span-2 col-[2_/_span_14] xl:col-[2_/_span_6] overflow-hidden rounded-xl aspect-square">
      <NuxtImg loading="lazy" class="size-full object-cover" :src="faqsData.imagen_faqs.url" :alt="faqsData.imagen_faqs.url" />
    </div>
    <div class="heading accordion__heading col-[2_/_span_14] xl:col-[9_/_span_7]">
      <h2 class="accordion__heading-title xl:text-center" v-html="faqsData.titulo_faqs"></h2>
    </div>
    <div class="list accordion__list col-[2_/_span_14] xl:col-[9_/_span_7]">
      <div class="accordion__list--item flex flex-col flex-wrap justify-between py-6 cursor-pointer" v-for="content in faqsData.faqs" :key="content.heading_faq">
        <div class="accordion__list--item-title flex flex-row justify-between items-center">
          <div class="max-w-[85%]" v-html="content.heading_faq"></div>
          <svg class="h-6 w-6 stroke-[var(--blue-1)] stroke-1" viewbox="0 0 24 24">
            <path class="iconV" d="M 12,0 V 24" />
            <path class="iconH" d="M 0,12 H 24" />
          </svg>
        </div>
        <div class="accordion__list--item-descripcion self-end h-0 w-full xl:w-[60%] opacity-0 relative" v-html="content.content_faq"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

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
.faqs {
  margin-bottom: 0;
  // margin-top: calc(var(--header-height) + var(--spacing));

  .content__header-title {
    color: var(--nude-8);
  }

  .mask-reveal {
    background: var(--blue-1);
    opacity: .6;
  }
}
</style>
