<template>
    <div class="tabla_wrapper col-[2/-2] mt-8 [.estetica:not(.blackfriday)_&]:text-vermell" v-if="contentData.opciones_listado == 'tabla'">
        <div class="answer__tabla grid grid-cols-1 lg:grid-cols-[170px_1fr_1fr_1fr] gap-8"
            v-for="table in contentData.list_tabs" :key="table.tabla">
            <div class="row row0 hidden lg:block">
                <div class="image_container mb-2 flex flex-col items-center overflow-hidden min-h-[300px] w-full"></div>
                <div class="contenido_tabla">
                    <div v-if="contentData.titulos_filas.fila_1" class="mb-1" v-html="contentData.titulos_filas.fila_1">
                    </div>
                    <div v-if="contentData.titulos_filas.fila_2" class="mb-1" v-html="contentData.titulos_filas.fila_2">
                    </div>
                    <div v-if="contentData.titulos_filas.fila_3" class="mb-1" v-html="contentData.titulos_filas.fila_3">
                    </div>
                </div>
            </div>
            <div v-for="(header, index) in table.tabla" class="column" :class="`column${index + 1}`">
                <div class="image_container mb-2 flex flex-col items-center overflow-hidden min-h-[300px] w-full gap-4">
                    <img class="max-w-[250px] rounded-2xl bg-crema" loading="lazy" :src="header.cabecera_tabla.imagen_tabla.url"
                        :srcset="header.cabecera_tabla.imagen_tabla.srcset"
                        :width="header.cabecera_tabla.imagen_tabla.width"
                        :height="header.cabecera_tabla.imagen_tabla.height"
                        :alt="header.cabecera_tabla.imagen_tabla.alt" />
                    <div v-html="header.cabecera_tabla.descripcion_tabla"
                        class="[&_.h5]:text-clamp-base [&_p]:text-clamp-sm"></div>
                </div>
                <div class="contenido_tabla grid grid-rows-[repeat(auto-fit,_minmax(150px,_1fr))]">
                    <div v-if="header.contenido_tabla.celda_1"
                        class="mb-1 [&>*]:mb-0 [&>*]:text-clamp-sm before:content-[''] before:h-[1px] before:absolute before:w-full before:bg-nude-8 before:opacity-20 before:-top-6 before:left-0 [.estetica:not(.blackfriday)_&]:before:bg-vermell"
                        v-html="header.contenido_tabla.celda_1"></div>
                    <div v-if="header.contenido_tabla.celda_2"
                        class="mb-1 [&>*]:mb-0 [&>*]:text-clamp-sm before:content-[''] before:h-[1px] before:absolute before:w-full before:bg-nude-8 before:opacity-20 before:-top-6 before:left-0 [.estetica:not(.blackfriday)_&]:before:bg-vermell"
                        v-html="header.contenido_tabla.celda_2"></div>
                    <div v-if="header.contenido_tabla.celda_3"
                        class="mb-1 [&>*]:mb-0 [&>*]:text-clamp-sm before:content-[''] before:h-[1px] before:absolute before:w-full before:bg-nude-8 before:opacity-20 before:-top-6 before:left-0 [.estetica:not(.blackfriday)_&]:before:bg-vermell"
                        v-html="header.contenido_tabla.celda_3"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        contentData: {
            type: Object,
            required: true,
        },
    })
</script>

<style lang="scss" scoped></style>
