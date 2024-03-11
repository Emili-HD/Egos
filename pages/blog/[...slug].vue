<template>
  <main class="site-main" v-if="post">
    <article>
      <div class="post__header mb-12" :style="`background-image: url(${post[0].featured_image_src.src})`">
        <h1>{{ post[0].title.rendered }}</h1>
      </div>
      <section class="post__content px-2 gap-4">
        <aside class="nav-content p-6">
          <h4 class="nav-content-title h6">Tabla de contenidos</h4>
          <ul>
            <li v-for="(content, index) in post[0].acf.areas_de_contenido" @click.prevent=""><span>{{ content.titulo_area }}</span></li>
            <li v-if="post[0].acf.post_description.titulo_recomendaciones" @click.prevent=""><span v-html="post[0].acf.post_description.titulo_recomendaciones"></span></li>
            <li v-if="post[0].acf.post_faqs.titulo_faqs" @click.prevent=""><span v-html="post[0].acf.post_faqs.titulo_faqs"></span></li>
          </ul>
        </aside>
        <div class="post__content-areas py-6 px-10">
          <div v-if="post[0].content.rendered" class="post__content-text pb-4" v-html="post[0].content.rendered"></div>
          <div class="post__content-text pb-4" v-for="(content, index) in post[0].acf.areas_de_contenido" :id="`area-${index}`">
            <h2 class="area-title">{{ content.titulo_area }}</h2>
            <div v-html="content.contenido_area"></div>
            <div class="post__content-image" v-if="content.imagen_area.url">
              <img :src="content.imagen_area.url" alt="" />
            </div>
          </div>

          <div id="recomendaciones" v-if="post[0].acf.post_description.titulo_recomendaciones" class="post__content-text recomendaciones pb-6">
            <div class="heading accordion__heading">
              <h2 class="accordion__heading-title area-title" v-html="post[0].acf.post_description.titulo_recomendaciones"></h2>
              <div class="accordion__description pb-2" v-html="post[0].acf.post_description.descripcion_recomendaciones"></div>
            </div>
            <div class="list accordion__list">
              <div class="accordion__list--item flex flex-col flex-wrap justify-between py-6 cursor-pointer" v-for="item in post[0].acf.post_description.secciones_del_post" :key="item.post_subtitle">
                <div class="accordion__list--item-title flex flex-row justify-between items-center">
                  <div class="max-w-[85%]" v-html="item.post_subtitle"></div>
                  <svg class="size-6 stroke-[var(--blue-1)] stroke-1" viewbox="0 0 24 24">
                    <path class="iconV" d="M 12,0 V 24" />
                    <path class="iconH" d="M 0,12 H 24" />
                  </svg>
                </div>
                <div class="accordion__list--item-descripcion self-end h-0 w-full xl:w-[60%] opacity-0 relative" v-html="item.post_description"></div>
              </div>
            </div>
          </div>

          <div v-if="post[0].acf.post_faqs" class="post__content-text faqs py-12" id="faqs">
            <div class="heading accordion__heading">
              <h2 class="accordion__heading-title area-title" v-html="post[0].acf.post_faqs.titulo_faqs"></h2>
            </div>
            <div class="list accordion__list">
              <div class="accordion__list--item flex flex-col flex-wrap justify-between py-6 cursor-pointer" v-for="contentido in post[0].acf.post_faqs.preguntas_frecuentes" :key="contentido.faq_subtitle">
                <div class="accordion__list--item-title flex flex-row justify-between items-center">
                  <div class="max-w-[85%]" v-html="contentido.faq_subtitle"></div>
                  <svg class="size-6 stroke-[var(--blue-1)] stroke-1" viewbox="0 0 24 24">
                    <path class="iconV" d="M 12,0 V 24" />
                    <path class="iconH" d="M 0,12 H 24" />
                  </svg>
                </div>
                <div class="accordion__list--item-descripcion self-end h-0 w-full xl:w-[60%] opacity-0 relative" v-html="contentido.faq_description"></div>
              </div>
            </div>
          </div>

        </div>
        <aside class="widgets p-6">
          <div id="formulario" class="form__wrapper p-2 p-xs-6">
            <FormsCirugia :identificador="'topPage'" :portalId="String(post[0].acf.formulario.portalid)" :formId="post[0].acf.formulario.formid" />
          </div>
        </aside>
      </section>
    </article>
  </main>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import { getSinglePostBySlug } from '@/composables/useApi'
import { useRoute } from 'vue-router';

const { $gsap: gsap } = useNuxtApp();

// Estado reactivo para el post
const post = ref(null);

