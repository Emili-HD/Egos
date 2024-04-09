<template>
    <header class="egos-header fixed p-3 flex flex-row justify-start items-center gap-8 z-[1000] max-h-screen/70 w-screen md:w-screen/85" id="site-header">
        <div class="header-wrapper flex flex-row justify-between px-1 w-full">
            <div class="header-brand flex flex-col justify-start items-start py-2 px-4 bg-blue-1 rounded-2xl">
                <nuxt-link class="block" to="/" aria-label="Vuelve a la página de inicio">
                    <img loading="lazy" class="w-full max-w-16 xl:max-w-16" src="/assets/images/icons/logo-egos.svg" alt="Egos" />
                </nuxt-link>
            </div>

            <div class="header-nav flex flex-row justify-end items-stretch w-full">
                <nav aria-label="Global"
                    class="nav-categories bg-white rounded-2xl xl:rounded-br-none xl:rounded-tr-none px-8 flex flex-col justify-center items-stretch">
                    <ul class="menu-list" @mouseover="loadImages" ref="menuContainer">
                        <li v-for="tratamiento in menuTratamientosData.items" :key="tratamiento.ID"
                            :class="{ 'hasSubmenu': tratamiento.child_items }">
                            <div class="menu-tab flex flex-row justify-start items-center w-full xl:hidden"
                                :data-title="tratamiento.title">
                                <nuxt-link :to="tratamiento.url" class="nav-title hidden xl:flex"
                                    active-class="router-link-active">
                                    <span>{{ tratamiento.title }}</span>
                                </nuxt-link>
                                <img class="arrow-down max-w-4 order-2 absolute right-4 opacity-50"
                                    src="../../assets/images/icons/arrow-down.svg" v-if="tratamiento.child_items"
                                    alt="Abrir menú">
                            </div>
                            <div class="menu-wrapper">
                                <nuxt-link :to="tratamiento.url" class="nav-link hidden xl:block text-clamp-xs"
                                    active-class="router-link-active">
                                    <span class="text-gold-3 cursor-pointer z-[1] before:content-[''] before:bg-gold-3 before:h-[1px] before:w-full before:max-w-0 before:absolute before:bottom-0 before:left-0 before:transition-[max-width]">{{ tratamiento.title }}</span>
                                    <img src="../../assets/images/icons/arrow-up.svg" alt="Cerrar menú">
                                </nuxt-link>
                                <div class="submenu mt-1 xl:fixed top-0 left-0 xl:right-0 xl:top-12 xl:m-auto z-0"
                                    v-if="tratamiento.child_items">
                                    <div
                                        class="submenu__right h-fit xl:h-screen/70 right-0 xl:-right xl:w-[calc(var(--menu-width)*0.625)] top-0 rounded-2xl w-full xl:absolute xl:w-50 xl:backdrop-blur-xl">
                                        <ul
                                            class="list-none p-0 h-full has-[.column]:flex flex-row xl:content-center justify-center xl:justify-center items-start flex-wrap xl:absolute gap-4 xl:gap-0 w-full top-0 left-0">
                                            <li class="submenu-child w-full xl:w-fit xl:flex flex-col justify-between items-start flex-nowrap"
                                                v-for="(subTratamiento, index) in tratamiento.child_items"
                                                :key="subTratamiento.ID" :data-index="index">
                                                <nuxt-link v-if="!subTratamiento.child_items" :to="subTratamiento.url"
                                                    class="nav-link" :class="subTratamiento.classes"
                                                    active-class="nuxt-link-active">
                                                    {{ subTratamiento.title }}
                                                </nuxt-link>
                                                <span class="column cursor-default p-1 hidden xl:block text-gold-3 font-normal text-clamp-base" v-else>{{ subTratamiento.title }}</span>
                                                <!-- SubSubItems -->
                                                <ul class="list-none"
                                                    v-if="subTratamiento.child_items && subTratamiento.child_items.length > 0">
                                                    <li class="subsubmenu-child"
                                                        v-for="(subSubTratamiento, subIndex) in subTratamiento.child_items"
                                                        :key="subSubTratamiento.ID" :data-index="subIndex">




                                                        <nuxt-link :to="subSubTratamiento.url" class="nav-link"
                                                            :class="subSubTratamiento.classes"
                                                            active-class="nuxt-link-active">
                                                            {{ subSubTratamiento.title }}
                                                            <img src="../../assets/images/icons/arrow-up.svg" alt="Cerrar menú" />
                                                        </nuxt-link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li class="logros text-nude-8 text-clamp-xs hidden lg:flex justify-center items-center absolute bottom-0 w-full h-24">
                                                <div class="mejorValorada flex items-center gap-1">
                                                    <img id="google-icon" src="../../assets/images/icons/google-icon.svg" alt="Clínica mejor valorada en google"  width="36" height="36" />
                                                    <span class="!text-nude-8 after:content-none before:!content-none" >Clínica mejor valorada</span>
                                                </div>
                                                <div class="operaciones flex items-center">
                                                    <img id="laurel-iz" src="../../assets/images/icons/laurel-iz.svg" alt="" width="16" height="32" />
                                                    <span class="!text-nude-8 after:content-none before:!content-none" >+2000</span>
                                                    <img id="laurel-der" src="../../assets/images/icons/laurel-der.svg" alt="" width="16" height="32" />
                                                    <span class="!text-nude-8 after:content-none before:!content-none" id="pacientes left-2">pacientes intervenidos al año</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div
                                        class="anchorLink submenu__left xl:h-screen/70 hidden xl:block bg-cover bg-center w-full xl:w-[calc(var(--menu-width)*0.375)] top-0 -left-1 rounded-2xl xl:absolute xl:w-50">
                                        <ul class="submenu__left-slider flex flex-col overflow-hidden rounded-2xl h-screen/70">
                                            <li class="before-after flex h-screen/70 absolute top-0 left-0"
                                                v-for="(subTratamiento, index) in tratamiento.child_items"
                                                :key="subTratamiento.id" :data-index="index">
                                                <div class="slide-c absolute left-0 top-0 opacity-0 z-0 h-full w-full will-change-transform"
                                                    v-for="subSubTratamiento in subTratamiento.child_items"
                                                    :key="subSubTratamiento.ID">
                                                    <img loading="lazy" class="menu-icon object-cover object-center min-h-full min-w-full"
                                                        :data-src="subSubTratamiento.acf.icon" alt=""  width="571" height="706" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ElementsHamburger />
                </nav>
            </div>

            <div class="nav-secondary bg-white min-w-28 p-1 rounded-tr-2xl rounded-br-2xl hidden xl:block">
                <a class="button pedircita bg-blue-1 text-nude-8 text-center flex flex-col justify-center items-center border-none rounded-xl p-0 w-full h-full z-2"
                    href="#formulario" @click.passive="handleClick">
                    Pide Cita
                </a>
            </div>
        </div>
    </header>
