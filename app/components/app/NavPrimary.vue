<template>
    <div class="header-nav flex flex-row justify-end items-stretch size-full">
        <nav aria-label="Global" class="nav-categories">
            <ul class="menu-list" @mouseover="loadImages" ref="menuContainer" v-if="menuData" itemscope
                itemtype="https://schema.org/SiteNavigationElement">
                <li v-for="tratamiento in menuData" :key="tratamiento.ID"
                    :class="{ 'hasSubmenu': tratamiento.child_items }">

                    <div class="menu-wrapper">

                        <!-- Si el link tiene la class 'nofollow' aplicar link externo -->
                        <a v-if="tratamiento.classes == 'nofollow'" :href="tratamiento.url"
                            :itemprop="`https://www.clinicaegos.com${tratamiento.url}`" class="nav-link"
                            active-class="router-link-active" rel="nofollow noopener" target="_blank">
                            <span itemprop="name">{{ tratamiento.title }}</span>
                        </a>

                        <!-- sino aplicar link interno -->
                        <nuxt-link v-else :to="tratamiento.path"
                            :itemprop="`https://www.clinicaegos.com${tratamiento.path}`" class="nav-link"
                            active-class="router-link-active">
                            <span itemprop="name">{{ tratamiento.title }}</span>
                        </nuxt-link>

                        <div class="submenu" v-if="tratamiento.child_items.length > 0">
                            <div class="anchorLink submenu__left">
                                <ul class="submenu__left-slider">
                                    <li class="before-after" v-for="(subTratamiento, index) in tratamiento.child_items"
                                        :key="subTratamiento.id" :data-index="index">
                                        <div class="slide-c" v-for="subSubTratamiento in subTratamiento.child_items"
                                            :key="subSubTratamiento.ID">
                                            <img loading="lazy"
                                                class="menu-icon object-cover object-bottom absolute bottom-0 min-h-full min-w-full block"
                                                :data-src="subSubTratamiento.acf.icon" alt="" width="571"
                                                height="706" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="submenu__right [.blackfriday_&]:!bg-black/80">
                                <!-- SubItems -->
                                <ul class="submenu__right-list">
                                    <li class="submenu-child" v-for="(subTratamiento, index) in tratamiento.child_items"
                                        :key="subTratamiento.ID" :data-index="index">

                                        <nuxt-link v-if="!subTratamiento.child_items" :to="subTratamiento.path"
                                            class="nav-link" :class="subTratamiento.classes"
                                            active-class="nuxt-link-active"
                                            :itemprop="`https://www.clinicaegos.com${subTratamiento.path}`">
                                            <span itemprop="name">{{ subTratamiento.title }}</span>
                                        </nuxt-link>
                                        <span class="column" v-else>{{ subTratamiento.title }}</span>

                                        <!-- SubSubItems -->
                                        <ul class="list-none"
                                            v-if="subTratamiento.child_items && subTratamiento.child_items.length > 0">
                                            <li class="subsubmenu-child"
                                                v-for="(subSubTratamiento, subIndex) in subTratamiento.child_items"
                                                :key="subSubTratamiento.ID" :data-index="subIndex">

                                                <a v-if="subSubTratamiento.classes == 'nofollow'"
                                                    :href="subSubTratamiento.url" class="nav-link"
                                                    :class="subSubTratamiento.classes" active-class="nuxt-link-active"
                                                    rel="nofollow noopener" target="_blank">
                                                    {{ subSubTratamiento.title }}
                                                </a>

                                                <nuxt-link v-else :to="subSubTratamiento.path"
                                                    :itemprop="`https://www.clinicaegos.com${subSubTratamiento.path}`"
                                                    class="nav-link" :class="subSubTratamiento.classes"
                                                    active-class="nuxt-link-active">
                                                    <span itemprop="name">{{ subSubTratamiento.title }}</span>
                                                </nuxt-link>
                                            </li>
                                        </ul>
                                        <!-- /SubSubItems -->
                                    </li>
                                    <ElementsLogros class="element-logros" />
                                </ul>
                            </div>

                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script setup>
const { $gsap: gsap } = useNuxtApp();

const props = defineProps({
    data: {
        type: Object,
    },
    menuData: {
        type: Object,
        required: true,
        default: () => ({}),
    }
})

