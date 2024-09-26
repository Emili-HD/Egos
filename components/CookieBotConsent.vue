<!-- components/CookieBotConsent.vue -->
<template>
    <client-only>
        <div v-if="isMounted">
            <!-- Aquí ya puedes usar useCookiebot dentro de setup -->
        </div>
    </client-only>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
// import { useCookiebot } from '~/composables/useCookiebot';

const isMounted = ref(false);

onMounted(() => {
    const { consentBanner } = useCookiebot({
        blockingMode: 'auto'
    });

    consentBanner();
    isMounted.value = true;
});
</script>
