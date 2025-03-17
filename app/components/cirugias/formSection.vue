<template>
    <div v-if="data && data.quiz && data.quiz.formid" id="presupuesto"
        class="form__wrapper p-8 xl:p-20 col-[1/-1] xl:col-[1/9] bg-blue-1 [.blackfriday_&]:!bg-blackfriday flex flex-col justify-center items-stretch h-[750px] 2xl:h-[980px]">
        <FormsQuiz :identificador="'formPage'" :portalId="String(data.quiz.portalid)" :formId="data.quiz.formid"
            :titulo="data.quiz.titulo_form" :name="name.title.rendered" />
    </div>
    <div v-else id="formulario"
        class="form__wrapper p-0 xl:p-36 col-[1/-1] xl:col-[1/9] bg-blue-1 flex flex-col justify-center items-stretch [.estetica:not(.blackfriday)_&]:bg-crema [.blackfriday_&]:bg-blackfriday h-[750px] 2xl:h-[980px]">
        <FormsEsteticaForm :identificador="'formPage'" :portalId="String(data.formulario.portalid)"
            :formId="data.formulario.formid" :name="name.title.rendered" :route="route" />
    </div>
    <div v-if="data && data.formulario && data.formulario.form_image"
        class="form__image col-[1/-1] xl:col-[9/-1] bg-cover bg-center h-[500px] lg:h-[750px] 2xl:h-[980px]"
        :style="`background-image: url('${data.formulario.form_image.url}')`">
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

// Props
const props = defineProps({
    data: {
        type: Object
    },
    name: {
        type: Object,
    },
    route: String,
})
</script>

<style lang="scss" scoped>
// empty style
</style>
