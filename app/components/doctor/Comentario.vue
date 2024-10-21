<template>
    <div v-if="data.length > 0" class="doctor [.full-width_&]:col-[1/-1]">
        <div class="doctor__info" v-for="({ doctor, comentario }, index) in data" :key="doctor.ID">
            <div class="doctor__info-wrapper">
                <div class="doctor__info-image">
                    <img loading="lazy" :src="doctor.featured_image" :alt="doctor.post_title"
                        :aria-labelledby="'doctor-title-' + doctor.ID" />
                </div>
                <div class="doctor__info-description" v-if="doctor.post_title">
                    <!-- Título del doctor -->
                    <h3 class="text-clamp-xl text-left mb-2">
                        <strong>{{ doctor.post_title }}</strong>
                    </h3>
                    <!-- Comentario del doctor -->
                    <p class="text-clamp-sm leading-tight mb-4 text-left">
                        {{ comentario }}
                    </p>
                    <!-- Botón de enlace a la página del doctor -->
                    <UiButton :to="relativeDoctorLink(doctor.permalink)"
                        class="button gold">
                        más información
                    </UiButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

// console.log(props.data);

const relativeDoctorLink = (link) => {
    if (link) {
        const url = new URL(link);
        return url.pathname;
    }
    return '';
};

</script>

<style lang="scss" scoped>
.doctor {
    @apply col-[2/-2] grid grid-cols-12 gap-4;

    &__info {
        @apply overflow-hidden size-full flex flex-col items-center col-span-full lg:col-span-6 border-y border-y-blue-1/25 pt-4;

        &-wrapper {
            @apply w-full flex flex-col sm:flex-row justify-center items-center gap-x-6 mb-4 text-center;
        }

        &-image {
            @apply w-full min-h-56 mb-8 sm:w-80 lg:w-64 lg:aspect-square rounded-lg overflow-hidden;

            &>img {
                @apply object-cover absolute object-center h-full max-w-none left-1/2 -translate-x-1/2;
            }
        }

        &-description {
            @apply w-full;

            & .button {
                @apply text-clamp-xs size-full rounded-2xl block uppercase !px-2 !py-1 w-fit h-fit;
            }
        }
    }
}

:global(#doctores:has(.doctor-full)) {
    @apply grid-cols-1;
}
:global(.doctor-full .doctor__info) {
    @apply col-[1/-1] lg:col-[1/-1];
}
</style>
