<template>
    <section class="min-h-screen grid grid-cols-1 lg:grid-cols-2" v-if="page">
        <div class="size-full min-h-screen/70 flex justify-center items-center">
            <h1 class="z-10 text-nude-8 text-center mt-10">{{ page.title.rendered }}</h1>
            <UiImage :data="page" class="absolute cover" loading="eager" />
        </div>
        <div v-if="page.acf" id="formulario"
            class="form__wrapper w-full bg-blue-2 p-6 xl:pt-24 col-2 flex flex-col justify-center items-stretch">
            <!-- <FormsCirugia class="!w-[max(360px,_35vw)] m-auto" :identificador="'topPage'" :portalId="String(page.acf.portalid)"
                :formId="page.acf.formid" /> -->
            <FormsSmtpForm />
        </div>
    </section>
</template>

<script setup>
const { data: page, error } = await useAsyncData(() => getPage(19344))

const { generateYoastHead } = useYoastHead(page);
const yoastHead = generateYoastHead();

useHead({
    ...yoastHead,
});
</script>
