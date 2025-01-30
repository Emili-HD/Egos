<template>
    <div class="card bg-nude-7 rounded-xl p-2 grid grid-cols-[1fr_2fr] grid-rows-[84px_50px] gap-x-4"
        :class="props.classes">
        <nuxt-link :to="processedLink(data.permalink)" class="w-full min-h-full col-start-1 row-span-2 rounded-lg overflow-hidden"
            aria-label="Ver detalles de cirugía" v-if="data">
            <picture class="group aspect-square w-36  ">
                <!-- <UiImage :data="data" class="scale-effect" loading="lazy" /> -->
                <img 
                    :src="data.featured_image" 
                    :width="data.featured_image_data?.width"
                    :height="data.featured_image_data?.height"
                    :alt="data.featured_image_data?.alt" 
                />
            </picture>
        </nuxt-link>
        <div class="category__title flex flex-col justify-end items-center gap-2 p-4 relative w-full m-auto row-start-1 col-start-2">
            <h3 v-if="data.post_title"
                class="h6 text-left text-clamp-sm text-pretty font-semibold mb-0 font-lora">{{
                    data.post_title }}</h3>
        </div>
        <UiButton v-if="data.acf && data.acf.anchor" :to="processedLink(data.permalink)"
            class="button text-xs font-semibold py-1 px-6 border border-solid border-blue-1/25 text-center uppercase rounded-xl text-balance w-full row-start-2 col-start-2">
            Saber más sobre {{ data.acf.anchor }}</UiButton>
        <UiButton v-else :to="processedLink(data.permalink)"
            class="button py-1 px-6 border border-solid border-blue-1/25 text-center uppercase rounded-xl row-start-2 col-start-2">Saber más
        </UiButton>
    </div>
</template>

<script setup>
    const props = defineProps({
        data: {
            type: Object,
            // required: true
        },
        classes: {
            type: String,
        }
    });

    const processedLink = (permalink) => {
        return permalink.replace('https://clinicaegos.com', '')
    }
</script>
