<template>
    <main class="page site-main grid grid-cols-[repeat(16,_minmax(0,_1fr))]" v-if="pages">
        <UiBotonCita v-if="pages.acf" :data="pages.acf.boton_cita" />
        <PageHeading :data="pages" />
        <NuxtLazyHydrate when-idle>
            <LazyCirugiasEntryText :data="pages" class="mt-12" />
            <LazyPageCatRelacionadas :data="pages.acf" />
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <FormsPiceCita v-if="pages.acf && pages.acf.formulario" :titulo="`¿No encuentras tu cirugía?`"
                :portalId="String(pages.acf.formulario.portalid)" :formId="pages.acf.formulario.formid" />
            <div class="clear-both"></div>
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <section v-if="pages.acf && pages.acf.hero && pages.acf.hero.texto_imagen"
                class="quote font-base text-balance normal-case font-semibold py-40 w-full col-[1_/_span_16] grid grid-cols-subgrid">
                <ElementsReveal :titulo="pages.acf.hero.texto_imagen" tag="div" />
            </section>
        </NuxtLazyHydrate>
        <NuxtLazyHydrate when-idle>
            <PageRecomendaciones v-if="pages.acf" :data="pages.acf" />
        </NuxtLazyHydrate>
    </main>
</template>

<script setup>
import { useBreadcrumbData } from '@/composables/useBreadcrumbJson';
import { getPage } from '@/composables/useApi';
import { useError } from '#app';

const router = useRouter();
const route = useRoute();

const { data: pages, refresh } = await useAsyncData(
    `pages-${route.params.slug}`,
    async () => {
        try {
            const response = await getPage(route.params.slug);

            // Si no se encuentra la página, lanzamos un error 404
            if (!response || Object.keys(response).length === 0) {
                const nuxtError = useError();
                nuxtError({
                    statusCode: 404,
                    statusMessage: 'Página no encontrada'
                });
            }

            // Retornar la respuesta si todo está bien
            return response || {}; // Asegurarse de que siempre se retorne un objeto
        } catch (error) {
            console.error(`Error fetching page ${route.params.slug}:`, error);

            // En caso de error del servidor, lanzamos un error 500
            const nuxtError = useError();
            nuxtError({
                statusCode: 500,
                statusMessage: 'Error en el servidor'
            });

            return {}; // En caso de error, retornar un objeto vacío
        }
    },
    {
        watch: [() => route.params.slug],
        initialCache: false
    }
);

watch(() => route.params.slug, async (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
        // Llamar explícitamente a `refresh` para recargar los datos
        await refresh();
    }
    // Aquí puedes incluir cualquier lógica adicional necesaria cuando cambie el slug
}, { immediate: true });


// Métodos
const textReveal = async () => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    await nextTick()

    let split = new SplitText(".content__header-title", { type: "lines" });
    let masks;
    function makeItHappen() {
        masks = [];
        split.lines.forEach((target) => {
            let mask = document.createElement("span");
            mask.className = "mask-reveal";
            target.append(mask);
            masks.push(mask);
            gsap.to(mask, {
                scaleX: 0,
                transformOrigin: "right center",
                ease: "none",
                scrollTrigger: {
                    trigger: target,
                    scrub: true,
                    start: "top center",
                    end: "bottom center",
                    pinSpacing: false,
                    // markers: true
                }
            });
        });
    }

    window.addEventListener("resize", newTriggers);

    function newTriggers() {
        ScrollTrigger.getAll().forEach((trigger, i) => {
            trigger.kill();
            masks[i].remove();
        });
        split.split();
        makeItHappen();
    }

    makeItHappen();
}

const rAF = () => {
    return new Promise(r => window.requestAnimationFrame(r));
}

// Ciclo de vida
onMounted(async () => {
    await nextTick()
    await rAF()
    if (pages && pages.acf) {
        // Datos disponibles
        textReveal()
    }
    if (!pages.value) {
        router.push('/error');
    }
})

let tratamiento = pages
const { generateBreadcrumbData } = useBreadcrumbData(tratamiento);
const breadcrumbJson = generateBreadcrumbData();

const { generateYoastHead } = useYoastHead(pages);
const yoastHead = generateYoastHead();

useHead({
    script: [
        breadcrumbJson && {
            type: 'application/ld+json',
            children: JSON.stringify(breadcrumbJson),
        },
    ].filter(Boolean), // Filtra los valores nulos o undefined
    ...yoastHead,
});
</script>
