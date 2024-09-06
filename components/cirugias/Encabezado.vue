<template>
    <header class="heading__cirugias">
        <UiImage :data="data" class="hero" :preload="true" />
        <div class="header__content z-10">
            <div v-if="data.acf && data.acf.rebaja">
                <h1 v-if="data.title && data.title.rendered"
                    class="text-nude-8 mb-6 text-clamp-6xl text-balance leading-none"><u>{{ data.title.rendered }}</u>
                </h1>
                <div class="flex flex-col xl:flex-row-reverse gap-8">
                    <div class="flex gap-2 bg-blue-1/60 backdrop-blur-lg p-8 w-fit rounded-2xl m-0">
                        <div class="desde leading-10 span-gradient !text-clamp-2xl drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline [&>span]:text-red-600 [&>span]:opacity-50"
                            v-if="data.acf && data.acf.precio_desde" v-html="data.acf.precio_desde"></div>
                        <div class="desde leading-10 span-gradient !text-clamp-2xl drop-shadow lowercase font-normal mb-0 [&>span]:line-through inline"
                            v-if="data.acf && data.acf.rebaja" v-html="data.acf.rebaja"></div>
                    </div>
                    <ElementsButton v-if="showPresupuestoLink" class="gold text-clamp-xs uppercase text-center"
                        href="#presupuesto">
                        Calcula tu presupuesto
                    </ElementsButton>
                    <ElementsCountDown class="x2 max-w-lg m-0" :data="data.acf" />
                </div>
            </div>
            <div v-else class="flex gap-6 flex-col items-center">
                <p class="desde !text-nude-8 leading-none text-2xl [&>span]:span-gradient bg-blue-1/60 backdrop-blur-lg p-4 mb-0 w-fit rounded-2xl flex flex-row justify-center gap-2 items-center"
                    v-if="data.acf && data.acf.precio_desde" v-html="data.acf.precio_desde"></p>
                <ElementsButton v-if="showPresupuestoLink" class="gold text-clamp-sm uppercase text-center w-fit"
                    href="#presupuesto">
                    Calcula tu presupuesto
                </ElementsButton>
                <div class="max-xl:mt-20">
                    <h1 v-if="data.title && data.title.rendered"
                        class="text-nude-8 mb-6 text-clamp-4xl text-balance leading-none text-center max-w-[30ch]">{{
                        data.title.rendered }}</h1>
                    <!-- <div v-if="data.content && data.content.rendered" class="answer text-nude-8 [&>h2]:!mb-8 [&>h2]:text-2xl [&>h2]:text-balance [&>p]:text-lg [&>p]:text-balance [&>p]:max-w-[75ch]" v-html="data.content.rendered"></div> -->
                </div>
            </div>

        </div>
    </header>
    <div v-if="data.acf && data.acf.formulario" id="formulario"
        class="form__wrapper bg-blue-1 p-6 xl:pt-24 col-[1_/_span_16] xl:col-span-5 flex flex-col justify-center items-stretch">
        <FormsCustomForm :identificador="'topPage'" :portalId="String(data.acf.formulario.portalid)"
            :formId="data.acf.formulario.formid" />
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showPresupuestoLink = ref(false);
const checkPresupuestoLink = () => {
    showPresupuestoLink.value = !!document.getElementById('presupuesto');
}

// Props
const props = defineProps({
    data: {
        type: Object
    }
})

let observer; // Define observer in the outer scope

onMounted(() => {
    checkPresupuestoLink(); // Initial check in case #presupuesto is already in the DOM

    observer = new MutationObserver(() => {
        checkPresupuestoLink();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

onBeforeUnmount(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>

<style lang="scss" scoped>
.heading__cirugias {
    @apply min-h-[90vh] xl:min-h-screen px-8 xl:px-16 py-6 xl:py-12 mb-0 col-[1_/_span_16] xl:col-span-11 flex justify-center items-end bg-cover bg-center;

}

.heading__cirugias::before {
    @apply content-[''] size-full absolute z-[1] left-0 top-0 opacity-80 mix-blend-multiply bg-gradient-to-b from-transparent from-[10%] to-blue-1
}
</style>
