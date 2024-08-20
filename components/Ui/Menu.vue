<template>
    <div :class="class">
        <ul>
            <li class="mb-0" v-for="item in data" :key="item.ID">
                <nuxt-link v-if="!isExternal" :to="resolveUrl(item.slug)"
                    :aria-current="isCurrentPage(item.slug) ? 'page' : undefined">
                    <span>{{ item.title }}</span>
                </nuxt-link>
                <nuxt-link v-else :to="item.url" external>
                    <span>{{ item.post_title }}</span>
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
const resolveUrl = (slug) => {
    return slug.startsWith('/') ? slug : `/${slug}`;
}

// Función para determinar si la página actual coincide con el enlace
const isCurrentPage = (url) => {
    return route.path === url;
}
</script>


<style scoped>
.menu-footer {
    @apply col-span-3 xl:col-span-1 flex flex-col justify-center items-center xl:items-start text-center xl:text-left;

    ul {
        @apply list-none !mb-0 flex flex-col gap-2;

        span {
            @apply text-nude-8 uppercase;
        }
    }
}

.menu-social {
    @apply col-span-3 xl:col-span-1 flex flex-col justify-center items-center xl:items-end text-center xl:text-right;

    ul {
        @apply list-none !mb-0 flex flex-col gap-2;

        span {
            @apply text-nude-8 uppercase;
        }
    }
}

.menu-legal {
    @apply col-span-3 py-4 self-start;

    ul {
        @apply list-none !mb-0 flex flex-col xl:flex-row justify-center items-center gap-8 w-full;

        span {
            @apply text-nude-8;
        }
    }
}

.router-link-active::after {
        @apply content-[''] w-full h-px absolute -bottom-1 left-0 bg-nude-1;
}

@media (min-width: 820px) and (max-width: 1180px) {
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
}
</style>
