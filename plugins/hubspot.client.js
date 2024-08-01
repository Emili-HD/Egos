export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    // Añadir el script de HubSpot
    const hsScript = document.createElement('script');
    hsScript.type = 'text/javascript';
    hsScript.id = 'hs-script-loader';
    hsScript.async = true;
    hsScript.defer = true;
    hsScript.src = '//js-eu1.hs-scripts.com/143602274.js';
    document.body.appendChild(hsScript);
  }
});
