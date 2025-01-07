<template>
    <div v-if="landingError">Error al cargar la Promoción.</div>
    <main v-else class="site-main landing-main" v-if="landing && landing.acf">
        <!-- <UiBotonCita v-if="landing.acf.boton_cita" :data="landing.acf.boton_cita" /> -->
        <div class="fixed-button fixed top-full w-full py-3 px-6 z-[998]">
            <a class="gold" href="#hubspotLanding">Cita con el cirujano
            </a>
        </div>
        <section class="hero m-0 p-0 flex flex-col lg:flex-row justify-between items-stretch">
            <LocalesHeader :data="landing" />
            <!-- <div id="formulario" class="hero__form [.blackfriday_&]:bg-blackfriday [html:not(.blackfriday)_&]:bg-blue-1 p-12 w-full lg:w-1/3 flex flex-col justify-around">
                <FormsEsteticaForm :identificador="'formulario'" :portalId="String(landing.acf.form[0].portalid)" :formId="landing.acf.form[0].formid" :name="landing.title.rendered" />
            </div> -->
        </section>
        <CirugiasEntryText :data="landing" class="mt-6 lg:mt-20 p-6 [&>p]:text-clamp-base [&>p]:leading-relaxed" />

        <section class="intro lg:px-[calc(100%/16*2)] lg:py-20 lg:my-20" v-if="landing.acf && landing.acf.introduccion">
            <div class="bg-white px-6 py-12 lg:p-12 rounded-2xl text-clamp-base [&_ul]:mb-6 [&_ul]:pl-10 [&_li]:text-clamp-base [&_h3]:mt-6 [&_li]:mb-0"
                v-html="landing.acf.introduccion"></div>
        </section>

        <!-- Clínicas relacionadas -->
        <NuxtLazyHydrate when-idle>
            <RelatedClinicas v-if="landing.acf && landing.acf.localizaciones" :related="landing.acf.localizaciones"
                class="px-6 mb-12" />
        </NuxtLazyHydrate>

        <!-- Formulario Pide Cita -->
        <NuxtLazyHydrate when-idle>
            <section
                class="pidecita w-screen col-span-full grid grid-cols-16 grid-rows-2 lg:grid-rows-1 min-h-vh/70 py-0 lg:gap-0">
                <div class="col-span-full lg:col-span-11 min-h-vh/60">
                    <LazyElementsSingleGoogleMap :locations="landing.acf.localizaciones" :zoom="15" />
                </div>
                <div id="formulario"
                    class="half-right [.blackfriday_&]:bg-blackfriday [html:not(.blackfriday)_&]:bg-blue-1 col-span-full lg:col-span-5 flex flex-col justify-center items-center">
                    <div class="form__wrapper w-full p-12">
                        <FormsEsteticaForm :identificador="'map'" :portalId="String(landing.acf.form[0].portalid)"
                            :formId="landing.acf.form[0].formid" :name="landing.title.rendered" />
                    </div>
                </div>
            </section>
        </NuxtLazyHydrate>

        <!-- Casos Antes/Después -->
        <section v-for="block in landing.acf.secciones" class="content-wrapper">
            <div v-if="block.acf_fc_layout === 'titulo_precio'" class="destacado"></div>

            <div v-if="block.acf_fc_layout === 'antesdespues'" class="antes-despues">
                <LandingsAntesDespues :data="block" v-if="block && block.antes_despues.titulo_antesdespues"
                    class="px-0" />
            </div>

            <div v-if="block.acf_fc_layout === 'contenido'" class="content">
                <div class="tratamiento__content py-2 px-[calc(100%/16)]">
                    <div class="panels w-full" v-if="block.titulo">
                        <section class="panel flex flex-col-reverse lg:flex-row justify-between items-center gap-12">
                            <figure class="panel__image w-full lg:max-w-1/2">
                                <div v-if="block.videos !== null"
                                    class="video__player max-w-full flex flex-col lg:flex-row gap-4 h-fit">
                                    <div class="size-full lg:max-w-[60%] aspect-[9/16]"
                                        v-for="(videoItem, index) in block.videos" :key="index">
                                        <Player :videoId="videoItem.video_vimeo" />
                                    </div>
                                </div>
                                <img v-else class="size-full object-cover object-center rounded-2xl" loading="lazy"
                                    :src="block.imagen.url" :srcset="block.imagen.srcset" :width="block.imagen.width"
                                    :height="block.imagen.height" :alt="block.imagen.alt" />
                            </figure>

                            <div class="panel__content w-full lg:max-w-1/2">
                                <h2 class="text-clamp-2xl mb-8">{{ block.titulo }}</h2>
                                <div class="answer p-0">
                                    <div class="answer__content [&>ul]:mt-6" v-html="block.descripcion"></div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>

        <NuxtLazyHydrate when-idle>
            <div class="form__page grid grid-cols-subgrid col-[1/-1] my-12 lg:my-24"
                v-if="landing.acf && landing.acf.quiz && landing.acf.quiz.formid">
                <div id="presupuesto"
                    class="form__wrapper p-8 xl:p-20 col-[1/-1] xl:col-[1/9] bg-blue-1 flex flex-col justify-center items-center min-h-vh/80">
                    <FormsQuiz :identificador="'formPage'" :portalId="String(landing.acf.quiz.portalid)"
                        :formId="landing.acf.quiz.formid" :titulo="landing.acf.quiz.titulo_form"
                        :name="landing.title.rendered" class="max-w-[max(360px,_45vw)]" />
                </div>
            </div>
        </NuxtLazyHydrate>

        <!-- Doctores -->
        <NuxtLazyHydrate when-idle>
            <div v-if="landing.acf && landing.acf.dr_comment" class="grid grid-cols-12 sm:mb-20 gap-y-8 pt-20">
                <h2 class="col-[1/-1] lg:col-[2/-2] px-6 lg:text-center max-lg:text-clamp-4xl">{{
                    landing.acf.titulo_h2}}</h2>
                <!-- <ElementsDivider class="col-[2/-2]" /> -->
                <div v-if="doctorsWithComments.length > 0"
                    class="col-[1/-1] lg:col-[2/-2] px-6 grid grid-cols-12 gap-4">
                    <div class="overflow-hidden size-full flex flex-col items-center col-span-full lg:col-[1/7] border-y border-y-blue-1/25 pt-4"
                        v-for="({ doctor, comentario }, index) in doctorsWithComments" :key="doctor.ID">
                        <div
                            class="flex flex-col sm:flex-row justify-center items-center gap-x-6 text-center max-sm:pb-8">
                            <div class="w-full min-h-56 mb-8 sm:w-80  lg:aspect-square rounded-lg overflow-hidden">
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
                                <div class="text-clamp-sm leading-tight mb-4 text-left" v-html="comentario">

                                </div>
                                <!-- Botón de enlace a la página del doctor -->
                                <UiButton :to="relativeDoctorLink(doctor.permalink)"
                                    class="button blue text-clamp-xs size-full rounded-2xl block uppercase !px-3 !py-1 w-fit h-fit">
                                    más información
                                </UiButton>
                            </div>
                        </div>
                    </div>
                    <div v-if="landing.acf.descripcion_cirujanos"
                        class="col-span-full sm:col-[7/-1] sm:row-[1/3] text-left sm:text-center flex justify-center items-center text-nude-8 max-lg:mb-20 bg-blue-1 p-8 rounded-xl">
                        <div class="[&>p]:mb-0 [&>p]:text-balance [&>p]:text-clamp-lg"
                            v-html="landing.acf.descripcion_cirujanos"></div>
                    </div>
                    <div v-if="landing.acf.cirujano"
                        class="col-span-full text-left sm:text-center flex justify-center items-center p-4 rounded-xl py-20 mb-20 lg:my-20 bg-white">
                        <div class="mb-0 text-balance text-clamp-base lg:[&>*]:!text-center"
                            v-html="landing.acf.cirujano"></div>
                    </div>
                </div>
                <div v-else>
                    <p>Cargando información del doctor...</p>
                </div>
            </div>
        </NuxtLazyHydrate>

        <!-- Google Reviews -->
        <section
            class="col-[2/-2] lg:col-start-2 lg:col-span-9 bg-transparent min-h-max px-8 py-24 xl:px-[calc(100%/16)]">
            <h2 class="h4 text-center">Nuestros pacientes opinan de EGOS</h2>
            <GoogleReviews :placeid="landing.acf.localizaciones[0].placeid" />
        </section>
    </main>
