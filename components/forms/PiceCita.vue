<template>
   <section class="pidecita">
      <div class="half-left">
         <ElementsGoogleMap @update-content="handleContentUpdate" @update-options="handleOptionsUpdate" />
      </div>
      <div id="formulario" class="half-right bg-blue-1 p-8 xl:p-12 rounded-xl h-full w-full mb-0 pt-24 absolute top-0">
         <div v-html="content"></div>
         <div class="form__wrapper">
            <FormsCirugia :identificador="'map'" :portalId="portalId" :formId="formId" />
         </div>
      </div>
   </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getSinglePage } from '@/composables/useApi';

// Estados reactivos
const pages = ref(null)
const content = ref('')
const options = ref('all');

// Props
const props = defineProps({
   titulo: {
      type: String,
      default: 'Pide Cita'
   },
   portalId: String,
   formId: String,
   identificador: String,
});

// Métodos
const handleContentUpdate = (newContent) => {
   content.value = newContent;
};

const handleOptionsUpdate = (newOptions) => {
  options.value = newOptions;
};

// Ciclo de vida
const loadSinglePage = async () => {
   try {
      const pageResponse = await getSinglePage(8)
      pages.value = pageResponse.data
   } catch (error) {
      console.error(error)
   }
};

await nextTick()
await loadSinglePage()
</script>

<style lang="scss" scoped>
.clinics {
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   left: calc(100vw / 16);

   ul {
      list-style: none;
      margin-bottom: 0;

      li {
         color: var(--blue-1);
      }
   }
}

.infowindow {
   padding: 0 var(--spacing);

   h4 {
      font-size: 1.8rem;
   }
}
</style>
