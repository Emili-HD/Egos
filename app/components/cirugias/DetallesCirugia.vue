<template>
    <div class="detalles col-[1_/_span_16] mb-6 sm:mb-16 p-6 flex flex-row flex-wrap justify-between xl:justify-center items-stretch xl:items-center gap-4 border-y border-current"
        v-if="detallesData">
        <div class="detalles__intervencion rounded p-4 w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%/3)-0.75rem)] xl:w-[12.5%] flex flex-col justify-center items-strecht gap-2 [.columnas_&]:flex-col [.columnas_&]:w-full xl:[.columnas_&]:w-60 [&_p]:mb-0 [&_p]:flex [&_p]:flex-col [&_p]:gap-2 [&_strong]:font-semibold [&_p]:text-base [.site-main:not(.tratamiento-113)_&]:text-blue-1 [.tratamiento-113_&]:!text-vermell [.columnas_&]:border [.columnas_&]:border-gold-2 [.tratamiento-113_&]:border-rosa [.columnas_&]:text-balance [.columnas_&]:items-center"
            v-for="detalles in detallesData" :key="detalles.texto_detalles">
            <!-- <img src="/assets/images/icons/ok.svg" alt="" width="27" height="27" class="ok [.tratamiento-113_&]:invert self-center" /> -->
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" class="self-center">
                <path d="M7.83091 27C5.20277 22.8062 2.60139 18.6532 0 14.5013C0.0139547 14.4897 0.0279094 14.4769 0.0407012 14.4652C2.62581 17.2021 5.21091 19.939 7.81812 22.6992C14.2105 15.1169 20.582 7.55902 26.9535 0C26.9686 0.0116364 26.9849 0.0244365 27 0.0360729C20.6192 9.01125 14.2396 17.9853 7.83091 27Z" class="[.site-main:not(.tratamiento-113)_&]:fill-gold-2 [.tratamiento-113_&]:fill-orange-1"/>
            </svg>
            <div v-html="detalles.texto_detalles" class="box !text-center [.site-main:not(.tratamiento-113)_&]:text-blue-1 [.tratamiento-113_&>p]:!text-vermell font-semibold"></div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    detallesData: {
        type: Object,
        required: true,
    },
})
</script>

<style scoped>
:deep(.box) {

    & p {
        @apply w-full relative;
    }

    & p > u {
        @apply w-full relative block;
    }

    & p > u::after{
        @apply content-[''] w-full h-px bg-current absolute left-0 -bottom-1;
    }
} 
</style>

