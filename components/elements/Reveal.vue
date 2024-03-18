<template>
   <div class="content__header col-[2_/_span_14] xl:col-[4_/_span_10]
   [&>p_.mask-reveal]:!bg-nude-8 [&>p_.mask-reveal]:!w-full [&>p_.mask-reveal]:!h-[115%]
               [&>p_.mask-reveal]:!absolute [&>p_.mask-reveal]:!left-0 [&>p_.mask-reveal]:!top-[-12%] [&>p_.mask-reveal]:!opacity-90" ref="reveal">
      <component 
         :is="props.tag" 
         class="content__header-title blue-1 w-full p-0" 
         v-html="titulo">
      </component>
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
   gsap.registerPlugin(ScrollTrigger, SplitText);

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
   }, 1000);
})
</script>

<style lang="scss" scoped>
// estilo vacío
</style>
