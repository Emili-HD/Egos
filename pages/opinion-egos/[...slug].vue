<template>
    <main class="site-main caso-real bg-nude-8 grid grid-cols-16 min-h-[100vh] mb-0">
        <UiBotonCita v-if="casoreal && casoreal.acf && casoreal.acf.boton_cita" :data="casoreal.acf.boton_cita" />
        <div class="caso-real__content col-[1/-1] lg:col-span-11 grid grid-cols-subgrid">
            <header class="caso-real__heading pt-32 lg:col-start-2 col-[2_/_span_14] lg:col-span-9 group"
                v-if="casoreal && casoreal.title">
                <h1 class="">{{ casoreal.title.rendered }}</h1>
                <div v-if="casoreal.acf.vimeo_video"
                    class="caso-real__video video__player col-start-2 col-span-10 flex flex-row justify-center items-start">
                    <div class="w-full bg-nude-5 h-[max(400px,_65vh)] rounded-2xl">
                        <VimeoPlayer :videoId="casoreal.acf.vimeo_video" />
                    </div>
                </div>
            </header>
            <section
                class="caso-real__description lg:col-start-2 col-[2_/_span_14] lg:col-span-9 row-start-2 py-8 lg:py-20"
                v-if="casoreal && casoreal.content">
                <div v-html="processedContent"
                    class="[&>p:has(img.aligncenter)]:inline-flex [&>p:has(img.aligncenter)]:justify-center [&>p:has(img.aligncenter)]:w-[33%] [&>p:has(img.aligncenter)]:max-md:w-[100%] [&>p>img]:w-full">
                </div>
            </section>

            <!-- <NuxtLazyHydrate when-idle>
                <div v-if="casoreal.acf.dr_comment" id="doctores" class="grid grid-cols-12 mb-20 gap-y-8 col-[2_/-2]"
                    data-anchor="doctores">
                    <h2 class="h4 col-span-full lg:text-center">Qué opina el doctor</h2>
                    <DoctorComentario :data="doctorsWithComments" class="doctor-full" />
                </div>

                <ClinicasRelacionadas v-if="casoreal.acf && casoreal.acf.clinicas_relacionadas"
                            :data="casoreal.acf.clinicas_relacionadas"
                            :titulo="casoreal.acf.titulo_cirugias_relacionadas"
                            :texto="casoreal.acf.texto_cirugias_relacionadas" class="col-[1/-1]" />
            </NuxtLazyHydrate> -->
        </div>
        <aside class="form__wrapper bg-blue-2 col-[1_/_span_16] lg:col-span-5 px-12 py-12 lg:pt-40 lg:pb-20 h-full"
            v-if="casoreal && casoreal.acf">
            <FormsCustomForm :identificador="'formulario'" :portalId="String(casoreal.acf.formulario.portalid)"
                :formId="casoreal.acf.formulario.formid" />
        </aside>
    </main>
</template>

<script setup>
import { ref, watch, nextTick, computed } from 'vue';
import { useAsyncData, useRouter, useRoute, useNuxtApp } from 'nuxt/app';
import { getTestimonios } from '@/composables/useApi';
import ClinicasRelacionadas from '~/components/cirugias/ClinicasRelacionadas.vue';

const router = useRouter();
const route = useRoute();
const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp();

// Uso de `useAsyncData` para cargar los datos del caso real
const { data: casoreal, refresh } = await useAsyncData(
  `casoreal-${route.params.slug}`,
  async () => {
    try {
      const response = await getTestimonios({ slug: route.params.slug });

      // Si no hay respuesta válida, retornar null
      if (!response || Object.keys(response).length === 0) {
        return null;  // Retornar null si no se encuentra el caso real
      }

      return response;  // Retornar los datos si existen
    } catch (error) {
      console.error(`Error fetching casoreal ${route.params.slug}:`, error);
      return null;  // Retornar null en caso de error
    }
  },
  {
    watch: [() => route.params.slug],  // Observar el `slug` para recargar los datos
    initialCache: true  // Deshabilitar la caché inicial
  }
);

