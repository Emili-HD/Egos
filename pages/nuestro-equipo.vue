<template>
    <div
        class="team__panel">
        <div class="team__panel-content" v-if="panelVisible">
            <div class="close" @click="panelVisible = false">
                <svg class="close-icon size-16 fill-blue-1" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="m777.856 280.192-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"/></svg>
            </div>
            <h3 v-if="selectedMemberInfo.title.rendered">{{ selectedMemberInfo.title.rendered }}</h3>
            <ElementsSlide :data="selectedMemberInfo" />
        </div>
    </div>

    <div class="team__form fixed size-full z-[999999] bg-blue-1/50 flex flex-col justify-center items-center" v-if="showPopup">
        <div class="close absolute top-4 right-4 md:top-24 md:right-12 cursor-pointer z-10" @click="closePopup">
            <svg class="close-icon size-16 fill-nude-8" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="m777.856 280.192-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"/></svg>
        </div>
        <!-- <FormsCirugia v-if="pages && pages.acf" :identificador="'topPage'" :portalId="String(pages.acf.portalid)" :formId="pages.acf.formid" /> -->
        <FormsCustomForm v-if="pages && pages.acf" :identificador="'topPage'" :portalId="String(pages.acf.portalid)" :formId="pages.acf.formid" />
    </div>

    <main class="site-main about grid grid-cols-16 gap-1">
        <section class="nosotros section__hero grid grid-cols-16 col-[1_/_-1]" v-if="pages">
            <ElementsEncabezadoFull :data="pages" />
        </section>

        <template v-if="doctor.length > 0">
            <section v-for="category in categories" :key="category.id" :class="`equipo ${category.slug}`"
                class="pt-20 pb-60 xl:pt-32 w-[100vw] grid grid-cols-subgrid col-[1_/_-1]" :id="`orden-${category.order}`">
                <aside class="equipo__left-column col-[2/-2] xl:col-[2/7] pb-20">
                    <div class="equipo__left-description lg:mb-40">
                        <h3>{{ category.name }}</h3>
                        <p class="mb-6" v-if="category.description">{{ category.description }}</p>
                        <UiButton class="gold uppercase" v-if="category.form === true" @click="openPopup">Pedir Cita</UiButton>
                    </div>
                </aside>
                <article class="equipo__right-column col-[2/-2] xl:col-[8/-2]">
                    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8">
                        <li v-for="miembro in doctorByCategory(category.id)" :key="miembro.id"
                            class="card !aspect-[4/5] bg-nude-6 rounded-3xl overflow-hidden xl:[&:nth-child(2n)]:translate-y-1/3 list-none">
                            <div class="card__member block relative size-full overflow-hidden">
                                <img loading="lazy" 
                                    class="card__image absolute w-full object-center object-cover min-h-full overflow-hidden rounded-3xl"
                                    v-if="miembro.featured_image_data"
                                    :src="miembro.featured_image_data.url"
                                    :srcset="miembro.featured_image_data.srcset"
                                    :width="miembro.featured_image_data.width"
                                    :height="miembro.featured_image_data.height"
                                    :alt="miembro.featured_image_data.alt" />
                                <div
                                    class="card__description text-nude-6 bg-gold-3/10 p-4 absolute bottom-0 rounded-3xl size-full z-10 flex flex-col justify-between items-start gap-2">
                                <div>
                                        <h3 class="card__title h6 !mb-0 font-normal">
                                            {{ miembro.title ? miembro.title.rendered : 'No Title' }}
                                        </h3>
                                        <p class="font-normal" v-html="miembro.acf.trayectoria.especialidad"></p>
                                    </div>
                                    <div class="button__group flex flex-row justify-center items-center gap-2 w-full">
                                        <a v-if="category.form === false" href="#" @click.passive="showMemberPanel(miembro)" class="button border border-solid bg-nude-1 border-nude-1/20 rounded-full py-1 w-full text-center">+ Info</a>
                                        <UiButton :to="processedPath(miembro.link)" class="bg-nude-1 !w-1/2 text-center" v-if="category.form === true">+ Info</UiButton>
                                        <UiButton class="bg-gold-3 !w-1/2 text-center" v-if="category.form === true"
                                            @click="openPopup">Pedir Cita</UiButton>
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
import { getEspecialidades, getPage, getEquipo } from '@/composables/useApi';


const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

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
const { data: especialidades, error: especialidadesError } = await useAsyncData(
  'especialidades',
  async () => {
    try {
      const response = await getEspecialidades();
      return response || {}; // Asegurarse de que siempre se retorne un objeto
    } catch (error) {
      console.error('Error fetching especialidades:', error);
      return {}; // En caso de error, retornar un objeto vacío
    }
  },
  { initialCache: false }
);
const { data: pages, error: paginaError } = await useAsyncData(
  'paginaEspecial',
  async () => {
    try {
      const response = await getPage(562);
      return response || {}; // Asegurarse de que siempre se retorne un objeto
    } catch (error) {
      console.error('Error fetching pagina especial:', error);
      return {}; // En caso de error, retornar un objeto vacío
    }
  },
  { initialCache: false }
);
const { data: doctor, error: equipoError } = await useAsyncData(
  'equipo',
  async () => {
    try {
      const response = await getEquipo({ perPage: 100 });
      return response || {}; // Asegurarse de que siempre se retorne un objeto
    } catch (error) {
      console.error('Error fetching equipo:', error);
      return {}; // En caso de error, retornar un objeto vacío
    }
  },
  { initialCache: false }
);


const doctorByCategory = (categoryId) => {
    return doctor.value.filter((d) => d.especialidad.includes(categoryId));
};

const processedPath = (fullUrl) => {
  if (!fullUrl) return ''; // Retorna una cadena vacía si fullUrl no está definido
  const url = new URL(fullUrl);
  return url.pathname; // Devuelve solo la parte de la ruta de la URL
};

function showMemberPanel(miembro) {
    selectedMemberInfo.value = miembro;
    panelVisible.value = true;
    // lenis
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

    const link = [
    { 
        rel: 'canonical',
        href: (() => {
            // Añadir "www." si no está presente y no es una subdominio diferente
            let canonical = yoast.canonical.startsWith('https://www.') ? yoast.canonical :
                            yoast.canonical.startsWith('https://') ? `https://www.${yoast.canonical.substring(8)}` : yoast.canonical;
            // Asegurar que la URL termina con "/"
            canonical = canonical.endsWith('/') ? canonical : `${canonical}/`;
            return canonical;
        })() 
        }
    ];
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
:root {
    --header-height: 4.8125rem;
}
.team__panel {
    @apply p-8 pt-16 md:pt-24 sm:px-16 sm:pb-16 bg-white rounded-3xl fixed right-0 top-0 md:top-20 w-[100vw] xl:w-[70vw] h-screen md:h-[calc(100vh-var(--header-height)-1rem)] z-[1001] translate-x-[100%] transition-[translate] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)];

    &-content {
        @apply overscroll-contain;

        .close {
            @apply absolute -top-16 sm:top-0 -right-4 sm:right-0 z-10;
        }
    }
}
</style>
