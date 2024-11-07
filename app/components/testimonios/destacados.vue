<template>
    <div class="testimonios__list max-w-full p-8 lg:px-20 lg:pb-4 lg:pt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4"
        v-if="testimonios">
        <article v-for="testimonio in testimonios" :key="testimonio.id"
            class="card item rounded-xl overflow-hidden flex flex-col justify-between items-center gap-2 lg:gap-8 bg-nude-6 p-0">
            <nuxt-link :to="`/opinion-egos/${testimonio.slug}`" class="size-full grid grid-rows-[repeat(2,_65%_35%)]">
                <div class="testimonios__image overflow-hidden w-full h-full"
                    v-if="testimonio.featured_image_data && testimonio.featured_image_data.url">
                    <UiImage :data="testimonio" class="cover" loading="lazy" />
                </div>
                <div
                    class="testimonios__content bg-blue-1 [.blackfriday_&]:!bg-gold-2 p-6 text-center flex flex-col justify-center items-center">
                    <h3 class="h6 text-clamp-base xl:text-clamp-xl font-medium text-nude-8">{{ testimonio.title }}</h3>
                    <div
                        class="button pt-1 px-6 border border-solid text-nude-8 border-nude-8/25 text-center uppercase rounded-xl">
                        Saber más
                    </div>
                </div>
            </nuxt-link>
        </article>
    </div>
</template>

<script setup>
// Cargar testimonios
const { data: testimonios, error: testimoniosError } = await useAsyncData(
    'testimonios-destacados',
    async () => {
        try {
            const response = await getTestimoniosDestacados();
            return response || {}; // Asegurarse de que siempre se retorne un objeto
        } catch (error) {
            console.error('Error fetching testimonios:', error);
            return {}; // En caso de error, retornar un objeto vacío
        }
    }
);
</script>
