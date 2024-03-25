<template>
  <main class="site-main caso-real bg-nude-8 grid grid-cols-16 min-h-[100vh] mb-0" v-if="casoreal && casoreal.length > 0">
    <div class="caso-real__content col-[1/-1] lg:col-span-12 grid grid-cols-subgrid">
      <header class="caso-real__heading pt-32 lg:col-start-2 col-[2_/_span_14] lg:col-span-10 group" v-if="casoreal[0] && casoreal[0].title">
        <h1 class="">{{ casoreal[0].title.rendered }}</h1>
        <div v-if="casoreal[0].acf.vimeo_video"
          class="caso-real__video video__player col-start-2 col-span-10 flex flex-row justify-center items-start">
          <div class="w-full bg-nude-5 h-[max(400px,_65vh)] rounded-2xl">
            <VimeoPlayer :videoId="casoreal[0].acf.vimeo_video" />
          </div>
        </div>
      </header>
      <section class="caso-real__description lg:col-start-2 col-[2_/_span_14] lg:col-span-10 row-start-2 py-8 lg:py-20">
        <div v-html="casoreal[0].content.rendered"></div>
      </section>
    </div>
    <aside class="form__wrapper bg-blue-1 col-[1_/_span_16] lg:col-span-4 px-12 py-12 lg:pt-40 lg:pb-20" v-if="casoreal[0] && casoreal[0].acf">
      <FormsCirugia :identificador="'topPage'" :portalId="String(casoreal[0].acf.formulario.portalid)"
        :formId="casoreal[0].acf.formulario.formid" />
    </aside>
  </main>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { getSingleTestimonioBySlug } from '@/composables/useApi';
import { useRoute, useRouter } from 'vue-router';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const { $gsap: gsap, $lenis: lenis } = useNuxtApp();

// Estado reactivo para el post
const casoreal = ref(null);

// Acceder a los parámetros de la ruta
const router = useRouter();
const route = useRoute();

const getCasoReal = async () => {
  await nextTick()
  const slug = route.params.slug
  try {
    const response = await getSingleTestimonioBySlug(slug)
    if (response.data && response.data.length > 0) {
      casoreal.value = response.data;
    } else {
      // router.push('/error');
    }
  } catch (error) {
    console.error(error);
  }
};


const stickyForm = async () => {
  gsap.registerPlugin(ScrollTrigger)

  let mm = gsap.matchMedia()
  mm.add("(min-width: 1025px)", () => {
    const form = document.querySelector('.form-landing')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".form__wrapper",
        pin: form,
        start: "top 5%",
        //scrub: 0.5,
        end: "top bottom",
        endTrigger: "footer.footer",
        pinSpacing: false,
        toggleActions: "restart none none reverse",
        // markers: true,
      }
    });
  })

}

// Ciclo de vida Mounted
onMounted(async () => {
  await getCasoReal()
  await stickyForm()
});

// Datos YOAST SEO
useHead(() => {
  // Verifica si el post está cargado y tiene la estructura esperada
  if (!casoreal.value || !casoreal.value.length === 0 || !casoreal.value[0].yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
  const yoast = casoreal.value[0].yoast_head_json;

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
    { rel: 'canonical', href: yoast.canonical },
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
    title: yoast.title || 'Título del Post',
    meta: metaTags,
  };
});

</script>

<style lang="scss">
// empty style
</style>
