<template>
    <section class="intro">
        <div class="intro__image">
            <NuxtImg loading="lazy" class="girl" :src="data.featured_image_src.src" alt="" />
            <p class="intro__title">Más de 2000<br><span id="a">pacientes</span> <span id="b">intervenidos</span> <br>al año</p>
            <div class="intro__content">
                <div class="heading" v-html="data.content.rendered"></div>
                <ElementsButton class="gold pedircita" href="#">Cumple tu sueño</ElementsButton>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, inject } from 'vue'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {TextPlugin} from 'gsap/TextPlugin'

const { $gsap: gsap } = useNuxtApp();

const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
})

// Métodos
const animationMask = async () => {
    // if (process.client) {
    
        let tl = gsap.timeline()
    
        // console.log(mask)
        tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.intro',
                scrub: true,
                start: 'top top',
                end: 'bottom 50%',
                // markers: true
            },
        })
        tl.to('.intro__image', { "--clip": '2.5rem', "--round": '1.8rem' }, 0)
        tl.to(
            '.intro__image .girl',
            { scale: 1.2, transformOrigin: '50% 50%' },
            '<',
        )
    // }
}

const switchText = async () => {
    
        gsap.defaults({ease: "none"});
    
        const tl = gsap.timeline({repeat:3, repeatDelay:1, yoyo:true});
    
        function switch_text(el, txt, delay, callback) {
            setTimeout(function () {
                gsap.to(el, {
                    duration: 1, 
                    text: { value: txt }, onComplete: function () {
                        if (callback && typeof (callback) === 'function') {
                            callback();
                        }
                    }
                });
            }, delay);
        }
    
        function init() {
            const introTitle = document.querySelector('.intro__title')

            if (introTitle) {
                switch_text('.intro__title #a', 'pacientes', 0);
                switch_text('.intro__title #a', 'sueños', 4000);
                switch_text('.intro__title #b', 'intervenidos', 0);
                switch_text('.intro__title #b', 'cumplidos', 4000);
            }
            // run again after 6s
            setTimeout(init, 8000);
        }
    
        // Init the magic
        init();
}

onMounted( async () => {
    await animationMask();
    await switchText()
})

</script>

<style lang="scss" scoped>
#myVideo {
    position: absolute;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
}

#scene {
    position: absolute;
    width: 100%;
    height: 100vh;
}

.intro__title span {
    color: var(--gold-2);

    @media (max-width: 767px) {
        display: inline-block;
        width: 100%;
    }
}
</style>
