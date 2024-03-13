<template>
    <header class="egos-header fixed p-0 mx-1 xl:m-1 flex flex-row justify-start items-center gap-8 z-[999]" id="site-header">
        <div class="header-wrapper flex flex-row justify-between px-1 w-full">
            <div class="header-brand bg-white flex flex-col justify-start items-start p-1 rounded-2xl">
                <nuxt-link class="block px-2 xl:px-4 py-1 xl:py-2 rounded-xl" to="/">
                    <img class="w-full max-w-20 xl:max-w-16 xl:max-w-14" src="../../assets/images/icons/logo-egos.svg" alt="" />
                </nuxt-link>
            </div>
    
            <div class="header-nav flex flex-row justify-end items-stretch w-full">
                <nav aria-label="Global" class="nav-categories bg-white rounded-2xl xl:rounded-br-none xl:rounded-tr-none px-8 flex flex-col justify-center items-stretch">
                    <ul class="menu-list">
                        <li v-for="tratamiento in menuTratamientosData.items" :key="tratamiento.ID" :class="{'hasSubmenu': tratamiento.child_items}">
                            <div class="menu-tab flex flex-row justify-start items-center w-full xl:hidden" :data-title="tratamiento.title">
                                <nuxt-link :to="tratamiento.url" class="nav-title hidden xl:flex" active-class="router-link-active">
                                    <span>{{ tratamiento.title }}</span>
                                </nuxt-link>
                                <img class="arrow-down max-w-4 order-2 absolute right-4 opacity-50" src="../../assets/images/icons/arrow-down.svg" v-if="tratamiento.child_items" alt="">
                            </div>
                            <div class="menu-wrapper">
                                <nuxt-link :to="tratamiento.url" class="nav-link hidden xl:block" active-class="router-link-active">
                                    <span>{{ tratamiento.title }}</span>
                                    <img src="../../assets/images/icons/arrow-up.svg" alt="">
                                </nuxt-link>
                                <div class="submenu mt-1 xl:fixed top-0 left-0 xl:right-0 xl:top-12 xl:m-auto z-0" v-if="tratamiento.child_items">
                                    <div class="submenu__right h-fit xl:h-[var(--menu-height)] right-0 xl:-right-1 w-full xl:w-[calc(var(--menu-width)*0.625)] top-0 rounded-2xl w-full xl:absolute xl:w-50 xl:backdrop-blur-xl">
                                        <ul class="list-none p-0 h-full has-[.column]:flex flex-row justify-center  xl:content-center justify-center xl:justify-center items-start flex-wrap xl:absolute gap-4 xl:gap-0 w-full top-0 left-0">
                                            <li class="submenu-child w-full xl:w-fit xl:flex flex-col justify-between items-start flex-nowrap" v-for="(subTratamiento, index) in tratamiento.child_items"
                                                :key="subTratamiento.ID" :data-index="index">
                                                <nuxt-link v-if="!subTratamiento.child_items" 
                                                    :to="subTratamiento.url"
                                                    class="nav-link" :class="subTratamiento.classes"
                                                    active-class="nuxt-link-active">
                                                    {{ subTratamiento.title }}
                                                </nuxt-link>
                                                <span class="column cursor-default p-1 hidden xl:block" v-else>{{ subTratamiento.title }}</span>
                                                <!-- SubSubItems -->
                                                <ul class="list-none" v-if="subTratamiento.child_items && subTratamiento.child_items.length > 0">
                                                    <li class="subsubmenu-child"
                                                        v-for="(subSubTratamiento, subIndex) in subTratamiento.child_items"
                                                        :key="subSubTratamiento.ID" :data-index="subIndex">
                                                        
                                                        


                                                        <nuxt-link :to="subSubTratamiento.url" class="nav-link"
                                                            :class="subSubTratamiento.classes"
                                                            active-class="nuxt-link-active">
                                                            {{ subSubTratamiento.title }}
                                                            <img src="../../assets/images/icons/arrow-up.svg" alt="">
                                                        </nuxt-link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <div class="logros">
                                                <div class="mejorValorada">
                                                    <img id="google-icon" src="../../assets/images/icons/google-icon.svg" alt="">
                                                    <span>Clínica mejor valorada</span>
                                                </div>
                                                <div class="operaciones">
                                                    <img id="laurel-iz" src="../../assets/images/icons/laurel-iz.svg" alt="">
                                                    <span>+2000</span>
                                                    <img id="laurel-der" src="../../assets/images/icons/laurel-der.svg" alt="">
                                                    <span id="pacientes">pacientes intervenidos al año</span>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                    <div class="anchorLink submenu__left xl:h-[var(--menu-height)] hidden xl:block bg-cover bg-center w-full xl:w-[calc(var(--menu-width)*0.375)] top-0 -left-1 rounded-2xl xl:absolute xl:w-50" >
                                        <ul class="submenu__left-slider ">
                                            <li class="before-after" v-for="(subTratamiento, index) in tratamiento.child_items"
                                                :key="subTratamiento.id" :data-index="index">
                                                <div class="slide-c" v-for="subSubTratamiento in subTratamiento.child_items"
                                                    :key="subSubTratamiento.ID">
                                                    <img loading="lazy" class="menu-icon inline-svg" :src="subSubTratamiento.acf.icon" alt="" />
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
                <a class="button pedircita text-center flex flex-col justify-center items-center border-none rounded-xl p-0 w-full h-full z-2" href="#formulario" @click.prevent="handleClick">
                    Pide Cita
                </a>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, nextTick, onMounted, inject } from 'vue';
