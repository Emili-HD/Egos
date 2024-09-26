<template>
    <main class="site-main" v-if="tratamiento" ref="componentRef">
        <UiBotonCita v-if="tratamiento && tratamiento.acf && tratamiento.acf.boton_cita"
            :data="tratamiento.acf.boton_cita" />
        <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
            <CirugiasEncabezado :data="tratamiento" />
            <NuxtLazyHydrate when-idle>
                <CirugiasDetallesCirugia :detallesData="tratamiento.acf.detalles_intervencion" />
                <ElementsAnchors v-if="tratamiento && tratamiento.acf && tratamiento.acf.tabs"
                    :data="tratamiento.acf.tabs" :doctors="tratamiento.acf" class="col-[1/-1] sm:col-[2/-2]" />
                <CirugiasEntryText :data="tratamiento" />
            </NuxtLazyHydrate>

            <NuxtLazyHydrate when-idle>
                <div class="tratamiento__content col-[1_/_span_16] py-2 px-0">
                    <div class="panels w-full">
                        <section :id="processAncla(content.ancla)" :data-anchor="processAncla(content.ancla)"
                            class="panel grid grid-cols-16 row-gap-4 xl:gap-2 xl:mb-32 py-12 [&.tabla]:bg-blue-1 [&.tabla]:text-nude-8"
                            :class="content.fondo, content.opciones_listado" v-for="content in tratamiento.acf.tabs">
                            <CirugiasFigure v-if="content.opciones_listado != 'columnas'" :contentData="content" />
                            <CirugiasTabla :contentData="content" />
                            <CirugiasColumnas :contentData="content" />
                            <LandingsAntesDespues v-if="content.opciones_listado === 'antesdespues'" :data="content" />
                        </section>

                        <ClinicasRelacionadas v-if="tratamiento.acf && tratamiento.acf.clinicas_relacionadas"
                            :data="tratamiento.acf.clinicas_relacionadas"
                            :titulo="tratamiento.acf.titulo_cirugias_relacionadas"
                            :texto="tratamiento.acf.texto_cirugias_relacionadas" class="col-[1/-1]" />

                        <CirugiasFaqs :faqsData="tratamiento.acf" />
                    </div>
                </div>
            </NuxtLazyHydrate>

            <NuxtLazyHydrate when-idle>
                <div class="form__page grid grid-cols-subgrid col-[1/-1] mb-12" v-if="tratamiento.acf">
                    <CirugiasFormSection :data="tratamiento.acf" />
                </div>
            </NuxtLazyHydrate>
        </section>
        <NuxtLazyHydrate when-idle>
            <ClientOnly>
                <LazyCirugiasRelatedTreatments :treatmentsData="tratamiento.acf"
                    :relatedId="tratamiento.acf.cirugias_relacionadas" :category="category" />
            </ClientOnly>
        </NuxtLazyHydrate>

        <NuxtLazyHydrate when-idle>
            <section class="oferta__form py-12 xl:py-24 mb-0" v-for="setting in form.form_settings"
                :key="setting.formid">
                <div class="oferta" v-if="setting.ubicacion === 'oferta'">
                    <FormsOferta :data="setting" :portalId="setting.portalid" :formId="setting.formid" />
                </div>
            </section>
        </NuxtLazyHydrate>

        <NuxtLazyHydrate when-idle>
            <div v-if="tratamiento.acf.dr_comment" id="doctores" class="grid grid-cols-12 mb-20 gap-y-8"
                data-anchor="doctores">
                <h2 class="h4 col-[2/-2] lg:text-center">Nuestro Equipo en {{ tratamiento.acf.anchor }}</h2>
                <div v-if="doctorsWithComments.length > 0" class="col-[2/-2] grid grid-cols-12 gap-4">
                    <div class="overflow-hidden size-full flex flex-col items-center col-span-full lg:col-span-6 border-y border-y-blue-1/25 pt-4"
                        v-for="({ doctor, comentario }, index) in doctorsWithComments" :key="doctor.ID">
                        <div class="flex flex-col sm:flex-row justify-center items-center gap-x-6 mb-4 text-center">
                            <div
                                class="w-full min-h-56 mb-8 sm:w-80 lg:w-64 lg:aspect-square rounded-lg overflow-hidden">
                                <img loading="lazy" :src="doctor.featured_image" :alt="doctor.post_title"
                                    class="cover absolute object-center h-full max-w-none left-1/2 -translate-x-1/2"
                                    :aria-labelledby="'doctor-title-' + doctor.ID" />
                            </div>
                            <div class="w-full" v-if="doctor.post_title">
                                <!-- Título del doctor -->
                                <h3 class="text-clamp-xl text-left mb-2">
                                    <strong>{{ doctor.post_title }}</strong>
                                </h3>
                                <!-- Comentario del doctor -->
                                <p class="text-clamp-sm leading-tight mb-4 text-left">
                                    {{ comentario }}
                                </p>
                                <!-- Botón de enlace a la página del doctor -->
                                <UiButton :to="relativeDoctorLink(doctor.permalink)"
                                    class="button gold text-clamp-xs size-full rounded-2xl block uppercase !px-2 !py-1 w-fit h-fit">
                                    más información
                                </UiButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>Cargando información del doctor...</p>
                </div>
            </div>
        </NuxtLazyHydrate>

        <ElementsPremios />

        <section id="opiniones"
            class="col-[2/-2] lg:col-start-2 lg:col-span-9 bg-transparent min-h-max px-8 xl:px-[calc(100%/16)] mt-32"
            data-anchor="opiniones">
            <h2 class="h4 text-center">Nuestros pacientes opinan de EGOS</h2>
            <GoogleReviews :placeid="tratamiento.acf.placeid" />
        </section>

        <NuxtLazyHydrate when-idle>
            <LazyCirugiasRelatedPosts :treatmentsData="tratamiento.acf" />
        </NuxtLazyHydrate>

    </main>
