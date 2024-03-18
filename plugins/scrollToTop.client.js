// scrollToTop.client.js
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/all";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import Lenis from "@studio-freight/lenis";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {

        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, SplitText, Flip, DrawSVGPlugin, TextPlugin, ScrollToPlugin);
        }

        // Crear la instancia de Lenis
        const lenis = new Lenis({
            duration: 2,
            lerp: 0.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
            gestureDirection: 'both', // vertical, horizontal, both
            // infinite: true,
        })

        // const lenisSwiper = new Lenis({
        //   wrapper: '.swiper', // element which has overflow
        //   content: '.swiper-wrapper', // usually wrapper's direct child
        //   duration: 1.2,
        //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        //   direction: 'horizontal', // vertical, horizontal
        //   gestureDirection: 'horizontal', // vertical, horizontal, both
        //   smooth: true,
        //   mouseMultiplier: 1,
        // })

        // Configurar Lenis con GSAP y ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
            ScrollTrigger.update()
        });
        gsap.ticker.lagSmoothing(0);
    
        nuxtApp.hook('page:finish', () => {
            setTimeout(() => {
                lenis.scrollTo(0, { immediate: true })
            }, 1000)
        })

        nuxtApp.provide('lenis', lenis);
    }

    return {
        provide: {
            gsap,
            ScrollTrigger,
            SplitText,
            Flip,
            DrawSVGPlugin,
            TextPlugin,
            ScrollToPlugin,
            Lenis
        },
    };

});
