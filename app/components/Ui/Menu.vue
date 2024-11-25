<template>
    <div :class="class">
        <h3 v-if="titulo" class="font-nunito font-normal text-nude-8 text-clamp-base uppercase border-b border-nude-8/25 w-full pb-4 max-lg:text-center">{{ titulo }}</h3>
        <ul>
            <li class="mb-0" v-for="item in data" :key="item.ID">
                <nuxt-link v-if="!isExternal" :to="`${resolveUrl(item.url)}`"
                    :aria-current="isCurrentPage(item.slug) ? 'page' : undefined">
                    <span>{{ item.title }}</span>
                </nuxt-link>
                <nuxt-link v-else :to="item.url" :target="item.target" external>
                    <div v-if="item.acf">
                        <img :src="item.acf.icon" class="size-8 invert hover:scale-125 transition-transform" :alt="item.post_title" :title="item.post_title">
                    </div>
                    <span v-else>{{ item.post_title }}</span>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    titulo: {
        type: String,
    },
    class: {
        type: String,
    },
    isExternal: {
        type: Boolean,
        default: false,
    }
})

const route = useRoute();

// Función auxiliar para resolver URLs
const resolveUrl = (url) => {
    return url.replace('https://clinicaegos.com', '')
}

// Función para determinar si la página actual coincide con el enlace
const isCurrentPage = (url) => {
    return route.path === url;
}
</script>


<style scoped>
.menu-footer {
    @apply flex flex-col justify-start items-start max-lg:w-full max-lg:text-center;

    ul {
        @apply list-none !mb-0 flex flex-col gap-2 max-lg:w-full;

        span {
            @apply text-nude-8 uppercase text-sm;
        }
    }
}

.menu-trabaja {
    @apply flex flex-col items-start justify-start max-lg:w-full max-lg:text-center;

    ul {
        @apply list-none !mb-0 flex flex-col gap-2 max-lg:w-full;

        span {
            @apply text-nude-8 uppercase text-sm;
        }
    }
}

.menu-legal,
.menu-social {
    @apply py-4;

    ul {
        @apply list-none !mb-0 flex flex-row justify-center items-center gap-4 w-full;

        span {
            @apply text-nude-8;
        }
    }
}

.menu-clinicas {
    ul {
        @apply list-none !mb-0 flex flex-row flex-wrap justify-start items-start gap-x-8 gap-y-4 w-vh/25 max-lg:w-full max-lg:text-center;

        li {
            @apply w-[calc(50%-1rem)]
        }

        span {
            @apply text-nude-8 text-sm;
        }
    }
}

.router-link-active::after {
        @apply content-[''] w-full h-px absolute -bottom-1 left-0 bg-nude-1;
}

/* @media (min-width: 820px) and (max-width: 1180px) {
    .is-tablet {
        .menu-footer {
            @apply text-left col-span-1 items-start;
        }

        .menu-social {
            @apply text-right col-span-1 items-end;
        }

        .menu-legal ul {
            @apply flex-row
        }
    }
} */
</style>
