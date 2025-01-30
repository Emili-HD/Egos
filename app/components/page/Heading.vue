<template>
    <header v-if="data"
        class="heading__cirugias w-full lg:h-vh mb-0 col-start-1 col-span-full flex flex-col lg:flex-row justify-center items-strecht bg-cover bg-center">
        <div class="header__content pb-28 relative z-10 flex justify-center items-end w-full lg:w-[calc(100vw/16*9)] h-vh lg:h-full"
            :style="`background: linear-gradient(to bottom, rgba(28, 44, 68, 0) 10%, rgba(28, 44, 68, 0.75) 80%), url('${data.featured_image_data.url}'); background-size: cover; background-position: center;`">
            <p class="desde !text-nude-8 leading-10 text-2xl [&>span]:span-gradient"
                v-if="data.acf && data.acf.precio_desde" v-html="data.acf.precio_desde"></p>
            <h1 v-if="data.title && data.title.rendered"
                class="text-nude-8 text-6xl mb-10 text-clamp-6xl text-balance text-center">
                <u>{{ data.title.rendered }}</u>
            </h1>
            <img v-if="data.acf && data.acf.logo" :src="data.acf.logo.url" width="270" height="44" alt="Bloome by Egos"
                class="mx-auto">
        </div>
        <div v-if="data.acf && data.acf.formulario"
            class="form__wrapper min-h-[620px] w-full lg:w-[calc(100vw/16*7)] h-vh bg-blue-1 [.blackfriday_&]:!bg-blackfriday pt-16 col-start-1 col-span-full xl:col-start-10 xl:col-span-7 flex flex-col justify-center items-stretch [.estetica:not(.blackfriday)_&]:bg-crema">
            <FormsEsteticaForm :identificador="'topPage'" :portalId="String(data.acf.formulario.portalid)"
                :formId="data.acf.formulario.formid" :name="data.title.rendered" :route="route" />
        </div>
    </header>
</template>

<script setup>
    const props = defineProps({
        data: {
            type: Object
        },
        route: String,
    })
</script>
