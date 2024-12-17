<template>
    <section class="min-h-vh grid grid-cols-1 lg:grid-cols-2" v-if="page">
        <div class="size-full min-h-vh/70 flex justify-center items-center">
            <h1 class="z-10 text-nude-8 text-center mt-10">{{ page.title.rendered }}</h1>
            <UiImage :data="page" class="absolute cover" fetchpriority="high" />
        </div>
        <div v-if="page.acf" id="formulario"
            class="form__wrapper w-full bg-blue-2 p-6 xl:pt-24 col-2 flex flex-col justify-center items-stretch">
            <FormsCirugia :identificador="'topPage'" :portalId="String(page.acf.portalid)"
                :formId="page.acf.formid" />
        </div>
    </section>
</template>

<script setup>
const { data: page, error } = await useAsyncData(() => getPage(19346))

const { generateYoastHead } = useYoastHead(page);
const yoastHead = generateYoastHead();

useHead({
    ...yoastHead,
});
</script>
