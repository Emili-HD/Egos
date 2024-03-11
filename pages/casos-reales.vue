<template>
  <main class="site-main casos-reales" v-if="testimonios">
    <section class="testimonios section__hero">
      <div class="testimonios__header">
        <h1>{{ pages.title.rendered }}</h1>
        <div v-html="pages.content.rendered"></div>
      </div>
      <div class="categories__list checkboxes" v-if="categorias">
        <div class="categories__list-title">Filtros</div>
        <label v-for="categoria in categorias" :key="categoria.id"><input type="checkbox" :id="categoria.slug" class="filter" >{{ categoria.name }}
        <svg viewBox="0 0 64 64" height="1em" width="1em">
            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                pathLength="575.0541381835938" class="path"></path>
        </svg>
        </label>
      </div>
      <div class="testimonios__list" v-if="testimonios">
        <article v-for="testimonio in testimonios" :key="testimonio.id" class="card item"
          :class="getCategoriesNames(testimonio)">
          <div class="testimonios__image" v-if="testimonio.featured_image_data && testimonio.featured_image_data.src">
            <img :src="testimonio.featured_image_data.src" :alt="testimonio.featured_image_data.alt" />
          </div>
          <div class="testimonios__content">
            <h3 class="h6">{{ testimonio.title.rendered }}</h3>
            <nuxt-link :to="`/opinion/${testimonio.slug}`" class="button button-reverse">Saber más</nuxt-link>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { getTestimonios, getSinglePage, getTestimoniosCategories } from '@/composables/useApi';
import { useHead } from '@unhead/vue'

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

function getCategoriesNames(testimonio) {
  if (!testimonio.categories_names || !testimonio.categories_names.length) {
    return '';
  }
  return testimonio.categories_names.map(name => name.toLowerCase()).join(' '); // Usa ' ' como delimitador
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

  // Preparar las meta tags basándose en los datos de yoast_head_json
  const metaTags = [
    { name: 'description', content: yoast.og_description || 'Egos | Clínica de cirugía y medicina estética' },
    { property: 'og:title', content: yoast.og_title },
    { property: 'og:description', content: yoast.og_description },
    { property: 'og:url', content: yoast.og_url },
    { property: 'og:type', content: yoast.og_type },
    // Añadir más tags según sean necesarios
  ];

  // Añadir las imágenes de Open Graph si están disponibles
  if (yoast.og_image && yoast.og_image.length > 0) {
    yoast.og_image.forEach((image) => {
      metaTags.push({ property: 'og:image', content: image.url });
      // Agregar también las dimensiones si se desea
      metaTags.push({ property: 'og:image:width', content: image.width.toString() });
      metaTags.push({ property: 'og:image:height', content: image.height.toString() });
    });
  }

  // Añadir la meta tag de robots si está disponible
  if (yoast.robots) {
    const robotsContent = `${yoast.robots.index}, ${yoast.robots.follow}`;
    metaTags.push({ name: 'robots', content: robotsContent });
  }

  return {
    title: yoast.title,
    meta: metaTags,
  };
});
</script>

<style lang="scss" scoped>
.testimonios {
  column-gap: 1em;
  row-gap: 2em;

  @media (max-width: 767px) {
    column-gap: 0.2em;
    // padding: 0 .5em;
  }

  &__header {
    grid-column: 3/-3;
    text-align: center;
  }

  &__list {
    grid-column: 2/16;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;
    max-width: var(--full-width);

    @media (max-width: 767px) {
      grid-column: 2/-2;
      grid-template-columns: repeat(2, 1fr);
      gap: .5em;
    }

    .card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      gap: 2em;
      aspect-ratio: unset;
      background-color: var(--nude-8);
      border-radius: var(--radius-xl);
      padding: 0;

      @media (max-width: 767px) {
        gap: 0.5em;
      }
    }
  }

  &__image {
    overflow: hidden;
    width: 100%;
    aspect-ratio: 3/2;

    img {
      object-fit: cover;
      width: 100%;
      min-height: 100%;
    }
  }

  &__content {
    padding: 1.5em;
    width: 100%;
    text-align: center;

    @media (max-width: 767px) {
      padding: 0.5em 0.5em 1.5em;
    }
  }
}

.categories__list {
  grid-column: 3/-3;
  list-style: none;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  gap: 1em;
  flex-wrap: wrap;

  &-title {
    width: 100%;
    text-align: center;
    font-weight: 500;
    text-transform: uppercase;
  }

  @media (max-width: 767px) {
    justify-content: space-between;
    column-gap: 0.3em;
    row-gap: 0.4em;
  }

  @media (max-width: 767px) {
    grid-column: 2/-2;
  }


    label {
      border-radius: var(--radius-xl);
      padding: .5em 1em;
      background-color: var(--nude-5);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      text-transform: uppercase;
      font-size: calc(var(--font-size) * 0.7);
      color: var(--gold-2);
      font-weight: 500;
      letter-spacing: 0.05em;
      text-align: center;
      transition: background-color var(--transition), color var(--transition);
      width: 7.5em;

      @media (max-width: 767px) {
        width: 28vw;
      }

      svg {
        overflow: visible;
        background-color: rgba(var(--blue-1-rgb), 0.1);
        border-radius: 1em;
      }

      &:has(input:checked) {
        background-color: var(--blue-1);
        color: var(--nude-8);

        svg {
            background-color: rgba(var(--nude-8-rgb), 0.15);
        }
    }
    }
  
}
</style>