</template>

<script setup>
import { watch } from 'vue';
import { useAsyncData, useRoute } from 'nuxt/app';
import { getMenu } from '@/composables/useFetch'; // Asegúrate de que esta ruta sea correcta
import { useMenuStore } from '@/stores/menu';
// import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const { $gsap: gsap } = useNuxtApp();
const route = useRoute();
const menuStore = useMenuStore();


function handleClick() {
    const { $lenis: lenis } = useNuxtApp();
    lenis.scrollTo('#formulario', { offset: -20 });
}

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

const { data: menuTratamientosData, error: menuTratamientosError, pending: menuTratamientosPending } = await useAsyncData('menuTratamientos', async () => {
  const menuData = await getMenu('tratamientos');
  if (menuData && menuData.items) {
    processMenuItems(menuData.items);
  }
  return menuData;
});

const initializeMenus = async () => {
    if (process.client && !menuTratamientosPending.value) {
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
    }
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
    if (!menuTratamientosPending.value) {
        initializeMenus();
    }
})

</script>


<style lang="scss" scoped>
@mixin flex($direction: row, $justify: flex-start, $align: center, $wrap: nowrap, $gap: 2) {
    display: flex;
    flex-direction: $direction;
    justify-content: $justify;
    align-items: $align;
    flex-wrap: $wrap;
    gap: $gap+rem;
}

