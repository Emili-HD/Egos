export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    // Añadir el script de Facebook Pixel
        const fbScript = document.createElement('script');
        fbScript.type = 'text/javascript';
        // fbScript.charset = 'utf-8';
        fbScript.defer = true;
        fbScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1695692394291035');
            fbq('track', 'PageView');
        `;
        document.body.appendChild(fbScript);

        // Añadir el noscript de Facebook Pixel
        const noScript = document.createElement('noscript');
        noScript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1695692394291035&ev=PageView&noscript=1" />`;
        document.body.appendChild(noScript);
  }
});
