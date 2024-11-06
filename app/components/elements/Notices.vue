<template>
    <div
        class="notices w-full min-h-12 overflow-hidden [html:not(.blackfriday)]:bg-[#B7AB87] [.blackfriday_&]:bg-dark-2 relative">
        <ClientOnly>
            <div v-if="countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0"
                class="flex justify-center items-center gap-4 w-full bg-blackfriday py-2 px-4">
                <p class="mb-1 text-left text-sm lg:text-lg text-balance leading-none font-normal text-nude-8 [&_span]:text-gold-2 [&_span]:font-semibold" v-html="badge"></p>
                <div class="counter flex justify-center gap-2 text-blue-1 max-lg:w-1/2">
                    <div
                        class="flex items-baseline justify-center py-2 px-3 text-sm bg-nude-8 text-black [.x2_&]:text-clamp-lg rounded-lg w-[20%] font-normal leading-tight">
                        {{ countdown.days }} <span class="text-xs">d</span>
                    </div>
                    <div
                        class="flex items-baseline justify-center py-2 px-3 text-sm bg-nude-8 text-black [.x2_&]:text-clamp-lg rounded-lg w-[20%] font-normal leading-tight">
                        {{ countdown.hours }} <span class="text-xs">h</span>
                    </div>
                    <div
                        class="flex items-baseline justify-center py-2 px-3 text-sm bg-nude-8 text-black [.x2_&]:text-clamp-lg rounded-lg w-[20%] font-normal leading-tight">
                        {{ countdown.minutes }} <span class="text-xs">m</span>
                    </div>
                    <div
                        class="flex items-baseline justify-center py-2 px-3 text-sm bg-nude-8 text-black [.x2_&]:text-clamp-lg rounded-lg w-[20%] font-normal leading-tight">
                        {{ countdown.seconds }} <span class="text-xs">s</span>
                    </div>
                </div>
            </div>
        </ClientOnly>
        <div
            v-if="ofertas.length > 0 && (countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0)">
            <div v-for="(oferta, index) in ofertas" :key="index"
                class="offer-display min-h-12 flex justify-center items-center text-center text-nude-8 font-semibold tracking-wide leading-none p-2 absolute top-0 left-0 w-full transition-transform duration-1000"
                :class="{
                    'active': index === currentIndex,
                    'next': index === nextIndex,
                    'previous': index === previousIndex
                }"
                :style="`background-color: ${oferta.color}; color: ${oferta.text_color}; transform-origin: ${index === nextIndex ? 'bottom' : 'top'}`">
                {{ oferta.oferta }}
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { egosSettings } from '@/composables/useApi.js';

    const ofertas = ref([]);
    const badge = ref(null);
    const desde = ref(null);
    const hasta = ref(null);
    const currentIndex = ref(0);

    const parseDateString = (dateString) => {
        // Divide la fecha y hora en dos partes
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('/');
        
        // Devuelve una fecha en formato ISO
        return new Date(`${year}-${month}-${day}T${timePart}:00`);
    };

    const fetchOfertas = async () => {
        try {
            const data = await egosSettings('ofertas');
            ofertas.value = data.ofertas;
            desde.value = parseDateString(data.oferta_desde);
            hasta.value = parseDateString(data.oferta_hasta);
            badge.value = data.badge;
            // console.log('Fecha hasta:', hasta.value); // Ahora debería mostrar una fecha válida
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

    const countdown = reactive({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // console.log(desde.value);


    const calculateCountdown = () => {
        const now = new Date();
        const timeDiff = hasta.value - now;

        if (timeDiff > 0) {
            countdown.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            countdown.hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            countdown.minutes = Math.floor((timeDiff / 1000 / 60) % 60);
            countdown.seconds = Math.floor((timeDiff / 1000) % 60);
        } else {
            clearInterval(interval); // Detiene el intervalo si el tiempo ha terminado
            countdown.days = 0;
            countdown.hours = 0;
            countdown.minutes = 0;
            countdown.seconds = 0;
        }
    };

    let interval;

    calculateCountdown();

    onMounted(() => {
        fetchOfertas().then(() => {
            calculateCountdown();
            interval = setInterval(calculateCountdown, 1000);
            if (ofertas.value.length > 1) {
                rotateOffers();
            }
        });
    });


    onUnmounted(() => {
        if (interval) {
            clearInterval(interval);
        }
    });
</script>

<style scoped>
    .blackfriday .offer-display {
        @apply !bg-dark-2 !text-white;
    }

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