const initializeMenus = () => {
    const menus = document.querySelectorAll('.hasSubmenu');
    let openMenuTimeout;

    menus.forEach((menu) => {
        let subMenu = menu.querySelector('.submenu');

        if (subMenu) {
            let subRight = menu.querySelector('.submenu__right');
            let subLeft = menu.querySelector('.submenu__left');

            if (subRight) {
                gsap.set(subRight, { autoAlpha: 1 });
            }

            if (subLeft) {
                gsap.set(subLeft, { autoAlpha: 1 });
            }

            // Evento de mouseenter

            menu.addEventListener('mouseenter', () => {
                openMenuTimeout = setTimeout(() => {
                    // Cerrar cualquier subMenu abierto
                    document.querySelectorAll('.submenu.open').forEach(openMenu => {
                        if (openMenu !== subMenu) {
                            const tlClose = gsap.timeline({
                                defaults: {
                                    duration: 0.05,
                                    ease: 'power1.in',
                                    autoAlpha: 0,
                                }
                            });
                            let openRight = openMenu.querySelector('.submenu__right');
                            let openLeft = openMenu.querySelector('.submenu__left');
                            tlClose.to([openRight, openLeft], { yPercent: 0 }, 0.05);
                            openMenu.classList.remove('open');
                        }
                    });

                    // Abrir el subMenu actual
                    const tlMenuOpen = gsap.timeline({
                        defaults: {
                            duration: 0.05,
                            ease: 'power1.out',
                            // autoAlpha: 1,
                        }
                    });
                    tlMenuOpen.to([subRight, subLeft], { yPercent: 145 }, 0);
                    tlMenuOpen.to([subRight, subLeft], { autoAlpha: 1 }, 0.05);
                    subMenu.classList.add('open');

                    let submenuChildren = document.querySelectorAll('.submenu-child');
                    let subsubmenuChildren = document.querySelectorAll('.subsubmenu-child');
                    let allSlides = document.querySelectorAll('ul.submenu__left-slider > .before-after');

                    function hideAllSlidesAndStopAnimations() {
                        allSlides.forEach(slide => {
                            let slideCs = slide.querySelectorAll('.slide-c');
                            slideCs.forEach(slideC => {
                                gsap.set(slideC, { opacity: 0 });
                            });
                        });
                    }

                    // Función para manejar el hover en los enlaces
                    function handleHoverOnLink(parentIndex, linkIndex) {
                        hideAllSlidesAndStopAnimations();
                        let correspondingSlide = allSlides[parentIndex];
                        let slideCs = correspondingSlide.querySelectorAll('.slide-c');
                        if (slideCs[linkIndex]) {
                            gsap.to(slideCs[linkIndex], { duration: 0.05, opacity: 1 });
                        }
                    }

                    // Agregar eventos a submenu-child
                    submenuChildren.forEach((child, index) => {
                        let links = child.querySelectorAll('a');
                        links.forEach((link, linkIndex) => {
                            link.addEventListener('mouseenter', () => handleHoverOnLink(index, linkIndex));
                        });
                        child.addEventListener('mouseleave', hideAllSlidesAndStopAnimations);
                    });

                    // Agregar eventos a subsubmenu-child
                    subsubmenuChildren.forEach(child => {
                        let parentIndex = Array.from(submenuChildren).indexOf(child.closest('.submenu-child'));
                        let links = child.querySelectorAll('a');
                        links.forEach((link, linkIndex) => {
                            link.addEventListener('mouseenter', () => handleHoverOnLink(parentIndex, linkIndex));
                        });
                        child.addEventListener('mouseleave', hideAllSlidesAndStopAnimations);
                    });

                    // Inicialmente ocultar todos los slides
                    hideAllSlidesAndStopAnimations();

                }, 200); // Retraso de 300 ms

                // Evento de mouseleave
                menu.addEventListener('mouseleave', () => {
                    clearTimeout(openMenuTimeout); // Cancela el temporizador si el ratón sale antes de 300 ms
                    if (subMenu.classList.contains('open')) {
                        const tlMenuClose = gsap.timeline({
                            defaults: {
                                duration: 0.25,
                                ease: 'circ.out',
                            }
                        });
                        tlMenuClose.to([subRight, subLeft], { autoAlpha: 0 }, 0);
                        tlMenuClose.to([subRight, subLeft], { yPercent: 0 }, 0.25);
                        subMenu.classList.remove('open');
                    }
                });
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', closeAllMenus);
            });
        }
    });
};

