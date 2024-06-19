<template>
    <div class="header-nav flex flex-row justify-end items-stretch size-full" v-if="menuTratamientosData && menuTratamientosData.items">
        <nav aria-label="Global" class="nav-categories">
            <ul class="menu-list" @mouseover="loadImages" ref="menuContainer">
                <li v-for="tratamiento in menuTratamientosData.items" :key="tratamiento.ID"
                    :class="{ 'hasSubmenu': tratamiento.child_items }">
                    <div class="menu-tab" :data-title="tratamiento.title">
                        <nuxt-link :to="tratamiento.url" class="nav-title" active-class="router-link-active">
                            <span>{{ tratamiento.title }}</span>
                        </nuxt-link>
                        <ArrowDownRightIcon class="arrow-down"
                            v-if="tratamiento.child_items" alt="Abrir menú" />
                    </div>
                    <div class="menu-wrapper">
                        <nuxt-link :to="tratamiento.url" class="nav-link" active-class="router-link-active">
                            <span class="">{{ tratamiento.title }}</span>
                            <ArrowUpRightIcon
                                class="arrow-up size-8 p-2 rounded-full order-2 absolute lg:hidden right-4 opacity-50 text-blue-1"
                                alt="Cerrar menú" />
                        </nuxt-link>

                        <div class="submenu" v-if="tratamiento.child_items">
                            <div class="anchorLink submenu__left">
                                <ul class="submenu__left-slider">
                                    <li class="before-after" v-for="(subTratamiento, index) in tratamiento.child_items"
                                        :key="subTratamiento.id" :data-index="index">
                                        <div class="slide-c" v-for="subSubTratamiento in subTratamiento.child_items"
                                            :key="subSubTratamiento.ID">
                                            <img loading="lazy"
                                                class="menu-icon object-cover object-center min-h-full min-w-full"
                                                :data-src="subSubTratamiento.acf.icon" alt="" width="571"
                                                height="706" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="submenu__right">
                                <!-- SubItems -->
                                <ul class="submenu__right-list">
                                    <li class="submenu-child" v-for="(subTratamiento, index) in tratamiento.child_items"
                                        :key="subTratamiento.ID" :data-index="index">
                                        <nuxt-link v-if="!subTratamiento.child_items" :to="subTratamiento.url"
                                            class="nav-link" :class="subTratamiento.classes"
                                            active-class="nuxt-link-active">
                                            {{ subTratamiento.title }}
                                        </nuxt-link>
                                        <span class="column" v-else>{{ subTratamiento.title }}</span>

                                        <!-- SubSubItems -->
                                        <ul class="list-none"
                                            v-if="subTratamiento.child_items && subTratamiento.child_items.length > 0">
                                            <li class="subsubmenu-child"
                                                v-for="(subSubTratamiento, subIndex) in subTratamiento.child_items"
                                                :key="subSubTratamiento.ID" :data-index="subIndex">

                                                <nuxt-link :to="subSubTratamiento.url" class="nav-link"
                                                    :class="subSubTratamiento.classes" active-class="nuxt-link-active">
                                                    {{ subSubTratamiento.title }}
                                                    <ArrowUpRightIcon
                                                        class="arrow-up"
                                                        alt="Cerrar menú" />
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
            <ElementsHamburger />
        </nav>
    </div>
</template>

<script setup>
import { ArrowUpRightIcon, ArrowDownRightIcon } from '@heroicons/vue/24/outline'
const { $gsap: gsap } = useNuxtApp();
const route = useRoute();
const menuStore = useMenuStore();

// const menuTratamientosData = ref(null)

// Métodos
const processMenuItems = (items) => {
    items.forEach((item) => {
        if (item.url && item.url.startsWith('http')) {
            item.url = new URL(item.url).pathname;
        }
        if (item.child_items && item.child_items.length > 0) {
            item.child_items.forEach((subItem) => {
                if (subItem.child_items) {
                    subItem.child_items.forEach((subSubItem) => {
                        if (subSubItem.url && subSubItem.url.startsWith('http')) {
                            subSubItem.url = new URL(subSubItem.url).pathname;
                        }
                    });
                }
            });
        }
    });
};

