<template>
    <header v-if="data" class="heading__cirugias">
        <UiImage :data="data" class="object-cover object-center size-full absolute inset-0 z-0" :preload="true" />
        <div class="header__content pb-8 relative z-10">
            <p class="desde !text-nude-8 leading-10 text-2xl [&>span]:span-gradient"
                v-if="data.acf && data.acf.precio_desde" v-html="data.acf.precio_desde"></p>
            <h1 v-if="data.title && data.title.rendered" class="text-nude-8 text-6xl mb-10 text-clamp-6xl text-balance">
                <u>{{ data.title.rendered }}</u></h1>
            <!-- <div v-if="data.content && data.content.rendered" class="answer text-nude-8 [&>h2]:!mb-8 [&>h2]:text-2xl [&>p]:text-lg [&>p]:max-w-[75ch]" v-html="data.content.rendered"></div> -->
        </div>
    </header>
    <div v-if="data.acf && data.acf.formulario"
        class="form__wrapper bg-blue-1 p-12 pt-24 col-[1_/_span_16] xl:col-span-5 flex flex-col justify-center items-stretch">
        <FormsCustomForm :identificador="'topPage'" :portalId="String(data.acf.formulario.portalid)"
            :formId="data.acf.formulario.formid" />
    </div>
</template>

<script setup>


const props = defineProps({
    data: {
        type: Object
    }
})

</script>

<style lang="scss" scoped>
.heading__cirugias {
    @apply min-h-[90vh] xl:min-h-screen px-8 xl:px-16 py-6 xl:py-12 mb-0 col-[1_/_span_16] xl:col-span-11 flex items-end bg-cover bg-center;

    &::before {
        @apply content-[''] size-full absolute z-[1] left-0 top-0 opacity-80 mix-blend-multiply bg-gradient-to-b from-transparent from-[10%] to-blue-1
    }
}
</style>
