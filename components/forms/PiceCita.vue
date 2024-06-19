<template>
  <section
    class="pidecita w-screen grid grid-cols-16 grid-rows-2 lg:grid-rows-1 min-h-screen py-0 lg:gap-0"
  >
    <div class="col-span-full lg:col-span-11 min-h-screen/60">
      <LazyElementsGoogleMap
        @update-content="handleContentUpdate"
        @update-options="handleOptionsUpdate"
      />
    </div>
    <div
      id="formulario"
      class="half-right bg-blue-1 p-8 xl:p-12 h-fit lg:h-full w-full mb-0 top-0
            lg:min-h-screen flex flex-col justify-center 
            col-span-full lg:col-[12/17] row-start-2 lg:row-start-1"
    >
      <div class="-mx-4 mb-12" v-html="content"></div>
      <div class="form__wrappe p-4 mb-12 lg:p-12 xl:p-0">
        <FormsCirugia
          :identificador="'map'"
          :portalId="portalId"
          :formId="formId"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Estados reactivos
const content = ref('')
const options = ref('all')

// Props
const props = defineProps({
  titulo: {
    type: String,
    default: 'Pide Cita',
  },
  portalId: String,
  formId: String,
  identificador: String,
})

// Métodos
const handleContentUpdate = (newContent) => {
  content.value = newContent
}

const handleOptionsUpdate = (newOptions) => {
  options.value = newOptions
}

</script>

<style lang="scss" scoped>
// empty style
</style>