.egos-header {
    --menu-height: 72.5vh;
    --menu-width: 85vw;
    height: var(--header-height);
    max-height: var(--menu-height);
    width: calc(var(--full-width) - (var(--gap) * 2));

    .header-wrapper {
        .nav-secondary {
            @media (max-width: 1200px) {
                min-width: 25vw;
            }

            @media (max-width: 767px) {
                min-width: 25vw;
            }

            &:hover .nav-form {
                .form {
                    opacity: 1;
                }
            }
        }

        .menu-list {
            @include flex(row, flex-end, center);
            font-weight: 300;
            height: 100%;
            letter-spacing: 1px;
            margin-bottom: 0;
            text-transform: uppercase;

            @media (max-width: 1200px) {
                align-items: flex-start;
                background-color: rgba(var(--blue-1-rgb), .85);
                -webkit-backdrop-filter: blur(1.5rem);
                backdrop-filter: blur(1.5rem);
                border-radius: var(--radius-xl);
                display: flex;
                flex-direction: column;
                gap: 0;
                height: calc(100lvh - .6rem);
                justify-content: flex-start;
                left: var(--gap);
                padding: 6rem 1rem 3rem;
                position: fixed;
                top: var(--gap);
                transform: translateX(105%);
                transition: transform .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                width: calc(100vw - .6rem);
                z-index: -1;

                &.active {
                    transform: translateX(0);
                    overflow-y: scroll
                }
            }

            &>li {
                @include flex(column, center, flex-start);
                font-weight: 400;

                @media (max-width: 767px) {
                    width: 100%;
                    gap: 1rem;
                    padding: .5rem .75rem;
                    border-radius: var(--radius-m);
                    margin-bottom: -1rem;

                    &:nth-child(1) {
                        background-color: var(--nude-8);

                        .menu-tab::before {
                            background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-21.svg);
                        }
                    }

                    &:nth-child(2) {
                        background-color: var(--nude-7);

                        .menu-tab::before {
                            background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-06.svg);
                        }
                    }

                    &:nth-child(3) {
                        background-color: var(--nude-6);

                        .menu-tab::before {
                            background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-02.svg);
                        }
                    }

                    &:nth-child(4) {
                        background-color: var(--nude-5);

                        .menu-tab::before {
                            background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-16.svg);
                        }
                    }

                    &:nth-child(5) {
                        background-color: var(--nude-4);

                        .menu-tab::before {
                            background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-07.svg);
                        }
                    }

                    &:nth-child(6) {
                        background-color: var(--nude-3);

                        .menu-tab::before {
                            background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-19.svg);
                        }
                    }

                    &:nth-child(7) {
                        background-color: var(--nude-2);

                        .menu-tab::before {
                            background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-04.svg);
                        }
                    }
                }

                .menu-tab {

                    @media (max-width: 767px) {

                        &::before {
                            --size: 3.75rem;
                            content: "";
                            height: var(--size);
                            width: var(--size);
                            display: inline-block;
                            position: relative;
                            background-size: var(--size);
                            background-repeat: no-repeat;
                            margin-right: 1rem;
                            vertical-align: middle;
                            background-color: #ffffff80;
                            border-radius: 50%;
                            background-size: 85%;
                            background-position: center;
                        }

                        &::after {
                            content: attr(data-title);
                            display: inline-block;
                            font-size: calc(var(--font-size) * .9);
                            color: var(--gold-2);
                            font-weight: 400;
                            vertical-align: middle;
                        }


                    }
                }

                @media (max-width: 767px) {
                    .menu-wrapper {
                        height: 0;
                        overflow: hidden;
                        width: 100%;
                        padding: 0 1rem;
                    }
                }

                &:hover span::before,
                .router-link-exact-active span::before {
                    max-width: 100%;
                }
            }

            .submenu {
                // counter-reset: li;
                height: var(--menu-height);
                pointer-events: none;
                width: var(--menu-width);

                @media (max-width: 767px) {
                    width: 100%;
                    pointer-events: all;
                    height: fit-content;
                }

                &.open {
                    pointer-events: all;
                }

                &__left,
                &__right {
                    background-color: #1c2c44c7;
                    box-shadow: var(--shadow);
                    opacity: 0;
                    pointer-events: all;
                    will-change: transform, opacity;

                    @media (max-width: 767px) {
                        opacity: 1 !important;
                        visibility: visible !important;
                    }
                }

                &__left {
                    background-color: var(--nude-8);
                    background-image: url(@/assets/images/hero.avif);
                    transform: translateY(-120%);

                    @media (max-width: 767px) {
                        transform: none;
                        display: none;
                    }
                }

                &__right {
                    transform: translateY(-120%);

                    @media (max-width: 767px) {
                        transform: none;
                        background: transparent;
                        box-shadow: none;
                    }

                    ul {
                        &>.submenu-child {
                            .column {
                                &::before {
                                    content: none
                                }
                            }

                            .nav-link {
                                @include flex(column, flex-end, flex-start);
                                color: var(--nude-8);
                                font-size: calc(var(--font-size) * .75);
                                height: 100%;
                                padding: var(--gap);
                                width: 100%;
                                z-index: 99;

                                img {
                                    display: none;
                                }

                                @media (max-width: 767px) {
                                    color: rgba(var(--blue-1-rgb), 0.75);
                                    font-size: calc(var(--font-size) * 0.9);
                                    padding: 0.65rem 0rem 1.15rem;
                                    border-bottom: 1px solid rgba(var(--blue-1-rgb), 0.15);
                                    flex-direction: row;
                                    justify-content: space-between;
                                    align-items: center;

                                    img {
                                        display: inline-block;
                                        max-width: 30px;
                                        max-height: 30px;
                                    }
                                }

                                &::after {
                                    background-color: currentColor;
                                    bottom: .375rem;
                                    content: "";
                                    height: 1px;
                                    left: var(--gap);
                                    max-width: 0;
                                    opacity: .5;
                                    position: absolute;
                                    transition: max-width var(--transition);
                                    width: 100%;
                                }

                                &:hover::after,
                                &.router-link-exact-active::after {
                                    max-width: 100%;

                                    @media (max-width: 767px) {
                                        bottom: -0.5px;
                                        left: 0;
                                    }
                                }
                            }


                            ul {
                                @include flex(column, flex-start, flex-start, nowrap, 0);
                                clip-path: unset;
                                padding: 0;
                                position: relative;

                                @media (max-width: 767px) {
                                    margin: 0;
                                    gap: .5rem;

                                    &>li {
                                        width: 100%;
                                    }
                                }
                            }

                        }

                    }
                }

            }

            a {
                // color: $blue-1;
                // font-size: clamp(0.65rem, 0.7vw, 0.9rem);
                // z-index: 99;

                img {
                    display: none;
                }

                @media (max-width: 1200px) {
                    font-size: calc(var(--font-size) * 1.5);
                    // display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.65rem 0rem 1.15rem;
                    border-bottom: 1px solid rgba(var(--blue-1-rgb), 0.15);

                    img {
                        display: inline-block;
                        max-width: 30px;
                        max-height: 30px;
                    }
                }

            }
        }
    }

    &.light {
        --nude-8: $blue-1;
        --text-color: var(--text-color-dark);
        --border-color-light: var(--border-color-dark);
    }
}

