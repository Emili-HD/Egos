export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
    return;
  }

  // Configurar el consentimiento inicial para Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

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

  gtag("set", "ads_data_redaction", true);
  gtag("set", "url_passthrough", true);

  // Escuchar el consentimiento de cookies para cargar scripts usando el nuevo método
  window.addEventListener('cookieyes-consent', function (event) {
    const consent = event.detail;
    if (consent.categories.includes('analytics')) {
      loadScriptsWhenIdle();
    }
  });

  function loadScriptsWhenIdle() {
    requestIdleCallback(() => {
      loadAnalytics('G-K4KDQ4HZCX');

      window.dataLayer.push({
        'event': 'afterLoad'
      });
    }, { timeout: 2000 });
  }

  function loadAnalytics(id) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(gtagScript);

    gtag('js', new Date());
    gtag('config', id, {
      // Asegúrate de respetar el consentimiento para no almacenar o procesar datos hasta que sea permitido
      'storage': 'denied'
    });
  }
});

