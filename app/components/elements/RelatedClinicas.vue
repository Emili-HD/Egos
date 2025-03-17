<template>
    <div class="col-[2/-2] lg:col-[1/-1] flex justify-evenly p-0 lg:p-12 mt-12 gap-4 flex-wrap">
        <div v-for="item in related" class="bg-blue-1 rounded-xl w-full lg:w-1/3 lg:max-w-[30%] p-8 flex flex-col items-center" >
            <div class="w-full [&>ul>li]:!text-nude-8 [&>*]:!text-nude-8 [&>*]:mb-2 [&>ul>li]:mb-0 [&>ul]:list-none [&>ul]:p-4 [&>ul]:bg-blue-2 [&>ul]:rounded-lg [&>ul]:mb-4 [&>h4]:border-b [&>h4]:border-white/40 " v-html="item.informacion"></div>
            <NuxtLink :to="item.como_llegar" class="button gold " external target="_blank">Como llegar</NuxtLink>
        </div>
    </div>
</template>

<script setup>
// Definir props
const props = defineProps({
    related: {
        type: Array,
        default: () => null
    }
})

// Verificar si `props.related` tiene contenido y pasar los IDs si están presentes
const { data: locations, error: locationsError } = await useAsyncData('locations', async () => {
    const response = await getClinicas({
        ids: props.related && props.related.length > 0 ? props.related : null
    });
    return response
});
</script>

<style scoped>
.button {
   @apply py-2 px-6 w-fit rounded-full;
}

.gold {
   @apply text-white font-normal animate-gradient bg-gold-gradient-text bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running];
}
</style>
