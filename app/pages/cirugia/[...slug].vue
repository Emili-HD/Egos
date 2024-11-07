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

        <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
            <NuxtLazyHydrate when-idle>
                <ElementsAnchors v-if="tratamiento && tratamiento.acf && tratamiento.acf.tabs"
                    :data="tratamiento.acf.tabs" :doctors="tratamiento.acf" class="col-[1/-1] sm:col-[2/-2]" />
                <CirugiasEntryText :data="tratamiento" />
            </NuxtLazyHydrate>
        </section>

        <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
            <div class="tratamiento__content col-[1_/_span_16] py-2 px-0">
                <div class="panels w-full">
                    <div :id="processAncla(content.ancla)" :data-anchor="processAncla(content.ancla)"
                        class="panel grid grid-cols-16 row-gap-4 xl:gap-2 xl:mb-32 py-12 [&.tabla]:bg-blue-1 [&.tabla]:text-nude-8 [.tratamiento-113_&.tabla]:bg-transparent [.blackfriday_&.tabla]:!bg-blackfriday"
                        :class="content.fondo, content.opciones_listado" v-for="content in tratamiento.acf.tabs">
                        <CirugiasFigure v-if="content.opciones_listado != 'columnas'" :contentData="content" />
                        <CirugiasTabla v-if="content.opciones_listado === 'tabla'" :contentData="content" />
                        <CirugiasColumnas v-if="content.opciones_listado === 'columnas'" :contentData="content" />
                        <LandingsAntesDespues v-if="content.opciones_listado === 'antesdespues'" :data="content" />
                    </div>
                </div>
            </div>
        </section>


        <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
            <ClinicasRelacionadas v-if="tratamiento.acf && tratamiento.acf.clinicas_relacionadas"
                :data="tratamiento.acf.clinicas_relacionadas"
                :titulo="tratamiento.acf.titulo_cirugias_relacionadas"
                :texto="tratamiento.acf.texto_cirugias_relacionadas" class="col-[1/-1]" />
        </section>

        <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
            <CirugiasFaqs class="grid grid-cols-16 col-[1/-1]" :faqsData="tratamiento.acf" />
        </section>

        <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
            <NuxtLazyHydrate when-idle>
                <div class="form__page grid grid-cols-16 col-[1/-1] mb-12" v-if="tratamiento.acf">
                    <CirugiasFormSection :data="tratamiento.acf" :name="tratamiento" :route="route.fullPath" />
                </div>
            </NuxtLazyHydrate>
        </section>
        
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

        <ElementsPremios />

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
            class="col-[2/-2] lg:col-start-2 lg:col-span-9 bg-transparent min-h-max px-8 xl:px-[calc(100%/16)] mt-32"
            data-anchor="opiniones">
            <h2 class="h4 text-center">Nuestros pacientes opinan de EGOS</h2>
            <GoogleReviews :placeid="tratamiento.acf.placeid" />
        </section>

        <LazyCirugiasRelatedPosts :treatmentsData="tratamiento.acf" />

    </main>
</template>

<script setup>
    import { provide } from 'vue';
    import { useYoastHead } from '@/composables/useYoast';
    import { useTratamientoData } from '@/composables/useTratamientoData';
    import { useFaqJsonLd } from '@/composables/useFaqJsonLd';
    import { useVideoJsonLd } from '@/composables/useVideoJsonLd';
    import { useBreadcrumbData } from '@/composables/useBreadcrumbJson';
    import { useDoctorsJson } from '~/composables/useDoctorsJson';
    import { getClinicas } from '@/composables/useApi'
    import GoogleReviews from '~/components/Ui/GoogleReviews.vue';
    import ClinicasRelacionadas from '~/components/cirugias/ClinicasRelacionadas.vue';

    
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

    // const { data: tratamiento, refresh: refreshTratamiento } = await useAsyncData(`tratamiento-${route.params.slug}`, { watch: [() => route.params.slug], initialCache: true });


    // Manejo del tratamiento
    const { data: tratamiento, refresh: refreshTratamiento } = await useAsyncData(
        `tratamiento-${route.params.slug}`,
        async () => {
            try {
                const response = await getTratamiento({ slug: route.params.slug });

                // Verifica si la respuesta es válida
                if (!response || typeof response !== 'object' || Object.keys(response).length === 0) {
                    throw createError({
                        statusCode: 404,
                        message: 'Tratamiento no encontrado'
                    });
                }

                return response;
            } catch (error) {
                // console.error(`Error fetching tratamiento ${route.params.slug}:`, error);

                // Lanzar un error genérico si hay un problema con la solicitud
                throw createError({
                    statusCode: 500,
                    message: 'Error en el servidor'
                });
            }
        },
        {
            watch: [() => route.params.slug],
            initialCache: true
        }
    );


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
            console.log('Clase eliminada de <html>:', document.documentElement.classList);
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

    // Unificar el watch del `slug` para manejar tanto el refresco de los datos como la validación de URLs malformadas
    watch(
        () => route.params.slug,
        async (newSlug) => {
            isLoading.value = true;
            errorMessage.value = "";

            // Validar si la URL está malformada
            const fullPath = route.fullPath;


            const httpCount = (fullPath.match(/https?:\/\//g) || []).length;

            if (httpCount > 1) {
                // Si la URL contiene más de un "http" o "https", redirigimos a la página de error
                router.push('/error');
                return;
            }

            try {
                // Refresca los datos del tratamiento y el formulario
                await refreshTratamiento();
                await refreshFormData();
            } catch (error) {
                errorMessage.value = "No se pudo cargar la información.";
            } finally {
                isLoading.value = false;
            }
        },
        { immediate: true }
    );

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

    const mostrarRiesgos = async () => {
        // Seleccionamos los elementos necesarios
        let disparador = document.querySelector('#riesgos.panel .panel__content h2');
        let icono = document.querySelector('#riesgos.panel .panel__content h2 svg');
        let contenido = document.querySelector('#riesgos.panel .panel__content .answer');

        if (disparador && contenido && icono) {
            // Añadir un solo listener para alternar entre mostrar y ocultar
            disparador.addEventListener('click', () => {
                if (contenido.classList.contains('isExpanded')) {
                    // Contraer el contenido
                    icono.style.transform = "rotate(0deg)";
                    contenido.style.maxHeight = '0px';
                    contenido.classList.remove('isExpanded');
                } else {
                    // Expandir el contenido
                    icono.style.transform = "rotate(45deg)";
                    contenido.style.maxHeight = '1000px';
                    contenido.classList.add('isExpanded');
                }
            });
        }
    };


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

    // Obtener los premios del composable
    const { awards } = useAwardsSchema();

    // Convertir los premios a JSON-LD
    const awardsJsonLd = JSON.stringify(awards);

    // Inyectar todos los scripts JSON-LD en un solo `useHead`
    useHead({
        // bodyAttrs: {
        //     class: () => (tratamiento.value?.tipo?.includes(112) ? 'estetica' : '')
        // },
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
            // awardsJsonLd && {
            //     type: 'application/ld+json',
            //     children: awardsJsonLd
            // },
            // JSON-LD para los doctores
            ...doctorScripts
        ].filter(Boolean),  // Filtrar valores nulos o undefined
        ...yoastHead
    });

    onMounted(async () => {
        await cellHeights()
        await mainActive()
        await mostrarAnchorsMenu()
        await mostrarRiesgos()
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
