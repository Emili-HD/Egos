<template>
    <div v-if="data.content && data.content.rendered"
        class="entry-text pt-12 mx-auto [&>h2]:text-balance [&>h2]:text-clamp-2xl [&>h2]:xl:text-clamp-4xl [&>h2]:max-w-[50ch] [&>h2]:text-left [&>h2]:xl:!text-center [&>p]:text-lg [&>p]:xl:!text-center [&>p]:text-balance"
        v-html="data.content.rendered"></div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
    }
})
</script>

<style scoped>
.entry-text {
    @apply text-blue-1 text-center col-[2/-2];
}
</style>
