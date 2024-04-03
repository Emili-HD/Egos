<template>
    <section class="intro min-h-[100vh]">
        <div class="intro__image bg-[#16253c] h-[100vh] inset-0 absolute w-[100vw] flex flex-col justify-center items-start gap-8">
            <img provider="ipx" class="girl h-screen object-cover absolute z-0 left-0 lg:left-[25vw]" src="/assets/images/2-intro/chica.avif" alt=""  width="1792" height="1008" />
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
import { onMounted, onUnmounted, ref } from 'vue'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {TextPlugin} from 'gsap/TextPlugin'

const { $gsap: gsap } = useNuxtApp();

// Refs para elementos del DOM
const introTitleA = ref(null);
const introTitleB = ref(null);

// Arrays para rastrear timeouts y animaciones
const timeouts = ref([]);
const animations = ref([]);

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

// Función para cambiar el texto con animación
const switchText = async () => {
    gsap.registerPlugin(TextPlugin)

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
        switch_text('.intro__title #a', 'pacientes', 0);
        switch_text('.intro__title #a', 'sueños', 4000);
        switch_text('.intro__title #b', 'intervenidos', 0);
        switch_text('.intro__title #b', 'cumplidos', 4000);
        // run again after 6s
        setTimeout(init, 8000);
    }

    // Init the magic
    init();
}

// Limpieza de animaciones y timeouts
const cleanupAnimations = () => {
  animations.value.forEach(animation => animation.kill());
  animations.value = [];

  timeouts.value.forEach(timeoutId => clearTimeout(timeoutId));
  timeouts.value = [];
};

onMounted( async () => {
    // await animationMask();
    await switchText()
})

onUnmounted(() => {
  cleanupAnimations();
});
</script>

<style lang="scss" scoped>
// Empty style
</style>
