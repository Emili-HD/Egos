<template>
   <div class="tabla_wrapper" v-if="contentData.opciones_listado == 'tabla'">
      <div class="answer__tabla" v-for="table in contentData.list_tabs" :key="table.tabla">
         <div class="row row0">
            <div class="image_container mb-2"></div>
            <div class="contenido_tabla">
               <div v-if="contentData.titulos_filas.fila_1" class="mb-1" v-html="contentData.titulos_filas.fila_1"></div>
               <div v-if="contentData.titulos_filas.fila_2" class="mb-1" v-html="contentData.titulos_filas.fila_2"></div>
               <div v-if="contentData.titulos_filas.fila_3" class="mb-1" v-html="contentData.titulos_filas.fila_3"></div>
            </div>
         </div>
         <div v-for="(header, index) in table.tabla" class="column" :class="`column${index + 1}`">
            <div class="image_container mb-2">
               <NuxtImg loading="lazy" :src="header.cabecera_tabla.imagen_tabla.url" :alt="header.cabecera_tabla.imagen_tabla.alt" />
               <div v-html="header.cabecera_tabla.descripcion_tabla"></div>
            </div>
            <div class="contenido_tabla">
               <div v-if="header.contenido_tabla.celda_1" class="mb-1" v-html="header.contenido_tabla.celda_1">
               </div>
               <div v-if="header.contenido_tabla.celda_2" class="mb-1" v-html="header.contenido_tabla.celda_2">
               </div>
               <div v-if="header.contenido_tabla.celda_3" class="mb-1" v-html="header.contenido_tabla.celda_3">
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
   // Props
   const props = defineProps({
      contentData: {
         type: Object,
         required: true
      }
   })
</script>

<style lang="scss" scoped>
</style>
