// plugins/hubspot.client.js
export default defineNuxtPlugin((nuxtApp) => {
    // Solo se ejecutará en el cliente
    if (import.meta.client) {
        const loadHubspotScripts = () => {
            // Añadir el script de HubSpot
            const hsScript = document.createElement('script');
            hsScript.type = 'text/javascript';
            hsScript.id = 'hs-script-loader';
            hsScript.defer = true;
            hsScript.src = 'https://js-eu1.hs-scripts.com/25632462.js';

            // Carga usando requestIdleCallback si está disponible
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(() => {
                    document.head.appendChild(hsScript);
                });
            } else {
                // Si no está disponible, usar un setTimeout como fallback
                setTimeout(() => {
                    document.head.appendChild(hsScript);
                }, 0);
            }
        };

        const handleUserInteraction = () => {
            // Cargar Scripts de Hubspot al detectar la interacción del usuario
            loadHubspotScripts();
        };

        // Agregar listeners para detectar interacción del usuario (scroll o touch)
        document.body.addEventListener('mouseover', handleUserInteraction, { once: true });
        window.addEventListener('touchstart', handleUserInteraction, { once: true });
    }
});
