export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.server) {
        return;
    }

    // Inicializar la capa de datos con configuraciones predeterminadas de denegación
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }

    // Configuración inicial del consentimiento para Google Analytics
    gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
        wait_for_update: 2000,
    });

    // Carga del script de Google Analytics
    const loadAnalytics = () => {
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-K4KDQ4HZCX';
        document.head.appendChild(gtagScript);

        gtag('js', new Date());
        gtag('config', 'G-K4KDQ4HZCX', {
            send_page_view: false, // No enviar vistas de página hasta que se configure el consentimiento
        });
    };

    loadAnalytics(); // Llamar a la función al iniciar la app
});