</template>

<script setup>
import { watch, onMounted, provide } from 'vue';
// import { useAsyncData, useRouter, useRoute } from 'nuxt/app';
import RelatedClinicas from '~/components/elements/RelatedClinicas.vue';
import GoogleReviews from '~/components/Ui/GoogleReviews.vue';
import Player from '~/components/vimeo/player.vue';

useGTM()

const router = useRouter();
const route = useRoute();

provide('routePath', route.fullPath);

const loadData = () => {
    const slug = route.params.slug;
    return getUbicacion(slug); // Modificado para pasar solo el slug
};

// Función para cargar los datos
const { data: landing, error: landingError, refresh } = await useAsyncData(`landing-${route.params.slug}`, loadData, { initialCache: true });

const doctorsWithComments = ref([]);

// Asignar los datos de los doctores directamente desde `landing.acf.doctores_relacionados`
if (landing.value && landing.value.acf?.dr_comment) {
    // console.log('doctor list:', landing.value.acf.dr_comment);

    doctorsWithComments.value = landing.value.acf.dr_comment.map(commentObj => ({
        doctor: commentObj.doctores_relacionados[0],
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
section.content-wrapper:nth-child(odd) .content .panel {
    @apply flex-col-reverse lg:flex-row-reverse;
}

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

.hs-form-field {
    @apply text-white mt-6;
}

.hs-button {
  @apply mt-8 bg-gold-2 text-nude-8 uppercase font-normal p-2 rounded-full cursor-pointer animate-gradient bg-gold-gradient-text bg-[length:300%_300%] [animation-play-state:paused] hover:[animation-play-state:running] pt-3 pb-2 px-4;
}

.form-landing {
  input, select {
    @apply w-full flex py-2 px-4 text-white bg-transparent  border-b border-b-white/30 pointer-events-auto;    
  }
  select {
    @apply  py-3 px-4;    
  }
}

.hs-form-field input::placeholder {
  @apply text-transparent opacity-0;
}

.hs-form-field:has(input[type=tel]::placeholder) {
  @apply text-red-500;
}


.hs-form-field:has(input[type=text]:valid) > label,
.hs-form-field:has(input[type=email]:valid) > label {
  @apply -top-5;
}
.hs-phone:has(input[type=tel] + input[type=hidden]:not([value=""])) > label {
  @apply text-transparent;
}

.hs-form-field > label {
  @apply absolute top-2 block transition-all text-nude-8 pointer-events-none;
}

.hs-form-field input:focus,
.hs-form-field select:focus {
  @apply pb-2 border-b-2 outline-0;
  border-image: linear-gradient(to right, #e2d9bf, #908057);
  border-image-slice: 1;
}

.hs-form-field:has(input:focus) > label {
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
