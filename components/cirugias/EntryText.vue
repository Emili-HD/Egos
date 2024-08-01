<template>
    <div v-if="data.content && data.content.rendered" class="entry-text [&>h2]:text-balance [&>h2]:!text-center [&>p]:text-lg [&>p]:!text-center [&>p]:text-balance" v-html="data.content.rendered"></div>
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
    @apply text-blue-1 text-center col-[3/-3];
}
</style>