const closeAllMenus = () => {
    document.querySelectorAll('.submenu.open').forEach(openMenu => {
        let subRight = openMenu.querySelector('.submenu__right');
        let subLeft = openMenu.querySelector('.submenu__left');

        if (openMenu.classList.contains('open')) {
            const tlMenuClose = gsap.timeline({
                defaults: {
                    duration: 0.25,
                    ease: 'circ.out',
                }
            });
            tlMenuClose.to([subRight, subLeft], { autoAlpha: 0 }, 0);
            tlMenuClose.to([subRight, subLeft], { yPercent: 0 }, 0.25);
            openMenu.classList.remove('open');
        }
    });
}

// Función para cargar las imágenes
const loadImages = (event) => {
    const images = event.currentTarget.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            img.setAttribute('src', src);
            img.removeAttribute('data-src');
        }
    });
};

onMounted(async () => {
    initializeMenus();
})
</script>

<style scoped>
.header-nav * {
    @apply font-nunito font-normal;
}

.egos-header {
    .nav-categories {
        @apply rounded-bl-xl rounded-tl-xl px-8 flex flex-col justify-center items-stretch;
    }

    .header-wrapper {

        .menu-list {
            @apply flex justify-end items-center gap-6 font-light h-full mb-0 uppercase tracking-wide;

            &.active {
                @apply transform translate-x-0 overflow-y-scroll;
            }

            .menu-wrapper {
                .nav-link {
                    @apply block text-clamp-2xs 2xl:text-clamp-xs;

                    span {
                        @apply text-nude-8 cursor-pointer z-[1] before:content-[''] before:bg-gold-3 before:h-[1px] before:w-full before:max-w-0 before:absolute before:bottom-0 before:left-0 before:transition-[max-width];
                    }
                }

                .submenu {
                    @apply mt-1 fixed left-0 right-0 top-12 m-auto z-0 h-vh/75 w-[85vw] pointer-events-none [&.open]:pointer-events-auto;
                }
            }

            .submenu__left,
            .submenu__right {
                @apply bg-blue-1/80 shadow opacity-0 pointer-events-auto will-change-transform;

                .blackfriday & {
                    @apply bg-dark-2/80;
                }
            }

            .submenu__left {
                @apply bg-nude-8 h-vh/70 block bg-cover bg-center w-[calc(85vw*0.375)] top-0 -left-1 rounded-2xl absolute translate-y-[-140%];
                background-image: url(/assets/images/hero.webp);

                .submenu__left-slider {
                    @apply flex flex-col overflow-hidden rounded-2xl h-vh/70;

                    .before-after {
                        @apply flex h-vh/70 absolute top-0 left-0;

                        .slide-c {
                            @apply absolute left-0 top-0 opacity-0 z-0 h-full will-change-transform w-[calc(85vw/2.666667)];
                        }
                    }
                }
            }

            .submenu__right {
                @apply h-vh/70 right-0 w-[calc(85vw*0.625)] top-0 rounded-2xl absolute backdrop-blur-xl;
                transform: translateY(-140%);

                .submenu__right-list {
                    @apply list-none p-0 h-full has-[.column]:flex flex-row content-center justify-center items-start flex-wrap absolute gap-0 w-full top-0 left-0;


                    &>.submenu-child {
                        @apply w-fit flex flex-col justify-between items-start flex-nowrap;

                        ul {
                            @apply flex flex-col justify-start items-start p-0 relative;
                            clip-path: unset;

                            &:has(li:nth-child(10)) {
                                @apply grid grid-cols-2 gap-x-10;
                            }
                        }

                        &>span {
                            @apply cursor-default p-0 block text-gold-1 font-normal text-clamp-base;
                        }
                    }

                    .subsubmenu-child {
                        @apply m-0;
                        .nav-link {
                            @apply text-balance tracking-normal flex flex-col justify-end items-start text-nude-8 py-1 text-clamp-sm;
                        }
                    }
                }

            }

            &>li {
                @apply flex flex-col items-start justify-center gap-8 font-normal h-full mb-0;
            }

            &>li:hover span::before,
            .router-link-exact-active span::before {
                @apply max-w-full;
            }

            a img {
                @apply hidden;
            }
        }

    }

    .element-logros {
        @apply flex;
    }

    .arrow-up, .arrow-down {
        @apply hidden;
    }

    .logros-mobile {
        @apply !hidden
    }
    
}

.egos-header:has(.offer-display),
.egos-header:has(.notices) {
    .submenu {
        @apply !top-24;
    }
}


</style>
