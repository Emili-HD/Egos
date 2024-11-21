<template>
    <header class="header full-width">
        <UiImage :data="data" class="hero" :preload="true" />
    </header>
    <div class="header__content blue-1">
        <h1 class="text-balance max-sm:text-clamp-4xl">{{ data.title.rendered }}</h1>
        <ElementsDivider />
        <div class="answer" v-html="data.content.rendered"></div>
    </div>
</template>

<script setup>
// Props
const props = defineProps({
    data: {
        type: Object
    }
})

</script>

<style lang="scss" scoped>
.header {
    @apply h-vh/50 lg:min-h-vh/80 xl:h-vh p-12 mb-0 col-[1/-1] lg:col-[1/10] xl:col-[1/12] !bg-transparent bg-cover bg-center;

    &__content {
        @apply p-12 bg-nude-6 flex flex-col justify-center items-center col-[1/-1] lg:col-[10/17] xl:col-[12/17];
    }
}
</style>
