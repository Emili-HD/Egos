// ~/plugins/intersect.js

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('intersect', {
    // Cuando el elemento vinculado es insertado en el DOM...
    mounted(el, binding) {
      const options = {
        rootMargin: '0px',
        threshold: 0.1 // Ajusta según sea necesario
      };
      const callback = (entries, observer) => {
        if (entries[0].isIntersecting) {
          // Llama a la función vinculada
          binding.value();
        }
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(el);

      // Opcional: Detener de observar si el elemento se desmonta
      el.$observer = observer;
    },
    unmounted(el) {
      if (el.$observer) {
        el.$observer.disconnect();
      }
    }
  });
});
