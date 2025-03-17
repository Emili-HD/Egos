<template>
    <div class="header-nav flex flex-row justify-end items-stretch size-full">
        <nav aria-label="Global" class="nav-categories">
            <ul class="menu-list" ref="menuContainer" v-if="menuData">
                <li v-for="tratamiento in menuData" :key="tratamiento.ID"
                    :class="{ 'hasSubmenu': tratamiento.child_items }">
                    <div class="menu-tab" :data-title="tratamiento.title"
                        :data-name="tratamiento.classes.includes('estetica') ? 'estetica' : ''">

                        <!-- Enlace en desktop -->
                        <nuxt-link :to="tratamiento.classes.includes('nofollow') ? tratamiento.url : tratamiento.path"
                            :rel="tratamiento.classes.includes('nofollow') ? 'nofollow noopener' : ''"
                            :target="tratamiento.classes.includes('nofollow') ? '_blank' : ''" class="nav-title"
                            active-class="router-link-active" :class="[
                                ...tratamiento.classes,
                                { 'nav-link': tratamiento.child_items.length === 0 }
                            ]">
                            <span>{{ tratamiento.title }}</span>
                        </nuxt-link>
                        <ArrowDownRightIcon class="arrow-down" v-if="tratamiento.child_items.length > 0"
                            alt="Abrir menú" />

                    </div>
                    <div class="menu-wrapper">

                        <!-- Si el link tiene la class 'nofollow' aplicar link externo -->
                        <a v-if="tratamiento.classes == 'nofollow'" :href="tratamiento.url" class="nav-link"
                            active-class="router-link-active" rel="nofollow noopener" target="_blank">
                            <span class="">{{ tratamiento.title }}</span>
                            <ArrowUpRightIcon
                                class="arrow-up size-8 p-2 rounded-full order-2 absolute right-4 opacity-50 text-blue-1 hidden"
                                alt="Cerrar menú" />
                        </a>

                        <!-- sino aplicar link interno -->
                        <nuxt-link v-else :to="tratamiento.path" class="nav-link" active-class="router-link-active">
                            <span class="">{{ tratamiento.title }}</span>
                            <ArrowUpRightIcon
                                class="arrow-up size-8 p-2 rounded-full order-2 absolute right-4 opacity-50 text-blue-1 hidden"
                                alt="Cerrar menú" />
                        </nuxt-link>

                        <div class="submenu" v-if="tratamiento.child_items.length > 0">
                            <div class="submenu__right">
                                <!-- SubItems -->
                                <ul class="submenu__right-list">
                                    <li class="submenu-child" v-for="(subTratamiento, index) in tratamiento.child_items"
                                        :key="subTratamiento.ID" :data-index="index">

                                        <nuxt-link v-if="!subTratamiento.child_items" :to="subTratamiento.path"
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

                                                <a v-if="subSubTratamiento.classes == 'nofollow'"
                                                    :href="subSubTratamiento.url" class="nav-link"
                                                    :class="subSubTratamiento.classes" active-class="nuxt-link-active"
                                                    rel="nofollow noopener" target="_blank">
                                                    {{ subSubTratamiento.title }}
                                                    <ArrowUpRightIcon
                                                        class="arrow-up  hidden [.is-tablet_&,_.is-tablet_&]:block"
                                                        alt="Cerrar menú" />
                                                </a>

                                                <nuxt-link v-else :to="subSubTratamiento.path" class="nav-link"
                                                    :class="subSubTratamiento.classes" active-class="nuxt-link-active">
                                                    {{ subSubTratamiento.title }}
                                                    <ArrowUpRightIcon
                                                        class="arrow-up  hidden [.is-tablet_&,_.is-tablet_&]:block"
                                                        alt="Cerrar menú" />
                                                </nuxt-link>
                                            </li>
                                        </ul>
                                        <!-- /SubSubItems -->
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </li>
                <ElementsLogros class="logros-mobile" />
            </ul>
            <ElementsHamburger />
        </nav>
    </div>
