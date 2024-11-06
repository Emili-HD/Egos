<template>
    <header v-if="data" class="heading__cirugias min-h-[90vh] h-screen max-h-[820px] 2xl:max-h-[68.75rem] px-8 xl:px-16 py-6 xl:py-12 mb-0 col-[1_/_span_16] xl:col-[1/12] flex items-end bg-cover bg-center">
        <UiImage :data="data" class="object-cover object-center size-full max-h-[820px] 2xl:max-h-[68.75rem] absolute inset-0 z-0" :preload="true" />
        <div class="header__content pb-8 relative z-10">
            <p class="desde !text-nude-8 leading-10 text-2xl [&>span]:span-gradient"
                v-if="data.acf && data.acf.precio_desde" v-html="data.acf.precio_desde"></p>
            <h1 v-if="data.title && data.title.rendered" class="text-nude-8 text-6xl mb-10 text-clamp-6xl text-balance text-center">
                <u>{{ data.title.rendered }}</u></h1>
            <img v-if="data.acf && data.acf.logo" :src="data.acf.logo.url" width="270" height="44" alt="Bloome by Egos" class="mx-auto">
        </div>
    </header>
    <div v-if="data.acf && data.acf.formulario"
        class="form__wrapper min-h-[90vh] h-screen max-h-[820px] 2xl:max-h-[68.75rem] bg-blue-1 [.blackfriday_&]:!bg-blackfriday p-12 pt-24 col-[1_/_span_16] xl:col-[12/17] flex flex-col justify-center items-stretch [.estetica:not(.blackfriday)_&]:bg-crema">
         <FormsEsteticaForm :identificador="'topPage'" :portalId="String(data.acf.formulario.portalid)"
            :formId="data.acf.formulario.formid" :name="data.title.rendered" :route="route"/>
    </div>
</template>

<script setup>


const props = defineProps({
    data: {
        type: Object
    },
    route: String,
})

</script>

<style lang="scss" scoped>
.heading__cirugias {
    &::before {
        @apply content-[''] size-full absolute z-[1] left-0 top-0 opacity-80 mix-blend-multiply bg-gradient-to-b from-transparent from-[10%] to-blue-1
    }
}
</style>
