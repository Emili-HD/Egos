<template>
   <section v-if="data.acf.tratamientos_home.categorias_home" class="tratamientos girl pb-5">
      <ElementsGirl />
      <div class="loquehacemos">
         <h2 class="home__services-title" v-html="data.acf.tratamientos_home.title_categories"></h2>
         <div class="foryou">
            <div class="notes" v-for="skill in data.acf.loquehacemos" :key="skill.id">
               <img loading="lazy" class="sLogo max-w-full w-36 xl:w-24 border border-current rounded-xl" :src="skill.icono.url" alt="">
               <div v-html="skill.skill"></div>
            </div>
         </div>
      </div>
   </section>
   <section v-if="data.acf.tratamientos_home.categorias_home" class="tratamientos">
      <div class="home__services" data-color="#ffffff">
         <div class="home__services-inner">
            <div class="card__wrapper" v-for="categoryId in data.acf.tratamientos_home.categorias_home" :key="categoryId">
               <HomeCategorySlide :categoryId="categoryId" />
            </div>

         </div>
         <div class="home__services-description w-full !pb-12">
            <p v-html="data.acf.tratamientos_home.descripcion_categorias"></p>
         </div>
      </div>
   </section>
</template>

<script setup>
import { onMounted } from 'vue';
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

const { $gsap: gsap } = useNuxtApp();

const props = defineProps({
   data: {
      type: Object,
      required: true,
   }
})

// Métodos
const initialiseSectionHorizontal = async () => {

   let sectionPin = document.querySelector('.home__services-inner')
   let heading = document.querySelector('.home__services-title')
   let chica = document.querySelector('section.girl');

   let mm = gsap.matchMedia()
   mm.add("(min-width: 1024px)", () => {
      if (sectionPin) {
         const text = new SplitText(heading, { type: 'lines' })
         const line1 = document.querySelector('.home__services-title > div:nth-child(1)')
         const line2 = document.querySelector('.home__services-title > div:nth-child(2)')
         const notes = gsap.utils.toArray('.notes')

         let tl = gsap.timeline()
         // ANIMACIÓN TÍTULO
         tl = gsap.timeline({
            scrollTrigger: {
               trigger: '.tratamientos',
               start: 'top 20%',
               end: 'bottom 80%',
               scrub: true,
               pin: true,
               pinSpacing: false,
               // anticipatePin: 1,
               // markers: true
            }
         })

         tl.fromTo(
            line1,
            {
               x: -300,
               opacity: 0
            },
            {
               x: 0,
               opacity: 1,
               duration: 2,
               ease: 'power4.out',
            },
            0
         )
         tl.fromTo(
            line2,
            {
               x: 300,
               opacity: 0
            },
            {
               x: 0,
               opacity: 1,
               duration: 2,
               ease: 'power4.out',
            },
            "<"
         )
         // notes.forEach((note) => {
            tl.fromTo(
               notes,
               {
                  y: 100,
                  opacity: 0
               },
               {
                  y: 0,
                  opacity: 1,
                  stagger: .5
               },
               '<'
            )
         // })
         tl.from(".oneline-girl", {
            duration: 10,
            drawSVG: 0
         }, '<');

      }
   })
   // ANIMACIÓN HORIZONTAL CARDS CIRUGÍAS
   let tratamientosWidth = document.querySelector('.tratamientos').offsetWidth
   let cardWrappers = sectionPin.querySelectorAll('.card__wrapper');

   // Calculamos el ancho total de todos los elementos .card__wrapper
   let cummulativeSum = 0;
   const calcularWidth = () => {
      cardWrappers.forEach(card => {
         cummulativeSum += card.offsetWidth;
      });
   };
   calcularWidth(); // Llamamos a la función para realizar el cálculo

   let containerAnimation = gsap.to(sectionPin, {
      x: () => -(cummulativeSum - tratamientosWidth),
      ease: 'none',

      scrollTrigger: {
         trigger: '.home__services',
         start: 'top 8px',
         end: () => '+=' + sectionPin.offsetWidth,
         pin: '.home__services',
         scrub: 0.2,
         onRefresh: self => {
            if (self.start < 0) {
               self.animation.progress(gsap.utils.mapRange(self.start, self.end, 0, 1, 0));
            }
         }
      },
   })

   cardWrappers.forEach((cardWrapper) => {
      // var cardWrapperID = cardWrapper.id

      let rotate = gsap.timeline({
         scrollTrigger: {
            trigger: cardWrapper,
            start: 'left 75%',
            end: 'right 25%',
            scrub: 0.2,
            containerAnimation: containerAnimation,
            toggleActions: 'play none none reverse',
            toggleClass: {
               // targets: '.' + cardWrapperID,
               className: 'active',
            },
         },
      })
         .fromTo(cardWrapper, {
            rotation: 5,
         },
            {
               rotation: -5,
               duration: .5,
               ease: 'none',
            })
   })

};

// Ciclo de vida
onMounted( async () => {
   await initialiseSectionHorizontal();
});
</script>

<style lang="scss" scoped>
.tratamientos.girl {
   display: flex;
   flex-direction: column;
   justify-content: space-between;
   align-items: center;
   height: 150vh;
   
   @media (max-width: 1024px) and (orientation: portrait) {
      height: fit-content;
   }
   
   // @media (max-width: 767px) {
   //    height: calc(var(--full-height) * 1.9);
   // }
}

.tratamientos.bg-light {
   color: var(--blue-1);
}
</style>
