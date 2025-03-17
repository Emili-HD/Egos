<template>
    <div class="list accordion__list col-[2_/_span_14] xl:col-[7_/_span_9]">
        <div class="accordion__list--item separador-lista" v-for="content in data" :key="content.heading_faq">
            <div class="accordion__list--item-title  [&>*]:font-normal [&>*]:m-0">
                <div class="title !font-semibold" v-html="content.heading_faq"></div>
                <svg class="h-6 w-6 stroke-blue-1 stroke-1" viewbox="0 0 24 24">
                    <path class="iconV" d="M 12,0 V 24" />
                    <path class="iconH" d="M 0,12 H 24" />
                </svg>
            </div>
            <div class="accordion__list--item-descripcion" v-html="content.content_faq"></div>
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

</script>

<style lang="scss" scoped>
.accordion__list {
    // @apply col-[2_/_span_14] xl:col-[9_/_span_7];

    &--item {
        @apply flex flex-col flex-wrap justify-between py-2 cursor-pointer;

        &-title {
            @apply flex flex-row justify-between items-center;

            .title {
                @apply max-w-[85%] text-clamp-base mb-0;
            }
        }

        &-descripcion {
            @apply self-end h-0 w-full xl:w-[60%] opacity-0 relative;
        }
    }
}
</style>
