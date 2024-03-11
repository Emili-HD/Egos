export default defineNuxtPlugin(nuxtApp => {
  if (process.server) {
    return;
  }

  // Script de GTM para el <head>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      'gtm.start': new Date().getTime(), event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-WPQFH9GD');

  // Google Analytics gtag.js
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-K4KDQ4HZCX';
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-K4KDQ4HZCX');


  // Script de GTM para el <body>
  const bodyScript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.googletagmanager.com/ns.html?id=G-K4KDQ4HZCX';
  iframe.height = 0;
  iframe.width = 0;
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  bodyScript.appendChild(iframe);
  document.body.insertBefore(bodyScript, document.body.firstChild);
});