const { data: menuTratamientosData, error: menuTratamientosError } = await useAsyncData('menuTratamientos', async () => {
    const menuData = await getMenu('tratamientos');
    if (menuData && menuData.items) {
        processMenuItems(menuData.items);
    }
    return menuData;
});

const initializeMenus = async () => {
   
        await nextTick()

        let mm = gsap.matchMedia();
        mm.add("(max-width: 1200px)", () => {

            const groups = gsap.utils.toArray(".hasSubmenu");
            const animations = [];

            groups.forEach((group, index) => {
                const title = group.querySelector('.menu-tab');
                const description = group.querySelector('.menu-wrapper');
                const arrow = group.querySelector('.arrow-down');
                const scroller = document.querySelector('.menu-list')

                // Establece el estado inicial de manera explícita
                gsap.set(description, { autoAlpha: 0, height: 0 });
                gsap.set(arrow, { rotate: 0, transformOrigin: '50% 50%' });

                // Usa fromTo para definir explícitamente los estados inicial y final
                const tl = gsap.timeline({ paused: true, reversed: true })
                    .fromTo(description,
                        { autoAlpha: 0, height: 0 },
                        { duration: 0.2, autoAlpha: 1, height: 'auto' }, 0)
                    .fromTo(arrow,
                        { rotate: 0, transformOrigin: '50% 50%' },
                        { duration: 0.25, rotate: 180, stagger: 0.05, transformOrigin: '50% 50%' }, '<');

                animations[index] = tl;

                title.addEventListener('click', () => {
                    if (tl.reversed()) {
                        animations.forEach((anim) => {
                            if (anim !== tl) anim.reverse().then(() => anim.pause());
                        });
                        tl.play();
                        setTimeout(() => {
                            gsap.to(scroller, { duration: 1, scrollTo: { y: title, offsetY: 90 } })
                        }, 150);
                    } else {
                        tl.reverse();
                    }
                });
            });
        })
        mm.add("(min-width: 1201px)", () => {
            const menus = document.querySelectorAll('.hasSubmenu');
            let openMenuTimeout;

            menus.forEach((menu) => {
                let subMenu = menu.querySelector('.submenu');
                let subRight = menu.querySelector('.submenu__right');
                let subLeft = menu.querySelector('.submenu__left');

                gsap.set(subRight, { autoAlpha: 1 });
                gsap.set(subLeft, { autoAlpha: 1 });

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
                                // tlClose.to([openRight, openLeft], { autoAlpha: 0 }, 0);
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
                        tlMenuOpen.to([subRight, subLeft], { yPercent: 125 }, 0);
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
            });

        })
    
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

const cerrarMenuMobile = () => {
    const burger = document.getElementById('navTrigger');
    const nav = document.querySelector('.menu-list');
    const links = document.querySelectorAll('.nav-link');
    // Cierra el menú al hacer clic en un enlace
    links.forEach(link => {
        link.addEventListener('click', () => {
            // console.log('link clicado');
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
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
    cerrarMenuMobile()
    initializeMenus();
})
const props = defineProps({
    data: {
        type: Object,
    }
})
</script>

<style>
/* .is-desktop:not(.is-ipad-pro, .is-tablet) { */
    .is-desktop:not(.is-ipad-pro, .is-tablet) .egos-header, .egos-header {
        .nav-categories {
            @apply bg-white rounded-bl-xl rounded-tl-xl px-8 flex flex-col justify-center items-stretch w-fit;
        }

        .header-wrapper {

            .menu-list {
                @apply flex justify-end items-center gap-8 font-light h-full mb-0 uppercase tracking-wider;

                &.active {
                    @apply transform translate-x-0 overflow-y-scroll;
                }

                .menu-tab {
                    @apply hidden;

                    .nav-title {
                        @apply flex;
                    }
                }

                .menu-wrapper {
                    .nav-link {
                        @apply block text-clamp-2xs 2xl:text-clamp-xs;

                        span {
                            @apply text-gold-3 cursor-pointer z-[1] before:content-[''] before:bg-gold-3 before:h-[1px] before:w-full before:max-w-0 before:absolute before:bottom-0 before:left-0 before:transition-[max-width];
                        }
                    }

                    .submenu {
                        @apply mt-1 fixed left-0 right-0 top-12 m-auto z-0 h-screen/75 w-[85vw] pointer-events-none [&.open]:pointer-events-auto;
                    }
                }

                .submenu__left,
                .submenu__right {
                    @apply bg-blue-1/80 shadow opacity-0 pointer-events-auto will-change-transform;
                }

                .submenu__left {
                    @apply bg-nude-8 h-screen/70 block bg-cover bg-center w-[calc(85vw*0.375)] top-0 -left-1 rounded-2xl absolute;
                    background-image: url(@/assets/images/hero.avif);
                    transform: translateY(-120%);

                    .submenu__left-slider {
                        @apply flex flex-col overflow-hidden rounded-2xl h-screen/70;

                        .before-after {
                            @apply flex h-screen/70 absolute top-0 left-0;

                            .slide-c {
                                @apply absolute left-0 top-0 opacity-0 z-0 h-full will-change-transform w-[calc(85vw/2.666667)];
                            }
                        }
                    }
                }

                .submenu__right {
                    @apply h-screen/70 right-0 w-[calc(85vw*0.625)] top-0 rounded-2xl absolute backdrop-blur-xl;
                    transform: translateY(-120%);

                    .submenu__right-list {
                        @apply list-none p-0 h-full has-[.column]:flex flex-row content-center justify-center items-start flex-wrap absolute gap-0 w-full top-0 left-0;


                        &>.submenu-child {
                            @apply w-fit flex flex-col justify-between items-start flex-nowrap;

                            ul {
                                @apply flex flex-col justify-start items-start p-0 relative;
                                clip-path: unset;
                            }

                            span {
                                @apply cursor-default p-0 block text-gold-3 font-normal text-clamp-base;
                            }
                        }

                        .subsubmenu-child {
                            .nav-link {
                                @apply text-balance tracking-normal flex flex-col justify-end items-start text-nude-8 pt-2 py-1 text-clamp-sm;
                            }
                        }
                    }

                }

                &>li {
                    @apply flex flex-col items-start gap-8 font-normal;
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

        .arrow-up {
            @apply hidden;
        }
    }
/* } */

.is-mobile,
.is-tablet,
.is-ipad-pro,
.is-ios,
.is-android {

    .egos-header {
        .nav-categories {
            @apply bg-white rounded-xl;
        }

        .header-wrapper {

            .menu-list {
                @apply flex items-start bg-blue-1/85 backdrop-blur-xl rounded-2xl flex-col gap-0 h-[calc(100lvh_-_.6rem)] justify-start fixed pt-24 px-4 pb-12 top-1 right-1 w-[calc(100vw-.6rem)] max-w-[480px] z-[-1] transition-transform;
                transform: translateX(105%);

                &>li {
                    @apply w-full gap-4 pt-2 pb-6 px-3 -mb-4 rounded-xl;

                    &:last-child {
                        @apply pb-2
                    }
                }

                &>li:nth-child(1) {
                    @apply bg-nude-8;

                    .menu-tab {
                        @apply flex flex-row justify-start items-center w-full;

                        .nav-title {
                            @apply hidden;
                        }
                        
                        &::before {
                            background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-21.svg);
                        }

                        &::after {
                            @apply text-gold-2 content-[attr(data-title)] uppercase inline-block font-normal align-middle text-clamp-base;
                            /* font-size: calc(var(--font-size)*.9); */
                        }
                    }
                }

                &>li:nth-child(2) {
                    @apply bg-nude-7;

                    .menu-tab::before {
                        background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-06.svg);
                    }
                }

                &>li:nth-child(3) {
                    @apply bg-nude-6;

                    .menu-tab::before {
                        background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-02.svg);
                    }
                }

                &>li:nth-child(4) {
                    @apply bg-nude-5;

                    .menu-tab::before {
                        background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-16.svg);
                    }
                }

                &>li:nth-child(5) {
                    @apply bg-nude-4;

                    .menu-tab::before {
                        background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-07.svg);
                    }
                }

                &>li:nth-child(6) {
                    @apply bg-nude-3;

                    .menu-tab::before {
                        background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-19.svg);
                    }
                }

                &>li:nth-child(7) {
                    @apply bg-nude-2;

                    .menu-tab::before {
                        background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-04.svg);
                    }
                }

                &>li .menu-tab::before {
                    @apply content-[''] size-14 inline-block relative bg-[length:85%] bg-center bg-no-repeat mr-4 bg-white/50 align-middle rounded-full;
                }

                &>li .menu-tab::after {
                    @apply content-[attr(data-title)] inline-block text-gold-2 font-normal align-middle text-clamp-base uppercase;
                }

                &>li .menu-wrapper {
                    @apply h-0 overflow-hidden w-full py-0 px-4;

                    .submenu {
                        @apply mt-1 top-0 left-0 z-0 [&.open]:pointer-events-auto w-full pointer-events-auto h-fit;
                    }
                }

                & .submenu__left,
                & .submenu__right {
                    @apply !opacity-100 !visible;
                }

                & .submenu__right {
                    @apply transform-none bg-transparent shadow-none;
                }

                & .submenu__right ul>.submenu-child .column::before {
                    content: none;
                }

                & .submenu__right ul>.submenu-child .nav-link::after {
                    @apply bg-current content-[''] h-px max-w-0 opacity-50 absolute w-full transition-[max-width];
                }

                & .submenu__right ul>.submenu-child .nav-link:hover::after,
                & .submenu__right ul>.submenu-child .nav-link.router-link-exact-active::after {
                    @apply max-w-full;
                }

                & .submenu__right ul>.submenu-child .nav-link:hover::after,
                & .submenu__right ul>.submenu-child .nav-link.router-link-exact-active::after {
                    @apply -bottom-[0.5px] left-0;
                }

                & .submenu__right ul>.submenu-child ul {
                    @apply m-0 gap-2;
                }

                & .submenu__right ul>.submenu-child ul>li {
                    @apply w-full;
                }

                & a {
                    @apply hidden;
                }

                & a img {
                    @apply inline-block max-w-8 max-h-8;
                }

                &.active {
                    @apply transform translate-x-0 overflow-y-scroll;
                }
            }
        }

        .submenu__left {
            @apply hidden;
        }

        .submenu__right {
            @apply h-fit right-0 top-0 rounded-2xl w-full;
            transform: translateY(-120%);

            .submenu__right-list {
                @apply list-none p-0 h-full has-[.column]:flex flex-row justify-center items-start flex-wrap gap-4 w-full top-0 left-0;


                &>.submenu-child {
                    @apply w-full flex-col justify-between items-start flex-nowrap;

                    ul {
                        @apply flex flex-col justify-start items-start p-0 relative;
                        clip-path: unset;
                    }

                    span {
                        @apply hidden;
                    }
                }

                .subsubmenu-child {
                    .nav-link {
                        @apply text-balance tracking-normal flex flex-col justify-end items-start text-blue-1/75 pt-2 pb-4 border-b;
                    }
                }
            }
        }

        .element-logros {
            @apply hidden;
        }

        .arrow-up {
            @apply size-8 p-2 rounded-full order-2 absolute right-0 bg-white opacity-50 text-blue-1
        }

        .arrow-down {
            @apply max-w-4 order-2 absolute right-6 top-5 opacity-50 text-blue-1
        }
    }
}
</style>
