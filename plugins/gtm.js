export default defineNuxtPlugin(nuxtApp => {
  if (process.server) {
    return;
  }

  // Utilizamos requestIdleCallback para cargar scripts de analíticas cuando el navegador esté inactivo
  requestIdleCallback(() => {
    // GTM para el <head>
    loadGTM('GTM-WPQFH9GD');
    
    // Google Analytics gtag.js
    loadAnalytics('G-K4KDQ4HZCX');
    
    // GTM para el <body>
    loadBodyGTM('G-K4KDQ4HZCX');
  });

  function loadGTM(id) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(), event: 'gtm.js'
    });
    const gtmScript = document.createElement('script');
    gtmScript.defer = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + id;
    document.head.appendChild(gtmScript);
  }

  function loadAnalytics(id) {
    const gtagScript = document.createElement('script');
    gtagScript.defer = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(gtagScript);
    
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', id);
  }

  function loadBodyGTM(id) {
    const bodyScript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=' + id;
    iframe.height = 0;
    iframe.width = 0;
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    bodyScript.appendChild(iframe);
    document.body.insertBefore(bodyScript, document.body.firstChild);
  }

});

