export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
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

  // Escuchar el evento de consentimiento para ajustar configuraciones según el consentimiento del usuario
  window.addEventListener('cookieyes-consent', function (event) {
    const consent = event.detail;

    // Actualizar el consentimiento de Google Analytics según las categorías aceptadas
    gtag("consent", "update", {
      ad_storage: consent.categories.includes('advertising') ? "granted" : "denied",
      analytics_storage: consent.categories.includes('analytics') ? "granted" : "denied",
      functionality_storage: consent.categories.includes('functionality') ? "granted" : "denied",
      personalization_storage: consent.categories.includes('personalization') ? "granted" : "denied",
    });

    // Si el usuario da consentimiento a analytics, enviar la vista de página
    if (consent.categories.includes('analytics')) {
      gtag('event', 'page_view');
    }
  });
});