</template>

<script setup>
import { useError } from '#app';
import { useYoastHead } from '@/composables/useYoast';
import { useTratamientoData } from '@/composables/useTratamientoData';
import { useFaqJsonLd } from '@/composables/useFaqJsonLd';
import { useVideoJsonLd } from '@/composables/useVideoJsonLd';
import { useBreadcrumbData } from '@/composables/useBreadcrumbJson';
import { useDoctorsJson } from '~/composables/useDoctorsJson';
import { useBusinessData } from '@/composables/useBusinessData';
import { getClinicas } from '@/composables/useApi'
import GoogleReviews from '~/components/Ui/GoogleReviews.vue';
import ClinicasRelacionadas from '~/components/cirugias/ClinicasRelacionadas.vue';

const { $gsap: gsap } = useNuxtApp();
const router = useRouter();
const route = useRoute();

// Props
const props = defineProps({
    category: {
        type: String,
        required: false,
        default: '',
    },
})

// Estados reactivos
const componentRef = ref(null)
const form = ref({ form_settings: null });
const isLoading = ref(false);
const errorMessage = ref("");

const { data: tratamiento, refresh: refreshTratamiento } = await useAsyncData(
    `tratamiento-${route.params.slug}`,
    async () => {
        try {
            const response = await getTratamiento({ slug: route.params.slug });

            // Si no se encuentra el tratamiento, lanzamos un error 404
            if (!response || Object.keys(response).length === 0) {
                const nuxtError = useError();
                nuxtError({
                    statusCode: 404,
                    statusMessage: 'Tratamiento no encontrado'
                });
            }

            // Retornar la respuesta si todo está bien
            return response || {}; // Asegurarse de que siempre se retorne un objeto
        } catch (error) {
            console.error(`Error fetching tratamiento ${route.params.slug}:`, error);

            // En caso de error, también podrías considerar mostrar un error genérico o 404
            const nuxtError = useError();
            nuxtError({
                statusCode: 500,
                statusMessage: 'Error en el servidor'
            });

            return {}; // En caso de error, retornar un objeto vacío
        }
    },
    {
        watch: [() => route.params.slug]
    }
);

const { data: formData, refresh: refreshFormData } = await useAsyncData(
    'formSettings',
    async () => {
        try {
            const response = await egosSettings('form_settings');
            return response || {}; // Asegurarse de que siempre se retorne un objeto
        } catch (error) {
            console.error('Error fetching form settings:', error);
            return {}; // En caso de error, retornar un objeto vacío
        }
    }
);

const { data: clinicasData, error: clinicasError } = await useAsyncData(
    'clinicas',
    async () => {
        try {
            const response = await getClinicas();
            return response || []; // Asegurarse de que siempre se retorne un array
        } catch (error) {
            console.error('Error fetching clinicas:', error);
            return []; // En caso de error, retornar un array vacío
        }
    }
);


const doctorsWithComments = ref([]);

// Asignar los datos de los doctores directamente desde `tratamiento.acf.doctores_relacionados`
if (tratamiento.value && tratamiento.value.acf?.dr_comment) {
    doctorsWithComments.value = tratamiento.value.acf.dr_comment.map(commentObj => ({
        doctor: commentObj.doctores_relacionados[0],  // Asumimos que hay un doctor en `doctores_relacionados`
        comentario: commentObj.comentario
    }));
}