import { menuTratamientos } from '@/composables/useApi';
// import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const { $gsap: gsap } = useNuxtApp();

function handleClick() {
  const { $lenis: lenis } = useNuxtApp();
  console.log('lenis on click', lenis);
  lenis.scrollTo('#formulario', {offset: -20});
}


// ScrollTrigger.normalizeScroll()

// State
const menuTratamientosData = ref({});
const tratamientoTabs = ref({});

// Métodos
const loadDataAndInitializeMenus = async () => {
    try {
        // Cargar datos de WordPress
        const response = await menuTratamientos(); // Asegúrate de usar `await` aquí
        const resTratamientos = response.data; // Accede a los datos con response.data
        // console.log('Tratamientos: ', resTratamientos);

        // Ahora usa resTratamientos directamente, ya que contiene los datos resueltos
        if (resTratamientos && resTratamientos.items) {
            menuTratamientosData.value = resTratamientos;
            resTratamientos.items.forEach((item) => {
                // console.log('item url', item.url);
                if (item.url && item.url.startsWith('http')) {
                    item.url = new URL(item.url).pathname;
                }
                
                if (item.child_items && item.child_items.length > 0) {
                    // console.log('Subitem url', item.child_items[0].child_items.url);
                    item.child_items.forEach((subItem) => {
                        // console.log('Subitem url', subItem.child_items);
                        subItem.child_items.forEach((subSubItem) => {
                            
                            if (subSubItem.url && subSubItem.url.startsWith('http')) {
                                // console.log('subSubItem url', subSubItem.url);
                                subSubItem.url = new URL(subSubItem.url).pathname;
                                // console.log('subSubItem url', subSubItem.url);
                            }

                        })
                    });
                }
            });
        } else {
            console.error('No se encontraron items en los datos de tratamiento.');
        }

        // if (process.client) {
            await initializeMenus(); // Considera descomentar y asegurar que esta parte se ejecuta correctamente
        // }

    } catch (error) {
        console.error('Error al cargar datos de WordPress', error);
    }
};


const initializeMenus = async () => {
    if (process.client) {
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
                        { autoAlpha: 0, height: 0}, 
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
                            gsap.to(scroller, { duration: 1, scrollTo: {y: title, offsetY: 90}})
                        }, 200);
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
    
                    }, 300); // Retraso de 300 ms
    
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
            });
            
        })
    }
};

await loadDataAndInitializeMenus();
</script>


<style lang="scss" scoped>
.hamburger {
    width: 0;
    opacity: 0;
    position: absolute;
}

.form-offer {
    color: var(--nude-6);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--gold-2);
}

ul.submenu__left-slider {
    --clip: 0rem;
    --round: var(--radius-xxl);
    // background-color: var(--nude-8);
    clip-path: inset(var(--clip) round var(--round));
    display: flex;
    height: var(--menu-height);
    flex-direction: column;
    overflow: hidden;

    &>li {
        height: var(--menu-height);
        position: absolute;
        top: 0;
        left: 0;

    }

    .before-after {
        display: flex;
        width: calc(var(--menu-width) / 2.666667);
        height: var(--menu-height);

        &>.slide-c {
            width: calc(var(--menu-width) / 2.666667);
            height: var(--menu-height);
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            scale: 1;
            will-change: opacity;
            z-index: 0;

            img {
                object-fit: cover;
                object-position: center;
                height: var(--full-height);
                min-width: calc(var(--menu-width) / 2.666667);
            }
        }
    }
}
</style>
