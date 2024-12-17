<template>
    <header v-if="data"
        class="heading__cirugias h-vh/95 px-8 xl:px-16 py-6 xl:py-12 mb-0 col-start-1 col-span-full xl:col-span-11 flex justify-center items-end bg-cover bg-center"
        :style="`background: linear-gradient(to bottom, rgba(28, 44, 68, 0) 10%, rgba(28, 44, 68, 0.75) 80%), url('${data.featured_image_data.url}'); background-size: cover; background-position: center;`">
        <div class="header__content pb-8 relative z-10">
            <p class="desde !text-nude-8 leading-10 text-2xl [&>span]:span-gradient"
                v-if="data.acf && data.acf.precio_desde" v-html="data.acf.precio_desde"></p>
            <h1 v-if="data.title && data.title.rendered"
                class="text-nude-8 text-6xl mb-10 text-clamp-6xl text-balance text-center">
                <u>{{ data.title.rendered }}</u>
            </h1>
            <img v-if="data.acf && data.acf.logo" :src="data.acf.logo.url" width="270" height="44" alt="Bloome by Egos"
                class="mx-auto">
        </div>
    </header>
    <div v-if="data.acf && data.acf.formulario"
        class="form__wrapper min-h-[620px] h-vh/95 bg-blue-1 [.blackfriday_&]:!bg-blackfriday p-12 pt-24 col-start-1 col-span-full xl:col-start-12 xl:col-span-5 flex flex-col justify-center items-stretch [.estetica:not(.blackfriday)_&]:bg-crema">
        <FormsCirugia :identificador="'topPage'" :portalId="String(data.acf.formulario.portalid)"
            :formId="data.acf.formulario.formid" :name="data.title.rendered" :route="route" />
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

<style scoped>
.heading__cirugias {
    width: 100%;
    /* height: calc(100 * var(--vh) - 50px); */
    /* min-height: 700px; */
    /* @media (min-width: 1025px) {
        height: 900px;
    }
    @media (min-width: 1440px) {
        height: 920px;
    }
    @media (max-width: 1024px) {
        height: 700px;
    }
    @media (max-width: 768px) {
        height: 940px;
    }
    @media (max-width: 560px) {
        height: 800px;
    } */
}
</style>