const relativeDoctorLink = (link) => {
    if (link) {
        const url = new URL(link);
        return url.pathname;
    }
    return '';
};


// Observar el DOM
const observeDOM = () => {
    // Asegurarse de que este código se ejecute solo en el cliente
    if (import.meta.client) {
        const observer = new MutationObserver((mutations, obs) => {
            const panels = document.querySelectorAll('.treatment-panel');
            if (panels.length) {
                obs.disconnect();
            }
        });

        if (componentRef.value) {
            observer.observe(componentRef.value, {
                childList: true,
                subtree: true,
            });
        } else {
            console.error('Elemento a observar no está disponible');
        }
    }
};

watch(() => route.params.slug, async (newSlug) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
        // Refresca los datos tanto del tratamiento como de los ajustes del formulario.
        await refreshTratamiento();
        await refreshFormData();
    } catch (error) {
        errorMessage.value = "No se pudo cargar la información.";
    } finally {
        isLoading.value = false;
    }
}, { immediate: true });

watch(tratamiento, (nuevoValor) => {
    // Si 'tratamiento' es nulo o indefinido, redirige a '/error'.
    if (!nuevoValor) {
        router.push('/error');
    }
}, { immediate: true });

// Si no se encuentra el tratamiento, redirecciona a '/error'
if (!tratamiento.value) {
    router.push('/error');
}

const mainActive = async () => {
    await nextTick()
    let main = document.querySelector('body')
    main.classList.add('visible')
}

const processAncla = (ancla) => {
    // Convertir a minúsculas
    let processed = ancla.toLowerCase()

    // Reemplazar acentos y caracteres especiales
    processed = processed.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Reemplazar espacios con guiones bajos
    processed = processed.replace(/\s+/g, '_')

    return processed
}

const cellHeights = async () => {
    await nextTick();
    const imageContainers = document.querySelectorAll('.image_container');
    const celdas = document.querySelectorAll('.contenido_tabla > div')

    // Recoge todos los altos
    let maxAltura = 0;
    imageContainers.forEach(container => {
        const altura = container.offsetHeight;
        if (altura > maxAltura) {
            maxAltura = altura;
        }
    });

    // Aplica el alto máximo a todos los containers
    imageContainers.forEach(container => {
        container.style.height = maxAltura + 'px';
    });

    let maxCelda = 0;
    celdas.forEach(celda => {
        const altura = celda.offsetHeight;
        if (altura > maxCelda) {
            maxCelda = altura;
        }
    });

    // Aplica el alto máximo a todos los containers
    celdas.forEach(celda => {
        celda.style.height = maxCelda + 'px';
    });
};

const mostrarAnchorsMenu = async () => {
    await nextTick()
    let navigation = document.querySelector('.nav-pages')
    let button = document.querySelector('.kebab')

    if (navigation) {
        // console.log('navegación secundaria');
        let totalMenu = document.querySelector('.header-wrapper').offsetWidth
        let totalCat = document.querySelector('.nav-categories').offsetWidth
        let totalButton = document.querySelector('.nav-secondary').offsetWidth
        let maxMenuWidth = (totalMenu - totalCat - totalButton - 20) + 'px'

        // console.log(totalButton);

        let mm = gsap.matchMedia()
        mm.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: navigation,
                    start: "300 top",
                    toggleActions: "play none reverse none",
                    // markers: true 
                }
            }, 0)

            tl.to('.nav-pages',
                {
                    ease: 'power1.out',
                    maxWidth: maxMenuWidth,
                    duration: 0.5
                }, 0)
                .to('.nav-panels ul', { autoAlpha: 1 }, '<')
                .to('.nav-pages svg', { autoAlpha: 0 }, '<')
        })

        mm.add("(max-width: 767px)", () => {
            let menuAbierto = false;
            button.addEventListener('click', () => {
                // console.log('botón clicado');

                if (!menuAbierto) {
                    // Si el menú está cerrado, lo abrimos
                    gsap.to(navigation, {
                        ease: 'power1.out',
                        maxWidth: '50vw',
                        height: 'fit-content',
                        paddingTop: '4em',
                        ease: 'power1.inOut',
                        duration: 0.75
                    }, 0);
                    gsap.to('.nav-panels ul', { autoAlpha: 1 }, '<');
                } else {
                    // Si el menú está abierto, lo cerramos
                    gsap.to(navigation, {
                        ease: 'power1.out',
                        maxWidth: '8.25em', // Asume que este es el estado inicial de tu menú
                        height: '100%', // Ajusta estos valores según sea necesario
                        paddingTop: '0em',
                        ease: 'power1.inOut',
                        duration: 0.75
                    }, 0);
                    gsap.to('.nav-panels ul', { autoAlpha: 0 }, '<');
                }

                menuAbierto = !menuAbierto; // Cambia el estado del menú
            });
        })

    }
}

