<template>
    <div v-if="filteredComments.length" class="comments p-0 mb-0 !bg-transparent flex flex-wrap bg-nude-5 pb-20 justify-center gap-4" ref="comments">
        <div class="comments__header w-full text-center">
            <h2 class="max-lg:text-clamp-3xl">Que opinan en instagram: {{ name }}</h2>
            <ElementsDivider />
        </div>
        <article
            v-for="comment in filteredComments"
            :key="comment.id"
            class="bg-white p-4 lg:p-8 rounded-2xl mb-6 w-full lg:w-[calc(50%-1rem)] border border-blue-1/20 flex flex-wrap items-center gap-6"
        >
            <div class="border-wrap size-16 overflow-hidden rounded-full">
                <div class="image-wrapper size-[60px] overflow-hidden rounded-full absolute top-0.5 left-0.5 bg-white">
                    <div class="image-inset rounded-full overflow-hidden size-[52px] top-1 left-1">
                        <img
                            :src="comment.featured_image_data?.url"
                            :sizes="comment.featured_image_data?.sizes?.social"
                            alt=""
                            class="object-cover object-center min-h-full"
                        >
                    </div>
                </div>
            </div>
            <div class="mr-auto w-[80%] lg:w-[65%]">
                <div class="flex items-baseline">
                    <h3 class="text-clamp-base mb-0 mr-2 font-semibold">{{ comment.title.rendered }}</h3>
                    <img v-if="comment?.acf?.verificado" src="@/assets/icons/verified.svg" alt="Usuario Verificado" class="size-4 mr-2 top-0.5">
                    <div class="fecha leading-none text-gray-400">{{ formatRelativeTime(comment.acf.fecha_publicacion) }}</div>
                </div>
                <div class="comentario text-clamp-sm [&>p]:mb-0" v-html="comment.content.rendered"></div>
            </div>
            <div class="w-[10%]">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="red" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z"/></svg>
            </div>          
        </article>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Estado reactivo
const comments = ref(null);

// Props
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ruta: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
});

// console.log('tipo', props.tipo);


// Propiedad calculada para filtrar los comentarios por la ruta
const filteredComments = computed(() => {
    if (!Array.isArray(props.data)) return [];

    return props.data.filter(comment => {
        if (props.tipo === 'doctor') {
            return comment.acf.publicar_en === props.ruta;
        }
        if (props.tipo === 'landing') {
            return comment.acf.publicar_en_landing === props.ruta;
        }
        return false;
    });
});

// Función para formatear la fecha relativa
function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

    let formatted;

    if (seconds < 60) {
        formatted = rtf.format(-seconds, 'second');
    } else {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            formatted = rtf.format(-minutes, 'minute');
        } else {
            const hours = Math.floor(minutes / 60);
            if (hours < 24) {
                formatted = rtf.format(-hours, 'hour');
            } else {
                const days = Math.floor(hours / 24);
                if (days < 7) {
                    formatted = rtf.format(-days, 'day');
                } else {
                    const weeks = Math.floor(days / 7);
                    if (weeks < 26) {
                        formatted = rtf.format(-weeks, 'week');
                    } else {
                        const months = Math.floor(days / 30);
                        if (months < 12) {
                            formatted = rtf.format(-months, 'month');
                        } else {
                            const years = Math.floor(days / 365);
                            formatted = rtf.format(-years, 'year');
                        }
                    }
                }
            }
        }
    }

    // Elimina "hace" o "en" del resultado
    return formatted.replace(/^(hace |en )/, '');
}
</script>

<style scoped>
.comments {
    &__header {
        @apply w-4/5 text-center;

        @media (max-width: 767px) {
            @apply w-full;
        }
    }
}

.border-wrap {
    max-width: 250px;
    padding: 1rem;
    position: relative;
    background: linear-gradient(to right, red, purple);
    padding: 3px;
}
</style>
