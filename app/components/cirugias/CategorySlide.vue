<template>
    <div class="card p-2 flex flex-col justify-between items-center" :class="props.classes">
        <nuxt-link :to="processedLink" class="w-full min-h-full block " aria-label="Ver detalles de cirugía"
            v-if="categoryId">
            <picture class="group aspect-square block rounded-2xl overflow-hidden mb-2">
                <!-- <UiImage :data="category" class="scale-effect" loading="lazy" /> -->
                <img loading="lazy" class="scale-effect h-full object-cover object-center"
                     :src="props.categoryId.featured_image" alt="">
            </picture>
            <div class="category__title flex flex-col justify-end items-center gap-2 p-4 relative w-full m-auto">
                <h3 v-if="props.categoryId.post_title"
                    class="h6 text-center text-clamp-base text-balance font-semibold mb-0 font-lora">{{
                        props.categoryId.post_title }}</h3>
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
    import { computed } from 'vue';
    import { useAsyncData } from 'nuxt/app';
    import { getTratamiento } from '@/composables/useApi';


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

    console.log('categoryId', props.categoryId.permalink);
    // Propiedad computada
    const processedLink = computed(() => {
        if (props.categoryId && props.categoryId.permalink) {
            const url = new URL(props.categoryId.permalink);
            return url.pathname; // Devuelve solo la ruta
        }
        return ''; // Devuelve una ruta vacía si no hay URL
    });

    // const { data: category, error } = await useAsyncData(`tratamiento-${props.categoryId}`, () => getTratamiento({ id: props.categoryId }));

</script>
