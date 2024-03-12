<template>
   <div class="content__header col-[2_/_span_14] xl:col-[4_/_span_10]" ref="reveal">
      <component :is="props.tag" class="content__header-title blue1 w-full p-0" v-html="titulo"></component>
   </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const { $gsap: gsap } = useNuxtApp();

// Props
const props = defineProps({
   titulo: {
      type: String,
      required: true
   },
   tag: {
      type: String,
      default: 'h3' // Valor por defecto es 'h3'
   }
})

// Estados reactivos
const reveal = ref(null);

// Métodos
const textReveal = async () => {
   // gsap.registerPlugin(ScrollTrigger, SplitText);

   await nextTick()

   let split = new SplitText(".content__header-title", { type: "lines" });
   let masks;
   function makeItHappen() {
      masks = [];
      split.lines.forEach((target) => {
         let mask = document.createElement("span");
         mask.className = "mask-reveal";
         target.append(mask);
         masks.push(mask);
         gsap.to(mask, {
            scaleX: 0,
            transformOrigin: "right center",
            ease: "none",
            scrollTrigger: {
               trigger: target,
               scrub: true,
               start: "top center",
               end: "bottom center",
               pinSpacing: false,
               // markers: true
            }
         });
      });
   }

   window.addEventListener("resize", newTriggers);

   function newTriggers() {
      ScrollTrigger.getAll().forEach((trigger, i) => {
         trigger.kill();
         masks[i].remove();
      });
      split.split();
      makeItHappen();
   }

   makeItHappen();
}

const rAF = () => {
   return new Promise(r => window.requestAnimationFrame(r));
}

// Ciclo de vida
onMounted(async () => {
   await nextTick()
   await rAF()
   setTimeout(() => {
      textReveal()
   }, 1500);
})
</script>

<style lang="scss" scoped>
:global(.mask-reveal) {
   --bg: var(--nude-8);
   width: 100%;
   height: 115%;
   position: absolute;
   background: var(--bg);
   left: 0;
   top: -12%;
   opacity: 0.9;
}

// .related__posts .content__header-title {
//    width: 100%;
//    text-align: center;
//    padding: 2vh;

//    @media (max-width: 767px) {
//       padding-bottom: 2rem;
//       padding-top: 2rem;
//    }
// }
</style>
