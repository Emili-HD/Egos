<template>
    <main class="site-main casos-reales" v-if="testimonios">
        <UiBotonCita :data="pages.acf.boton_cita" />
        <section class="testimonios section__hero gap-x-1 lg:gap-x-4 lg:gap-y-8">
            <div
                class="testimonios__header min-h-[30vh] flex flex-col justify-center align-center p-8 lg:px-40 lg:pt-40 text-center">
                <h1 class="mb-0">{{ pages.title.rendered }}</h1>
            </div>

            <!-- Filtros por categoría -->
            <div class="categories__list checkboxes p-4 flex flex-row-reverse flex-wrap justify-between md:justify-center items-center gap-1"
                v-if="categorias">
                <div class="categories__list-title w-full text-center font-medium uppercase">Filtros</div>
                <label
                    class="bg-nude-5 text-xs text-gold-2 uppercase font-medium px-4 py-2 w-[32%] md:w-32 rounded-2xl flex items-center justify-evenly transition-all has-[input:checked]:bg-blue-1 has-[input:checked]:text-nude-8"
                    v-for="categoria in categorias" :key="categoria.id">
                    <input type="checkbox" :id="categoria.slug" class="filter hidden">{{ categoria.name }}
                    <svg class="overflow-visible bg-nude-1/50 rounded-2xl  has-[input:checked]" viewBox="0 0 64 64"
                        height="1em" width="1em">
                        <path
                            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                            pathLength="575.0541381835938" class="path"></path>
                    </svg>
                </label>
            </div>

            <!-- Listado de 3 testimonios destacados -->
            <TestimoniosDestacados />

            <!-- Listado de todos los testimonios filtrados -->
            <div class="testimonios__list max-w-full min-h-vh p-8 lg:px-20 lg:pt-0 lg:pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4"
                v-if="testimonios">
                <article v-for="testimonio in testimonios" :key="testimonio.id"
                    class="card item rounded-xl overflow-hidden flex flex-col justify-center items-center gap-2 lg:gap-8 bg-nude-6 p-0"
                    :class="getCategoriesNames(testimonio)">
                    <nuxt-link :to="`/opinion-egos/${testimonio.slug}`" class="size-full">
                        <div class="testimonios__image overflow-hidden w-full h-[60%]"
                            v-if="testimonio.featured_image_data && testimonio.featured_image_data.url">
                            <UiImage :data="testimonio" class="cover" loading="lazy" />
                        </div>
                        <div
                            class="testimonios__content p-6 text-center h-[40%] flex flex-col justify-center items-center">
                            <h3 class="h6 text-clamp-base lg:text-clamp-lg font-medium">{{ testimonio.title.rendered }}
                            </h3>
                            <p v-if="testimonio.acf?.cirugias_testimonios[0]?.datos?.name">Se realizó: {{ testimonio.acf?.cirugias_testimonios[0]?.datos?.name }}</p>
                            <div
                                class="button py-1.5 px-6 border border-solid bg-blue-1 text-nude-8 text-center uppercase rounded-full">
                                Saber más
                            </div>
                        </div>
                    </nuxt-link>
                </article>
            </div>

            <div
                class="testimonios__header min-h-[60vh] flex flex-col justify-center align-center p-8 lg:p-40 text-center">
                <div v-html="pages.content.rendered"></div>
            </div>

            <section class="bg-blue-2 p-12 xl:p-24 mb-0" v-if="pages.acf">
                <FormsEsteticaForm :identificador="'formulario'" :portalId="String(pages.acf.portalid)"
                    :formId="pages.acf.formid" :name="pages.title.rendered" />
            </section>

        </section>
    </main>
</template>

<script setup>
    import { ref, nextTick, onMounted } from 'vue';
    import { useAsyncData } from 'nuxt/app';
    import { getTestimonios, getPage, egosSettings } from '@/composables/useApi';
    import { Flip } from 'gsap/Flip';


    const { $gsap: gsap } = useNuxtApp();
    const categoriasSeleccionadas = ref({});

    // Cargar testimonios
    const { data: testimonios, error: testimoniosError } = await useAsyncData(
        'testimonios',
        async () => {
            try {
                const response = await getTestimonios({ page: 1, perPage: 100 });
                return response || {}; // Asegurarse de que siempre se retorne un objeto
            } catch (error) {
                console.error('Error fetching testimonios:', error);
                return {}; // En caso de error, retornar un objeto vacío
            }
        }
    );

    // console.log(testimonios.value[0]?.acf?.cirugias_testimonios[0].datos.name);
    

    // Cargar página específica (p.ej., la información de la página de testimonios)
    const pageId = 16851; // ID página de testimonios
    const { data: pages, error: pagesError } = await useAsyncData(
        `page-${pageId}`,
        async () => {
            try {
                const response = await getPage(pageId);
                return response || {};
            } catch (error) {
                console.error(`Error fetching casoreal ${pageId}:`, error);
                return {}; // En caso de error, retornar un objeto vacío
            }
        },
        { initialCache: true }
    );


    // Cargar categorías de testimonios
    const { data: categorias, error: categoriasError } = await useAsyncData(
        'categoriasTestimonios',
        async () => {
            try {
                const response = await getTestimonios({ categories: true });
                return response || {}; // Asegurarse de que siempre se retorne un objeto
            } catch (error) {
                console.error('Error fetching categorias:', error);
                return {}; // En caso de error, retornar un objeto vacío
            }
        }
    );

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

    onMounted(async () => {
        await nextTick()
        await filtros()
        categorias.value.forEach(categoria => {
            categoriasSeleccionadas.value[categoria.slug] = false; // Inicializar todas las categorías como no seleccionadas
        });
    })
    const { generateYoastHead } = useYoastHead(pages);
    const yoastHead = generateYoastHead();

    useHead({
        ...yoastHead,
    });
</script>

<style>
    :root {
        --transition: 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    h1,
    h2,
    h3 {
        @apply font-lora;
    }

    .button {
        @apply font-nunito;
    }

    .checkboxes {
        .path {
            @apply fill-none stroke-gold-3 stroke-0;
            stroke-linecap: round;
            stroke-linejoin: round;
            transition: stroke-dasharray var(--transition), stroke-dashoffset var(--transition), stroke var(--transition), stroke-width var(--transition);
            stroke-dasharray: 241 9999999;
            stroke-dashoffset: 0;
        }

        input:checked~svg .path {
            @apply stroke-nude-8;
            stroke-width: 5;
            stroke-dasharray: 70.5096664428711 9999999;
            stroke-dashoffset: -262.2723388671875;
        }

    }
</style>
