<template>
    <div :class="class">
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
    @apply col-span-3 lg:col-span-1 flex flex-col justify-center items-center lg:items-end lg:justify-end text-center lg:text-right;

    ul {
        @apply list-none !mb-0 flex flex-col gap-2;

        span {
            @apply text-nude-8 uppercase;
        }
    }
}

.menu-trabaja {
    @apply col-span-3 lg:col-span-1 flex justify-center items-center lg:items-start lg:justify-start text-center lg:text-left;

    ul {
        @apply list-none !mb-0 flex flex-col gap-2;

        span {
            @apply text-nude-8 uppercase;
        }
    }
}

.menu-legal,
.menu-social {
    @apply col-span-3 py-4 self-start;
    grid-template-rows: auto;

    ul {
        @apply list-none !mb-0 flex flex-col sm:flex-row justify-center items-center gap-8 w-full;

        span {
            @apply text-nude-8;
        }
    }
}

.menu-clinicas {
    @apply col-span-3 py-4 self-start;
    grid-template-rows: auto;

    ul {
        @apply list-none !mb-0 flex flex-row flex-wrap justify-center items-center gap-x-8 gap-y-4 w-full;

        span {
            @apply text-nude-8;
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
