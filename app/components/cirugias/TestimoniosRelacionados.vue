<template>
    <div class="testimonios__list max-w-full p-8 lg:p-20  2xl:p-32 pb-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4"
        v-if="data">
        <article v-for="testimonio in data" :key="testimonio.id"
            class="card item rounded-xl overflow-hidden min-h-[300px] 2xl:min-h-[600px] flex flex-col justify-center items-center gap-2 lg:gap-8 bg-nude-6 p-0">
            <nuxt-link :to="formatPermalink(testimonio.permalink)" class="size-full">
                <div class="testimonios__image overflow-hidden w-full h-[60%]"
                    v-if="testimonio.featured_image">
                    <img loading="lazy" :src="testimonio.featured_image" :alt="data.post_title"
                        :aria-labelledby="'testimonio-title-' + data.ID" class="object-center object-cover w-full" />
                </div>
                <div
                    class="testimonios__content p-6 text-center h-[40%] flex flex-col justify-center items-center">
                    <h3 class="h6 text-clamp-lg font-medium">{{ testimonio.post_title }}</h3>
                    <div
                        class="button pt-1 px-6 border border-solid border-blue-1/25 text-center uppercase rounded-xl">
                        Saber más
                    </div>
                </div>
            </nuxt-link>
        </article>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

const formatPermalink = (permalink) => {
    return permalink.replace('https://clinicaegos.com', '')
}
</script>
