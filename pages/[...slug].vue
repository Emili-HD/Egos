<template>
  <main class="page site-main grid grid-cols-[repeat(16,_minmax(0,_1fr))]" v-if="pages">
      <PageHeading :data="pages" />
      <DelayHydration>
        <LazyPageCatRelacionadas :data="pages.acf" />
      </DelayHydration>
      <FormsPiceCita :titulo="`¿No encuentras tu cirugía?`" :portalId="String(pages.acf.formulario.portalid)" :formId="pages.acf.formulario.formid" />
      <section class="quote font-base text-balance normal-case font-semibold py-40 w-full col-[1_/_span_16] grid grid-cols-subgrid" >
          <ElementsReveal :titulo="pages.acf.hero.texto_imagen" tag="div" />
      </section>
      <PageRecomendaciones :data="pages.acf" />
  </main>
</template>

<script setup>
import { watch, onMounted } from 'vue';
import { useAsyncData, useRouter, useRoute } from 'nuxt/app';
import { getPage } from '@/composables/useFetch';

const router = useRouter();
const route = useRoute();

// Utiliza `useAsyncData` para cargar la página basada en el slug de la ruta, incluyendo un `uniqueId`
const { data: pages, refresh } = await useAsyncData(`pages-${route.params.slug}`, () => {
  return getPage(route.params.slug);
}, { watch: [() => route.params.slug], initialCache: false });

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
</script>
