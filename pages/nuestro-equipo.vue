<template>
    <div
        class="team__panel p-8 pt-16 md:pt-24 sm:px-16 sm:pb-16 bg-white rounded-3xl fixed right-0 top-0 md:top-20 
              w-[100vw] xl:w-[70vw] h-screen md:h-[calc(100vh-var(--header-height)-1rem)] z-[1001] 
              translate-x-[100%] transition-[translate] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
        <div class="team__panel-content overscroll-contain" v-if="panelVisible">
            <div class="close absolute -top-16 sm:top-0 -right-4 sm:right-0 z-10" @click="panelVisible = false">
                <svg class="close-icon size-16 fill-blue-1" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
                </svg>
            </div>
            <h3 v-if="selectedMemberInfo.title.rendered">{{ selectedMemberInfo.title.rendered }}</h3>
            <ElementsSlide :data="selectedMemberInfo" />
        </div>
    </div>

    <div class="team__form fixed size-full z-[999999] bg-blue-1/50 flex flex-col justify-center items-center" v-if="showPopup">
        <div class="close absolute top-4 right-4 md:top-24 md:right-12 cursor-pointer z-10" @click="closePopup">
            <svg class="close-icon size-16 fill-nude-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
            </svg>
        </div>
        <FormsCirugia v-if="pages && pages.acf" :identificador="'topPage'" :portalId="String(pages.acf.portalid)"
            :formId="pages.acf.formid" />
    </div>

    <main class="site-main about grid grid-cols-16 gap-1">
        <section class="nosotros section__hero grid grid-cols-16 col-[1_/_-1]" v-if="pages">
            <ElementsEncabezadoFull :data="pages" />
        </section>

        <template v-if="doctor.length > 0">
            <section v-for="category in categories" :key="category.id" :class="`equipo ${category.slug}`"
                class="pt-20 pb-40 xl:pt-32 w-[100vw] grid grid-cols-subgrid col-[1_/_-1]" :id="`orden-${category.order}`">
                <aside class="equipo__left-column col-[2/-2] xl:col-[2/7] pb-20">
                    <div class="equipo__left-description">
                        <h3>{{ category.name }}</h3>
                        <p class="!mb-0" v-if="category.description">{{ category.description }}</p>
                        <button class="button" v-if="category.form === true" @click="openPopup">Pedir Cita</button>
                    </div>
                </aside>
                <article class="equipo__right-column col-[2/-2] xl:col-[8/-2]">
                    <ul class="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <li v-for="miembro in doctorByCategory(category.id)" :key="miembro.id"
                            class="card !aspect-[4/5] bg-nude-6 rounded-3xl overflow-hidden xl:[&:nth-child(2n)]:translate-y-1/3">
                            <div class="card__member block relative size-full overflow-hidden">
                                <NuxtImg loading="lazy" v-if="miembro.featured_image_src"
                                    :src="miembro.featured_image_src.src"
                                    class="card__image absolute w-full -top-[10%] object-center object-cover min-h-full overflow-hidden rounded-3xl"
                                    :alt="miembro.featured_image_src.alt" />
                                <div
                                    class="card__description bg-nude-6 p-4 absolute bottom-0 rounded-3xl w-full z-10 flex flex-col justify-end items-center gap-2">
                                    <h3 class="card__title h6 !mb-0">
                                        {{ miembro.title ? miembro.title.rendered : 'No Title' }}
                                    </h3>
                                    <p v-html="miembro.acf.trayectoria.especialidad"></p>
                                    <div class="button__group flex flex-row justify-center items-center gap-2 w-full">
                                        <a href="#" @click.prevent="showMemberPanel(miembro)" class="button border border-solid border-blue-1/20 rounded-full py-1 w-full text-center">+ Info</a>
                                        <button class="button bg-blue-1 rounded-full py-1 text-nude-8 w-full text-center" v-if="category.form === true"
                                            @click="openPopup">Pedir Cita</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </article>
            </section>
        </template>
    </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { getEspecialidades, getPage, getEquipo } from '@/composables/useFetch';
import ScrollTrigger from 'gsap/ScrollTrigger';

const { $gsap: gsap, $lenis: lenis } = useNuxtApp();

// Estados reactivos
const panelVisible = ref(false);
const selectedMemberInfo = ref({
    title: { rendered: '' }, // Valores predeterminados vacíos
    acf: { trayectoria: { especialidad: '' } }
});
const showPopup = ref(false);

