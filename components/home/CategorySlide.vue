<template>
  
    <div class="card rounded-3xl overflow-hidden" :class="props.classes" v-if="category">
        <nuxt-link :to="processedLink" class="w-full h-full block" aria-label="Ver detalles de cirugía">
          <div v-if="category.acf && category.acf.badge">
            <p class="absolute top-2 left-2 bg-blue-6 text-white px-4 pt-2 pb-1 rounded-2xl z-10">{{ category.acf.badge }}</p>
          </div>
            <picture class="h-[42rem] xl:max-h-screen/70 bg-nude-8 block min-h-full" v-if="category.acf && category.acf.imagen_cards && category.acf.imagen_cards.url">
                <img loading="lazy"
                    class="size-full object-cover object-center blablabla"
                    :src="category.acf.imagen_cards.url"
                    :srcset="category.acf.imagen_cards.srcset"
                    :alt="category.acf.imagen_cards.alt"
                    :width="category.acf.imagen_cards.width"
                    :height="category.acf.imagen_cards.height"
                />
            </picture>
            <div 
              v-if="category.acf.oferta_desde"
              class="category__title bg-nude-8/50 backdrop-blur transform-[translateZ(0)] will-change-transform bg-opacity-80 flex flex-col justify-end items-center gap-2 bottom-2 p-6 absolute w-[calc(100%-1rem)] m-auto left-0 right-0 rounded-xl overflow-hidden"
            >
                <h3 class="h6 text-center uppercase text-clamp-sm font-semibold mb-0">{{ category.title.rendered }}</h3>

                <div class="flex gap-2">
                  <div class="desde !text-gold-3 text-clamp-base drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline [&>span]:text-red-600 [&>span]:opacity-50" 
                    v-if="category.acf && category.acf.precio_desde" 
                    v-html="category.acf.precio_desde"
                  ></div>
                  <div class="desde !text-gold-3 text-clamp-base drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline" 
                    v-if="category.acf.rebaja" 
                    v-html="category.acf.rebaja"
                  ></div>
                </div>
                <ElementsCountDown :data="category.acf" />
                <div class="w-fit pb-1 pt-2 px-6 bg-blue-1 text-nude-8 text-center uppercase rounded-3xl font-geomanist hover:bg-blue-6 transition-colors">Saber más</div>
            </div>
            <div v-else class="category__title bg-nude-8/50 backdrop-blur transform-[translateZ(0)] will-change-transform bg-opacity-80 flex flex-col justify-end items-center gap-2 bottom-2 p-6 absolute w-[calc(100%-1rem)] m-auto left-0 right-0 rounded-xl overflow-hidden">
                <h3 class="h6 text-center uppercase text-clamp-sm font-semibold mb-0">{{ category.title.rendered }}</h3>

                <p class="desde !text-gold-3 text-clamp-base drop-shadow lowercase font-normal mb-0" 
                  v-if="category.acf && category.acf.precio_desde" 
                  v-html="category.acf.precio_desde"
                ></p>
                <div v-html="category.excerpt.rendered" class="[&>p]:text-sm [&>p]:mb-0 [&>p]:text-center [&>p]:text-balance"></div>
                <div class="w-fit pb-1 pt-2 px-6 bg-blue-1 text-nude-8 text-center uppercase rounded-3xl font-geomanist hover:bg-blue-6 transition-colors">Saber más</div>
            </div>
        </nuxt-link>
    </div>
    <div v-else>
        <p>Cargando categoría...</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { getTratamiento } from '@/composables/useFetch';

// Definir props
const props = defineProps({
  categoryId: {
    type: Number,
    required: true
  },
  classes: {
    type: String,
  }
});

// Propiedad computada
const processedLink = computed(() => {
  if (category.value && category.value.link) {
    const url = new URL(category.value.link);
    return url.pathname; // Devuelve solo la ruta
  }
  return ''; // Devuelve una ruta vacía si no hay URL
});

const { data: category, error, pending } = await useAsyncData(`tratamiento-${props.categoryId}`, () => getTratamiento({ id: props.categoryId }));

</script>
