<template>
   <footer class="footer p-1" ref="footerRef">
      <!-- Start Footer Top Area -->
      <div class="footer__inner">
         <div class="container" v-for="block in data" :key="block.id" v-html="block.rendered" ></div>
      </div>

      <!-- Start Copyright Area -->
      <div class="copyright">
         <div class="container">

            <div class="col-md-6">
               <div class="copyright-right">
                  <p>&copy; 2023 <b>Clínica Egos</b></p>
               </div>
            </div>

         </div>
      </div>
   </footer>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import WPService from '@/services/WPService.js';

const footer = ref(null);

// props
const props = defineProps({
   data: {
      type: Object,
   }
})

</script>


<style lang="scss">
@media (max-width: 767px) {
   .footer__inner {
      display: grid;
      column-gap: 0;
      row-gap: 2rem;
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
      width: 100%;
   }

   .footer__inner .container {
      grid-column: 1;
      width: 100%;
   }

   .footer__inner .container #menu-menu-footer {
      font-size: var(--font-size);
      line-height: var(--line-height);
      text-transform: uppercase;
      list-style: none;
      text-align: center;
   }

   .footer__inner .footer__block {
      text-align: center;
   }

   #block-5 img {
      max-width: 9rem;
      margin-bottom: 1.5rem;
   }
}
</style>