// Funciones computadas
const categories = computed(() => {
    const uniqueCategories = [
        ...new Set(doctor.value.flatMap((d) => d.especialidad)),
    ];
    return uniqueCategories.map((categoryId) => {
        const category = especialidades.value.find((cat) => cat.id === categoryId);
        return {
            id: categoryId,
            name: category ? category.name : 'Unknown Category',
            description: category ? category.description : 'Unknown Category',
            slug: category ? category.slug : 'unknown-category',
            form: category ? category.acf.activar_formulario : 'Unknow category',
            order: category ? category.acf.orden : 'Unknow category'
        };
    });
});

// Obtener datos
const { data: especialidades, error: especialidadesError, pending: especialidadesPending } = await useAsyncData('especialidades', getEspecialidades, {initialCache: false});
const { data: pages, error: paginaError, pending: paginaPending } = await useAsyncData('paginaEspecial', () => getPage(562), {initialCache: false});
const { data: doctor, error: equipoError, pending: equipoPending } = await useAsyncData('equipo', () => getEquipo({ perPage: 20 }), {initialCache: false});

const doctorByCategory = (categoryId) => {
    return doctor.value.filter((d) => d.especialidad.includes(categoryId));
};

function showMemberPanel(miembro) {
    selectedMemberInfo.value = miembro;
    panelVisible.value = true;
    lenis
}

const pinTitles = async () => {
    let mm = gsap.matchMedia()
    mm.add("(min-width: 1025px)", () => {
        const secciones = document.querySelectorAll('.equipo')
        secciones.forEach((seccion) => {
            let titulo = seccion.querySelector('.equipo__left-description');
            gsap.to(titulo, {
                scrollTrigger: {
                    trigger: seccion,
                    start: "top 25%",
                    end: "70% 25%",
                    scrub: true,
                    pin: titulo,
                    pinSpacing: false,
                    // markers: true
                },
            });
        });
    })
}

const closePanelOnClickOutside = (event) => {
    const teamPanel = document.querySelector('.team__panel');
    if (teamPanel && !teamPanel.contains(event.target)) {
        panelVisible.value = false;
    }
};

const openPopup = (videoId) => {
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
};

watch(panelVisible, (newValue) => {
    const panel = document.querySelector('.team__panel');
    if (panel) {
        panel.style.transform = newValue ? 'translateX(0)' : 'translateX(100%)';
    }
    if (newValue) {
        // Retrasa la adición del manejador de eventos para evitar que el clic de apertura lo active
        setTimeout(() => {
            document.addEventListener('click', closePanelOnClickOutside);
        }, 100);
    } else {
        // Panel se ha ocultado, asegúrate de remover el manejador de clics inmediatamente
        document.removeEventListener('click', closePanelOnClickOutside);
    }
});

// Datos YOAST SEO
useHead(() => {
    if (!pages.value || !pages.value.yoast_head_json) {
        return {
            title: 'Cargando...', // Título temporal mientras se cargan los datos
        };
    }

    const yoast = pages.value.yoast_head_json;

    const link = [{ rel: 'canonical', href: yoast.canonical }]
    const metaTags = [
        { name: 'description', content: yoast.og_description || 'Egos | Clínica de cirugía y medicina estética' },
        { property: 'og:title', content: yoast.og_title },
        { property: 'og:description', content: yoast.og_description },
        { property: 'og:url', content: yoast.og_url },
        { property: 'og:type', content: yoast.og_type },
        { property: 'og:locale', content: yoast.og_locale },
        { property: 'og:site_name', content: yoast.og_site_name },
        { property: 'article:publisher', content: yoast.article_publisher },
        // Twitter Card
        { name: 'twitter:card', content: yoast.twitter_card },
        // Tiempo de lectura de Twitter (Personalizado, considerar adecuación a estándares)
        { name: 'twitter:data1', content: yoast.twitter_misc['Tiempo de lectura'] },
        // Canonical
        // { rel: 'canonical', href: yoast.canonical },
        // Robots
        {
            name: 'robots',
            content: `index=${yoast.robots.index}, follow=${yoast.robots.follow}, max-snippet=${yoast.robots['max-snippet']}, max-image-preview=${yoast.robots['max-image-preview']}, max-video-preview=${yoast.robots['max-video-preview']}`
        },
        // Añadir más tags según sean necesarios
    ];

    // Añadir las imágenes de Open Graph si están disponibles
    if (yoast.og_image && yoast.og_image.length > 0) {
        yoast.og_image.forEach((image) => {
            metaTags.push({ property: 'og:image', content: image.url });
            metaTags.push({ property: 'og:image:width', content: image.width.toString() });
            metaTags.push({ property: 'og:image:height', content: image.height.toString() });
        });
    }

    return {
        title: yoast.title,
        link: link,
        meta: metaTags,
    };
});

onMounted(async () => {
    await pinTitles()
})

onUnmounted(() => {
    document.removeEventListener('click', closePanelOnClickOutside);
});

</script>

<style lang="scss">
// estilo vacío
</style>
