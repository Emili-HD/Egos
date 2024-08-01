<template>
   <section v-if="data.informacion" class="informacion bg-white px-8 xl:px-24 py-10 xl:py-20 mb-0" ref="info">
      <h2 class="informacion__title">{{ data.informacion.titulo_informacion }}</h2>
      <ElementsDivider />
      <div class="listado__list mt-4">
         <div class="listado__list--item p-8" v-for="listado in data.informacion.informacion_cirugia" :key="listado.id">
            <div class="listado__list--item-title flex flex-row justify-between items-center cursor-pointer">
               <h3 class="text-clamp-lg" v-html="listado.titulo"></h3>
               <div class="indicator">
                  <svg viewBox="0 0 19 19" fill="none">
                     <line class="iconV" y1="9.5" x2="19" y2="9.5"/>
                     <line class="iconH" x1="9.41211" y1="19" x2="9.41211" y2="2.0945e-08"/>
                  </svg>
               </div>
            </div>
            <div class="listado__list--item-content">
               <div class="listado__list--item-content-img">
                  <img 
                     v-if="listado.imagen && listado.imagen.url" 
                     loading="lazy" 
                     class="w-full object-center object-cover" 
                     :src="listado.imagen.url" 
                     :srcset="listado.imagen.srcset" 
                     :alt="listado.imagen.alt" 
                     :width="listado.imagen.width" 
                     :height="listado.imagen.height" 
                  />
               </div>
               <div class="listado__list--item-content-description">
                  <div class="listado__list-grid mb-12">
                     <div class="list-check" v-for="check in listado.lista_check">
                        <svg width="24" height="24" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path
                              d="M11.0213 38C7.32242 32.0977 3.66121 26.2526 0 20.4093C0.0196399 20.3929 0.0392799 20.3749 0.0572831 20.3585C3.69558 24.2104 7.33388 28.0623 11.0033 31.947C20 21.2756 28.9673 10.6386 37.9345 0C37.9558 0.0163772 37.9787 0.0343921 38 0.0507693C29.0196 12.6825 20.0409 25.3126 11.0213 38Z"
                              fill="#C0B5A3" />
                        </svg>
                        <div v-html="check.check"></div>
                     </div>
                  </div>
                  <div class="listado__list-list">
                     <div class="list-detalle p-8" v-for="list in listado.lista_detalles" v-html="list.detalle">
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
// import gsap from 'gsap';

const { $gsap: gsap } = useNuxtApp();
// Estado reactivo
const info = ref(null)

// props
const props = defineProps({
   data: {
      type: Object,
   }
})

// Métodos
const initAccordion = () => {
   const groups = gsap.utils.toArray(".listado__list--item");
   const animations = [];

   groups.forEach((group, index) => {
      const title = group.querySelector('.listado__list--item-title');
      const description = group.querySelector('.listado__list--item-content');
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
            // setTimeout(() => {
            //    lenis.scrollTo(group, {offset: -40})
            // }, 300);
         } else {
            tl.reverse();
         }
      });
   });
};

onMounted(initAccordion)
</script>

<style lang="scss" scoped>
.informacion {
   @apply bg-nude-8 overflow-hidden;

   &__title {
      text-align: center;
      margin-bottom: 0;
   }

   .listado__list {
      &--item {
         @apply rounded-xl -mt-6 pb-12;

         &:last-child {
            padding-bottom: 2rem;
         }

         &:nth-child(1) {
            @apply bg-nude-7;
         }
         &:nth-child(2) {
            @apply bg-nude-6;
         }
         &:nth-child(3) {
            @apply bg-nude-5;
         }
         &:nth-child(4) {
            @apply bg-nude-4;
         }
         &:nth-child(5) {
            @apply bg-nude-3;
         }
         &-title {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;

            h3 {
               margin-bottom: 0;

               &::before {
                  content: "";
                  width: 0;
                  height: 1px;
                  background-color: currentColor;
                  position: absolute;
                  bottom: -0.5rem;
                  transform: width .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
               }
            }

            &:hover {
               h3::before {
                  width: 100%;
                  transition: width .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
               }
               .indicator {
                  scale: 1.2;
                  transform-origin: center;
                  transition: scale .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
               }
            }
         }
         .indicator {
            @apply bg-nude-1;
            background-size: 350%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            padding: 0.6rem;
            scale: 1;
            transform-origin: center;
            transition: scale .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            
            svg {
               @apply stroke-nude-8;
               height: 1.5rem;
               stroke-width: 1;
               width: 1.5rem;

               @media (max-width: 767px) {
                  height: 1rem;
                  width: 1rem;
               }
            }
         }

         &-content {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            gap: 2rem;

            @media (max-width: 767px) {
               flex-direction: column;
            }

            &-img {
               @apply rounded-lg overflow-hidden w-1/3;
               
               @media (max-width: 767px) {
                  width: 100%;
                  max-height: 20rem; 
               }
            }

            &-description {
               width: 66.6666%;
               
               @media (max-width: 767px) {
                  width: 100%;
               }
            }
         }
      }

      &-grid {
         display: grid;
         grid-template-columns: repeat(3, 1fr);
         column-gap: 2rem;
         width: 100%;

         @media (max-width: 767px) {
            grid-template-columns: 1fr;
            row-gap: 1rem;
         }
         
         .list-check {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 1rem;
            
            svg {
               min-width: 24px;
            }
         }
      }

      &-list {
         margin-bottom: 0;
         display: flex;
         flex-direction: column;
         gap: 1rem;

         :deep(.list-detalle){
            @apply bg-nude-8 rounded-2xl;

            &>p {
               display: flex;
               flex-direction: row;
               justify-content: space-between;
               margin-bottom: 0 !important;

               @media (max-width: 767px) {
                  flex-direction: column;
               }
            }
         }
      }
   }
}
</style>
