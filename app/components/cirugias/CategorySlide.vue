<template>
    <div class="card pb-12 flex flex-col justify-between items-center bg-white shadow-2xl shadow-black/10 rounded-2xl !aspect-[unset] h-full" :class="props.classes">
        <nuxt-link :to="processedLink" class="w-full min-h-[97%] block " aria-label="Ver detalles de cirugía"
            v-if="categoryId">
            <picture class="group aspect-square rounded-2xl overflow-hidden mb-2 p-2 flex flex-col justify-end">
                <!-- <UiImage :data="category" class="scale-effect" loading="lazy" /> -->
                <img loading="lazy" class="scale-effect absolute inset-0 h-full object-cover object-center"
                    :src="props.categoryId.featured_image" 
                    :alt="props.categoryId.post_title"
                />
                <h3 v-if="props.categoryId.post_title"
                    class="h6 text-center text-clamp-base text-balance font-semibold mb-0 font-lora p-4 bg-white/30 backdrop-blur-xl rounded-xl">{{
                        props.categoryId.post_title }}</h3>
            </picture>
            <div class="category__title flex flex-col justify-end items-center gap-2 p-4 relative w-full m-auto">
                <p v-if="props.categoryId.post_excerpt" v-html="props.categoryId.post_excerpt"
                    class="text-clamp-sm mb-0 text-center font-nunito"></p>
            </div>
        </nuxt-link>
        <UiButton v-if="props.categoryId.boton && props.categoryId.boton.anchor" :to="processedLink"
            class="text-xs font-semibold py-1 px-6 border border-solid border-blue-1/25 [.estetica_&]:border-vermell text-center uppercase rounded-xl text-balance w-full">
            Saber más sobre {{ props.categoryId.boton.anchor }}</UiButton>
        <UiButton v-else :to="processedLink"
            class="button py-1 px-6 border border-solid border-blue-1/25 text-center uppercase rounded-xl">Saber más
        </UiButton>
    </div>
</template>

<script setup>
    // Definir props
    const props = defineProps({
        categoryId: {
            type: Object,
            // required: true
        },
        classes: {
            type: String,
        }
    });

    // console.log('categoryId', props.categoryId.permalink);
    // Propiedad computada
    const processedLink = computed(() => {
        if (props.categoryId && props.categoryId.permalink) {
            const url = new URL(props.categoryId.permalink);
            return url.pathname; // Devuelve solo la ruta
        }
        return ''; // Devuelve una ruta vacía si no hay URL
    });
</script>
