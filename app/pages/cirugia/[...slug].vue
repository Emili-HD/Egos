<template>
    <main class="site-main [&.tratamiento-113]:bg-crema [&.tratamiento-113]:text-vermell" v-if="tratamiento"
        ref="componentRef" :class="`tratamiento-${tratamiento.categoria_tratamiento}`">
        <UiBotonCita v-if="tratamiento && tratamiento.acf && tratamiento.acf.boton_cita"
            :data="tratamiento.acf.boton_cita" />
        <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
            <NuxtLazyHydrate when-idle>
                <CirugiasEncabezado :data="tratamiento" :route="route.fullPath"/>
                <CirugiasDetallesCirugia :detallesData="tratamiento.acf.detalles_intervencion" />
            </NuxtLazyHydrate>
        </section>

        <NuxtLazyHydrate when-idle>
            <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
                <LazyElementsAnchors v-if="tratamiento && tratamiento.acf && tratamiento.acf.tabs"
                    :data="tratamiento.acf.tabs" :doctors="tratamiento.acf" class="col-[1/-1] sm:col-[2/-2]" />
                <LazyCirugiasEntryText :data="tratamiento" />
            </section>
        </NuxtLazyHydrate>

        <NuxtLazyHydrate when-idle>
            <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit" v-if="tratamiento && tratamiento.acf && tratamiento.acf.tabs">
                <div class="tratamiento__content col-[1_/_span_16] py-2 px-0">
                    <div class="panels w-full">
                        <div :id="processAncla(content.ancla)" :data-anchor="processAncla(content.ancla)"
                            class="panel grid grid-cols-16 row-gap-4 xl:gap-2 xl:mb-32 py-12 [&.tabla]:bg-blue-1 [&.tabla]:text-nude-8 [.tratamiento-113_&.tabla]:bg-transparent [.blackfriday_&.tabla]:!bg-blackfriday"
                            :class="content.fondo, content.opciones_listado" v-for="content in tratamiento.acf.tabs">
                            <LazyCirugiasFigure v-if="content.opciones_listado === 'pestanyes' || content.opciones_listado === 'sinListado'" :contentData="content" />
                            <LazyCirugiasTabla v-else-if="content.opciones_listado === 'tabla'" :contentData="content" />
                            <LazyCirugiasColumnas v-else-if="content.opciones_listado === 'columnas'" :contentData="content" />
                            <LazyLandingsAntesDespues v-else-if="content.opciones_listado === 'antesdespues'" :data="content" />
                        </div>
                    </div>
                </div>
            </section>
        </NuxtLazyHydrate>

        <NuxtLazyHydrate when-idle>
            <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
                <LazyCirugiasClinicasRelacionadas v-if="tratamiento.acf && tratamiento.acf.clinicas_relacionadas"
                    :data="tratamiento.acf.clinicas_relacionadas"
                    :titulo="tratamiento.acf.titulo_cirugias_relacionadas"
                    :texto="tratamiento.acf.texto_cirugias_relacionadas" class="col-[1/-1]" />
            </section>
        </NuxtLazyHydrate>

        <NuxtLazyHydrate when-idle>
            <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
                <LazyCirugiasFaqs class="grid grid-cols-16 col-[1/-1]" :faqsData="tratamiento.acf" />
            </section>
        </NuxtLazyHydrate>

        <NuxtLazyHydrate when-idle>
            <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
                <div class="form__page grid grid-cols-16 col-[1/-1] mb-12" v-if="tratamiento.acf">
                    <LazyCirugiasFormSection :data="tratamiento.acf" :name="tratamiento" :route="route.fullPath" />
                </div>
            </section>
        </NuxtLazyHydrate>
        
        <ClientOnly>
            <LazyCirugiasRelatedTreatments :treatmentsData="tratamiento.acf"
                :relatedId="tratamiento.acf.cirugias_relacionadas" :category="category" />
        </ClientOnly>
    
        <section class="oferta__form py-12 xl:py-24 mb-0" v-for="setting in form.form_settings"
            :key="setting.formid">
            <div class="oferta" v-if="setting.ubicacion === 'oferta'">
                <FormsOferta :data="setting" :portalId="setting.portalid" :formId="setting.formid" />
            </div>
        </section>

        <section v-if="tratamiento.acf.dr_comment" id="doctores" class="grid grid-cols-12 mb-20 gap-y-8"
            data-anchor="doctores">
            <h2 class="h4 col-[2/-2] lg:text-center">Nuestro Equipo en {{ tratamiento.acf.anchor }}</h2>
            <DoctorComentario :data="doctorsWithComments" />
        </section>

        <section>
            <div
                class="detalles__header p-12 lg:p-24 flex justify-center items-center gap-4 md:gap-8 text-nude-8 [.blackfriday_&]:bg-black [html:not(.blackfriday)_&]:bg-blue-3 w-full">
                <h2 class="h4 mb-0 text-clamp-lg">Avalados por</h2>
                <img loading="lazy" class="max-w-[50%]"
                    src="https://test.clinicaegos.com/wp-content/uploads/2024/02/quiron-salud.svg" alt="quiron-salud"
                    width="250" height="53">
            </div>
        </section>

        <section id="testimonios-cirugias" class="p-8 lg:p-20  2xl:p-32 pb-0" v-if="tratamiento.acf.testimonios && tratamiento.acf.testimonios.testimonios_cirugia && tratamiento.acf.testimonios.testimonios_cirugia.length > 0">
            <h2 class="lg:text-center mb-8">{{ tratamiento.acf.testimonios.titulo }}</h2>
            <CirugiasTestimoniosRelacionados :data="tratamiento.acf.testimonios.testimonios_cirugia" />
        </section>

        <section id="opiniones"
            class="col-[2/-2] lg:col-start-2 lg:col-span-9 bg-transparent min-h-max px-8 py-24 xl:px-[calc(100%/16)] mt-32"
            data-anchor="opiniones">
            <h2 class="h4 text-center">Nuestros pacientes opinan de EGOS</h2>
            <GoogleReviews :placeid="tratamiento.acf.placeid" :cirugia="tratamiento"/>
        </section>

        <LazyCirugiasRelatedPosts :treatmentsData="tratamiento.acf" />

    </main>