</template>

<script setup>
    import { ArrowUpRightIcon, ArrowDownRightIcon } from '@heroicons/vue/24/outline'
    const { $gsap: gsap } = useNuxtApp();

    // const { data: menuTratamientosData } = await useAsyncData('menuTratamientos', async () => {
    //     const menuData = await getMenuTratamientos();
    //     return menuData;
    // });

    const props = defineProps({
        data: {
            type: Object,
        },
        menuData: {
            type: Object,
            required: true
        }
    })

    const initializeMenus = () => {
        const groups = gsap.utils.toArray(".hasSubmenu:has(.arrow-down)");
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
                        gsap.to(scroller, { duration: 1, scrollTo: { y: title, offsetY: 150 } })
                    }, 150);
                } else {
                    tl.reverse();
                }
            });
        });
    };

    const cerrarMenuMobile = () => {
        const burger = document.querySelector('.navTrigger');
        const nav = document.querySelector('.menu-list');
        const submenu = gsap.utils.toArray('.menu-wrapper');
        const allLinks = gsap.utils.toArray('.nav-link');
        let mql = window.matchMedia("(max-width: 1200px)");

        // Cierra el menú al hacer clic en un enlace
        allLinks.forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                if (window.matchMedia("(max-width: 1200px)").matches) {
                    gsap.set(submenu, { autoAlpha: 0, height: 0 });
                }
            });
        });

        // Alterna la visibilidad del menú al hacer clic en el disparador (navTrigger)
        burger.addEventListener('click', () => {
            if (burger.classList.contains('active')) {
                gsap.set(submenu, { autoAlpha: 0, height: 0 });
            }
        });
    }

    onMounted(async () => {
        initializeMenus();
        cerrarMenuMobile()
    })

</script>

<style scoped>
    .header-nav * {
        @apply font-nunito font-normal;
    }

    .egos-header {
        .nav-categories {
            @apply bg-white rounded-xl;
        }

        .nav-secondary {
            @apply hidden;
        }

        .header-wrapper {

            .menu-list {
                @apply list-none flex items-start [html:not(.blackfriday)_&]:bg-blue-1/85 [.blackfriday_&]:bg-black/80 backdrop-blur-xl rounded-2xl flex-col gap-0 h-[calc(87*var(--vh))] top-[calc(12*var(--vh))] justify-start fixed pt-12 px-4 pb-4 right-1 w-[calc(100vw-.6rem)] max-w-[480px] z-[-1] transition-transform;
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

                    .menu-tab {
                        &::before {
                            background-image: url(https://test.clinicaegos.com/wp-content/uploads/2024/02/icono-04.svg);
                        }

                        .nofollow {
                            @apply inline-block text-gold-2 uppercase
                        }

                        &:has(.nofollow) {
                            &::after {
                                @apply content-none;
                            }

                            svg {
                                @apply hidden;
                            }
                        }

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

                    &.activo {
                        @apply inline-block text-gold-2 uppercase font-normal
                    }
                }

                /* &>li:has(.activo) .menu-tab::after {
                    @apply content-['']
                } */

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

        .logros-mobile {
            @apply flex flex-col h-fit max-w-full !relative !-bottom-6 !mb-12 !p-6 !gap-2 divide-y divide-white/30;

            .logros__icon {
                @apply w-full;

                &.operaciones {
                    @apply pt-4 mb-3
                }

                span {
                    @apply text-base leading-none;
                }
            }
        }

        .arrow-up {
            @apply block size-8 p-2 rounded-full order-2 absolute right-0 bg-white opacity-50 text-blue-1
        }

        .arrow-down {
            @apply block max-w-4 order-2 absolute right-6 top-5 opacity-50 text-blue-1
        }
    }

    .egos-header:has(.offer-display) {
        .header-wrapper .menu-list {
            @apply !pt-4;
        }
    }


</style>