const currentUrl = route.fullPath

// Recorremos todos los tabs y generamos los JSON-LD para los vídeos
let allVideosJsonLd = [];
const uniqueVideoIds = new Set();

if (tratamiento.value.acf?.applicationldjson?.[0] === 'true') {
    for (const tab of tratamiento.value.acf.tabs) {
        if (Array.isArray(tab.videos) && tab.videos.length > 0) {
            // Filtra vídeos que sean exclusivamente de YouTube
            const validVideos = tab.videos.filter(video => {
                const videoUrl = video.video;
                return videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));
            });

            if (validVideos.length > 0) {
                const videoJsonLd = await useVideoJsonLd(validVideos, currentUrl);

                // Filtra videos duplicados por videoId
                const filteredVideoJsonLd = videoJsonLd.itemListElement.filter(video => {
                    const videoId = video.embedUrl.split('/').pop();
                    if (uniqueVideoIds.has(videoId)) {
                        return false;
                    } else {
                        uniqueVideoIds.add(videoId);
                        return true;
                    }
                });

                allVideosJsonLd.push(...filteredVideoJsonLd);
            }
        }
    }
} else {
    console.error('applicationldjson no está habilitado o no se encontró.');
}

// Inicializamos tratamientoJsonLd como null
let tratamientoJsonLd = null;

// Genera el JSON-LD para el tratamiento solo si servicetype existe
if (tratamiento.value.acf?.datos?.servicetype && clinicasData.value) {
    const { generateStructuredData } = useTratamientoData(tratamiento, clinicasData);
    tratamientoJsonLd = generateStructuredData();
}

let faqJsonLd = null;
// Genera el JSON-LD para las FAQs
if (tratamiento.value.acf?.faqs) {
    faqJsonLd = useFaqJsonLd(tratamiento.value.acf.faqs);
}

const { generateBreadcrumbData } = useBreadcrumbData(tratamiento);
const breadcrumbJson = generateBreadcrumbData();

// Genera los metadatos de Yoast
const { generateYoastHead } = useYoastHead(tratamiento);
const yoastHead = generateYoastHead();

// Generar los JSON-LD de los doctores usando el composable
const doctorScripts = doctorsWithComments.value.flatMap(({ doctor }) => {
    const { injectDoctorData } = useDoctorsJson(doctor);  // Composable para generar JSON-LD
    const { doctorData, publicationElements } = injectDoctorData();

    return [
        doctorData && {
            type: 'application/ld+json',
            children: JSON.stringify(doctorData)
        },
        // ...publicationElements.map(publication => ({
        //     type: 'application/ld+json',
        //     children: JSON.stringify(publication)
        // }))
    ].filter(Boolean);
});

// Inyectar todos los scripts JSON-LD en un solo `useHead`
useHead({
    script: [
        // JSON-LD para el tratamiento
        tratamientoJsonLd && {
            type: 'application/ld+json',
            children: JSON.stringify(tratamientoJsonLd),
        },
        // JSON-LD para el breadcrumb
        breadcrumbJson && {
            type: 'application/ld+json',
            children: JSON.stringify(breadcrumbJson),
        },
        // JSON-LD para los videos
        allVideosJsonLd.length > 0 && {
            type: 'application/ld+json',
            children: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "ItemList",
                "itemListElement": allVideosJsonLd
            }),
        },
        // JSON-LD para las preguntas frecuentes
        faqJsonLd && {
            type: 'application/ld+json',
            children: JSON.stringify(faqJsonLd),
        },
        // JSON-LD para los doctores
        ...doctorScripts
    ].filter(Boolean),  // Filtrar valores nulos o undefined
    ...yoastHead
});

onMounted(async () => {
    await cellHeights()
    await mainActive()
    await mostrarAnchorsMenu()
    observeDOM()
})
</script>

<style lang="scss" scoped>
#faqs,
#presupuesto,
#relacionadas,
#doctores,
#premios,
#opiniones,
#posts,
[data-anchor] {
    scroll-margin-top: 10rem;
}
</style>
