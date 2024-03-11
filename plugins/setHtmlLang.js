// /plugins/setHtmlLang.js
export default defineNuxtPlugin(nuxtApp => {
  useHead({
    htmlAttrs: {
      lang: 'es'
    }
  });
});
