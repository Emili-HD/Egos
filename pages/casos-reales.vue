<template>
  <main class="site-main casos-reales" v-if="testimonios">
    <section class="testimonios section__hero gap-x-1 lg:gap-x-4 lg:gap-y-8">
      <div class="testimonios__header min-h-[60vh] flex flex-col justify-center align-center p-8 lg:p-40 text-center">
        <h1>{{ pages.title.rendered }}</h1>
        <div v-html="pages.content.rendered"></div>
      </div>
        <div class="categories__list checkboxes p-4 flex flex-row-reverse flex-wrap justify-between md:justify-center items-center gap-1" v-if="categorias">
        <div class="categories__list-title w-full text-center font-medium uppercase">Filtros</div>
        <label class="bg-nude-5 text-xs text-gold-2 uppercase font-medium px-4 py-2 w-[32%] md:w-32 rounded-2xl flex items-center justify-evenly transition-all has-[input:checked]:bg-blue-1 has-[input:checked]:text-nude-8" v-for="categoria in categorias" :key="categoria.id">
          <input type="checkbox" :id="categoria.slug" class="filter hidden" >{{ categoria.name }}
          <svg class="overflow-visible bg-nude-1/50 rounded-2xl  has-[input:checked]" viewBox="0 0 64 64" height="1em" width="1em">
              <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  pathLength="575.0541381835938" class="path"></path>
          </svg>
        </label>
      </div>
      <div class="testimonios__list max-w-full min-h-screen p-8 lg:px-40 lg:py-20 grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4" v-if="testimonios">
        <article v-for="testimonio in testimonios" :key="testimonio.id" class="card item rounded-3xl overflow-hidden flex flex-col justify-between items-center gap-2 lg:gap-8 bg-nude-6 p-0"
          :class="getCategoriesNames(testimonio)">
          <div class="testimonios__image overflow-hidden w-full h-[60%]" v-if="testimonio.featured_image_data && testimonio.featured_image_data.src">
            <NuxtImg class="object-cover w-full min-h-full" :src="testimonio.featured_image_data.src" :alt="testimonio.featured_image_data.alt" />
          </div>
          <div class="testimonios__content p-6 text-center h-[40%] flex flex-col justify-between items-center">
            <h3 class="h6 text-clamp-base font-medium">{{ testimonio.title.rendered }}</h3>
            <nuxt-link :to="`/opinion-egos/${testimonio.slug}`" class="py-1 px-6 border border-solid border-blue-1/25 text-center uppercase rounded-3xl">Saber más</nuxt-link>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { getTestimonios, getSinglePage, getTestimoniosCategories } from '@/composables/useApi';
import { Flip } from 'gsap/Flip';

const { $gsap: gsap } = useNuxtApp();

// estado reactivo
const testimonios = ref(null)
const pages = ref(null)
const categorias = ref([]);
const categoriasSeleccionadas = ref({});

// Métodos
const loadData = async () => {
  try {
    // Operaciones en paralelo para cargar especialidades y página única
    const [testimoniossResponse, singlePageResponse, categoriasResponse] = await Promise.all([
      getTestimonios(),
      getSinglePage(16851),
      getTestimoniosCategories(),
    ]);

    // Actualiza las respuestas de especialidades y página
    testimonios.value = testimoniossResponse.data;
    pages.value = singlePageResponse.data;
    categorias.value = categoriasResponse.data
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const getCategoriesNames = (testimonio) => {
  if (!testimonio.categories_names || !testimonio.categories_names.length) {
    return '';
  }
  return testimonio.categories_names.map(name => removeAccents(name).toLowerCase()).join(' '); // Usa ' ' como delimitador
}


const filtros = async () => {
  
  // Eliminamos la referencia a '#all' ya que no se usará
  const filters = gsap.utils.toArray('.filter');
  const items = gsap.utils.toArray('.item');

  function updateFilters() {
    const state = Flip.getState(items); // Obtiene el estado actual
    const classes = filters.filter(checkbox => checkbox.checked).map(checkbox => "." + checkbox.id);
    let matches;

    // Si no hay checkboxes seleccionados, matches incluye todos los ítems
    if (classes.length === 0) {
      matches = items;
    } else {
      // Si hay checkboxes seleccionados, filtra los ítems basados en las clases de los checkboxes seleccionados
      matches = gsap.utils.toArray(classes.join(","));
    }

    // Ajusta la propiedad display de cada ítem
    items.forEach(item => {
      item.style.display = matches.includes(item) ? "inline-flex" : "none";
    });

    // Anima desde el estado previo
    Flip.from(state, {
      duration: 0.7,
      scale: true,
      ease: "power1.inOut",
      stagger: 0.08,
      absolute: true,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 1 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0, duration: 1 })
    });
  }

  // Escucha el evento click en cada checkbox para actualizar los filtros
  filters.forEach(btn => btn.addEventListener('click', updateFilters));
}

await loadData()

onMounted(async () => {
  await nextTick()
  await filtros()
  categorias.value.forEach(categoria => {
    categoriasSeleccionadas.value[categoria.slug] = false; // Inicializar todas las categorías como no seleccionadas
  });
})

// Datos YOAST SEO
useHead(() => {
  if (!pages.value || !pages.value.yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  const yoast = pages.value.yoast_head_json;

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
    title: yoast.title,
    meta: metaTags,
  };
});
</script>

<style lang="scss" scoped>
.checkboxes {
    .path {
        fill: none;
        stroke: var(--gold);
        stroke-width: 0;
        stroke-linecap: round;
        stroke-linejoin: round;
        transition: stroke-dasharray var(--transition), stroke-dashoffset var(--transition), stroke var(--transition), stroke-width var(--transition);
        stroke-dasharray: 241 9999999;
        stroke-dashoffset: 0;
    }

    input:checked~svg .path {
        stroke: var(--nude-8);
        stroke-width: 5;
        stroke-dasharray: 70.5096664428711 9999999;
        stroke-dashoffset: -262.2723388671875;
    }

}
</style>
