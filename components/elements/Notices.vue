<template>
    <div class="w-full min-h-12 overflow-hidden bg-[#B7AB87] relative">
        <div v-if="ofertas.length > 0">
            <div 
                v-for="(oferta, index) in ofertas" 
                :key="index" 
                class="offer-display min-h-12 flex justify-center items-center text-center text-nude-8 font-semibold tracking-wide leading-none p-2 absolute top-0 left-0 w-full transition-transform duration-1000"
                :class="{
                    'active': index === currentIndex,
                    'next': index === nextIndex,
                    'previous': index === previousIndex
                }"
                :style="`background-color: ${oferta.color}; color: ${oferta.text_color}; transform-origin: ${index === nextIndex ? 'bottom' : 'top'}`"
            >
                {{ oferta.oferta }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { egosSettings } from '@/composables/useApi.js';

const { $lenis: lenis } = useNuxtApp();
const ofertas = ref([]);
const currentIndex = ref(0);

const fetchOfertas = async () => {
    try {
        const data = await egosSettings('ofertas');
        ofertas.value = data.ofertas;
    } catch (error) {
        console.error('Error fetching ofertas:', error);
    }
};

const rotateOffers = () => {
    setInterval(() => {
        const maxIndex = ofertas.value.length - 1;
        if (currentIndex.value < maxIndex) {
            currentIndex.value++;
        } else {
            currentIndex.value = 0;
        }
    }, 4000); // Rotates every 4 seconds
};

const nextIndex = computed(() => {
    return (currentIndex.value + 1) % ofertas.value.length;
});

const previousIndex = computed(() => {
    return (currentIndex.value - 1 + ofertas.value.length) % ofertas.value.length;
});

onMounted(() => {
    fetchOfertas().then(() => {
        if (ofertas.value.length > 1) {
            rotateOffers();
        }
    });
});
</script>

<style scoped>
.offer-display {
    backface-visibility: hidden;
}

.offer-display:not(.active) {
    transform: rotateX(90deg);
}

.offer-display.active {
    transform: rotateX(0deg);
}

.offer-display.next,
.offer-display.previous {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.offer-display.previous {
    transform: rotateX(90deg);
}
</style>
