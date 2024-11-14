<template>
    <section class="flex items-center justify-center gap-4 flex-wrap py-12 border-y border-current">
        <div class="section__header px-8 xl:px-20 xl:py-0 flex flex-col justify-center items-center h-fit text-center w-full z-10">
            <h2 class="h4 w-full my-0">Hablan de EGOS</h2>
        </div>
        <div class="flex justify-center flex-wrap items-center h-full lg:gap-4 px-4">
            <div v-for="item in data.hablan_de_egos">
                <img v-if="item && item.logo && item.logo.url" loading="lazy" class="h-12 xl:h-20 w-fit grayscale" :src="item.logo.url" :alt="item.logo.alt" :width="item.logo.width" :height="item.logo.height">
            </div>
        </div>
    </section>
</template>

<script setup>

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})
</script>
