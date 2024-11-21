<template>
    <div v-if="contentData.list_tabs && contentData.opciones_listado == 'columnas'"
        class="answer__columnas columnas col-[1_/_-1] grid grid-cols-16 gap-y-0 xl:gap-4 pb-0">
        <div v-for="(column, index) in contentData.list_tabs" :key="index" :class="`columna${index + 1}`"
            class="p-8 mt-0 xl:mt-24 w-full xl:w-[calc(100%+5rem)] max-h-[unset] xl:max-h-[80vh] h-fit xl:h-auto flex flex-col justify-center items-start gap-8">
            <div
                class="w-full h-fit lg:h-[34rem] p-0 lg:py-8 pointer-events-none lg:pointer-events-auto [&>h2]:text-clamp-xl">
                <div class="h-auto box-border pr-0 lg:pr-8">
                    <h2 class="h4 mb-4" v-html="column.list_title"></h2>
                    <div class="[&>ul]:list-disc [&>ul]:my-4 [&>ul>li]:mb-2 [&>h3]:text-clamp-xl" v-html="column.content_list">
                    </div>
                </div>
            </div>
        </div>
        <CirugiasFigure :contentData="contentData" />
    </div>
    <CirugiasDetallesCirugia v-if="contentData.opciones_listado === 'columnas'"
        class="tips flex flex-col lg:flex-row justify-center gap-4 bg-transparent items-stretch text-nude-8 font-normal"
        :detallesData="contentData.incluido_cirugia.tips ?? []" />
</template>

<script setup>
    const props = defineProps({
        contentData: {
            type: Object,
            required: true,
        },
    })
</script>

<style lang="scss">
    // empty css
</style>
