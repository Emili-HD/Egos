<template>
    <section class="bg-gold-1 min-h-96 flex items-center justify-center flex-wrap py-20" v-if="data && data.hablan_de_egos">
        <div class="section__header p-8 xl:px-20 xl:py-0 flex flex-col justify-center items-center h-fit text-left xl:text-center w-full z-10">
            <h2 class=" w-full my-0">Hablan de nosotros</h2>
            <ElementsDivider />
        </div>
        <div class="flex justify-center items-center h-full gap-4">
            <div v-for="item in data.hablan_de_egos" class="rounded-xl overflow-hidden">
                <img class="w-80 grayscale" :src="item.logo.url" alt="">
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