// Acceder a los parámetros de la ruta
const route = useRoute();
const slug = route.params.slug;

const loadSinglePost = async () => {
  try {
    const response = await getSinglePostBySlug(slug)
    post.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

watch(() => route.params.slug, async (newSlug, oldSlug) => {
  if (newSlug !== oldSlug) {
    // console.log("Cambiando slug de", oldSlug, "a", newSlug);
    await loadSinglePost();
  }
}, { immediate: true });
 
// Datos YOAST SEO
useHead(() => {
  // Verifica si el post está cargado y tiene la estructura esperada
  if (!post.value || post.value.length === 0 || !post.value[0].yoast_head_json) {
    return {
      title: 'Cargando...', // Título temporal mientras se cargan los datos
    };
  }

  // Accede al primer elemento del arreglo para obtener los datos de YOAST SEO
  const yoast = post.value[0].yoast_head_json;

  // Prepara las meta tags basándose en los datos de yoast_head_json del primer post
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
    title: yoast.title || 'Título del Post',
    meta: metaTags,
  };
});

const initAccordion = async () => {
   const groups = gsap.utils.toArray(".accordion__list--item");
   const animations = [];

   groups.forEach((group, index) => {
      const title = group.querySelector('.accordion__list--item-title');
      const description = group.querySelector('.accordion__list--item-descripcion');
      const iconV = group.querySelector('.iconV');
      const iconH = group.querySelector('.iconH');

      // Establece el estado inicial de manera explícita
      gsap.set(description, { autoAlpha: 0, height: 0, marginTop: 0, marginBottom: 0 });
      gsap.set([iconV, iconH], { rotate: 0, transformOrigin: '50% 50%' });

      // Usa fromTo para definir explícitamente los estados inicial y final
      const tl = gsap.timeline({ paused: true, reversed: true })
         .fromTo(description, 
            { autoAlpha: 0, height: 0, marginTop: 0, marginBottom: 0 }, 
            { duration: 0.2, autoAlpha: 1, height: 'auto', marginTop: '2rem', marginBottom: '2rem' }, 0)
         .fromTo([iconV, iconH], 
            { rotate: 0, transformOrigin: '50% 50%' },
            { duration: 0.25, rotate: 45, stagger: 0.05, transformOrigin: '50% 50%' }, '<');

      animations[index] = tl;

      title.addEventListener('click', () => {
         if (tl.reversed()) {
            animations.forEach((anim) => {
              if (anim !== tl) anim.reverse().then(() => anim.pause());
            });
            tl.play();
         } else {
            tl.reverse();
         }
      });
   });
};


await loadSinglePost()

// Ciclo de vida Mounted
onMounted( async () => {
  await initAccordion()
});
</script>

<style lang="scss">
.post__header {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  clip-path: var(--clipPath);

  h1 {
    max-width: 60vw;
    text-align: center;
    color: var(--blue-1);
    font-weight: 600;
  }
}

.post__content {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  min-height: 100vh;

  .nav-content {
    grid-column: 1/4;
    // background-color: var(--nude-8);
    border-radius: var(--radius-xl);
    align-self: flex-start;

    @media (max-width: 1024px) and (orientation: portrait) {
      grid-column: 2/-2;
    }

    &-title {
      background-color: var(--nude-4);
      padding: 1rem;
    }

    ul {
      list-style: decimal-leading-zero;
      padding-left: 1.5rem;

      li {
        border-bottom: 1px solid rgba(var(--blue-1-rgb), 0.1);
        padding: .5rem 0;
        cursor: pointer;
      }
    }
  }

  &-image {
    border-radius: var(--radius-m);
    overflow: hidden;
  }

  &-text {
    a {
      font-weight: 500;
      color: var(--blue-6);
    }
    h3 {
      font-family: var(--font-family-base);
      font-size: calc(var(--font-size) * 1.3);
      font-weight: 400;
    }
    iframe {
      width: 100% !important;
      aspect-ratio: 16/9;
      height: fit-content;
      margin-bottom: 1.5rem;
      margin-top: 1.5rem;
    }
  }

  &-areas {
    grid-column: 4/13;

    @media (max-width: 1024px) and (orientation: portrait) {
      grid-column: 2/-2;
    }

    .faqs .accordion__heading,
    .faqs .accordion__list {
        grid-column: 1/-1;
    }
  }

  .widgets {
    grid-column: 13/17;
    background-color: var(--blue-1);
    border-radius: var(--radius-xl);

    @media (max-width: 1024px) and (orientation: portrait) {
      grid-column: 2/-2;
    }
  }
}
</style>
