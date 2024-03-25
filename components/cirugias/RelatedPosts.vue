<template>
   <section class="related__posts pt-6 mb-0">
      <ElementsReveal :titulo="treatmentsData.titulo_posts_relacionados" />
      <div class="post-list" v-if="posts" aria-label="Lista de publicaciones">
         <article v-for="post in posts" :key="post.id" class="card rounded-3xl overflow-hidden" :aria-labelledby="'post-title-' + post.id">
            <nuxt-link :to="`/blog/${post.slug}`"
               :aria-label="'Leer más sobre ' + post.title.rendered">
               <NuxtImg loading="lazy" v-if="post.featured_image_src" :src="post.featured_image_src.src" class="card__image"
                  :alt="post.featured_image_src.alt" :aria-labelledby="'post-title-' + post.id" />
               <h2 :id="'post-title-' + post.id" class="h6">{{ post.title.rendered }}</h2>
            </nuxt-link>
         </article>
      </div>
   </section>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue';
// import gsap from 'gsap';
import { getPostByCategoryId } from '@/composables/useApi'
const { $gsap: gsap } = useNuxtApp();
// Props
const props = defineProps({
   treatmentsData: {
      type: Object,
      required: true,
   },
   categoryId: {
      type: Number,
   }
})

const posts = ref([]);

// Métodos
const loadPostByCategoryId = async (categoryId) => {
   try {
      const response = await getPostByCategoryId(categoryId);
      posts.value = response.data;
      // await nextTick();
      // await marqueePosts();
   } catch (error) {
      console.error(error);
   }
}

const marqueePosts = async () => {
   const wrapper = document.querySelector(".related__posts .post-list");
   const boxes = gsap.utils.toArray(".related__posts .post-list .card");
   
   if (window.matchMedia("(max-width: 767px)").matches) {
      const loop = horizontalLoop(boxes, {
         paused: false,
         repeat: -1,
         speed: 0.45,
      });
   } else {
      const loop = horizontalLoop(boxes, {
         paused: false,
         repeat: -1,
         speed: 0.75,
      });
   }

   function horizontalLoop(items, config) {
      items = gsap.utils.toArray(items);
      config = config || {};
      let tl = gsap.timeline({ repeat: config.repeat, paused: config.paused, defaults: { ease: "none" }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
         length = items.length,
         startX = items[0].offsetLeft,
         times = [],
         widths = [],
         xPercents = [],
         curIndex = 0,
         pixelsPerSecond = (config.speed || 1) * 100,
         snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
         totalWidth, curX, distanceToStart, distanceToLoop, item, i;
      gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
         xPercent: (i, el) => {
            let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
            return xPercents[i];
         }
      });
      gsap.set(items, { x: 0 });
      totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") + (parseFloat(config.paddingRight) || 0);
      for (i = 0; i < length; i++) {
         item = items[i];
         curX = xPercents[i] / 100 * widths[i];
         distanceToStart = item.offsetLeft + curX - startX;
         distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
         tl.to(item, { xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100) }, { xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
         times[i] = distanceToStart / pixelsPerSecond;
      }
      function toIndex(index, vars) {
         vars = vars || {};
         (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
         let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
         if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
         }
         curIndex = newIndex;
         vars.overwrite = true;
         return tl.tweenTo(time, vars);
      }
      tl.next = vars => toIndex(curIndex + 1, vars);
      tl.previous = vars => toIndex(curIndex - 1, vars);
      tl.current = () => curIndex;
      tl.toIndex = (index, vars) => toIndex(index, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true); // pre-render for performance
      if (config.reversed) {
         tl.vars.onReverseComplete();
         tl.reverse();
      }
      return tl;
   }
}

if (props.treatmentsData && props.treatmentsData.posts_relacionados) {
   const categoryId = props.treatmentsData.posts_relacionados;
   await loadPostByCategoryId(categoryId);
}

onMounted(async () => {
   await nextTick();
   await marqueePosts();
});
</script>

<style lang="scss" scoped>
   .related__posts {
   margin-bottom: 0;

   @media (max-width: 767px) {
      padding-top: 2rem;
   }

   .post-list {
      @include flex(row, center, flex-start, nowrap, 0.5);
      height: 50%;
      overflow: hidden;
      position: relative;
      width: 100%;
      padding-bottom: var(--spacing);

      @media (max-width: 767px) {
         padding-bottom: 0;
      }

      .card {
         align-items: flex-start;
         display: flex;
         flex-shrink: 0;
         height: 100%;
         justify-content: center;
         margin: 0;
         overflow: hidden;
         padding: 0;
         position: relative;
         width: 25%;

         @media (max-width: 767px) {
            width: 75%;
         }

         &:last-child {
            padding-right: var(--gap);
         }

         img {
            aspect-ratio: 1;
            border-radius: var(--radius-xl);
            height: 100%;
            object-fit: cover;
            width: 100%;
         }
      }
   }
}

</style>
