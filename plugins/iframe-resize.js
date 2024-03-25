// plugins/iframeResize.js
import { defineNuxtPlugin } from '#app'
import { iframeResize } from 'iframe-resizer'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('resize', {
    beforeMount(el, binding) {
      el.addEventListener('load', () => iframeResize(binding.value || {}, el));
    }
  });
});
