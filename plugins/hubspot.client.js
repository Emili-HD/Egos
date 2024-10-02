// plugins/hubspot.client.js
export default defineNuxtPlugin((nuxtApp) => {
    // Solo se ejecutará en el cliente
    if (import.meta.client) {
        const loadHubspotScripts = () => {
            // Añadir el script de HubSpot
            const hsScript = document.createElement('script');
            hsScript.type = 'text/javascript';
            hsScript.id = 'hs-script-loader';
            // hsScript.async = true;
            hsScript.defer = true;
            hsScript.src = 'https://js-eu1.hs-scripts.com/143602274.js';
            document.head.appendChild(hsScript);
        };

        const handleUserInteraction = () => {
            // Cargar Scripts de Hubspot al detectar la interacción del usuario
            loadHubspotScripts();
        };

        // Agregar listeners para detectar interacción del usuario (scroll o touch)
        // window.addEventListener('scroll', handleUserInteraction, { once: true });
        document.body.addEventListener('mouseover', handleUserInteraction, { once: true })
        window.addEventListener('touchstart', handleUserInteraction, { once: true });
    }
});
