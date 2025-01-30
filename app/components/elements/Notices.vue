<template>
    <div v-if="!ofertas"
        class="notices w-full min-h-12 overflow-hidden [html:not(.blackfriday)]:bg-[#B7AB87] [.blackfriday_&]:bg-dark-2 relative">
        <!-- Placeholder o skeleton -->
        <div class="flex justify-center items-center h-12 bg-[#B7AB87] w-full">
            <div class="text-black font-semibold tracking-wide leading-none p-2">Excelente 4.8/5 ★ en Google</div>
        </div>
    </div>
    <div class="notices w-full min-h-12 overflow-hidden [html:not(.blackfriday)]:bg-[#B7AB87] [.blackfriday_&]:bg-dark-2 relative"
        v-else-if="ofertas && ofertas.length > 0">
        <ClientOnly>
            <!-- <div v-if="countdown.days > 0 || countdown.hours > 0 || countdown.minutes > 0 || countdown.seconds > 0"
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
            </div> -->
            <div>
                <div v-for="(oferta, index) in ofertas" :key="index"
                    class="offer-display [.blackfriday_&]:!bg-dark-2 [.blackfriday_&]:!text-white backface-hidden min-h-12 flex justify-center items-center text-center text-nude-8 font-semibold tracking-wide leading-none p-2 absolute top-0 left-0 w-full transition-transform duration-1000 [&:not(.active),_&.previous]:rotate-x-90 [&.active]:rotate-x-0 [&.next,_&.previous]:absolute [&.next,_&.previous]:top-0 [&.next,_&.previous]:left-0 [&.next,_&.previous]:size-full"
                    :class="{
                        'active': index === currentIndex,
                        'next': index === nextIndex,
                        'previous': index === previousIndex
                    }"
                    :style="`background-color: ${oferta.color}; color: ${oferta.text_color}; transform-origin: ${index === nextIndex ? 'bottom' : 'top'}`">
                    {{ oferta.oferta }}
                </div>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup>
    import { egosSettings } from '@/composables/useApi.js';

    const { data: ofertasData } = await useAsyncData('fetchOfertas', () =>
        egosSettings('ofertas')
    );

    const parseDateString = (dateString) => {
        // Divide la fecha y hora en dos partes
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('/');
        
        // Devuelve una fecha en formato ISO
        return new Date(`${year}-${month}-${day}T${timePart}:00`);
    };

    const ofertas = ref(ofertasData.value?.ofertas || null);
    const badge = ref(ofertasData.value?.badge || null);
    const desde = ref(parseDateString(ofertasData.value?.oferta_desde || ''));
    const hasta = ref(parseDateString(ofertasData.value?.oferta_hasta || ''));
    const currentIndex = ref(0);

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
        if (ofertas.value.length > 1) {
            rotateOffers();
        }
        interval = setInterval(calculateCountdown, 1000);
        calculateCountdown();
    });

    onUnmounted(() => {
        if (interval) {
            clearInterval(interval);
        }
    });
</script>

<style scoped>
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
