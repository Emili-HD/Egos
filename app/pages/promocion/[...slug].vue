<template>
    <div v-if="landingError">Error al cargar la Promoción.</div>
    <main v-else class="site-main landing-main has-[.notices]:mt-12" v-if="landing && landing.acf">
        <ElementsNotices class="!fixed top-0 left-0 z-[9999]" />
        <UiBotonCita v-if="landing.acf.boton_cita" :data="landing.acf.boton_cita" />
        <div class="fixed-button fixed top-full w-full py-3 px-6 z-[998]">
            <a class="gold" href="#hubspotLanding">Cita con el cirujano
            </a>
        </div>
        <section class="hero m-0 p-0 min-h-vh flex flex-col lg:flex-row justify-between items-stretch">
            <LandingsHeader :data="landing" />
            <div id="formulario"
                class="hero__form [.blackfriday_&]:bg-blackfriday [html:not(.blackfriday)_&]:bg-blue-1 px-4 py-8 lg:px-12 w-full lg:w-1/2 flex flex-col justify-around">
                <div class="insignia mb-8 flex flex-row justify-center text-center">
                    <img class="max-w-[16rem]" loading="lazy" :src="landing.acf.insignia.url" alt="" />
                </div>
                <FormsEsteticaForm
                    v-if="landing && landing.acf && landing.acf.form[0] && landing.acf.form[0].tipo_de_formulario === 'Bloom'"
                    :identificador="'topPage'" :portalId="String(landing.acf.form[0].portalid)"
                    :formId="landing.acf.form[0].formid" :name="landing.title.rendered" :route="route.fullPath" />

                <FormsLanding v-else :portalId="String(landing.acf.form[0].portalid)"
                    :formId="landing.acf.form[0].formid" />
            </div>
        </section>

        <LandingsDetalles :data="landing.acf" />
        <LandingsAntesDespues :data="landing.acf" v-if="landing.acf && landing.acf.antes_despues.titulo_antesdespues" />
        <LandingsTestimonios :data="landing.acf" />
        <LandingsDestacado :data="landing.acf" />
        <section
            class="doctor__description grid grid-cols-16 pb-0 pt-32 xl:pt-48 [html:not(.blackfriday)_&]:bg-blue-1 [html.blackfriday_&]:bg-black">
            <LazyDoctorInsta v-if="insta && insta.length" :data="insta" :name="landing.title.rendered"
                :ruta="route.params.slug[0]" :tipo="'landing'"
                class="col-[2/16] [&_h2]:text-nude-8 [&_article]:xl:w-[calc(33%-1rem)]" />
        </section>
        <LandingsPromociones :data="landing.acf" />
        <div v-if="landing.acf && landing.acf.quiz_multiple && landing.acf.quiz_multiple.multiple_forms"
            id="presupuesto" class="form__wrapper bg-blue-2 flex flex-wrap justify-center gap-0 items-stretch">
            <FormsQuiz v-for="(form, index) in landing.acf.quiz_multiple.multiple_forms" :image="form.imagen"
                :identificador="'formPage-' + index" :portalId="String(form.portalid)" :formId="form.formid"
                :titulo="form.titulo_form" :name="landing.title.rendered"
                class="[&_form]:!w-[clamp(200px,_70vw,_700px)] [&_form]:mx-auto even:bg-blue-1" />
        </div>
        <LandingsFinanciacion :data="landing.acf" />
        <LandingsPasos :data="landing.acf" />
        <LandingsInformacion :data="landing.acf" />
        <!-- <LandingsResenas :data="landing.acf" /> -->
        <section id="opiniones"
            class="col-[2/-2] lg:col-start-2 lg:col-span-9 bg-nude-6 min-h-max px-8 py-24 xl:px-[calc(100%/16)] mt-24"
            data-anchor="opiniones">
            <h2 class="h4 text-center">Nuestros pacientes opinan de EGOS</h2>
            <GoogleReviews :placeid="landing.acf.placeid" />
        </section>
    </main>
</template>

<script setup>
import { watch, onMounted, provide } from 'vue';
import GoogleReviews from '~/components/Ui/GoogleReviews.vue';
useGTM()

const route = useRoute();

provide('routePath', route.fullPath);

const loadData = () => {
    const slug = route.params.slug;
    return getLanding(slug); // Modificado para pasar solo el slug
};

// Función para cargar los datos
const { data: landing, error: landingError, refresh } = await useAsyncData(`landing-${route.params.slug}`, loadData, { initialCache: true });

const { data: insta, refresh: refresInsta } = useAsyncData(`insta-${route.params.slug[0]}`, () => getInstaComments({ page: 1, per_page: 100, slug: route.params.slug }), {
    watch: [() => route.params.slug[0]]
});

// console.log('Insta', insta.value);


// console.log('ruta', route.params.slug[0]);


watch(
    () => route.params.slug,
    async (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
            await Promise.all([refresInsta()]);
        }
    },
    { immediate: true }
);