</template>

<script setup>
    import { provide } from 'vue';
    import { useYoastHead } from '@/composables/useYoast';
    import { useTratamientoData } from '@/composables/useTratamientoData';
    import { useProcedureData } from '@/composables/useMedicalProcedureSchema';
    import { useFaqJsonLd } from '@/composables/useFaqJsonLd';
    import { useVideoJsonLd } from '@/composables/useVideoJsonLd';
    import { useBreadcrumbData } from '@/composables/useBreadcrumbJson';
    import { useDoctorsJson } from '~/composables/useDoctorsJson';
    import { getClinicas } from '@/composables/useApi'
    import GoogleReviews from '~/components/Ui/GoogleReviews.vue';
    import { useTreatmentsStore } from '@/stores/treatments';
    
    const { $gsap: gsap } = useNuxtApp();
    const router = useRouter();
    const route = useRoute();
    provide('routePath', route.fullPath);

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

    // Estado global del store de tratamientos
    const treatmentsStore = useTreatmentsStore();

    // Computed para el slug actual, evitando valores inválidos
    const slug = computed(() => {
        const param = route.params.slug;
        return Array.isArray(param) ? param.join('/') : param || null;
    });
    
    // Cargar el tratamiento desde el store
    if (slug.value) {
        await treatmentsStore.fetchTreatment({ slug: slug.value });
    }

    // Acceder al tratamiento desde el store
    const tratamiento = computed(() => treatmentsStore.treatments[route.params.slug]);

    // Verificar si el tratamiento existe
    if (!tratamiento.value) {
        throw createError({
            statusCode: 404,
            message: 'Tratamiento no encontrado',
        });
    }

    let htmlClassAdded = false; // Para evitar duplicar clases

    // Función para agregar la clase 'estetica' a la etiqueta <html>
    function addHtmlClass(className) {
        if (!htmlClassAdded && document.documentElement) {
            document.documentElement.classList.add(className);
            htmlClassAdded = true;
            // console.log('Clase añadida a <html>:', document.documentElement.classList);
        }
    }

    // Función para eliminar la clase cuando el componente se desmonta
    function removeHtmlClass(className) {
        if (htmlClassAdded && document.documentElement) {
            document.documentElement.classList.remove(className);
            htmlClassAdded = false;
            // console.log('Clase eliminada de <html>:', document.documentElement.classList);
        }
    }

    // Función para verificar si la clase debe aplicarse
    function checkAndApplyClass() {
        if (route.path.includes('/medicina-estetica')) {
            addHtmlClass('estetica');
        } else {
            removeHtmlClass('estetica');
        }
    }

    // Eliminar la clase cuando el componente se desmonte
    onUnmounted(() => {
        removeHtmlClass('estetica');
    });

    // Manejo de los datos del formulario
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

    // Manejo de los datos de las clínicas
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

    watch(slug, async (newSlug) => {
        if (newSlug) {
            await treatmentsStore.fetchTreatment({ slug: newSlug });
        }
    }, { immediate: true });

    watch(
        () => route.params.slug,
        async (newSlug) => {
            isLoading.value = true;
            errorMessage.value = "";

            // Si la URL contiene '/http', la redirigimos a la página de error
            if (route.fullPath.includes('/http')) {
                router.push('/error');
                return;
            }

            try {
                // Solo intentamos refrescar si el slug es válido
                if (newSlug) {
                    await treatmentsStore.fetchTreatment({ slug: newSlug });
                    await refreshFormData();
                }
            } catch (error) {
                errorMessage.value = "No se pudo cargar la información.";
            } finally {
                isLoading.value = false;
            }
        },
        { immediate: true }
    );

    watch(tratamiento, (newValue) => {
        // Si 'tratamiento' es nulo o indefinido, redirige a '/error'.
        if (newValue === null) {
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
    }

    // Inicializamos tratamientoJsonLd como null
    let tratamientoJsonLd = null;
    let procedureJsonLd = null;

    // Genera el JSON-LD para el tratamiento solo si servicetype existe
    if (tratamiento.value.acf?.datos?.servicetype && clinicasData.value) {
        const { generateStructuredData } = useTratamientoData(tratamiento, clinicasData);
        tratamientoJsonLd = generateStructuredData();
    }

    // Genera el JSON-LD para el tratamiento solo si servicetype existe
    if (tratamiento.value.acf?.datos?.procedureType) {
        const { generateProcedureData } = useProcedureData(tratamiento);
        procedureJsonLd = generateProcedureData();
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
        ].filter(Boolean);
    });

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
        if (window.location.href.includes('/false/')) {
            const cleanUrl = window.location.href.replace('/false/', '/');
            window.history.replaceState({}, '', cleanUrl);
        }

        await cellHeights()
        await mainActive()
        await mostrarAnchorsMenu()
        observeDOM()

        checkAndApplyClass();


        const fullHref = window.location.href;
        // console.log("Full Href:", fullHref);

        // Comprobar si la URL contiene '/http', lo que indicaría una URL malformada
        if (fullHref.includes('/http')) {
            router.push('/error');
        }

        router.afterEach((to) => {
            if (to.path.includes('/medicina-estetica')) {
                addHtmlClass('estetica');
            } else {
                removeHtmlClass('estetica');
            }
        });
    })
</script>

<style scoped>
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
