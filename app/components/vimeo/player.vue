<template>
    <ClientOnly>
        <div class="relative overflow-hidden size-full rounded-xl" v-if="videoId" v-intersect="loadIframe">
            <iframe v-if="iframeLoaded" :src="iframeSrc" :title="titulo" class="absolute top-0 left-0 w-full h-full"
                frameborder="0" muted webkitallowfullscreen mozallowfullscreen allowfullscreen width="100%"
                height="100%" data-chromatic="ignore" allow="compute-pressure"></iframe>
        </div>
    </ClientOnly>
</template>

<script setup>
    import { computed, ref } from 'vue';

    const props = defineProps({
        videoId: {
            type: String,
            required: true,
        },
        titulo: {
            type: String,
        },
    });

    const iframeSrc = computed(() => `${props.videoId}`);
    const iframeLoaded = ref(false);

    const loadIframe = () => {
        iframeLoaded.value = true;
    };
</script>