/* .nav-pages {
    align-items: center;
    background: var(--nude-6);
    border: 1px solid rgba(var(--gold-2-rgb), .1);
    border-radius: var(--radius-l);
    display: flex;
    flex-direction: row;
    height: 100%;
    left: 0;
    max-width: 8.25rem;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 0;

    .kebab {
        cursor: pointer;
        display: block;
        height: 25px;
        left: 6rem;
        position: absolute;
        top: 50%;
        transform: translateY(-60%);
        width: 45px;
        z-index: 10;
    }

    .nav-panels {
        overflow-x: scroll;
        padding: calc(var(--gap) * 2);
        padding-left: calc(100vw / 16);
        padding-right: 1.5rem;
        width: 100%;

        ul {
            align-items: center;
            display: flex;
            flex-direction: row;
            gap: 1rem;
            justify-content: center;
            list-style: none;
            margin: 0;
            opacity: 0;
            padding: 0;
            visibility: hidden;
            width: max-content;

            li {
                border-radius: var(--radius-s);
                font-size: 90%;

                a {
                    background: transparent;
                    color: var(--gold-2);
                    font-size: calc(var(--font-size) * 0.65);
                    font-weight: 400;
                    padding: 0;
                    text-transform: uppercase;
                }
            }
        }
    }
} */

ul.submenu__left-slider {

    .before-after {
        &>.slide-c {
            width: calc(var(--menu-width) / 2.666667);
        }
    }
}
</style>
