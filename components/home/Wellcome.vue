<template>
    <section class="intro">
        <div class="intro__image">
            <img provider="ipx" loading="lazy" class="girl h-fit xl:h-[150vh]" src="/assets/images/2-intro/chica.avif" alt="" />
            <p class="intro__title font-geomanist font-semibold text-clamp-6xl 
                      lg:text-[4vw] text-nude-7 leading-[0.9] mb-0 mt-[15vh] pl-8 lg:pl-16 text-left
                      [&>span]:!text-gold-2 [&>span]:w-full [&>span]:block lg:[&>span]:inline-block">
                Más de 2000<br><span id="a">pacientes</span> <span id="b">intervenidos</span> <br>al año
            </p>
            <div class="intro__content pl-8 lg:pl-16 text-nude-8 flex flex-col justify-center items-start gap-4">
                <div class="heading [&>h1]:font-geomanist [&>h1]:text-clamp-xl" v-html="data.content.rendered"></div>
                <ElementsButton class="gold text-center flex flex-col justify-center items-center border-none rounded-xl py-3 px-6 uppercase h-full z-2 w-auto" href="#formulario" @click.prevent="handleClick">Cumple tu sueño</ElementsButton>
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
function handleClick() {
  const { $lenis: lenis } = useNuxtApp();
//   console.log('lenis on click', lenis);
  lenis.scrollTo('#formulario', {offset: -20});
}

/* const animationMask = async () => {
        let tl = gsap.timeline()

        tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.intro',
                scrub: true,
                start: 'top top',
                end: 'bottom 50%',
                // markers: true
            },
        })
        tl.to(
            '.intro__image .girl',
            { scale: 1.2, transformOrigin: '50% 50%' },
            '<',
        )
} */

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
            const introTitle = document.querySelector('.intro__title #a')

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
    // await animationMask();
    await switchText()
})

</script>

<style lang="scss" scoped>
// Empty style
.intro {
    @include flex(column, flex-end, center, nowrap, 2);
    background-color: transparent;
    overflow: hidden;
    user-select: none;
    min-height: 100vh;

    &__title {
        color: var(--nude-7);
        font-family: var(--font-family-base);
        font-size: 4vw;
        font-weight: 650;
        line-height: 0.9;
        margin-bottom: 0;
        margin-top: 15vh;
        padding-left: calc(var(--spacing) * 2);
        text-align: left;

        @media (max-width: 767px) {
            font-size: calc(var(--font-size) * 3);
            padding-left: calc(var(--spacing) * 1);
        }
    }

    &__content {
        @include flex(column, center, flex-start, nowrap, 1);
        color: var(--nude-8);
        padding-left: calc(var(--spacing) * 2);

        .heading h1 {
            font-family: var(--font-family-base);
            font-size: clamp(1.6rem, 2vw, 2.3rem);
            margin-bottom: 1rem;
        }

        @media (max-width: 767px) {
            padding-left: calc(var(--spacing) * 1);
            padding-right: calc(var(--spacing) * 1);

            .heading p {
                font-size: calc(var(--font-size) * 1.5);
            }
        }
    }

    &__image {
        @include flex(column, center, flex-start, nowrap, 2);
        background-color: #16253c;
        height: 100vh;
        inset: 0;
        position: absolute;
        width: 100vw;

        .girl {
            height: 100vh;
            object-fit: cover;
            position: absolute;
            width: 100vw;
            will-change: transform;
            z-index: 0;
            left: 25vw;

            @media (max-width: 767px) {
                left: 0;
            }
        }
    }

    #mask rect {
        will-change: transform;
    }
}

</style>
