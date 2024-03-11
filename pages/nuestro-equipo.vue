<template>
    <div class="team__panel pt-24 px-16 pb-16 bg-white rounded-3xl fixed right-0 top-20 w-[vw] h-[calc(100vh-var(--header-height)-1rem)] z-[999] translate-x-[100%] transition-[translate] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
            <div class="team__panel-content overscroll-contain" v-if="panelVisible">
                <div class="close absolute top-0 right-0 z-10"  @click="panelVisible = false">
                    <svg class="close-icon size-16 fill-[#1c2c44]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path
                        d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
                    </svg>
                </div>
                <h3 v-if="selectedMemberInfo.title.rendered">{{ selectedMemberInfo.title.rendered }}</h3>
                <ElementsSlide :data="selectedMemberInfo" />
            </div>
    </div>

    <div class="team__form" v-if="showPopup">
        <div class="close" @click="closePopup">
            <svg class="close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path
                d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z" />
            </svg>
        </div>
        <FormsCirugia v-if="pages && pages.acf" :identificador="'topPage'" :portalId="String(pages.acf.portalid)" :formId="pages.acf.formid" />
    </div>

    <main class="site-main about">
        <section class="nosotros section__hero grid grid-cols-[repeat(16,_minmax(0,_1fr))] col-[1_/_-1]" v-if="pages">
            <ElementsEncabezadoFull :data="pages" />
        </section>

        <template v-if="doctor.length > 0">
            <section v-for="category in categories" :key="category.id" :class="`equipo ${category.slug}`" class="py-40">
                <aside class="equipo__left-column">
                    <div class="equipo__left-description">
                        <h3>{{ category.name }}</h3>
                        <p class="!mb-0" v-if="category.description">{{ category.description }}</p>
                        <button class="button" v-if="category.form === true" @click="openPopup">Pedir Cita</button>
                    </div>
                </aside>
                <article class="equipo__right-column">
                    <ul>
                        <li v-for="miembro in doctorByCategory(category.id)" :key="miembro.id" class="card !aspect-[4/5] bg-nude8 rounded-3xl overflow-hidden">
                            <div class="card__member block relative size-full overflow-hidden">
                                <img v-if="miembro.featured_image_src" :src="miembro.featured_image_src.src"
                                    class="card__image absolute w-full -top-[10%] object-center object-cover min-h-full overflow-hidden rounded-3xl" :alt="miembro.featured_image_src.alt" />
                                <div class="card__description bg-nude8 p-4 absolute bottom-0 rounded-3xl w-full z-10 flex flex-col justify-end items-center gap-2">
                                    <h3 class="card__title h6 !mb-0">
                                        {{ miembro.title ? miembro.title.rendered : 'No Title' }}
                                    </h3>
                                    <p v-html="miembro.acf.trayectoria.especialidad"></p>
                                    <div class="button__group">
                                        <a  href="#" @click.prevent="showMemberPanel(miembro)" class="button">+ Info</a>
                                        <button class="button button-blue" v-if="category.form === true" @click="openPopup">Pedir Cita</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </article>
            </section>
        </template>
    </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, inject } from 'vue';
import { getSinglePage, getEspecialidades, getEquipo } from '@/composables/useApi';
import ScrollTrigger from 'gsap/ScrollTrigger';

const { $gsap: gsap } = useNuxtApp();

// Estados reactivos
const pages = ref(null);
const categoriesResponse = ref([]);
const doctor = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const panelVisible = ref(false);
const selectedMemberInfo = ref({
    title: { rendered: '' }, // Valores predeterminados vacíos
    acf: { trayectoria: { especialidad: '' } }
});
const showPopup = ref(false);


// Funciones computadas
const categories = computed(() => {
    const uniqueCategories = [
        ...new Set(doctor.value.flatMap((d) => d.especialidad)),
    ];
    return uniqueCategories.map((categoryId) => {
        const category = categoriesResponse.value.find((cat) => cat.id === categoryId);
        return {
            id: categoryId,
            name: category ? category.name : 'Unknown Category',
            description: category ? category.description : 'Unknown Category',
            slug: category ? category.slug : 'unknown-category',
            form: category ? category.acf.activar_formulario : 'Unknow category'
        };
    });
});

