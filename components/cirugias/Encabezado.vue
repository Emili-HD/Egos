<template>
  <header class="header-gradient min-h-[90vh] xl:min-h-screen px-8 xl:px-16 pt-[40vh] pb-6 xl:py-12 mb-0 col-[1_/_span_16] xl:col-span-11 flex items-end bg-cover bg-center before-gradient" >
    <img loading="lazy"
        class="size-full object-cover object-center absolute inset-0 block"
        v-if="data.featured_image_data"
        :src="data.featured_image_data.url"
        :srcset="data.featured_image_data.srcset"
        :alt="data.featured_image_data.alt"
        :width="data.featured_image_data.width"
        :height="data.featured_image_data.height"
    />
    <div class="header__content z-10">
      <div v-if="data.acf.rebaja">
        <h1 class="text-nude-8 mb-6 text-clamp-6xl text-balance leading-none"><u>{{ data.title.rendered }}</u></h1>
        <div class="answer text-nude-8 [&>h2]:!mb-8 [&>h2]:text-3xl [&>h2]:text-balance [&>p]:text-lg" v-html="data.content.rendered"></div>
        <div class="flex flex-col xl:flex-row-reverse gap-8">
          <div class="flex gap-2 bg-blue-1/60 backdrop-blur-lg p-8 w-fit rounded-2xl m-0">
            <div class="desde leading-10 span-gradient !text-clamp-2xl drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline [&>span]:text-red-600 [&>span]:opacity-50" 
              v-if="data.acf.precio_desde" 
              v-html="data.acf.precio_desde"
            ></div>
            <div class="desde leading-10 span-gradient !text-clamp-2xl drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline" 
              v-if="data.acf.rebaja" 
              v-html="data.acf.rebaja"
            ></div>
          </div>
          <ElementsButton  v-if="showPresupuestoLink" class="gold text-clamp-xs uppercase text-center" href="#presupuesto" @click.passive="pressu">
            Calcula tu presupuesto
          </ElementsButton>
          <ElementsCountDown class="x2 max-w-lg m-0" :data="data.acf" />
        </div>
      </div>
      <div v-else class="flex gap-6 flex-col items-center xl:items-start">
        <p class="desde !text-nude-8 leading-none text-2xl [&>span]:span-gradient bg-blue-1/60 backdrop-blur-lg p-4 mb-0 w-fit rounded-2xl flex flex-row justify-center gap-2 items-center" 
           v-if="data.acf.precio_desde" v-html="data.acf.precio_desde"
        ></p>
        <ElementsButton  v-if="showPresupuestoLink" class="gold text-clamp-sm uppercase text-center w-fit xl:hidden" href="#presupuesto" @click.passive="pressu">
          Calcula tu presupuesto
        </ElementsButton>
        <div class="max-xl:mt-20">
          <h1 class="text-nude-8 mb-6 text-clamp-4xl text-balance leading-none">{{ data.title.rendered }}</h1>
          <div class="answer text-nude-8 [&>h2]:!mb-8 [&>h2]:text-2xl [&>h2]:text-balance [&>p]:text-lg [&>p]:text-balance" v-html="data.content.rendered"></div>
        </div>
      </div>
      
    </div>
  </header>
  <div id="formulario" class="form__wrapper bg-blue-1 p-12 pt-24 col-[1_/_span_16] xl:col-span-5 flex flex-col justify-center items-stretch">
    <FormsCustomForm :identificador="'topPage'" :portalId="String(data.acf.formulario.portalid)" :formId="data.acf.formulario.formid" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showPresupuestoLink = ref(false);

const { $lenis: lenis } = useNuxtApp();
const pressu = () => {
  lenis.scrollTo('#presupuesto', { offset: -60 });
}

const checkPresupuestoLink = () => {
    showPresupuestoLink.value = !!document.getElementById('presupuesto');
}

// Props
const props = defineProps({
  data: {
    type: Object
  }
})

let observer; // Define observer in the outer scope

onMounted(() => {
  checkPresupuestoLink(); // Initial check in case #presupuesto is already in the DOM

  observer = new MutationObserver(() => {
      checkPresupuestoLink();
  });

  observer.observe(document.body, {
      childList: true,
      subtree: true
  });
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>

<style lang="scss" scoped>
// estilos vacíos
</style>
