<template>
    <ClientOnly>
        <div v-if="data && data.oferta_desde && data.oferta_hasta && countdown"
            class="flex justify-center flex-wrap w-full bg-blue-1 py-4 rounded-xl">
            <p class="w-full mb-1 text-center font-normal text-nude-8">La oferta termina en:</p>
            <div class="counter flex justify-center w-full gap-2 text-blue-1">
                <div
                    class="flex flex-col items-center justify-center text-xl [.x2_&]:text-clamp-lg bg-nude-8 p-2 rounded-lg w-[20%] font-normal leading-tight">
                    {{ countdown.days }} <span class="uppercase text-[8px] [.x2_&]:text-xs">días</span></div>
                <div
                    class="flex flex-col items-center justify-center text-xl [.x2_&]:text-clamp-lg bg-nude-8 p-2 rounded-lg w-[20%] font-normal leading-tight">
                    {{ countdown.hours }} <span class="uppercase text-[8px] [.x2_&]:text-xs">horas</span></div>
                <div
                    class="flex flex-col items-center justify-center text-xl [.x2_&]:text-clamp-lg bg-nude-8 p-2 rounded-lg w-[20%] font-normal leading-tight">
                    {{ countdown.minutes }} <span class="uppercase text-[8px] [.x2_&]:text-xs">minutos</span></div>
                <div
                    class="flex flex-col items-center justify-center text-xl [.x2_&]:text-clamp-lg bg-nude-8 p-2 rounded-lg w-[20%] font-normal leading-tight">
                    {{ countdown.seconds }} <span class="uppercase text-[8px] [.x2_&]:text-xs">segundos</span></div>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup>
    import { onUnmounted, reactive, onMounted } from 'vue';

    const props = defineProps({
        data: {
            type: Object
        }
    });

    const countdown = reactive({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const calculateCountdown = () => {
        const now = new Date();
        let endDate = new Date(props.data.oferta_hasta);
        const startDate = new Date(props.data.oferta_desde);
        const repeat = props.data.repetir;

        if (repeat === 'diario') {
            endDate = new Date();
            endDate.setHours(24, 0, 0, 0);
        } else if (repeat === 'semanal') {
            endDate = new Date(startDate);
            const daysUntilEndOfWeek = 7 - endDate.getDay();
            endDate.setDate(startDate.getDate() + daysUntilEndOfWeek);
        }

        let timeDiff = endDate - now;

        if (timeDiff <= 0 && repeat === 'diario') {
            endDate.setDate(endDate.getDate() + 1);
            timeDiff = endDate - now;
        } else if (timeDiff <= 0 && repeat === 'semanal') {
            endDate.setDate(endDate.getDate() + 7);
            timeDiff = endDate - now;
        }

        if (timeDiff > 0) {
            countdown.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            countdown.hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            countdown.minutes = Math.floor((timeDiff / 1000 / 60) % 60);
            countdown.seconds = Math.floor((timeDiff / 1000) % 60);
        } else {
            clearInterval(interval);
            countdown.days = 0;
            countdown.hours = 0;
            countdown.minutes = 0;
            countdown.seconds = 0;
        }
    };

    let interval;

    onMounted(() => {
        interval = setInterval(calculateCountdown, 1000);
    });

    onUnmounted(() => {
        if (interval) {
            clearInterval(interval);
        }
    });

    calculateCountdown();
</script>

<style lang="scss" scoped></style>