// Observa el valor de `casoreal` y redirige si es null
watchEffect(() => {
  if (!casoreal.value) {
    // Redirigir a la página de error si no se encuentra el caso real
    router.push('/error');
  }
});

const rawContent = computed(() => casoreal.value.content.rendered)

const processedContent = computed(() => {
    if (!rawContent.value) return ''

    return rawContent.value
        // Reemplaza solo URLs relativas que empiezan con `//`
        .replace(/(src|srcset)="\/\/([^"]*)"/g, '$1="https://test.clinicaegos.com/$2"')
        // Asegúrate de que las URLs absolutas incorrectamente formadas no se dupliquen
        .replace(/https:\/\/test\.clinicaegos\.com\/https:\/\/test\.clinicaegos\.com\//g, 'https://test.clinicaegos.com/')
        // Corrige cualquier caso de `srcset` que todavía use el dominio principal
        .replace(/https:\/\/clinicaegos\.com/g, 'https://test.clinicaegos.com')
})

watch(
    () => route.params.slug,
    async (newSlug, oldSlug) => {
        if (newSlug !== oldSlug) {
            await refresh();
        }
    },
    { immediate: true }
);

const waitForElement = (selector, timeout = 10000) => {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                clearInterval(interval);
                reject(new Error(`Element ${selector} not found within timeout`));
            }
        }, 100);
    });
};

const doctorsWithComments = ref([]);

// Asignar los datos de los doctores directamente desde `casoreal.acf.doctores_relacionados`
if (casoreal.value && casoreal.value.acf?.dr_comment) {
    doctorsWithComments.value = casoreal.value.acf.dr_comment.map(commentObj => ({
        doctor: commentObj.doctores_relacionados[0],  // Asumimos que hay un doctor en `doctores_relacionados`
        comentario: commentObj.comentario
    }));
}

const stickyForm = async () => {
    await nextTick(); // Espera a la próxima renderización
    gsap.registerPlugin(ScrollTrigger);

    try {
        const form = await waitForElement('.form-landing');
        // console.log('Form:', form);

        if (form) {
            let mm = gsap.matchMedia();
            mm.add("(min-width: 1025px)", () => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".form__wrapper",
                        pin: form,
                        start: "top 0%",
                        end: "top bottom",
                        endTrigger: "footer.footer",
                        pinSpacing: false,
                        toggleActions: "restart none none reverse",
                        // markers: true,
                    }
                });
            });
        }
    } catch (error) {
        console.error(error.message);
    }
};

// Ciclo de vida Mounted
onMounted(async () => {
    await nextTick(); // Espera a la próxima renderización
    await stickyForm();
    await injectStructuredData(); // Asegúrate de que esta función también se ejecute después de la renderización
});

let tratamiento = casoreal;
const { generateBreadcrumbData } = useBreadcrumbData(tratamiento);
const breadcrumbJson = generateBreadcrumbData();

const { generateYoastHead } = useYoastHead(casoreal);
const yoastHead = generateYoastHead();

let structuredData = null;

const injectStructuredData = async () => {
    structuredData = {
        "@context": "http://schema.org",
        "@type": casoreal.value.acf.datos.type,
        "name": casoreal.value.acf.datos.name,
        "address": [
            {
                "@type": casoreal.value.acf.datos.adress.type,
                "name": casoreal.value.acf.datos.adress.addresscountry,
            }
        ],
        "aggregateRating": [
            {
                "@type": casoreal.value.acf.datos.aggregaterating.type,
                "ratingValue": casoreal.value.acf.datos.aggregaterating.ratingvalue,
                "reviewCount": casoreal.value.acf.datos.aggregaterating.reviewcount,
            }
        ],
    };
    
    // Inyecta el structuredData en el head
    useHead({
        script: [
            breadcrumbJson && {
                type: 'application/ld+json',
                children: JSON.stringify(breadcrumbJson),
            },
            structuredData && {
                type: 'application/ld+json',
                children: JSON.stringify(structuredData),
            },
        ].filter(Boolean), // Filtra los valores nulos o undefined
        ...yoastHead,
    });
};

// Ejecuta la función asíncrona y espera su finalización
injectStructuredData().catch(console.error);
</script>

<style lang="scss">
// empty style
</style>
