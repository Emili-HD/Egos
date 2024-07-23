<template>
    <section class="intro min-h-[100vh] overflow-hidden">
        <div class="intro__image bg-[#16253c] h-[100vh] inset-0 absolute w-[100vw] flex flex-col justify-center items-start gap-8
                    after:content-[''] after:absolute after:inset-0 after:size-full after:bg-white/30 ">
            <img 
                class="girl min-h-screen min-w-screen object-cover object-[75%] xl:object-center absolute z-0 left-0" 
                v-if="data && data.featured_image_data && data.featured_image_data.url"
                :src="data.featured_image_data.url" 
                :srcset="data.featured_image_data.srcset" 
                :alt="data.featured_image_data.alt" 
                :width="data.featured_image_data.width" 
                :height="data.featured_image_data.height" 
            />
              <p class="intro__title font-canela font-normal text-clamp-6xl 
                        lg:text-[10vw] xl:text-[4vw] text-blue-1 leading-[0.9] mb-0 mt-[15vh] pl-8 lg:pl-16 text-left
                        [&>span]:!text-gold-3 [&>span]:w-full [&>span]:block lg:[&>span]:inline-block z-10">
                  Más de 3000<span id="a">pacientes</span> <span id="b">intervenidos</span> al año
              </p>
            <div class="intro__content pl-8 lg:pl-16 text-blue-1 flex flex-col justify-center items-start gap-4 z-10">
                <div class="heading [&>h1]:font-geomanist [&>h1]:!text-clamp-2xl 2xl:![&>h1]:text-clamp-xl " v-html="data.content.rendered"></div>
                <ElementsButton class="gold text-center flex flex-col justify-center items-center border-none rounded-xl py-3 px-6 uppercase h-full z-2 w-auto" href="#ofertas" @click.passive="handleClick">Cumple tu sueño</ElementsButton>
            </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
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
  lenis.scrollTo('#ofertas', {offset: -20});
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

onMounted(async () => {
    await nextTick()
    const startAnimation = async () => {
        // Remove event listeners to avoid multiple triggers
        window.removeEventListener('mouseenter', startAnimation)
        window.removeEventListener('click', startAnimation)
        window.removeEventListener('touchstart', startAnimation)

        // Start the animation
        await switchText()
    }

    // Add event listeners for user interaction
    window.addEventListener('mouseenter', startAnimation)
    window.addEventListener('click', startAnimation)
    window.addEventListener('touchstart', startAnimation)
})

onUnmounted(() => {
  cleanupAnimations();
});
</script>

<style scoped>
@media (min-width: 768px) and (max-width: 1366px) and (orientation: portrait) {
    .girl {
        @apply left-0;
    }
}

@media (min-width: 768px) and (max-width: 1180px) and (orientation: landscape) {
    .intro__title {
        @apply text-[6vw];
    }
}
</style>
