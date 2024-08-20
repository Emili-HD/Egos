// plugins/hubspot.client.js
export default defineNuxtPlugin((nuxtApp) => {
  // Solo se ejecutará en el cliente
  if (import.meta.client) {
    nuxtApp.hook('app:mounted', () => {
      // Añadir el script de HubSpot
      const hsScript = document.createElement('script');
      hsScript.type = 'text/javascript';
      hsScript.id = 'hs-script-loader';
      // hsScript.async = true;
      hsScript.defer = true;
      hsScript.src = 'https://js-eu1.hs-scripts.com/143602274.js';
      document.body.appendChild(hsScript);
    });
  }
});