// Métodos

const loadData = async () => {
    try {
        // Operaciones en paralelo para cargar especialidades y página única
        const [especialidadesResponse, singlePageResponse] = await Promise.all([
            getEspecialidades(),
            getSinglePage(562)
        ]);

        // Actualiza las respuestas de especialidades y página
        categoriesResponse.value = especialidadesResponse.data;
        pages.value = singlePageResponse.data;

        // Operación secuencial para cargar doctores
        await loadDoctor();
        // if (process.client) {
        //     await pinTitles()
        // }
    } catch (error) {
        console.error("Error loading data:", error);
    }
};

const loadDoctor = async () => {
    doctor.value = []; // Reinicia el arreglo de doctores
    let currentPage = 1;

    try {
        let doctorsResponse = await getEquipo(currentPage);
        totalPages.value = parseInt(doctorsResponse.headers['x-wp-totalpages'], 10);

        while (doctorsResponse.data.length > 0 && currentPage <= totalPages.value) {
            doctor.value = doctor.value.concat(doctorsResponse.data);

            if (currentPage < totalPages.value) {
                currentPage++;
                doctorsResponse = await getEquipo(currentPage);
            } else {
                break; // Sale del bucle si alcanza la última página
            }
        }
    } catch (error) {
        console.error("Error loading team:", error);
    }
};

const doctorByCategory = (categoryId) => {
    return doctor.value.filter((d) => d.especialidad.includes(categoryId));
};

function showMemberPanel(miembro) {
    selectedMemberInfo.value = miembro;
    panelVisible.value = true;
}

const pinTitles = async () => {
    let mm = gsap.matchMedia()
    mm.add("(min-width: 1025px)", () => {
        const secciones = document.querySelectorAll('.equipo')
        secciones.forEach((seccion) => {
            let titulo = seccion.querySelector('.equipo__left-description');
            gsap.to(titulo, {
                scrollTrigger: {
                    trigger: seccion,
                    start: "top 5%", 
                    end: "70% 25%", 
                    scrub: true,
                    pin: titulo,
                    pinSpacing: false,
                    // markers: true
                },
            });
        });
    })
}


const closePanelOnClickOutside = (event) => {
  const teamPanel = document.querySelector('.team__panel');
  if (teamPanel && !teamPanel.contains(event.target)) {
    panelVisible.value = false;
  }
};

const openPopup = (videoId) => {
  showPopup.value = true;
};

const closePopup = () => {
  showPopup.value = false;
};

watch(panelVisible, (newValue) => {
    const panel = document.querySelector('.team__panel');
    if (panel) {
        panel.style.transform = newValue ? 'translateX(0)' : 'translateX(100%)';
    }
    if (newValue) {
            // Retrasa la adición del manejador de eventos para evitar que el clic de apertura lo active
            setTimeout(() => {
                document.addEventListener('click', closePanelOnClickOutside);
                // console.log('Manejador de clic fuera añadido');
            }, 100); // Un retraso de 100ms es generalmente suficiente
        } else {
            // Panel se ha ocultado, asegúrate de remover el manejador de clics inmediatamente
            document.removeEventListener('click', closePanelOnClickOutside);
            // console.log('Manejador de clic fuera removido');
        }
});

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

// Ciclo de vida
await loadData();

onMounted( async () => {
    await pinTitles()
})

onUnmounted(() => {
  document.removeEventListener('click', closePanelOnClickOutside);
});

</script>

<style lang="scss">
.team__form {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999999;
    background: rgba(var(--blue-1-rgb), 0.6);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .form-landing {
        max-width: 100%;
        width: max(360px, 40vw);
        background: var(--blue-1);
        padding: 2rem;
        border-radius: var(--radius-m);
        border: 1px solid rgba(var(--nude-1-rgb), 0.2);
        top: 20vh;
    }

    .close {
        position: absolute;
        top: 6rem;
        right: 3rem;
        cursor: pointer;

        .close-icon {
            width: 4em;
            height: 4em;
            fill: var(--nude-8);
        }
    }
}
</style>
