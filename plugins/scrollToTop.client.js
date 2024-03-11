// scrollToTop.client.js
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from "gsap/all";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {

        if (typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, Flip, DrawSVGPlugin, TextPlugin, ScrollToPlugin);
        }
    
        const smoother = ScrollSmoother.create({
            smooth: 1.2, // seconds it takes to "catch up" to native scroll position
            effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            normalizeScroll: true,
            ignoreMobileResize: true,
            // smoothTouch: 0.1
        });
        ScrollTrigger.normalizeScroll()
    
        // Detect if a link's href goes to the current page
        const getSamePageAnchor = (link) => {
            if (
                link.protocol !== window.location.protocol ||
                link.host !== window.location.host ||
                link.pathname !== window.location.pathname ||
                link.search !== window.location.search
            ) {
                return false;
            }
    
            return link.hash;
        }
    
        // Scroll to a given hash, preventing the event given if there is one
        const scrollToHash = (hash, e) => {
            const elem = hash ? document.querySelector(hash) : false;
            if (elem) {
                if (e) e.preventDefault();
                smoother.scrollTo(elem, true)
            }
        }
    
        // If a link's href is within the current page, scroll to it instead
        document.querySelectorAll('.pedircita').forEach(a => {
            a.addEventListener('click', e => {
                scrollToHash(getSamePageAnchor(a), e);
            });
        });
        
        // Scroll to the element in the URL's hash on load
        scrollToHash(window.location.hash);
    
        nuxtApp.hook('page:finish', () => {
            setTimeout(() => {
                smoother.scrollTo('.site-main', true, 'top top')
                ScrollTrigger.refresh()
            }, 1000)
        })
    }

    return {
        provide: {
            gsap,
            ScrollSmoother,
            ScrollTrigger,
            SplitText,
            Flip,
            DrawSVGPlugin,
            TextPlugin,
            ScrollToPlugin,
        },
    };

});