// Datos YOAST SEO
useHead(() => {
    // Verifica si el post está cargado y tiene la estructura esperada
    if (!landing.value || !landing.value.yoast_head_json) {
        return {
            title: 'Cargando...', // Título temporal mientras se cargan los datos
        };
    }

    // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
    const yoast = landing.value.yoast_head_json;

    const link = [
        {
            rel: 'canonical',
            href: (() => {
                // Asegurar que `yoast` y `yoast.canonical` están definidos
                if (yoast && yoast.canonical) {
                    // Añadir "www." si no está presente y no es una subdominio diferente
                    let canonical = yoast.canonical.startsWith('https://www.') ? yoast.canonical :
                        yoast.canonical.startsWith('https://') ? `https://www.${yoast.canonical.substring(8)}` : yoast.canonical;
                    // Asegurar que la URL termina con "/"
                    canonical = canonical.endsWith('/') ? canonical : `${canonical}/`;
                    return canonical;
                } else {
                    // Devolver un valor por defecto o manejar el caso de que `yoast` o `yoast.canonical` no estén definidos
                    // Esto podría ser una URL genérica o manejar el error de manera adecuada
                    return 'https://www.clinicaegos.com/';
                }
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
        { name: 'twitter:data1', content: yoast.twitter_misc?.['Tiempo de lectura'] },
        // Robots
        {
            name: 'robots',
            content: `${yoast.robots.index}, ${yoast.robots.follow}, ${yoast.robots['max-snippet']}, ${yoast.robots['max-image-preview']}, ${yoast.robots['max-video-preview']}`
        },
    ];

    // Añadir las imágenes de Open Graph si están disponibles
    if (yoast.og_image && yoast.og_image.length > 0) {
        yoast.og_image.forEach((image) => {
            metaTags.push({ property: 'og:image', content: image.url });
            metaTags.push({ property: 'og:image:width', content: image.width.toString() });
            metaTags.push({ property: 'og:image:height', content: image.height.toString() });
        });
    };

    return {
        title: yoast.title || 'Título del Post',
        link: link,
        meta: metaTags,
        // script: script,
    };
});

const injectStructuredData = async () => {
    if (landing.value && landing.value.acf && landing.value.acf.datos) { }
    const structuredData = {
        "@context": "http://schema.org",
        "@type": landing.value.acf.datos.type,
        "name": landing.value.acf.datos.name,
        "address": [
            {
                "@type": landing.value.acf.datos.adress.type,
                //  "streetAddress": landing.value.acf.datos.adress.streetaddress,
                //  "postalCode": landing.value.acf.datos.adress.postalcode,
                //  "addressLocality": landing.value.acf.datos.adress.addresslocality,
                //  "addressRegion": landing.value.acf.datos.adress.addressregion,
                //  "addressCountry": landing.value.acf.datos.adress.addresscountry,
                "name": landing.value.acf.datos.adress.addresscountry,
            }
        ],
        "offers": [
            {
                "@type": landing.value.acf.datos.offers.type,
                "price": landing.value.acf.datos.offers.price,
                "priceCurrency": landing.value.acf.datos.offers.pricecurrency,
                "availability": landing.value.acf.datos.offers.availability,
            }
        ],
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

onMounted(async () => {
    await injectStructuredData()
})
</script>

<style>

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        -webkit-text-fill-color: #ffffff;
        -webkit-box-shadow: 0 0 0px 1000px #1C2C44 inset;
        transition: background-color 5000s ease-in-out 0s;
    }

    .hs-input {
        display: inline-block;
        width: 90%;
        max-width: 500px;
        height: 30px;
        padding: 9px 10px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-weight: normal;
        line-height: 22px;
        color: #33475b;
        border: 1px solid #cbd6e2;
        box-sizing: border-box;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        -ms-border-radius: 3px;
        border-radius: 3px;
    }

    .hs-form-field {
        @apply text-white mt-6;
    }

    .hs-button {
        @apply mt-8 bg-gold-2 text-nude-8 uppercase font-normal p-2 rounded-full cursor-pointer animate-gradient bg-gold-gradient-text bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running] pt-3 pb-2 px-4;
    }

    .form-landing {

        input,
        select {
            @apply w-full flex py-2 px-4 text-white bg-transparent border-b border-b-white/30 pointer-events-auto;
        }

        select {
            @apply py-3 px-4;
        }
    }

    .hs-form-field input::placeholder {
        @apply text-transparent opacity-0;
    }

    .hs-form-field:has(input[type=tel]::placeholder) {
        @apply text-red-500;
    }


    .hs-form-field:has(input[type=text]:valid)>label,
    .hs-form-field:has(input[type=email]:valid)>label {
        @apply -top-5;
    }

    .hs-phone:has(input[type=tel] + input[type=hidden]:not([value=""]))>label {
        @apply text-transparent;
    }

    .hs-form-field>label {
        @apply absolute top-2 block transition-all text-nude-8 pointer-events-none;
    }

    .hs-form-field input:focus,
    .hs-form-field select:focus {
        @apply pb-2 border-b-2 outline-0;
        border-image: linear-gradient(to right, #e2d9bf, #908057);
        border-image-slice: 1;
    }

    .hs-form-field:has(input:focus)>label {
        @apply text-nude-1 transition-all block absolute -top-5;
    }

    .is-windows .hs-form-field select option {
        @apply text-blue-1;
    }

    .hs-form-field select.is-placeholder {
        @apply text-transparent pl-48;
    }

    .hs_selecciona_la_clinica select,
    .hs_cirugias select {
        @apply pl-48;
    }

    .hs-fieldtype-intl-phone.hs-input .hs-input {
        @apply pl-0;
    }

    .legal-consent-container label {
        @apply flex items-center;
    }

    .legal-consent-container label input {
        @apply w-4;
    }

    .legal-consent-container label span,
    .legal-consent-container label span p {
        @apply text-sm;
    }

    .hs-error-msgs {
        @apply absolute top-2 right-0 text-red-600;
    }
</style>
