<template>
  <main class="site-main" v-if="tratamiento" ref="componentRef">
    <section class="cirugia grid grid-cols-16 gap-0 xl:p-0 min-h-fit">
      <CirugiasEncabezado :data="tratamiento" />
      <NuxtLazyHydrate when-idle>
        <CirugiasDetallesCirugia :detallesData="tratamiento.acf.detalles_intervencion" />
        <CirugiasEntryText :data="tratamiento" />
      </NuxtLazyHydrate>

      <NuxtLazyHydrate when-idle>
        <div class="tratamiento__content col-[1_/_span_16] py-2 px-0">
          <div class="panels w-full">
            <section :id="processAncla(content.ancla)"
              class="panel grid grid-cols-16 row-gap-4 xl:gap-2 xl:mb-32 py-12 [&.tabla]:bg-blue-1 [&.tabla]:text-nude-8"
              :class="content.fondo, content.opciones_listado" v-for="content in tratamiento.acf.tabs">
              <CirugiasFigure v-if="content.opciones_listado != 'columnas'" :contentData="content" />
              <CirugiasTabla :contentData="content" />
              <CirugiasColumnas :contentData="content" />
              <LandingsAntesDespues v-if="content.opciones_listado === 'antesdespues'" :data="content" />
            </section>
  
            <CirugiasFaqs :faqsData="tratamiento.acf" />
          </div>
        </div>
      </NuxtLazyHydrate>

      <NuxtLazyHydrate when-idle>
        <div class="form__page grid grid-cols-subgrid col-[1/-1] mb-12">
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
      <section class="oferta__form py-12 xl:py-24 mb-0" v-for="setting in form.form_settings" :key="setting.formid">
        <div class="oferta" v-if="setting.ubicacion === 'oferta'">
          <FormsOferta :data="setting" :portalId="setting.portalid" :formId="setting.formid" />
        </div>
      </section>
    </NuxtLazyHydrate>
    <NuxtLazyHydrate when-idle>
      <LazyCirugiasRelatedPosts :treatmentsData="tratamiento.acf" />
    </NuxtLazyHydrate>
  </main>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { useAsyncData, useRouter, useRoute } from 'nuxt/app';
import { getTratamiento, egosSettings } from '@/composables/useApi';

const router = useRouter();
const route = useRoute();
const { $gsap: gsap } = useNuxtApp();

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

// Métodos

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

const { data: tratamiento, refresh: refreshTratamiento } = await useAsyncData(
  `tratamiento-${route.params.slug}`,
  async () => {
    try {
      const response = await getTratamiento({ slug: route.params.slug });
      return response || {}; // Asegurarse de que siempre se retorne un objeto
    } catch (error) {
      console.error(`Error fetching tratamiento ${route.params.slug}:`, error);
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


const isLoading = ref(false);
const errorMessage = ref("");

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

// Métodos
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

// Datos YOAST SEO
useHead(() => {
  if (!tratamiento.value || !tratamiento.value.yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  const yoast = tratamiento.value.yoast_head_json;

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

const injectStructuredData = async () => {
  const structuredData = {
    "@context": "http://schema.org",
    "@type": tratamiento.value.acf.datos.type,
    "name": tratamiento.value.title.rendered,
    "description": tratamiento.value.acf.datos.description,
    "provider": [
      {
        "@type": tratamiento.value.acf.datos.provider.type,
        "name": tratamiento.value.acf.datos.provider.name,
        "url": `https://www.clinicaegos.com${route.fullPath}`
      }
    ],
    "specialty": [
      {
        "@type": tratamiento.value.acf.datos.provider.type,
        "name": tratamiento.value.acf.datos.provider.name
      }
    ],
    "location": {
      "@type": tratamiento.value.acf.datos.location,
      "address": {
        "@type": tratamiento.value.acf.datos.adress.type,
        "addressLocality": tratamiento.value.acf.datos.adress.streetAddress,
        "addressRegion": tratamiento.value.acf.datos.adress.city,
        "addressCountry": tratamiento.value.acf.datos.adress.country
      }
    },
    "benefits": tratamiento.value.acf.datos.benefits,
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}


onMounted(async () => {
  await cellHeights()
  await mainActive()
  await mostrarAnchorsMenu()
  await injectStructuredData()
  observeDOM()
})
</script>

<style lang="scss" scoped>
// estilo vacío
</style>
