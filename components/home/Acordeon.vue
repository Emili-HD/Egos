<template>
   <section class="all-cirugias grid grid-cols-[repeat(16,_minmax(0,_1fr))] gap-x-0 gap-y-8 xl:gap-4 py-20" v-if="data">
      <div class="panel__content col-[2_/_span_14] xl:col-[2_/_span_6] sm:row-2 xl:row-1">
         <h2 class="panel__content-heading h3">{{ data.heading }}</h2>
         <div class="panel__content-description p-0">
            <div class="panel__content-description-content" v-html="data.description"></div>
         </div>
         
         <div class="list accordion__list ">
            <div class="accordion__list--item flex flex-col flex-wrap justify-between py-6 cursor-pointer" v-for="content in data.items" :key="content.titulo">
               <div class="accordion__list--item-title flex flex-row justify-between items-center">
                  <div class="max-w-[85%]" v-html="content.titulo"></div>
                  <svg class="h-6 w-6 stroke-[var(--blue-1)] stroke-1" viewbox="0 0 24 24">
                     <path class="iconV" d="M 12,0 V 24" />
                     <path class="iconH" d="M 0,12 H 24" />
                  </svg>
               </div>
               <div class="accordion__list--item-descripcion self-end h-0 w-full xl:w-[60%] opacity-0 relative">
                  <p class="pb-1">{{ content.descripcion }}</p>
                  <ul class="accordion__relacionados">
                     <li class="list__wrapper" v-for="categoryId in content.relacionadas" :key="categoryId">
                        <HomeTabItemCategory :categoryId="categoryId" />
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   
      <div class="panel__image col-[2_/_span_14] xl:col-[9_/_span_7] sm:row-1 xl:row-1 aspect-square w-full overflow-hidden rounded-3xl">
         <figure class="panel__image-img" v-for="image in data.items">
            <img loading="lazy" v-if="image.imagen.url" :src="image.imagen.url" alt="" />
         </figure>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

// Props
const props = defineProps({
   data: {
      type: Object,
      required: true
   }
})

// Estado reactivo para la categoría
// const category = ref(null);

// Métodos
const initAccordion = async () => {
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


onMounted(async() => {
   await initAccordion()
})
</script>

<style lang="scss" scoped>
.all-cirugias {
   .panel__image {
      @media (max-width: 1024px) and (orientation: portrait) {
         grid-column: 2/-2;
         grid-row: 1;
      }

      figure {
         position: absolute;
         width: 100%;
         height: 100%;

         img {
            object-fit: cover;
            height: 100%;
            object-position: center;
         }
      }
   }
   .accordion__list--item {
      &-title {
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          line-height: 1;
          height: 1.5rem;
      }
   
      &-descripcion {
         width: 100%;
      }
   }
}


</style>
