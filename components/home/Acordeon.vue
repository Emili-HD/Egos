<template>
   <section class="all-cirugias grid grid-cols-16 gap-x-0 gap-y-8 xl:gap-8 px-4 py-20" v-if="data">
      <div class="panel__content col-[2_/_span_14] xl:col-[2_/_span_6] sm:row-2 xl:row-1">
         <h2 class="panel__content-heading h3">{{ data.heading }}</h2>
         <div class="panel__content-description p-0">
            <div class="panel__content-description-content" v-html="data.description"></div>
         </div>
         
         <div class="list accordion__list ">
            <div class="accordion__list--item flex flex-col flex-wrap justify-between py-6 cursor-pointer separador-lista" 
              v-for="content in data.items" :key="content.titulo"
              >
               <div class="accordion__list--item-title flex flex-row justify-between items-center
                    [&>*]:font-geomanist [&>*]:font-normal [&>*]:m-0">
                  <div class="max-w-[85%] [&>.h4]:text-clamp-base [&>.h4]:mb-0 [&>.h4]:font-geomanist text-clamp-base mb-0 !font-light" v-html="content.titulo"></div>
                  <svg class="h-6 w-6 stroke-blue-1 stroke-1" viewbox="0 0 24 24">
                     <path class="iconV" d="M 12,0 V 24" />
                     <path class="iconH" d="M 0,12 H 24" />
                  </svg>
               </div>
               <div class="accordion__list--item-descripcion self-end h-0 w-full xl:w-[60%] opacity-0 relative">
                  <p class="pb-1">{{ content.descripcion }}</p>
                  <ul class="accordion__relacionados">
                     <li class="list__wrapper" v-for="categoryId in content.relacionadas" :key="categoryId">
                        <ClientOnly >
                           <NuxtLink v-if="categoriasPorId[categoryId] && categoriasPorId[categoryId].link" :to="getProcessedLink(categoriasPorId[categoryId].link)">
                              <p><strong>{{ categoriasPorId[categoryId]?.title.rendered }}: </strong> 
                                 <span v-html="categoriasPorId[categoryId]?.acf.descripcion_cirugias_home"></span>
                              </p>
                           </NuxtLink>
                        </ClientOnly>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   
      <div class="panel__image col-[2_/_span_14] xl:col-[9_/_span_7] sm:row-1 xl:row-1 aspect-square w-full h-full overflow-hidden rounded-3xl self-center">
         <figure class="panel__image-img" v-for="(image, index) in data.items" :key="index" v-show="activeIndex === index">
            <img 
               loading="lazy" 
               :src="image.imagen.url" 
               :srcset="image.imagen.srcset" 
               :width="image.imagen.width" 
               :height="image.imagen.height" 
               :alt="image.imagen.alt" 
            />
         </figure>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { getTratamiento } from '@/composables/useFetch';

// import gsap from 'gsap';
const { $gsap: gsap } = useNuxtApp();

// Props
const props = defineProps({
  data: Object
});

const categoriasPorId = ref({});

watch(() => props.data.items, async (nuevosItems) => {
  // Por cada grupo en data.items, haz las consultas para sus categorías relacionadas
  nuevosItems.forEach(async (item) => {
    item.relacionadas.forEach(async (categoryId) => {
      // Evita realizar la consulta si ya tenemos los datos de esta categoría
      if (!categoriasPorId.value[categoryId]) {
        const { data } = await useAsyncData(`tratamiento-${categoryId}`, () => getTratamiento({ id: categoryId }));
        categoriasPorId.value[categoryId] = data.value;
      }
    });
  });
}, { immediate: true, deep: true });

const getProcessedLink = (link) => {
  if (!link) {
    return ''; // Devuelve una cadena vacía si el link es undefined o nulo
  }
  try {
    const url = new URL(link);
    return url.pathname;
  } catch (error) {
    console.error("Error creating URL object:", error);
    return ''; // Devuelve una cadena vacía en caso de error
  }
};

const activeIndex = ref(0); // índice del elemento activo

// Métodos
const initAccordion = async () => {
   const groups = gsap.utils.toArray(".accordion__list--item");
   const animations = [];

   groups.forEach((group, index) => {
      const title = group.querySelector('.accordion__list--item-title');
      const description = group.querySelector('.accordion__list--item-descripcion');
      const iconV = group.querySelector('.iconV');
      const iconH = group.querySelector('.iconH');

      gsap.set(description, { autoAlpha: 0, height: 0, marginTop: 0, marginBottom: 0 });
      gsap.set([iconV, iconH], { rotate: 0, transformOrigin: '50% 50%' });

      const tl = gsap.timeline({ paused: true, reversed: true })
         .fromTo(description, { autoAlpha: 0, height: 0, marginTop: 0, marginBottom: 0 }, { duration: 0.2, autoAlpha: 1, height: 'auto', marginTop: '2rem', marginBottom: '2rem' }, 0)
         .fromTo([iconV, iconH], { rotate: 0, transformOrigin: '50% 50%' }, { duration: 0.25, rotate: 45, stagger: 0.05, transformOrigin: '50% 50%' }, '<');

      animations[index] = tl;
      

      title.addEventListener('click', () => {
         if (tl.reversed()) {
         animations.forEach((anim, animIndex) => {
            if (anim !== tl) anim.reverse().then(() => anim.pause());
         });
         tl.play();
         activeIndex.value = index; // Actualizar el índice activo al abrir
         } else {
         tl.reverse();
         activeIndex.value = 0; // Resetea el índice activo al cerrar
         }
      });
   });
   return { activeIndex };
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
